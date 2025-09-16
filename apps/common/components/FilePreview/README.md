# FilePreview 文件预览组件

一个支持多种文件格式预览的 Vue 组件。

## 功能特性

### 支持的文件格式

#### 📷 图片格式

- **支持格式**: JPG, JPEG, PNG, GIF, WebP, SVG, BMP
- **功能**: 自动缩放、圆角显示、阴影效果

#### 🎥 视频格式

- **支持格式**: MP4, WebM, OGG, AVI, MOV, WMV, M4V, 3GP
- **功能**: 原生 HTML5 视频播放器，支持控制栏

#### 🎵 音频格式

- **支持格式**: MP3, WAV, OGG, M4A, AAC, FLAC, WMA
- **功能**: 原生 HTML5 音频播放器，显示文件名和播放控件

#### 📄 PDF 格式

- **支持格式**: PDF
- **功能**: 内嵌 iframe 预览

#### 📝 文本格式

- **支持格式**: TXT, MD, JSON, XML, HTML, CSS, JS, TS, Vue, JSX, TSX, Python, Java, C++, C, PHP, Ruby, Go, Rust, Swift, Kotlin, Dart, YAML, INI, SQL, Shell 脚本等
- **功能**:
  - 语法高亮显示
  - 代码字体渲染
  - 内容截断（超过10000字符）
  - 滚动浏览

#### 📊 Office 文档

- **支持格式**: Word (.doc, .docx), Excel (.xls, .xlsx), PowerPoint (.ppt, .pptx)
- **功能**:
  - 文档类型识别
  - 新窗口打开
  - 文件下载
  - 使用提示

#### 📎 其他格式

- **功能**: 显示文件名、文件类型标签、新窗口打开链接

## 使用方法

```vue
<template>
  <FilePreview :file="fileData" />
</template>

<script setup>
import FilePreview from '@/components/FilePreview'

const fileData = {
  name: 'example.pdf',
  url: 'https://example.com/file.pdf',
  type: 'application/pdf'
}
</script>
```

## Props

| 属性      | 类型   | 必填 | 说明     |
| --------- | ------ | ---- | -------- |
| file      | Object | 是   | 文件对象 |
| file.name | String | 是   | 文件名   |
| file.url  | String | 否   | 文件URL  |
| file.type | String | 否   | MIME类型 |

## 格式检测逻辑

组件使用两种方式检测文件格式：

1. **MIME类型检测**: 优先使用 `file.type` 属性
2. **文件扩展名检测**: 作为备用方案，从 `file.name` 中提取扩展名

## 样式特性

- 📱 **响应式设计**: 适配移动端和桌面端
- 🎨 **现代UI**: 圆角、阴影、渐变等现代设计元素
- 🎯 **类型识别**: 不同文件类型使用不同的图标和颜色
- 📐 **自适应布局**: 自動調整內容大小和佈局

## 浏览器兼容性

- Chrome/Edge: 完全支持
- Firefox: 完全支持
- Safari: 完全支持
- 移动浏览器: 支持大部分功能

## 注意事项

1. **跨域问题**: 文本文件预览需要文件URL支持跨域访问
2. **文件大小**: 文本文件内容超过10000字符会被截断
3. **Office文档**: 需要浏览器或系统安装相应软件才能打开
4. **网络依赖**: 所有预览功能都需要网络连接来获取文件内容

## 更新日志

### v2.0.0 (当前版本)

- ✨ 新增视频格式预览支持
- ✨ 新增音频格式预览支持
- ✨ 新增文本文件预览支持
- ✨ 新增Office文档预览支持
- ✨ 新增代码文件语法高亮
- 🎨 改进UI设计和响应式布局
- 🐛 修复多个已知问题

### v1.0.0

- 📷 基础图片预览功能
- 📄 基础PDF预览功能
