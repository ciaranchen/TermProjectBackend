#!/bin/bash
PROJECT_FOLDER=$(dirname $(cd `dirname $0`; pwd))
# echo $PROJECT_FOLDER
mkdir -p $PROJECT_FOLDER/data/data
mongod --dbpath="$PROJECT_FOLDER/data/data/" --logpath="$PROJECT_FOLDER/data/db.log" &