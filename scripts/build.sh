#!/usr/bin/env bash

set -ue

APIJS_REPO=git@github.com:FoxComm/api-js.git
WINGS_REPO=git@github.com:FoxComm/wings.git

# Cleanup dependencies
echo "--- Cleanup"
echo "Cleaning up api-js"
sudo rm -rf api-js
echo "Cleaning up wings..."
sudo rm -rf wings
echo "Done."

# Mark api-js dependency
echo "--- Downloading api-js"
git clone $APIJS_REPO && cd api-js && npm install --dev && npm run build && sudo npm link
cd $BUILDKITE_BUILD_CHECKOUT_PATH

# Mark wings dependency
echo "--- Downloading wings"
git clone $WINGS_REPO && cd wings && npm install --dev && npm run build && sudo npm link
cd $BUILDKITE_BUILD_CHECKOUT_PATH

# Linking dependencies
echo "--- Linking dependencies"
npm link @foxcomm/api-js
npm link @foxcomm/wings

# Build
echo "--- Building"
npm install --dev
./node_modules/.bin/gulp build

# Final
echo "--- Deploying"
echo ${BUILDKITE_BRANCH}-stage
