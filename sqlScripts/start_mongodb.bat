@echo off
setlocal
set PROJECT_FOLDER=%~dp0..
if not exist %PROJECT_FOLDER%\data\data\ md %PROJECT_FOLDER%\data\data\
start "mongoDB service" cmd /k mongod --dbpath="%PROJECT_FOLDER%\data\data" --logpath="%PROJECT_FOLDER%\data\db.log"
endlocal