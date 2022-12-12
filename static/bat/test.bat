@echo off

call:sum 4 5 result
echo %result%

:: 函数需要放在最后或者单独定义一个函数区来跳过
goto func_end
:func_start
:sum
echo %1
echo %2
set /a %~3=%1+%2
echo %~3
goto:eof
:func_end