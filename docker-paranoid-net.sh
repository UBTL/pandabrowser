#!/bin/sh

DB_IP=$(getent hosts mariadb | cut -d' ' -f1)
apk add ufw
ufw default deny outgoing
ufw allow out to 127.0.0.1
ufw allow out to "$DB_IP" port 3306
ufw allow in to any port 6969
ufw enable

su -c "$@" node

