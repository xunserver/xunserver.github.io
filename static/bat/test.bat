@REM 复制所有的bat脚本到bat1文件夹
@echo off

@REM 新建文件夹
call :makedir bat1


goto :eof
:makedir
if exist %1 (
    echo dir is exist
    del /q %1
)
md %1
goto :eof
