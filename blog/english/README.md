# English Studio（静态部署）

页面：`/blog/english/`。该目录可以直接由 GitHub Pages 提供，无需重新打包 VitePress。

## 功能

- 读取 Supabase `english_courses`、`english_weeks`、`english_lessons`、`english_sessions` 和 `english_vocabulary`，浏览全部 12 周 / 48 天内容。
- 通过 Supabase Auth 邮箱 Magic Link 登录。未登录者只能查看公开课程；学习记录由数据库 Row Level Security (RLS) 保护。
- 首次登录使用**用户私下持有**的一次性 64 位绑定码，调用 `english_claim_learner` 将账号和原来的 `english_learners(handle='xun')` 绑定，避免网页和 ChatGPT 的进度分叉。
- 私人进度面板展示课时状态、三种训练完成记录、练习分钟数、词汇掌握量和到期复习量。
- 单词卡片支持浏览、翻面、浏览器美式语音朗读、四级自评。每次评分写入 `english_review_events`，数据库触发器自动维护 `english_vocabulary_progress` 的间隔复习计划。
- 手动登记训练环节的开始/结束，数据库触发器在三个环节均完成后将当天课程置为完成。

## Supabase Auth 必须配置的回调域名

Supabase 控制台 → Authentication → URL Configuration：

- Site URL：`https://page.xunserver.cn/blog/english/`
- Redirect URLs：`https://page.xunserver.cn/blog/english/`

GitHub Pages 自定义域名由仓库根目录 `CNAME` 指定。

首次使用时：登录邮箱 → 点击 Magic Link → 输入单独交付的一次性绑定码。**切勿将绑定码写入此公开仓库。**

## 安全边界

前端只含 Supabase **publishable key**（公开客户端标识）。切勿在网页或公开仓库放入 `service_role`、secret key、绑定码或任何其他服务端凭据。

课程内容是公开可读的数据；个人学习状态由 RLS 限制为已绑定的 `auth.uid()`。一次性绑定的后端函数仅授权 `authenticated` 调用，检查认证身份、密钥哈希、过期时间、每日尝试次数，以及目标学习者尚未绑定的条件。绑定码只在独立的私有 schema 存储其哈希。Supabase security advisor 可能因函数的 `SECURITY DEFINER` 属性提示额外审查，不能将这个警告误当作函数没有校验权限。

如需更换学习者，不能在前端任意更改 `auth_user_id`，应由数据库管理员执行审计后的迁移。

## 部署与测试

直接打开 `https://page.xunserver.cn/blog/english/`。

验收：

1. 未登录：查看课程周计划和单词英文/中文内容，无法写入私人数据。
2. 邮箱登录：首次显示绑定提示。
3. 输入私下交付的有效绑定码：加载与 ChatGPT 一致的进度。
4. 朗读、翻面、点击「记住了」：数据库生成 `english_review_events` 和 `english_vocabulary_progress`。
5. 标记 voice/chat/vocabulary：对应 `english_session_progress` 更新；三个环节完成时 `english_lesson_progress` 自动完成。
6. 刷新网页：私人数据保持一致。
