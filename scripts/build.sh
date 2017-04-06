#!/usr/bin/env bash

set -ue

# Cleanup dependencies
echo "--- Cleanup"
cd ../
echo "Cleaning up api-js..."
sudo rm -rf api-js
echo "Cleaning up wings..."
sudo rm -rf wings
echo "Done."

# Link api-js dependency
echo "--- Linking api-js"
git clone git@github.com:FoxComm/api-js.git
cd api-js
sudo npm link
cd ../$BUILDKITE_PIPELINE_SLUG
sudo npm link @foxcomm/api-js

# Link wings dependency
echo "--- Linking wings"
cd ../
git clone git@github.com:FoxComm/wings.git
cd wings
sudo npm link
cd ../$BUILDKITE_PIPELINE_SLUG
sudo npm link @foxcomm/wings

# Build
echo "--- Building"
cd $BUILDKITE_PIPELINE_SLUG
make build

# Final
echo "--- Finale"
echo ${BUILDKITE_BRANCH}-stage
