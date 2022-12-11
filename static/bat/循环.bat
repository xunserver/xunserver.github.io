@echo off
set /a a=1
:start
if %a%==5 goto :end
echo %a%
set /a a=%a%+1
goto :start
:end