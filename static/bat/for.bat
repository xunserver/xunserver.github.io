@echo off

:: 读取目录
@REM for  %%l in (*.bat) do echo %%l

for /f "delims=" %%i in ('dir') do echo %%i

