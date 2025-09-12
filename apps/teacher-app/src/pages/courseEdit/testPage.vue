<template>
  <div>
    <h1>记忆卡片游戏 (Vue 3 + TS)</h1>
    <div class="game-container">
      <!-- 使用 v-for 渲染卡片 -->
      <div
        v-for="card in cards"
        :key="card.id"
        class="card"
        :class="{flipped: card.flipped, matched: card.matched}"
        @click="flipCard(card)"
      >
        <div class="card-face card-front"></div>
        <div class="card-face card-back">{{ card.value }}</div>
      </div>
    </div>
    <div v-if="isGameWon" class="win-message">
      <p>恭喜你，游戏胜利！</p>
      <button @click="resetGame">再玩一次</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, computed} from 'vue'

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
  const cardValues = [...initialValues, ...initialValues]

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
/* 样式与原版基本相同，但建议使用 scoped 以免污染全局样式 */
h1 {
  text-align: center;
}

.game-container {
  display: grid;
  grid-template-columns: repeat(4, 100px);
  gap: 10px;
  perspective: 1000px; /* 为3D效果设置透视 */
  margin: 20px auto;
  justify-content: center;
}

.card {
  width: 100px;
  height: 100px;
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
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  font-weight: bold;
  color: #333;
}

.card-front {
  background-color: #add8e6;
}

.card-back {
  background-color: #4caf50;
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
