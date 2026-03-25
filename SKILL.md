---
name: file-generator
description: 文件生成技能，用于生成HTML、PDF、Markdown等文件并提供HTTP下载地址
---

# File Generator Skill

这个技能用于生成各种类型的文件（HTML、PDF、Markdown等），并提供HTTP下载地址供用户下载。

## 配置说明

在OpenClaw的web界面中配置以下参数：

### 必需配置

- fileDirectory: 文件存储目录（默认：/home/it/public-files）
- httpServerPort: HTTP服务器端口（默认：5000）
- httpServerHost: HTTP服务器主机地址（默认：192.168.70.127）

### 可选配置

- baseUrl: HTTP基础URL（默认：http://192.168.70.127:5000）
- enableTimestamp: 是否在文件名中添加时间戳（默认：true）

## 使用方法

### 生成HTML文件

生成HTML文件: [文件内容]

### 生成Markdown文件

生成Markdown文件: [文件内容]

### 生成文本文件

生成文本文件: [文件内容]

### 生成PDF文件

生成PDF文件: [文件内容]

### 指定文件名

生成文件 [文件名]: [文件内容]

## 配置示例

在OpenClaw配置文件中添加：

{
  "skills": {
    "entries": {
      "file-generator": {
        "enabled": true,
        "env": {
          "fileDirectory": "/home/it/public-files",
          "httpServerPort": "5000",
          "httpServerHost": "192.168.70.127",
          "baseUrl": "http://192.168.70.127:5000",
          "enableTimestamp": "true"
        }
      }
    }
  }
}

## 文件命名规则

- 如果启用了时间戳，文件名格式为：[文件名]_[YYYY-MM-DD]_[HH-mm-ss].[扩展名]
- 如果未启用时间戳，直接使用指定的文件名
- 如果未指定文件名，自动生成有意义的文件名

## HTTP地址输出格式

生成文件后，会自动提供HTTP下载地址：

```
✅ 文件已生成成功！
📁 文件名：[文件名]
📂 存储路径：[完整文件路径]
🌐 下载地址：[HTTP地址]
💡 提示：点击链接或复制到浏览器中打开即可下载
```

## 支持的文件类型

- HTML文件：完整的HTML文档，包含内联样式
- PDF文件：PDF格式文档
- Markdown文件：.md格式文档
- 文本文件：纯文本文档
- 图片文件：PNG、JPG、SVG等格式（当适用时）
- 代码文件：各种编程语言文件

## HTML文件模板

生成HTML文件时，会使用以下模板结构：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[文档标题]</title>
    <style>
        body {
            font-family: 'Microsoft YaHei', Arial, sans-serif;
            line-height: 1.6;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .container {
            background: white;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1, h2, h3 {
            color: #333;
            border-bottom: 2px solid #667eea;
            padding-bottom: 10px;
        }
        pre {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 4px;
            overflow-x: auto;
        }
        code {
            background: #f4f4f4;
            padding: 2px 6px;
            border-radius: 3px;
            font-family: 'Courier New', monospace;
        }
        @media print {
            body {
                background: white;
            }
            .no-print {
                display: none;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        [文件内容]
    </div>
</body>
</html>
```

## 使用示例

### 示例1：生成HTML技术文档

用户：帮我生成一个企业官网技术方案的HTML文档

系统：生成HTML文件，保存为`企业官网技术方案_2026-03-25_14-30-00.html`，并提供HTTP下载地址

### 示例2：生成销售报告

用户：生成一个销售报告

系统：生成Markdown文件，保存为`销售报告_2026-03-25_14-30-00.md`，并提供HTTP下载地址

### 示例3：指定文件名

用户：生成文件季度总结.html: 这是第一季度的销售总结...

系统：生成HTML文件，保存为`季度总结_2026-03-25_14-30-00.html`，并提供HTTP下载地址

## 注意事项

- 文件会保存到配置的fileDirectory目录中
- 确保HTTP服务器正在运行，否则无法下载文件
- 文件名支持中文，会自动进行UTF-8编码
- 如果文件已存在，会自动添加时间戳避免覆盖
- 确保fileDirectory目录有写入权限

## 错误处理

如果文件生成失败，会提供详细的错误信息：
- 检查目录权限
- 检查磁盘空间
- 检查文件名编码
- 检查HTTP服务器状态

## 集成说明

这个技能可以与以下组件集成：
- 所有沐枫AI助手（CEO、销售、技术、运营、产品）
- OpenClaw agents
- 运行在指定端口的HTTP文件服务器
- 内网环境