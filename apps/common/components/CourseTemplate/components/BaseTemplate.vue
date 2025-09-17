<template>
  <div class="template-wrapper">
    <!--顶部的AI部分-->
    <RobotPrompt :model-value="robotTitle" />
    <!-- 主内容区 -->
    <div class="template-card">
      <div
        v-if="showHeader"
        class="template-card-header"
        :style="{backgroundImage: `url(${backgroundTemplate})`}"
      >
        <slot name="header"></slot>
      </div>
      <div class="template-card-body">
        <slot></slot>
      </div>
    </div>
    <div
      class="template-card-footer"
      :style="{backgroundImage: `url(${backgroundFooter})`}"
    >
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import backgroundFooter from '../../../assets/backgrounds/backgroundFooter.png'
import backgroundTemplate from '../../../assets/backgrounds/backgroundTemplate.svg'
import RobotPrompt from './RobotPrompt.vue'

defineProps({
  robotTitle: {
    type: String,
    default: ''
  },
  showHeader: {
    type: Boolean,
    default: true
  }
})
</script>

<style scoped lang="scss">
.template-wrapper {
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;

  .template-card {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 95%;
    border-radius: 32px;
    flex: 1 1 400px;
    overflow: hidden;
    margin-bottom: 20px;
    border: 5px solid transparent;
    background-origin: padding-box, border-box;
    background-image: linear-gradient(180deg, #6697ff 0%, #64a3fe 100%);
    .template-card-header {
      height: 25%;
      width: 100%;
      position: relative;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      justify-content: space-around;
      background-size: cover; /* 让背景图等比缩放，完全覆盖容器 */
      background-position: right; /* 将背景图居中显示 */
      background-repeat: no-repeat;
    }
    .template-card-body {
      width: 100%;
      flex: 1;
      background-color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: space-around; /* 优化布局 */
      padding: 20px;
      box-sizing: border-box;
    }
  }
}

.template-card-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 96%;
  border-radius: 32px;
  background-size: 100% 100%; /* 完全拉伸背景图 */
  background-repeat: no-repeat;
  height: 90px;
  border: 1px solid #ffffff;
  background-color: #e7f0ff;
}
</style>
