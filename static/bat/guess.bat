@echo off
chcp 65001
echo.
echo 猜数字
echo.
echo 系统会随机生成一个0~99的数字
echo 每次如果没猜对 系统会给你一个提示
echo 请挑战最少次数内猜中数字
echo.

set /A result="%random% %% 100"
set /A count=0
:start
set /A count+=1
echo.
echo 请输入答案:
set /p input=
if not %input%==%result% (
    if %input% lss %result% (echo 输入小于正确答案) else echo 输入大于正确答案
    goto start
) else (
    echo 猜中了，答案是%result%,使用了%count%次。
    goto end
)
:end
pause