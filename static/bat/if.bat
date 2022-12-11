:: if语句 if (condition) (command) else (command)
@echo off
set str1=String1
set str2=String2

if %str1%==String1 if %str2%==String1 (echo true) else echo 123

pause