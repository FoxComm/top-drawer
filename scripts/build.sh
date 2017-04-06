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
git clone $APIJS_REPO && cd api-js && yarn link
cd $BUILDKITE_BUILD_CHECKOUT_PATH

# Mark wings dependency
echo "--- Downloading wings"
git clone $WINGS_REPO && cd wings && yarn link
cd $BUILDKITE_BUILD_CHECKOUT_PATH

# Linking dependencies
echo "--- Linking dependencies"
yarn link @foxcomm/api-js
yarn link @foxcomm/wings

# Build
echo "--- Building"
yarn
./node_modules/.bin/gulp build

# Final
echo "--- Deploying"
echo ${BUILDKITE_BRANCH}-stage
