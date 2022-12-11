:: 变量通过set申明，通过%%包括的取值

@echo off
set a=123
echo var is %a%
@REM 上面那种场景a是字符串123 添加/A 变成数字123
set /A a=123
echo var is %a%
pause

@REM 脚本输入输出
echo %1%
echo %2%
echo %3%
pause

@REM 算数运算符
set a=1
set /A b=2
@REM 这种情况是简单的字符拼接
set c=%a%+%b%
echo %c%
@REM 当全部是数字时，并且申明也是数字
set /a a=1
set /a b=2
set /a c=%a%+%b%
echo %c%

@REM 也能直接使用环境变量，在系统配置中可以自定义
echo %PATH%