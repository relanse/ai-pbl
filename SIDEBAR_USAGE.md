# 响应式侧边栏使用教程

## 功能特性

✨ **已完成的功能**：

- ✅ 修复了 hover 阴影和选中圆角度数不统一的问题
- ✅ 添加了响应式折叠功能
- ✅ 自动适应屏幕尺寸（小于 768px 自动折叠）
- ✅ 手动折叠/展开按钮
- ✅ 平滑的过渡动画效果
- ✅ 折叠状态下的 tooltip 提示
- ✅ 图标颜色正确切换（蓝色 → 白色）

## 使用方法

### 1. 基本使用

```vue
<template>
  <div class="page-wrapper">
    <CommonAside ref="sidebarRef" class="sidebar" />
    <div
      class="main-content"
      :class="{'sidebar-collapsed': sidebarRef?.isCollapsed}"
    >
      <!-- 你的页面内容 -->
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import CommonAside from '@/components/common/CommonAside.vue'

const sidebarRef = ref()
</script>

<style scoped>
.page-wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  background-color: #f6f6f6;
}

.main-content {
  flex: 1;
  margin-left: 20px;
  transition: margin-left 0.3s ease;
}

.main-content.sidebar-collapsed {
  margin-left: 10px; /* 折叠状态下减少左边距 */
}
</style>
```

### 2. 访问侧边栏状态

```vue
<script setup lang="ts">
import {ref, computed} from 'vue'
import CommonAside from '@/components/common/CommonAside.vue'

const sidebarRef = ref()

// 获取侧边栏宽度
const sidebarWidth = computed(() => sidebarRef.value?.sidebarWidth || 180)

// 检查是否折叠
const isCollapsed = computed(() => sidebarRef.value?.isCollapsed || false)

// 手动控制折叠状态
const toggleSidebar = () => {
  sidebarRef.value?.toggleSidebar()
}
</script>
```

### 3. 响应式断点

```css
/* 侧边栏会自动响应以下断点 */

/* 小屏幕：自动折叠 */
@media (max-width: 768px) {
  .sidebar {
    width: 64px;
  }
}

/* 大屏幕：自动展开，隐藏切换按钮 */
@media (min-width: 1025px) {
  .toggle-button {
    display: none;
  }
}
```

## 样式说明

### 状态样式

- **正常状态**：宽度 180px，显示图标和文字
- **折叠状态**：宽度 64px，仅显示图标
- **hover效果**：阴影提升，轻微上移动画
- **激活状态**：蓝色背景，白色图标和文字

### 动画效果

- 所有状态切换都有 `0.3s ease` 过渡动画
- 折叠按钮有缩放和阴影动画效果
- 菜单项有 hover 的上移和阴影效果

### 图标颜色

- **未激活**：蓝色 (#64a0fd)
- **激活状态**：白色 (#ffffff)
- 使用 CSS `filter` 属性实现 SVG 图标颜色变化

## 自定义配置

### 修改断点

在 `CommonAside.vue` 的 `handleResize` 函数中修改：

```javascript
const handleResize = () => {
  screenWidth.value = window.innerWidth
  // 修改这些值来自定义断点
  if (screenWidth.value < 768) {
    // 小屏幕阈值
    isCollapsed.value = true
  } else if (screenWidth.value > 1024) {
    // 大屏幕阈值
    isCollapsed.value = false
  }
}
```

### 修改尺寸

在 CSS 中修改以下变量：

```css
.sidebar {
  width: 180px; /* 正常宽度 */
}

.sidebar.collapsed {
  width: 64px; /* 折叠宽度 */
}
```

### 添加新菜单项

在 `sidebarButtons` 数组中添加：

```javascript
const sidebarButtons = ref([
  {
    id: 'iconName', // 图标名称（必须在 iconPath.ts 中存在）
    label: '菜单名称', // 显示文字
    path: '/route-path' // 路由路径
  }
])
```

## 故障排除

### 图标不显示

1. 检查图标名称是否在 `iconPath.ts` 中存在
2. 运行 `node ./scripts/iconPathResolve.js` 重新生成图标路径

### 路由不跳转

1. 确保路由路径在 `router/index.ts` 中已配置
2. 检查 `el-menu` 的 `router` 属性是否为 `true`

### 样式异常

1. 检查是否有样式冲突
2. 确保父组件的 CSS 类名正确应用
3. 检查浏览器开发者工具中的样式层叠

## 最佳实践

1. **保持一致性**：所有使用侧边栏的页面都应该使用相同的响应式处理方式
2. **性能优化**：使用 `computed` 而不是 `watch` 来响应侧边栏状态变化
3. **用户体验**：在小屏幕上默认折叠，在大屏幕上默认展开
4. **动画流畅**：确保所有过渡动画时长一致（0.3s ease）

## 完整示例

参考 `courseMap.vue`、`certificate.vue` 和 `levelTest.vue` 中的实现方式。

---

现在你的侧边栏具有了完整的响应式功能！🎉
