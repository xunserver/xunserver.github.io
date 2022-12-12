:: if语句 if (condition) (command) else (command)
@echo off
set str1=String1
set str2=String2

if %str1%==String1 if %str2%==String1 (echo true) else echo false

pause

:: if exist
if exist if.bat (echo true) else (echo false)
pause

:: if defined
set a=123
if defined a echo true
pause

:: if errorlevel
set a=123
if errorlevel 1 (echo true)

set a=123
goto: label

:label
echo new position
