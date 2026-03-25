const fs = require('fs');
const path = require('path');
const os = require('os');

class FileGenerator {
  constructor(config = {}) {
    this.config = {
      fileDirectory: config.fileDirectory || process.env.FILE_DIRECTORY || './public-files',
      httpServerPort: config.httpServerPort || process.env.HTTP_SERVER_PORT || 5000,
      httpServerHost: config.httpServerHost || process.env.HTTP_SERVER_HOST || 'auto',
      baseUrl: config.baseUrl || process.env.BASE_URL || 'auto',
      enableTimestamp: config.enableTimestamp !== undefined ? config.enableTimestamp : (process.env.ENABLE_TIMESTAMP !== 'false')
    };
    
    this.resolveDynamicConfig();
    this.ensureDirectoryExists();
  }

  resolveDynamicConfig() {
    if (this.config.httpServerHost === 'auto') {
      this.config.httpServerHost = this.getLocalIP();
    }
    
    if (this.config.baseUrl === 'auto') {
      this.config.baseUrl = `http://${this.config.httpServerHost}:${this.config.httpServerPort}`;
    }
    
    if (this.config.fileDirectory.startsWith('./')) {
      this.config.fileDirectory = path.resolve(this.config.fileDirectory);
    }
    
    console.log('File Generator 配置:', {
      fileDirectory: this.config.fileDirectory,
      httpServerHost: this.config.httpServerHost,
      baseUrl: this.config.baseUrl
    });
  }

  getLocalIP() {
    try {
      const interfaces = os.networkInterfaces();
      for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
          if (iface.family === 'IPv4' && !iface.internal) {
            return iface.address;
          }
        }
      }
      return 'localhost';
    } catch (error) {
      console.error('获取本机IP失败:', error.message);
      return 'localhost';
    }
  }

  ensureDirectoryExists() {
    if (!fs.existsSync(this.config.fileDirectory)) {
      fs.mkdirSync(this.config.fileDirectory, { recursive: true });
      console.log(`创建目录: ${this.config.fileDirectory}`);
    }
  }

  getTimestamp() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
  }

  generateFilename(title, extension) {
    let filename = title;
    
    if (this.config.enableTimestamp) {
      const timestamp = this.getTimestamp();
      filename = `${title}_${timestamp}`;
    }
    
    return `${filename}.${extension}`;
  }

  getFilePath(filename) {
    return path.join(this.config.fileDirectory, filename);
  }

  getDownloadUrl(filename) {
    return `${this.config.baseUrl}/${encodeURIComponent(filename)}`;
  }

  formatOutput(result) {
    return `✅ 文件已生成成功！
📁 文件名：${result.filename}
📂 存储路径：${result.filePath}
🌐 下载地址：${result.downloadUrl}
💡 提示：点击链接或复制到浏览器中打开即可下载`;
  }

  generateHTML(title, content, filename = null) {
    const htmlTemplate = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
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
        ${content}
    </div>
</body>
</html>`;

    const finalFilename = filename || this.generateFilename(title, 'html');
    const filePath = this.getFilePath(finalFilename);
    
    fs.writeFileSync(filePath, htmlTemplate, 'utf8');
    
    const result = {
      filename: finalFilename,
      filePath: filePath,
      downloadUrl: this.getDownloadUrl(finalFilename),
      formattedOutput: null
    };
    
    result.formattedOutput = this.formatOutput(result);
    
    console.log(`HTML文件已生成: ${filePath}`);
    return result;
  }

  generateMarkdown(title, content, filename = null) {
    const finalFilename = filename || this.generateFilename(title, 'md');
    const filePath = this.getFilePath(finalFilename);
    
    fs.writeFileSync(filePath, content, 'utf8');
    
    const result = {
      filename: finalFilename,
      filePath: filePath,
      downloadUrl: this.getDownloadUrl(finalFilename),
      formattedOutput: null
    };
    
    result.formattedOutput = this.formatOutput(result);
    
    console.log(`Markdown文件已生成: ${filePath}`);
    return result;
  }

  generateText(title, content, filename = null) {
    const finalFilename = filename || this.generateFilename(title, 'txt');
    const filePath = this.getFilePath(finalFilename);
    
    fs.writeFileSync(filePath, content, 'utf8');
    
    const result = {
      filename: finalFilename,
      filePath: filePath,
      downloadUrl: this.getDownloadUrl(finalFilename),
      formattedOutput: null
    };
    
    result.formattedOutput = this.formatOutput(result);
    
    console.log(`文本文件已生成: ${filePath}`);
    return result;
  }

  generateFile(filename, content, type = 'html') {
    let result;
    
    switch (type.toLowerCase()) {
      case 'html':
        result = this.generateHTML(filename, content);
        break;
      case 'md':
      case 'markdown':
        result = this.generateMarkdown(filename, content);
        break;
      case 'txt':
      case 'text':
        result = this.generateText(filename, content);
        break;
      default:
        result = this.generateHTML(filename, content);
    }
    
    return result;
  }

  listFiles() {
    try {
      const files = fs.readdirSync(this.config.fileDirectory);
      return files.map(file => ({
        filename: file,
        filePath: path.join(this.config.fileDirectory, file),
        downloadUrl: this.getDownloadUrl(file)
      }));
    } catch (error) {
      console.error('读取文件列表失败:', error.message);
      return [];
    }
  }

  deleteFile(filename) {
    const filePath = this.getFilePath(filename);
    try {
      fs.unlinkSync(filePath);
      console.log(`文件已删除: ${filePath}`);
      return true;
    } catch (error) {
      console.error('删除文件失败:', error.message);
      return false;
    }
  }
}

module.exports = FileGenerator;