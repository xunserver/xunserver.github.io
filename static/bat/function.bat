@echo off
set a=global

call :echo_hello
echo %a%
pause

set returnvalue=111
call :return_value 2,3,returnvalue
echo %returnvalue%
pause


exit /b %errorlevel%



@REM 函数申明需要放到最后
:echo_hello
setlocal
set a=local
echo %a%
exit /b 0

@REM 通过对传入参数的改写实现函数返回值
:return_value
setlocal
set /A cc=222
set /A %~3=%~1 + %~2 + %cc%
exit /b 0