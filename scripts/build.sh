#!/usr/bin/env bash

set -ue

# Cleanup dependencies
@echo "---Cleanup"
cd ../../
rm -rf api-js
rm -rf wings

# Link api-js dependency
@echo "---Linking api-js"
git clone git@github.com:FoxComm/api-js.git
cd api-js
npm link
cd ../top-drawer
npm link @foxcomm/api-js

# Link wings dependency
@echo "---Linking wings"
cd ../
git clone git@github.com:FoxComm/wings.git
cd wings
npm link
cd ../top-drawer
npm link @foxcomm/wings

# Build
@echo "---Building"
cd top-drawer
make build

# Final
@echo "---Finale"
@echo ${BUILDKITE_BRANCH}-stage
