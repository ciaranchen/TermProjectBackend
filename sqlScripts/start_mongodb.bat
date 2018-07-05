PORJECT_FOLDER=%~dp0..\
md %PROJECT_FOLDER%\data\data\
mongod --dbpath="$PROJECT_FOLDER/data/data/" --logpath="$PROJECT_FOLDER/data/db.log"
