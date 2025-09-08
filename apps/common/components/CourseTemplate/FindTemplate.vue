<template>
  <div class="wrapped">
    <RobotPrompt v-model="data.prompt" />
    <div class="bg-container" ref="bgContainerRef">
      <img
        :src="data.backgroundImg"
        alt="找一找背景图片"
        @click="handleBackgroundClick($event)"
      />
      <FindItem
        v-for="item in data.items"
        :key="item.id"
        :item="item"
        :isEdit="isEdit"
        @delete="handleItemDelete"
      />
    </div>
    <!-- 预览模式下底部进度条 -->
    <div v-if="!isEdit" class="preview-bottom-btn">
      <div class="progress-text">
        探索进度: {{ foundCount }}/{{ totalCount }}个已发现
      </div>
      <el-button class="finish-btn" type="warning" round>我找好了</el-button>
    </div>
    <!-- 添加/编辑物品的对话框 -->
    <el-dialog v-model="dialogVisible" title="添加物品" width="30%">
      <el-form v-model="newItemForm">
        <el-form-item label="物品名称">
          <el-input v-model="newItemForm.text" />
        </el-form-item>
        <el-form-item label="物品图标">
          <EditableImage v-model="newItemForm.img" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleConfirmAddItem">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import {computed, inject, onMounted, onUnmounted, ref} from 'vue'
import RobotPrompt from './components/RobotPrompt.vue'
import {CourseFindType, FindItemType} from './type'
import {getTemplateDefaultData} from './templateDefaults'
import {ElButton, ElDialog, ElForm, ElFormItem, ElInput} from 'element-plus'
import EditableImage from './components/EditableImage.vue'
import {v4 as uuidv4} from 'uuid'
import FindItem from './components/FindItem.vue'
import {
  CourseTemplateProviderDefaultValue,
  CourseTemplateProviderKey
} from './provider'
const {isEdit, courseData, selectedPageIndex} = inject(
  CourseTemplateProviderKey,
  CourseTemplateProviderDefaultValue
)
const data = computed({
  get: () => {
    if (selectedPageIndex.value !== null) {
      return courseData.value.pages[selectedPageIndex.value]
        .data as CourseFindType
    }
    return getTemplateDefaultData('find') as CourseFindType
  },
  set: val => {
    if (selectedPageIndex.value !== null) {
      courseData.value.pages[selectedPageIndex.value].data = val
    }
  }
})
const bgContainerRef = ref<HTMLElement | null>(null)
// --- 对话框与表单状态 ---
const dialogVisible = ref(false)
const newItemForm = ref({
  text: '',
  img: '',
  x: 0,
  y: 0
})

// --- 核心逻辑 ---

// 1. 编辑模式：点击背景添加物品
const handleBackgroundClick = (event: MouseEvent) => {
  // 如果不是编辑模式，或者容器元素还未加载，则不执行任何操作
  if (!isEdit.value || !bgContainerRef.value) return

  // 从事件对象中直接获取相对于被点击元素（<img>）的坐标
  const x = event.offsetX
  const y = event.offsetY

  // 获取容器的尺寸，用于计算百分比
  const containerWidth = bgContainerRef.value.clientWidth
  const containerHeight = bgContainerRef.value.clientHeight

  // 将绝对坐标转换为百分比，以便在不同屏幕尺寸下保持相对位置
  const xPercent = (x / containerWidth) * 100
  const yPercent = (y / containerHeight) * 100

  // 更新表单数据，并打开对话框
  newItemForm.value = {
    text: '新物品',
    img: '',
    x: xPercent,
    y: yPercent
  }
  dialogVisible.value = true
}

// 2. 对话框确认：将物品数据添加到数组
const handleConfirmAddItem = () => {
  const newItem: FindItemType = {
    id: uuidv4(),
    text: newItemForm.value.text,
    img: newItemForm.value.img,
    x: newItemForm.value.x,
    y: newItemForm.value.y,
    found: false
  }
  data.value.items.push(newItem)
  dialogVisible.value = false
}

// 4. 编辑模式：删除物品
const handleItemDelete = (id: string) => {
  data.value.items = data.value.items.filter(item => item.id !== id)
}

// 5. 预览模式：点击物品标记为已找到
const handleItemClick = (item: FindItemType) => {
  if (isEdit.value) return
  item.found = true
}

// --- 预览模式下的计算属性 ---
const foundCount = computed(() => data.value.items.filter(i => i.found).length)
const totalCount = computed(() => data.value.items.length)
</script>

<style scoped>
.wrapped {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  gap: 20px;
}
.bg-container {
  position: relative;
  background-color: #6697ff;
  border-radius: 32px;
  padding: 10px;
  width: 900px;
  max-width: 100%;
  line-height: 0; /* 消除 img 底部白边 */
}
.bg-container img {
  width: 100%;
  height: auto;
  border-radius: inherit;
  cursor: crosshair; /* 编辑模式下显示十字准星 */
}
.preview-bottom-btn {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 900px;
  max-width: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 10px 20px;
  border-radius: 20px;
  backdrop-filter: blur(5px);
}
.progress-text {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}
.finish-btn {
  font-size: 16px;
  padding: 18px 30px;
}
</style>
