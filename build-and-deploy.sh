set -eu -o pipefail

PROJECT_ID=$1
BACKEND_URL=$2
yarn install
yarn build

REACT_APP_BACKEND_URL=$BACKEND_URL gcloud --project ${PROJECT_ID} app deploy -q app.yaml
