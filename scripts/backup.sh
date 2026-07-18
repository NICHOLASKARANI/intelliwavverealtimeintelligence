#!/bin/bash
# scripts/backup.sh
# Automated backup script for IntelliWave ITIS

set -e

BACKUP_DIR="/backups/intelliwave"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
RETENTION_DAYS=30

# Create backup directory
mkdir -p $BACKUP_DIR

echo "Starting backup at $(date)"

# Database backup
echo "Backing up PostgreSQL..."
PGPASSWORD=$DB_PASSWORD pg_dump \
  -h localhost \
  -U $DB_USER \
  -d intelliwave_itis \
  -F c \
  -f "$BACKUP_DIR/db_backup_$TIMESTAMP.dump"

# Compress backup
gzip "$BACKUP_DIR/db_backup_$TIMESTAMP.dump"

# Redis backup
echo "Backing up Redis..."
redis-cli -a $REDIS_PASSWORD BGSAVE
cp /data/dump.rdb "$BACKUP_DIR/redis_backup_$TIMESTAMP.rdb"

# Application files backup
echo "Backing up application files..."
tar -czf "$BACKUP_DIR/app_backup_$TIMESTAMP.tar.gz" \
  /opt/intelliwave-itis/config \
  /opt/intelliwave-itis/apps

# Upload to S3 (if configured)
if [ ! -z "$AWS_BUCKET" ]; then
  echo "Uploading to S3..."
  aws s3 cp "$BACKUP_DIR/db_backup_$TIMESTAMP.dump.gz" "s3://$AWS_BUCKET/database/"
  aws s3 cp "$BACKUP_DIR/redis_backup_$TIMESTAMP.rdb" "s3://$AWS_BUCKET/redis/"
  aws s3 cp "$BACKUP_DIR/app_backup_$TIMESTAMP.tar.gz" "s3://$AWS_BUCKET/application/"
fi

# Clean old backups
echo "Cleaning old backups..."
find $BACKUP_DIR -type f -mtime +$RETENTION_DAYS -delete

echo "Backup completed at $(date)"

# Notification
if [ ! -z "$SLACK_WEBHOOK_URL" ]; then
  curl -X POST -H 'Content-type: application/json' \
    --data "{\"text\":\"✅ IntelliWave backup completed successfully at $(date)\"}" \
    $SLACK_WEBHOOK_URL
fi