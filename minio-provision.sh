#!/bin/sh

# Script used to prepare the minio instance with the required permissions

while ! mc config host add storage http://minio:9000 minioadmin minioadmin
do
   echo "Waiting for minio..."
   sleep 0.5
done

mc mb --ignore-existing storage/balti
mc ilm import storage/balti < lifecycle_expiry.json
mc anonymous set-json bucket_policy.json storage/balti
