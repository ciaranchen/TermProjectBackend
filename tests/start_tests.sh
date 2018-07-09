#!/usr/bin/bash

# base Path
PROJECT_FOLDER=$(dirname $(cd `dirname $0`; pwd))

# start the database
bash $PROJECT_FOLDER/sqlScripts/start_mongodb.sh &

# move to this folder
cd $PROJECT_FOLDER/tests

# for each folder
for i in $(ls -F | grep "/$")
do
    echo $i
    cd $i
    # run the test
    mocha test.js --exit
    cd ..
done

echo "note: the mongoDB service is still running"
