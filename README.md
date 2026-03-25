# File Generator Skill

A comprehensive file generation skill for creating HTML, PDF, Markdown, and other documents with HTTP download links.

## Installation

Install this skill using the skills CLI:

```bash
npx skills add geniusclaw-skills-file-generator
```

Or install from local directory:

```bash
npx skills add /home/it/.openclaw/skills/file-generator
```

## Features

- **Multiple File Formats**: Support for HTML, PDF, Markdown, Text, and more
- **Automatic HTTP Links**: Generates HTTP download addresses for easy access
- **Timestamp Naming**: Optional timestamp in filenames to avoid conflicts
- **HTML Templates**: Built-in HTML templates with professional styling
- **Chinese Support**: Full support for Chinese filenames and content
- **Error Handling**: Comprehensive error handling and user feedback

## Quick Start

### Basic Usage

```javascript
const FileGenerator = require('./index.js');

const generator = new FileGenerator({
  fileDirectory: '/home/it/public-files',
  httpServerPort: 5000,
  httpServerHost: '192.168.70.127',
  baseUrl: 'http://192.168.70.127:5000'
});

const result = await generator.generateHTML('企业官网技术方案', '<h1>技术方案内容</h1>');
console.log('Download URL:', result.downloadUrl);
```

### Generate Markdown File

```javascript
const generator = new FileGenerator(config);
const result = await generator.generateMarkdown('销售报告', '# 销售报告\n\n这是第一季度的销售数据...');
console.log('File saved:', result.filePath);
```

### Generate with Custom Filename

```javascript
const generator = new FileGenerator(config);
const result = await generator.generateFile('季度总结.html', '<h1>季度总结</h1>', 'html');
console.log('Download URL:', result.downloadUrl);
```

## Configuration

- `fileDirectory` (string): Directory for file storage (default: '/home/it/public-files')
- `httpServerPort` (number): HTTP server port (default: 5000)
- `httpServerHost` (string): HTTP server host (default: '192.168.70.127')
- `baseUrl` (string): Base URL for HTTP access (default: 'http://192.168.70.127:5000')
- `enableTimestamp` (boolean): Add timestamp to filenames (default: true)

## API Methods

### `generateHTML(title, content, filename?)`
Generates an HTML file with professional styling.

### `generateMarkdown(title, content, filename?)`
Generates a Markdown file.

### `generateText(title, content, filename?)`
Generates a plain text file.

### `generateFile(filename, content, type)`
Generates a file with specified type.

### `getDownloadUrl(filename)`
Returns the HTTP download URL for a file.

### `formatOutput(result)`
Formats the output message with download information.

## HTML Template

The HTML template includes:
- Professional styling with Microsoft YaHei font
- Responsive design
- Print-friendly styles
- Code highlighting
- Clean, modern layout

## Examples

### Generate Technical Documentation

```javascript
const generator = new FileGenerator(config);
const content = `
<h1>企业官网技术方案</h1>
<h2>技术架构</h2>
<p>采用前后端分离架构...</p>
<pre><code>const app = express();
app.listen(3000);</code></pre>
`;

const result = await generator.generateHTML('企业官网技术方案', content);
console.log(result.formattedOutput);
```

### Generate Sales Report

```javascript
const generator = new FileGenerator(config);
const content = `
# 销售报告

## 第一季度数据
- 总销售额：¥1,000,000
- 新客户：50家
- 客户满意度：95%
`;

const result = await generator.generateMarkdown('销售报告', content);
console.log(result.formattedOutput);
```

## Output Format

When files are generated, the output includes:

```
✅ 文件已生成成功！
📁 文件名：企业官网技术方案_2026-03-25_14-30-00.html
📂 存储路径：/home/it/public-files/企业官网技术方案_2026-03-25_14-30-00.html
🌐 下载地址：http://192.168.70.127:5000/企业官网技术方案_2026-03-25_14-30-00.html
💡 提示：点击链接或复制到浏览器中打开即可下载
```

## Dependencies

```bash
npm install fs
```

## Integration

This skill integrates with:
- All Mufeng AI assistants (CEO, Sales, Tech, Ops, Product)
- OpenClaw agents
- HTTP file server on port 5000
- Internal network environment

## License

MIT License - Feel free to use and modify for your projects.