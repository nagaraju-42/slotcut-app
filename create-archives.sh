#!/bin/bash

# SlotCut - Create Deployment Archives
# Packages frontend and backend for deployment

set -e

echo "=========================================="
echo "Creating Deployment Archives"
echo "=========================================="
echo ""

# Create archives directory
mkdir -p archives

# Remove old archives
rm -f archives/slotcut-*.tar.gz

echo "Creating frontend archive..."
tar --exclude='node_modules' \
    --exclude='.next' \
    --exclude='out' \
    --exclude='.vercel' \
    --exclude='.env.local' \
    --exclude='slotcut-backend' \
    --exclude='archives' \
    --exclude='.git' \
    -czf archives/slotcut-frontend.tar.gz \
    app/ components/ lib/ public/ \
    package.json tsconfig.json next.config.mjs \
    postcss.config.mjs components.json \
    .env.example .env.local.example .env.production.example \
    vercel.json README.md DEPLOYMENT.md 2>/dev/null || true

echo "✓ Created archives/slotcut-frontend.tar.gz"
echo ""

echo "Creating backend archive..."
tar --exclude='build' \
    --exclude='.gradle' \
    --exclude='.idea' \
    --exclude='.DS_Store' \
    --exclude='*.jar' \
    -czf archives/slotcut-backend.tar.gz \
    slotcut-backend/

echo "✓ Created archives/slotcut-backend.tar.gz"
echo ""

echo "Creating full stack archive..."
tar --exclude='node_modules' \
    --exclude='slotcut-backend/build' \
    --exclude='slotcut-backend/.gradle' \
    --exclude='.next' \
    --exclude='out' \
    --exclude='.vercel' \
    --exclude='.env.local' \
    --exclude='archives' \
    --exclude='.git' \
    --exclude='.DS_Store' \
    -czf archives/slotcut-complete.tar.gz \
    app/ components/ lib/ public/ slotcut-backend/ \
    package.json tsconfig.json next.config.mjs \
    postcss.config.mjs components.json \
    docker-compose.yml setup.sh \
    README.md DEPLOYMENT.md \
    .env.example .env.local.example .env.production.example \
    vercel.json .gitignore 2>/dev/null || true

echo "✓ Created archives/slotcut-complete.tar.gz"
echo ""

echo "=========================================="
echo "Archive Creation Complete!"
echo "=========================================="
echo ""
echo "Created files:"
ls -lh archives/slotcut-*.tar.gz
echo ""
echo "To deploy:"
echo "  Frontend:    tar -xzf slotcut-frontend.tar.gz && deploy to Vercel"
echo "  Backend:     tar -xzf slotcut-backend.tar.gz && deploy to Railway"
echo "  Full Stack:  tar -xzf slotcut-complete.tar.gz && use docker-compose"
echo ""
