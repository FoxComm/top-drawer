#!/usr/bin/env bash

set -ue

# Cleanup dependencies
cd ../../
rm -rf api-js
rm -rf wings

# Link api-js dependency
git clone git@github.com:FoxComm/api-js.git
cd api-js
npm link
cd ../top-drawer
npm link @foxcomm/api-js

# Link wings dependency
cd ../
git clone git@github.com:FoxComm/wings.git
cd wings
npm link
cd ../top-drawer
npm link @foxcomm/wings

# Build
cd top-drawer
make build

echo ${BUILDKITE_BRANCH}-stage
