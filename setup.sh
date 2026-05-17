#!/bin/bash

# SlotCut - Local Development Setup Script
# This script sets up the entire application (frontend + backend + database)

set -e

echo "=========================================="
echo "SlotCut - Local Setup"
echo "=========================================="
echo ""

# Check prerequisites
echo "Checking prerequisites..."

if ! command -v docker &> /dev/null; then
    echo "Error: Docker is not installed. Please install Docker Desktop."
    exit 1
fi

if ! command -v git &> /dev/null; then
    echo "Error: Git is not installed."
    exit 1
fi

echo "✓ Docker found"
echo "✓ Git found"
echo ""

# Setup environment
echo "Setting up environment variables..."

if [ ! -f .env.local ]; then
    cp .env.local.example .env.local
    echo "✓ Created .env.local"
else
    echo "✓ .env.local already exists"
fi

echo ""
echo "Starting services with Docker Compose..."
echo ""

# Start services
docker-compose up -d

# Wait for PostgreSQL to be ready
echo "Waiting for database to be ready..."
sleep 10

# Verify services
echo ""
echo "Verifying services..."
echo ""

# Check backend health
if curl -s http://localhost:8080/api/health > /dev/null; then
    echo "✓ Backend is running (http://localhost:8080/api)"
else
    echo "⚠ Backend is starting (may take a moment)..."
fi

# List running services
echo ""
echo "=========================================="
echo "Setup Complete!"
echo "=========================================="
echo ""
echo "Services running:"
echo "  Frontend:  http://localhost:3000"
echo "  Backend:   http://localhost:8080/api"
echo "  Database:  postgres://localhost:5432/slotcut"
echo ""
echo "Test Credentials (Owner):"
echo "  Phone: 9876543210"
echo "  PIN:   1234"
echo ""
echo "To stop services:"
echo "  docker-compose down"
echo ""
echo "To view logs:"
echo "  docker-compose logs -f backend"
echo "  docker-compose logs -f postgres"
echo ""
