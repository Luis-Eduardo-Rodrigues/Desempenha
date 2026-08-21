#!/bin/sh
set -eu

# The backend keeps the connection details in DATABASE_URL. The official
# PostgreSQL image expects the same values split into these three variables.
connection="$DATABASE_URL"
connection="${connection#*://}"
credentials="${connection%%@*}"
location="${connection#*@}"

export POSTGRES_USER="${credentials%%:*}"
export POSTGRES_PASSWORD="${credentials#*:}"
export POSTGRES_DB="${location#*/}"
export POSTGRES_DB="${POSTGRES_DB%%\?*}"

exec docker-entrypoint.sh postgres
