<template>
  <div class="memory-container">
    <RobotPrompt v-model="data.prompt" />
    <div class="game-container">
      <img class="game-container-bg" :src="h2Bg" />
      <div class="game-container-title">
        <h2>当前得分: {{ score }}</h2>
      </div>

      <!-- 游戏规则卡片 -->
      <div class="rule-card">
        <img class="rule-card-bg" :src="ruleCardBg" />
        <h2>游戏规则</h2>
        <ul>
          <li>点击卡片翻开</li>
          <li>记住卡片位置</li>
          <li>找到配对的卡片</li>
          <li>全部配对完成获胜</li>
        </ul>
      </div>

      <!-- 记忆卡片区域 -->
      <div class="main-area">
        <div class="card-container">
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
              <div class="card-face card-back">
                <EditableText v-if="!!card.text" v-model="card.text" />
                <EditableImage v-else v-model="card.image" />
              </div>
            </div>
            <!-- 增加卡片按钮 -->
            <el-button
              v-if="isEdit"
              class="add-card-btn"
              @click="addCardPair()"
              size="small"
              :icon="Plus"
              circle
            />
          </div>
        </div>
      </div>
    </div>

    <div v-if="isGameWon" class="win-message">
      <p>恭喜你，游戏胜利！</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, computed, inject, watch} from 'vue'
import {ElButton} from 'element-plus'
import {Plus} from '@element-plus/icons-vue'
import {v4 as uuidv4} from 'uuid'
import RobotPrompt from './components/RobotPrompt.vue'
import DefaultCardImg from '../../assets/memoryCard.png'
import h2Bg from '../../assets/backgrounds/transBg.png'
import ruleCardBg from '../../assets/backgrounds/ruleCardBg.png'
import EditableText from './components/EditableText.vue'
import EditableImage from './components/EditableImage.vue'
import {
  CourseTemplateProviderDefaultValue,
  CourseTemplateProviderKey
} from './provider'
import {MemoryTemplateType, Card} from './type'
import {useCurrentPageData} from '../../composables/useCurrentPageData'
const {isEdit} = inject(
  CourseTemplateProviderKey,
  CourseTemplateProviderDefaultValue
)
const {data} = useCurrentPageData<MemoryTemplateType>('memory')

const cards = ref<Card[]>([])
const flippedCards = ref<Card[]>([])
const score = ref(0)

//增加新的一对卡片
const addCardPair = () => {
  const newPairId = uuidv4()
  const newCardText: Card = {
    id: uuidv4(),
    pairId: newPairId,
    text: '新卡片',
    flipped: true,
    matched: false
  }
  const newCardImg: Card = {
    id: uuidv4(),
    pairId: newPairId,
    image: '',
    flipped: true,
    matched: false
  }
  data.value.cards.push(newCardText, newCardImg)
}

// 初始化并洗牌
const setupGame = () => {
  score.value = 0
  flippedCards.value = []
  const gameCards = JSON.parse(JSON.stringify(data.value.cards))
  // Fisher-Yates 洗牌算法
  if (!isEdit.value) {
    // Fisher-Yates 洗牌算法
    for (let i = gameCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[gameCards[i], gameCards[j]] = [gameCards[j], gameCards[i]]
    }
  }

  cards.value = gameCards.map((card: Card) => ({
    ...card,
    flipped: isEdit.value, // 编辑模式默认翻开，否则盖上
    matched: false
  }))
}

// 翻转卡片
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

// 检查匹配
const checkForMatch = () => {
  const [card1, card2] = flippedCards.value

  if (card1.pairId === card2.pairId) {
    // 匹配成功
    card1.matched = true
    card2.matched = true
    score.value += 10
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

// 计算游戏是否胜利
const isGameWon = computed(() => {
  if (cards.value.length === 0) return false
  return cards.value.every(card => card.matched)
})
// 监听编辑状态切换
watch(isEdit, () => {
  setupGame()
})

// 监听持久化数据的变化，在编辑模式下实时更新视图
watch(
  () => data.value.cards,
  () => {
    if (isEdit.value) {
      setupGame()
    }
  },
  {deep: true}
)
onMounted(() => {
  // 如果是编辑模式且没有任何卡片，则默认创建一对
  if (isEdit.value && data.value.cards.length === 0) {
    addCardPair()
  } else {
    setupGame()
  }
})
</script>

<style scoped>
.memory-container {
  padding: 20px;
}

.game-container {
  position: relative;
  align-items: center;
  flex-direction: column;
  display: flex;
  margin: 20px auto;
  padding: 20px;
  width: 890px;
  height: 500px;
  border: 5px solid #f5de5d;
  border-radius: 40px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.game-container-bg {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100px;
  z-index: -1;
}

.game-container-title {
  height: 60px;
  top: 0;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
}

.rule-card {
  position: absolute;
  left: 0;
  top: 25%;
  width: 190px;
  height: 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.rule-card-bg {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -99;
}
.rule-card h2 {
  font-family: HuXiaoBo-NanShen;
  margin-left: 40px;
  margin-bottom: 30px;
  font-size: 18px;
  z-index: 1;
}
.rule-card ul {
  list-style: none;
  padding: 0;
  margin: 0;
  color: #333333;
  font-size: 15px;
  font-weight: 340;
  text-align: left;
  line-height: 2;
  z-index: 1;
}
.main-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
}
.score-container {
  position: relative;
  width: 890px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #3d405b;
  font-weight: bold;
  font-size: 18px;
}
.score-background {
  position: absolute;
  top: 0px;
  left: 0;
  width: 100%;
  height: 79px;
  z-index: -1;
  background-image: url("data:image/svg+xml,%3Csvg width='890' height='79' viewBox='0 0 890 79' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 0H850C872.091 0 890 17.9086 890 40V40C890 40 890 40 890 40C804.935 73.4119 658.216 87.4013 445 78.5C231.784 69.5987 85.0653 36.1868 0 3V40C0 17.9086 17.9086 0 40 0Z' fill='%23F5DE5D'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
}

.card-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.cards-grid {
  display: grid;
  justify-content: center;
  gap: 20px;
  padding: 20px;
  align-items: center;
  grid-template-rows: repeat(2, 1fr); /* 每列2个元素 */
  grid-auto-flow: column; /* 按列填充 */
  margin-left: 190px;
  width: calc(100% - 190px);
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
  opacity: 0.6;
  cursor: default;
}

.card-face {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden; /* 隐藏元素的背面 */
  border-radius: 36px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  border: 3.59px solid rgba(255, 255, 255, 1);
  box-shadow: 0px 7.18px 30.34px 0px rgba(255, 162, 212, 0.31);
}

.card-front {
  background-color: #ffa2d4;
}

.card-back {
  background-color: #ffa2d4;
  transform: rotateY(180deg);
}

.card-back :deep(.editable-image-wrapper) {
  width: 80px;
  height: 80px;
}
.card-back :deep(.editable-text-wrapper) {
  width: 100%;
  height: 30px;
  color: #333; /* 文本颜色 */
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
