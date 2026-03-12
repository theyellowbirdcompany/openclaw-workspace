#!/bin/bash
# run-supabase-migration.sh (v3)
# Secure wrapper for executing a Supabase SQL migration file using the CLI.

set -e

# --- Input Validation ---
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <path-to-migration.sql>"
    exit 1
fi

SQL_FILE=$1

if [ ! -f "$SQL_FILE" ]; then
    echo "Error: SQL file not found at ${SQL_FILE}"
    exit 1
fi

# --- Execution ---
echo "Executing SQL migration via Supabase CLI..."

# The CLI will use the credentials from `supabase login` and the project
# from `supabase link` to execute this against the correct database. It reads
# from standard input.
cat "$SQL_FILE" | supabase db execute

echo "✅ Migration command sent successfully."
