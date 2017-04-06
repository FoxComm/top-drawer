#!/usr/bin/env bash

set -ue

# Cleanup dependencies
echo "--- Cleanup"
echo "Cleaning up api-js"
sudo rm -rf api-js
echo "Cleaning up wings..."
sudo rm -rf wings
echo "Done."

# Link api-js dependency
echo "--- Linking api-js"
git clone git@github.com:FoxComm/api-js.git && cd api-js
sudo npm link
cd $BUILDKITE_BUILD_CHECKOUT_PATH
sudo npm link @foxcomm/api-js

# Link wings dependency
echo "--- Linking wings"
git clone git@github.com:FoxComm/wings.git && cd wings
sudo npm link
cd $BUILDKITE_BUILD_CHECKOUT_PATH
sudo npm link @foxcomm/wings

# Build
echo "--- Building"
yarn --pure-lockfile
./node_modules/.bin/gulp build

# Final
echo "--- Deploying"
echo ${BUILDKITE_BRANCH}-stage

# Cleanup dependencies
echo "--- Unlinking"
sudo npm unlink @foxcomm/api-js
sudo npm unlink @foxcomm/wings
