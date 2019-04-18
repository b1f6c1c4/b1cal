#!/bin/sh

set -ex

npm install --global parcel-bundler
npm ci
npm run build
