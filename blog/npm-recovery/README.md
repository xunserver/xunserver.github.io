# 密码人生恢复包

这是“密码人生”的公开加密恢复包 npm 镜像。

## 包含内容

- `data.dat`：公开密文
- `recovery.html`：完全离线的浏览器恢复工具
- `RECOVERY.txt`：恢复说明
- 后续可包含 `decrypt.sh`、`decrypt.mjs`、`decrypt.py`、`FORMAT.md`

**恢复密钥不会发布到 npm。**

## 获取

```bash
npm pack @xunserver/password-life-recovery
```

也可以：

```bash
npm install @xunserver/password-life-recovery
```

解压或进入 `node_modules/@xunserver/password-life-recovery` 后即可取得恢复文件。

## 安全说明

本包是公开分发渠道之一。任何人都可以下载，但 `data.dat` 使用 AES-256-GCM 加密；真正需要单独保管的是恢复密钥。
