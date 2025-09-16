# 如何测试PDF预览功能

## 快速测试方法

### 1. 使用在线PDF（当前已配置）

我已经将文件列表中的PDF URL更新为在线可用的测试PDF：

- AI基础知识讲义.pdf -> Mozilla PDF.js demo
- 课后习题集.pdf -> W3C测试PDF

### 2. 启动开发服务器

```bash
# 在项目根目录执行
pnpm --filter student-app dev
```

### 3. 测试步骤

1. 打开课程详情页面
2. 点击任意PDF文件的"预览"按钮
3. 检查PDF是否在弹窗中正常显示

## 如果PDF仍然下载而不是预览

### 解决方案A：检查浏览器设置

1. 打开Chrome设置 -> 高级 -> 内容设置 -> PDF文档
2. 确保"在Chrome中打开PDF文件"选项已开启

### 解决方案B：使用本地PDF文件

如果要使用本地PDF文件，需要：

1. 将真正的PDF文件放在public目录
2. 确保开发服务器正确提供PDF文件
3. 检查Content-Type头部设置

### 解决方案C：强制内联显示

在服务器配置中添加：

```
Content-Type: application/pdf
Content-Disposition: inline
```

## 当前实现的特点

✅ 使用iframe预览PDF（兼容性最好）  
✅ 添加了错误处理和回退方案  
✅ 保留了vue-pdf-embed作为备用选项  
✅ 支持PDF工具栏和导航  
✅ 响应式设计，适配不同屏幕尺寸

## 调试信息

如果遇到问题，请检查：

1. 浏览器控制台是否有错误信息
2. Network面板中PDF请求的状态
3. 浏览器是否阻止了弹窗或iframe
