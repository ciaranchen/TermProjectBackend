@echo off
setlocal
set latest_path=%cd%
echo %latest_path%

:: base Path
set PROJECT_FOLDER=%~dp0..

:: start the database
start "mongoDB service" cmd /k mongod --dbpath="%PROJECT_FOLDER%\data\data" --logpath="%PROJECT_FOLDER%\data\db.log"

cd %~dp0
for /D %%f in (*) do (
   echo %%f
   cd %~dp0%%f
   mocha test.js --exit
   cd %latest_path%
)
endlocal
