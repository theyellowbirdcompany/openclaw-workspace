#!/bin/bash
# run-sql.sh (v4 - The Final Version)
# Securely executes a SQL file against the project's Supabase database.

set -e

# Source the machine-readable credentials file directly.
source "/home/clawd/.openclaw/workspace/SUPABASE_CREDENTIALS.md"

if [ -z "$PROJECT_URL" ] || [ -z "$DATABASE_PASSWORD" ]; then
    echo "Error: Could not source credentials from SUPABASE_CREDENTIALS.md" >&2
    exit 1
fi

if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <path-to-sql-file.sql>" >&2
    exit 1
fi
SQL_FILE=$1
if [ ! -f "$SQL_FILE" ]; then
    echo "Error: SQL file not found at ${SQL_FILE}" >&2
    exit 1
fi

# Construct the DB URL using the session pooler connection string format.
PROJECT_REF=$(echo "$PROJECT_URL" | sed -e 's|https://||' -e 's|\.supabase\.co.*||')
export DATABASE_URL="postgresql://postgres.${PROJECT_REF}:${DATABASE_PASSWORD}@aws-0-us-west-2.pooler.supabase.com:5432/postgres"

echo "Connecting to Supabase and executing SQL file..."
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 --single-transaction -f "$SQL_FILE"
echo "✅ SQL file executed successfully."
