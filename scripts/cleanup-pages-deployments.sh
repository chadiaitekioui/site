#!/usr/bin/env bash
# Delete old github-pages deployment records via GitHub API.
# Requires: gh auth login (with repo admin + deployments scope)
#
# Usage:
#   ./scripts/cleanup-pages-deployments.sh              # keep latest only
#   ./scripts/cleanup-pages-deployments.sh --all        # delete every deployment
#   ./scripts/cleanup-pages-deployments.sh --reset      # delete all + unpublish/republish Pages

set -euo pipefail

REPO="${REPO:-chadiaitekioui/site}"
MODE="keep-latest"

for arg in "$@"; do
  case "$arg" in
    --all) MODE="all" ;;
    --reset) MODE="reset" ;;
    -h|--help)
      sed -n '2,8p' "$0"
      exit 0
      ;;
  esac
done

if ! gh auth status >/dev/null 2>&1; then
  echo "Run: gh auth login"
  exit 1
fi

delete_deployment() {
  local id="$1"
  gh api -X POST "repos/${REPO}/deployments/${id}/statuses" \
    -f state=inactive \
    -f description="cleanup" >/dev/null 2>&1 || true
  gh api -X DELETE "repos/${REPO}/deployments/${id}" >/dev/null
  echo "Deleted deployment ${id}"
}

deployment_ids() {
  gh api --paginate \
    "repos/${REPO}/deployments?environment=github-pages&per_page=100" \
    --jq '.[].id'
}

count=0
skip_first=false
if [ "$MODE" = "keep-latest" ]; then
  skip_first=true
fi

while IFS= read -r id; do
  [ -z "$id" ] && continue
  count=$((count + 1))

  if [ "$skip_first" = true ]; then
    skip_first=false
    echo "Found deployment(s). Keeping latest: ${id}"
    continue
  fi

  if [ "$MODE" = "keep-latest" ]; then
    delete_deployment "$id"
  elif [ "$MODE" = "all" ] || [ "$MODE" = "reset" ]; then
    delete_deployment "$id"
  fi
done <<EOF
$(deployment_ids)
EOF

if [ "$count" -eq 0 ]; then
  echo "No github-pages deployments found."
elif [ "$MODE" = "all" ] || [ "$MODE" = "reset" ]; then
  echo "Deleted ${count} deployment(s)."
fi

# Optional: unpublish and republish Pages (fresh start)
if [ "$MODE" = "reset" ]; then
  echo "Unpublishing GitHub Pages..."
  gh api -X DELETE "repos/${REPO}/pages" >/dev/null 2>&1 || true
  sleep 2
  echo "Republishing from master / ..."
  gh api -X POST "repos/${REPO}/pages" \
    -f build_type=legacy \
    -f 'source[branch]=master' \
    -f 'source[path]=/' >/dev/null
  echo "Pages republished. Wait ~1 min, then check deployments."
fi

# Clean old workflow runs (names shown in Actions tab)
echo ""
echo "Deleting old 'pages build and deployment' workflow runs..."
while IFS= read -r run_id; do
  [ -n "$run_id" ] || continue
  gh run delete "$run_id" --repo "$REPO" 2>/dev/null && echo "Deleted run ${run_id}" || true
done < <(gh run list --repo "$REPO" --workflow "pages-build-deployment" --limit 100 --json databaseId --jq '.[].databaseId' 2>/dev/null || true)

echo "Done."
