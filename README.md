# File Generator Skill - 文件生成技能包

一个用于生成HTML、PDF、Markdown等文件并提供HTTP下载地址的文件生成技能包。

## 🚀 快速开始

### 安装技能包

将此技能包克隆到OpenClaw的skills目录：

```bash
git clone https://github.com/1930798925/geniusclaw-file-generator.git ~/.openclaw/skills/file-generator
```

或使用npx skills add命令：

```bash
npx skills add geniusclaw-file-generator
```

### 配置技能

OpenClaw技能需要在openclaw.json配置文件中手动添加配置。

配置文件位置：

- **Linux/macOS**: `~/.openclaw/openclaw.json`
- **Windows**: `C:\Users\<用户名>\.openclaw\openclaw.json`

### 基本配置示例

在openclaw.json中添加：

```json
{
  "skills": {
    "entries": {
      "file-generator": {
        "enabled": true,
        "env": {
          "fileDirectory": "./public-files",
          "httpServerPort": "5000",
          "httpServerHost": "auto",
          "baseUrl": "auto",
          "enableTimestamp": "true"
        }
      }
    }
  }
}
```

### 重启OpenClaw

配置完成后，重启OpenClaw服务：

```bash
openclaw restart
```

## 📦 功能特性

此技能包包含File Generator Skill，具有以下功能：

📄 **多种文件格式**：支持HTML、Markdown、文本等多种格式
🌐 **HTTP下载地址**：自动生成HTTP下载地址，方便访问
⏰ **时间戳命名**：可选的时间戳功能，避免文件名冲突
🎨 **HTML模板**：内置专业HTML模板和样式
🇨🇳 **中文支持**：完整的中文文件名和内容支持
⚠️ **错误处理**：全面的错误处理和用户反馈
🔧 **动态配置**：自动获取本机IP，无需硬编码
🚀 **Promise API**：现代async/await接口，易于集成

## 📖 文档

详细配置指南: CONFIG_GUIDE.md
技能文档: SKILL.md
技能实现: index.js

## 🎯 使用方法

### 生成HTML文件

生成一个HTML文档 [文档标题]

### 生成Markdown文件

生成一个Markdown文档 [文档标题]

### 生成文本文件

生成一个文本文件 [文档标题]

### 生成指定格式的文件

生成一个[格式]文件 [文档标题]

### 示例对话

**用户**: 生成一个企业官网技术方案的HTML文档

**AI**: ✅ 文件已生成成功！
📁 文件名：企业官网技术方案_2026-03-25_14-30-00.html
📂 存储路径：./public-files/企业官网技术方案_2026-03-25_14-30-00.html
🌐 下载地址：http://YOUR_IP:5000/企业官网技术方案_2026-03-25_14-30-00.html
💡 提示：点击链接或复制到浏览器中打开即可下载

## 📁 包结构

geniusclaw-file-generator/
├── README.md              # 本文件
└── file-generator/         # File Generator Skill
    ├── SKILL.md         # 技能定义
    ├── index.js         # 核心实现
    ├── config.json      # 技能配置
    ├── package.json     # 包配置
    └── README.md        # 技能文档

## 🔧 配置参数

### 必需配置

- `fileDirectory` (string): 文件存储目录 (默认: './public-files')
- `httpServerPort` (number): HTTP服务器端口 (默认: 5000)
- `httpServerHost` (string): HTTP服务器主机地址 (默认: 'auto'，自动获取本机IP)
- `baseUrl` (string): HTTP访问基础URL (默认: 'auto'，自动构建)

### 可选配置

- `enableTimestamp` (boolean): 是否在文件名中添加时间戳 (默认: true)

### 动态配置说明

- `httpServerHost` 设置为 `'auto'` 时，技能会自动获取本机的第一个非内部IPv4地址
- `baseUrl` 设置为 `'auto'` 时，技能会自动构建为 `http://${httpServerHost}:${httpServerPort}`
- `fileDirectory` 支持相对路径（如 `'./public-files'`），会自动解析为绝对路径

## 🛠️ API方法

### `generateHTML(title, content, filename?)`
生成HTML文件，包含专业样式和布局。

### `generateMarkdown(title, content, filename?)`
生成Markdown文件。

### `generateText(title, content, filename?)`
生成纯文本文件。

### `generateFile(filename, content, type)`
生成指定类型的文件。

### `getDownloadUrl(filename)`
返回文件的HTTP下载URL。

### `formatOutput(result)`
格式化输出消息，包含下载信息。

### `resolveDynamicConfig()`
解析动态配置，自动获取IP和构建URL。

### `getLocalIP()`
获取本机IP地址。

## 🔗 仓库

https://github.com/1930798925/geniusclaw-file-generator

## 📄 许可证

MIT License - 欢迎使用和修改用于您的项目。

## ⚠️ 重要提示

### 配置方式
- OpenClaw技能需要在openclaw.json配置文件中手动添加配置
- 不支持在web界面直接配置

### 动态配置
- 建议使用 `'auto'` 值让技能自动获取本机IP和构建URL
- 避免硬编码IP地址，提高环境适应性

### 文件服务器
- 需要确保HTTP服务器在指定端口运行
- 默认端口为5000，确保防火墙允许访问

### 安全性
- 不要将包含敏感信息的配置文件提交到版本控制
- 建议将生成的文件存储在受控的目录中

### 集成说明
- 此技能已集成到所有沐枫AI助手（CEO、销售、技术、运营、产品）
- 可在飞书中直接使用，助手会自动生成文件并提供下载地址

## 📚 更多信息

详细配置指南: CONFIG_GUIDE.md
技能元数据: SKILL.md
包配置: package.json

## 💡 使用场景

### 企业文档生成
- 技术方案文档
- 销售报告
- 产品规划文档
- 运营分析报告

### 快速原型开发
- HTML页面原型
- Markdown文档
- 配置文件模板
- 数据导出文件

### 内网文件共享
- 通过HTTP地址快速分享文件
- 支持中文文件名
- 自动时间戳避免冲突
- 适合内网环境使用