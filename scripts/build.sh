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
echo "--- Cloning api-js"
git clone $APIJS_REPO && cd api-js && sudo npm link
cd $BUILDKITE_BUILD_CHECKOUT_PATH

# Mark wings dependency
echo "--- Cloning wings"
git clone $WINGS_REPO && cd wings && sudo npm link
cd $BUILDKITE_BUILD_CHECKOUT_PATH

# Link dependencies
echo "--- Linking dependencies"
sudo npm link @foxcomm/api-js
sudo npm link @foxcomm/wings

# Build
echo "--- Building"
ll node_modules/@foxcomm
yarn --pure-lockfile
./node_modules/.bin/gulp build

# Final
echo "--- Deploying"
echo ${BUILDKITE_BRANCH}-stage

# Cleanup dependencies
echo "--- Unlinking"
sudo npm unlink @foxcomm/api-js
sudo npm unlink @foxcomm/wings
