#!/bin/bash
set -e
echo "Installing dependencies..."
npm install --legacy-peer-deps
echo "Generating Prisma client..."
npx prisma generate
echo "Building application..."
npm run build
echo "Build complete!"
