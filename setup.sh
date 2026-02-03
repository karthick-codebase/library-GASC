#!/bin/bash
# Setup script for Render deployment

# Install dependencies
npm install

# Build the frontend
npm run build

# The json-server will be started by render.yaml with startCommand
