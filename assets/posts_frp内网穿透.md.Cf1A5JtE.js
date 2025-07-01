import{_ as n,c as e,o as t,ah as r}from"./chunks/framework.BurO9VyR.js";const _=JSON.parse('{"title":"frp内网穿透","description":null,"frontmatter":{"title":"frp内网穿透","comments":true,"tags":["frp","内网穿透"],"categories":["linux"],"abbrlink":"c067e7e3","date":"2019-04-17T10:13:24.000Z","updated":"2019-04-17T10:13:24.000Z","description":null},"headers":[],"relativePath":"posts/frp内网穿透.md","filePath":"posts/frp内网穿透.md"}'),o={name:"posts/frp内网穿透.md"};function p(s,a,d,i,h,l){return t(),e("div",null,a[0]||(a[0]=[r(`<h2 id="下载安装" tabindex="-1">下载安装 <a class="header-anchor" href="#下载安装" aria-label="Permalink to &quot;下载安装&quot;">​</a></h2><p>github搜索frp star最多的项目，到release中根据系统下载响应压缩包 <a href="https://github.com/fatedier/frp" target="_blank" rel="noreferrer">传送门</a>， 压缩包中包含frps（公网服务端），frpc（需要被穿透的客户端）.ini 结尾是配置文件，full.ini 是全部的配置文件</p><h2 id="启动服务端和客户端" tabindex="-1">启动服务端和客户端 <a class="header-anchor" href="#启动服务端和客户端" aria-label="Permalink to &quot;启动服务端和客户端&quot;">​</a></h2><pre><code>./fprs -c ./frps.ini  // 到公网服务器启动
./frpc -c ./frpc.ini  // 需要被穿透的机器上执行
</code></pre><h2 id="服务器配置" tabindex="-1">服务器配置 <a class="header-anchor" href="#服务器配置" aria-label="Permalink to &quot;服务器配置&quot;">​</a></h2><p>官网文档支持中文，更多细节查看<a href="https://github.com/fatedier/frp/blob/master/README_zh.md" target="_blank" rel="noreferrer">官方文档</a></p><pre><code>[common]
# 通信端口
bind_port = 7000

# 外网访问端口
vhost_http_port=80
vhost_https_port=443

# 二级域名
subdomain_host=frp.xunserver.cn

# 连接密码
token=adadadadad

# 管理服务器 密码用户端口
dashboard_port=7500
dashboard_user=admin
dashboard_pwd=adadadadad

# 连接池
# max_pool_count=5
</code></pre><h2 id="客户端管理" tabindex="-1">客户端管理 <a class="header-anchor" href="#客户端管理" aria-label="Permalink to &quot;客户端管理&quot;">​</a></h2><pre><code>[common]
# 服务器地址
server_addr = xx.xx.xx.xx
# 服务器配置中 bind_port 字段
server_port = 7000
# 本地管理
admin_addr = 127.0.0.1
admin_port = 7400
admin_user = admin
admin_passwd = admin
# 连接密码
token=xxxxx
# 连接池
pool_count = 5
# 日志
log_file = ./frpc.log

# 客户端名字，必须和其他客户端名字不同
[migu-http]
type = http  # 类型
local_port = 80 # 映射到本地端口
subdomain= migu # 子域名

# 同上
[migu-https]
type = https 
local_port = 443
subdomain= migu
</code></pre><h2 id="https-配置" tabindex="-1">https 配置 <a class="header-anchor" href="#https-配置" aria-label="Permalink to &quot;https 配置&quot;">​</a></h2><p>由于frp 是全部转发，所以https的配置在应用上，可以在nginx上配置。具体参考 nginx-https配置</p><h2 id="ssh-连接" tabindex="-1">ssh 连接 <a class="header-anchor" href="#ssh-连接" aria-label="Permalink to &quot;ssh 连接&quot;">​</a></h2><p>在客户端配置， 执行==ssh -oPort=6000 username@x.x.x.x==</p><pre><code>[ssh]
type = tcp
local_ip = 127.0.0.1
local_port = 22
remote_port = 6000
</code></pre>`,14)]))}const m=n(o,[["render",p]]);export{_ as __pageData,m as default};
