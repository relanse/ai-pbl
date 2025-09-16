# PDF预览问题解决方案

## 问题描述

点击PDF预览按钮后，浏览器直接下载文件而不是在弹窗中预览。

## 可能原因

1. 浏览器默认行为（Chrome/Firefox会根据Content-Type处理PDF）
2. vue-pdf-embed组件配置问题
3. PDF文件CORS策略
4. PDF文件格式或编码问题

## 解决方案

### 方案1：使用iframe预览（推荐）

```vue
<!-- 在模板中替换vue-pdf-embed -->
<iframe
  v-else-if="fileToPreview.type === 'pdf'"
  :src="fileToPreview.url"
  class="preview-pdf-iframe"
  frameborder="0"
>
  您的浏览器不支持PDF预览，请<a :href="fileToPreview.url" target="_blank">点击这里下载</a>
</iframe>
```

### 方案2：配置vue-pdf-embed

```javascript
// 在组件中添加PDF.js worker配置
import * as pdfjs from 'pdfjs-dist'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`
```

### 方案3：使用embed标签

```vue
<embed
  v-else-if="fileToPreview.type === 'pdf'"
  :src="fileToPreview.url"
  type="application/pdf"
  class="preview-pdf"
/>
```

### 方案4：检查HTTP响应头

确保服务器返回正确的Content-Type：

```
Content-Type: application/pdf
Content-Disposition: inline; filename="document.pdf"
```

## 调试步骤

1. 打开浏览器开发者工具
2. 检查Network标签页中PDF请求的响应头
3. 查看Console中是否有错误信息
4. 尝试直接在浏览器地址栏中输入PDF URL

## 测试用PDF URL

- https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf
- https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf
