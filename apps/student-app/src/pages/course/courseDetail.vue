<template>
  <div class="page-container">
    <!-- 主内容区域，我们将在这里创建背景 -->
    <div class="video-section-wrapper">
      <!-- 1. 这是所有背景元素的容器 -->
      <div class="background-elements">
        <!-- 播放器背后那个大的、倾斜的模糊方块 -->
        <div class="background-main-blob"></div>
        <!-- 左侧的蓝色圆形光晕 -->
        <div class="background-circle-blue"></div>
        <!-- 右上角的黄色图钉状光晕 -->
        <div class="background-pin-yellow"></div>
      </div>

      <!-- 2. 这是前景内容：假装的视频播放器 -->
      <div class="mock-video-player">
        <div class="play-button"></div>
        <div class="controls">
          <span>00:23</span>
          <div class="progress-bar"></div>
          <span>1.0x</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
/* 页面整体背景，让效果更明显 */
.page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background-color: #f0f2f5; /* 类似图片中的浅灰色背景 */
  padding: 20px;
  box-sizing: border-box;
}

/* 视频区域的总容器，关键在于 position: relative */
.video-section-wrapper {
  position: relative; /* 这是关键！子元素的 absolute 定位会相对于它 */
  width: 100%;
  max-width: 800px; /* 限制最大宽度，让布局更好看 */
  z-index: 1; /* 保证它在背景元素之上 */
}

/* 所有背景元素的容器 */
.background-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1; /* 背景元素在自己的层级 */
}

/* 
 * 这是核心样式 
 */

/* 播放器背后那个大的、倾斜的模糊方块 */
.background-main-blob {
  position: absolute;
  top: -50px;
  left: -80px;
  width: 60%;
  height: 100%;
  background-color: #5d8cff;
  border-radius: 30px;
  opacity: 0.8;
  filter: blur(80px); /* 超大模糊值，形成柔和背景 */
  transform: rotate(-15deg); /* 倾斜效果 */
  z-index: -2; /* 确保在最底层 */
}

/* 左侧的蓝色圆形光晕 */
.background-circle-blue {
  position: absolute;
  top: 20%;
  left: -100px;
  width: 200px;
  height: 200px;
  background-color: #8cb0ff;
  border-radius: 50%; /* 正圆形 */
  filter: blur(100px); /* 同样用大模糊值 */
  z-index: -1;
}

/* 右上角的黄色图钉状光晕 */
.background-pin-yellow {
  position: absolute;
  top: -80px;
  right: -50px;
  width: 150px;
  height: 150px;
  background-color: #ffd76a;
  border-radius: 50%;
  filter: blur(70px);
  z-index: -1;
}

/* 
 * 以下是模拟播放器的样式，与背景实现无关，仅为展示效果 
 */
.mock-video-player {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9; /* 保持16:9的视频比例 */
  background-color: #2c3e50;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden; /* 隐藏超出边界的子元素 */
  z-index: 2; /* 确保播放器在最上层 */
}

.play-button {
  width: 80px;
  height: 80px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.play-button::after {
  content: '';
  width: 0;
  height: 0;
  border-left: 30px solid white;
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
  margin-left: 10px;
}

.controls {
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 20px;
  color: white;
  display: flex;
  align-items: center;
  gap: 15px;
  font-family: sans-serif;
}

.progress-bar {
  flex-grow: 1;
  height: 5px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 5px;
}
</style>
