# scripts/restore.sh
#!/bin/bash
# Database restore script

set -e

if [ -z "$1" ]; then
  echo "Usage: $0 <backup_file>"
  exit 1
fi

BACKUP_FILE=$1

echo "Restoring from: $BACKUP_FILE"

# Stop application
docker-compose -f docker-compose.prod.yml stop backend bot-engine ai-engine

# Restore database
echo "Restoring database..."
gunzip -c $BACKUP_FILE | PGPASSWORD=$DB_PASSWORD pg_restore \
  -h localhost \
  -U $DB_USER \
  -d intelliwave_itis \
  --clean \
  --if-exists

# Run migrations
echo "Running migrations..."
docker-compose -f docker-compose.prod.yml run --rm backend npx prisma migrate deploy

# Start application
docker-compose -f docker-compose.prod.yml start backend bot-engine ai-engine

echo "Restore completed!"