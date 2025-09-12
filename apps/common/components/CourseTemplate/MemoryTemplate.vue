<template>
  <div class="memory-container">
    <RobotPrompt v-model="data.prompt" />
    <div class="game-container">
      <div class="rules-card">
        <div class="rules-icon">
          <img :src="MagicWand" class="wand" />
          <img :src="ps5icon" class="ps5" />
        </div>
        <h2>游戏规则</h2>
        <ul>
          <li>点击卡片翻开</li>
          <li>记住卡片位置</li>
          <li>找到配对的卡片</li>
          <li>全部配对完成获胜</li>
        </ul>
      </div>
      <div class="main-area">
        <div class="score-background">
          <h2>当前得分0</h2>
          <img :src="MagicWand" />
        </div>
        <div class="cards-grid">
          <div
            v-for="card in cards"
            :key="card.id"
            class="card"
            :class="{flipped: card.flipped, matched: card.matched}"
            @click="flipCard(card)"
          >
            <div class="card-face card-front">
              <img
                :src="DefaultCardImg"
                alt="?"
                style="height: 58px; width: 58px"
              />
            </div>
            <div class="card-face card-back">{{ card.value }}</div>
          </div>
        </div>
      </div>
      <button class="reset-button" @click="resetGame">重新开始</button>
    </div>

    <div v-if="isGameWon" class="win-message">
      <p>恭喜你，游戏胜利！</p>
      <button @click="resetGame">再玩一次</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, computed, inject} from 'vue'
import {MemoryTemplateType} from './type'
import {useCurrentPageData} from '../../composables/useCurrentPageData'
import RobotPrompt from './components/RobotPrompt.vue'
import MagicWand from '../../assets/icons/MagicWand.svg'
import DefaultCardImg from '../../assets/memoryCard.png'
import ps5icon from '../../assets/icons/GameController.svg'
import {
  CourseTemplateProviderDefaultValue,
  CourseTemplateProviderKey
} from './provider'
const {isEdit} = inject(
  CourseTemplateProviderKey,
  CourseTemplateProviderDefaultValue
)
const {data} = useCurrentPageData<MemoryTemplateType>('memory')

// 1. 定义卡片的类型接口
interface Card {
  id: number
  value: string
  flipped: boolean
  matched: boolean
}

// 2. 响应式状态定义
const cards = ref<Card[]>([])
const flippedCards = ref<Card[]>([])

// 3. 游戏逻辑
const initialValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']

// 初始化并洗牌
const setupGame = () => {
  const cardValues = [...initialValues]

  // Fisher-Yates 洗牌算法
  for (let i = cardValues.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[cardValues[i], cardValues[j]] = [cardValues[j], cardValues[i]]
  }

  cards.value = cardValues.map((value, index) => ({
    id: index,
    value: value,
    flipped: false,
    matched: false
  }))
}

// 翻转卡片的处理函数
const flipCard = (clickedCard: Card) => {
  // 防止无效点击：已翻开、已匹配、或已翻开两张牌
  if (
    clickedCard.flipped ||
    clickedCard.matched ||
    flippedCards.value.length === 2
  ) {
    return
  }

  clickedCard.flipped = true
  flippedCards.value.push(clickedCard)

  if (flippedCards.value.length === 2) {
    checkForMatch()
  }
}

// 检查两张卡片是否匹配
const checkForMatch = () => {
  const [card1, card2] = flippedCards.value

  if (card1.value === card2.value) {
    // 匹配成功
    card1.matched = true
    card2.matched = true
    flippedCards.value = []
  } else {
    // 匹配失败，1秒后翻回去
    setTimeout(() => {
      card1.flipped = false
      card2.flipped = false
      flippedCards.value = []
    }, 1000)
  }
}

// 重置游戏
const resetGame = () => {
  flippedCards.value = []
  setupGame()
}

// 计算属性，判断游戏是否胜利
const isGameWon = computed(() => {
  if (cards.value.length === 0) return false
  return cards.value.every(card => card.matched)
})

// 4. 生命周期钩子
// 组件挂载后，开始游戏
onMounted(() => {
  setupGame()
})
</script>

<style scoped>
.memory-container {
  padding: 20px;
}
.game-container {
  position: relative;
  display: flex;
  margin: 20px auto;
  padding: 20px;
  padding-left: 120px; /* 为左侧规则卡片留出空间 */
  width: 890px;
  height: 500px;
  border: 5px solid #f5de5d;
  border-radius: 40px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
.rules-card {
  position: absolute;
  left: 0;
  top: 25%;
  width: 190px;
  height: 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-top: 4px solid #ffff;
  border-right: 4px solid #ffff;
  border-bottom: 4px solid #ffff;
  border-left: none; /* 关键！移除左边框 */
  border-radius: 0 25px 25px 0;
  background-image: linear-gradient(to bottom, #ffb3e1, #ff8fcf);
  box-shadow: 0 10px 10px #83b3ff66;
}
.rules-icon {
  position: relative;
}

.ps5 {
  position: absolute;
  width: 100px;
  height: 140px;
  right: 0;
  top: -120px;
}
.wand {
  position: absolute;
  width: 116px;
  height: 135px;
  left: 25%;
  top: 100px;
  opacity: 0.3;
}
.rules-card h2 {
  margin: 0 0 10px;
  z-index: 1;
}
.rules-card ul {
  list-style: none;
  padding: 0;
  margin: 0;
  font-weight: 400;
  text-align: left;
  line-height: 2;
  z-index: 1;
}
.main-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.score-background {
  width: 887px; /* 可以根据需要调整 */
  height: 79px; /* 可以根据需要调整 */
  background-image: url("data:image/svg+xml,<svg width='887' height='79' viewBox='0 0 887 79' fill='none' xmlns='http://www.w3.org/2000/svg'><ellipse cx='443.758' cy='12.7568' rx='443' ry='65.5' fill='%23F5DE5D'/></svg>");
  background-repeat: no-repeat; /* 防止背景重复 */
  background-position: center; /* 将背景居中 */
  background-size: cover; /* 让背景覆盖整个元素 */
}
.card {
  width: 90px;
  height: 110px;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s;
  cursor: pointer;
}

.card.flipped {
  transform: rotateY(180deg);
}

.card.matched {
  opacity: 0.5;
  cursor: default;
}

.card-face {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden; /* 隐藏元素的背面 */
  border-radius: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  font-weight: bold;
  color: white;
}

.card-front {
  background-color: #ffa2d4;
}

.card-back {
  background-color: #ffa2d4;
  transform: rotateY(180deg);
}

.win-message {
  text-align: center;
  margin-top: 20px;
}

.win-message p {
  font-size: 1.5rem;
  color: green;
}

.win-message button {
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  background-color: #4caf50;
  color: white;
  border-radius: 5px;
}
</style>
