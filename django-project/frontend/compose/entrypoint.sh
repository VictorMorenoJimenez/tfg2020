#!/usr/bin/env bash

set -o errexit
set -o pipefail
set -o nounset

cd /usr/src/app

export PATH="/usr/src/app/node_modules/.bin:$PATH"

echo "*** Updating node_modules"
npm install

npm rebuild node-sass

echo "*** Setting strict-ssl to false"
npm config set strict-ssl false

echo "*** Running ng serve"
exec "$@"
