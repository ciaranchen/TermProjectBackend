# !bin/sh

# base Path
PROJECT_FOLDER=$(dirname $(cd `dirname $0`; pwd))
cd $PROJECT_FOLDER

# start the database
bash ./sqlScripts/start_mongodb.sh

# move to this folder
cd tests

# for each folder
for i in $(ls -F | grep "/$")
do
    cd $i
    # run the test
    mocha test.js
    cd ..
done
