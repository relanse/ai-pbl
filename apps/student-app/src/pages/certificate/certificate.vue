<template>
  <div class="certificate-wrapper">
    <CommonAside class="sidebar" />
    <div class="certificate-maintainer">
      <span>我的证书</span>
      <div class="certificate-stats">
        <div class="stats-card">
          <div class="stats-number">{{ earnedCertificates.length }}</div>
          <div class="stats-label">已获得证书</div>
        </div>
        <div class="stats-card">
          <div class="stats-number">{{ availableCertificates.length }}</div>
          <div class="stats-label">可获得证书</div>
        </div>
        <div class="stats-card">
          <div class="stats-number">
            {{
              Math.round(
                (earnedCertificates.length /
                  (earnedCertificates.length + availableCertificates.length)) *
                  100
              )
            }}%
          </div>
          <div class="stats-label">完成度</div>
        </div>
      </div>

      <!-- 已获得的证书 -->
      <div class="section">
        <h3 class="section-title">已获得的证书</h3>
        <div class="certificate-grid">
          <el-card
            shadow="never"
            class="certificate-card earned"
            v-for="cert in earnedCertificates"
            :key="cert.id"
            @click="viewCertificate(cert)"
          >
            <template #header>
              <div class="certificate-header">
                <MyIcon name="certificate" class="cert-icon" />
                <span class="certificate-title">{{ cert.title }}</span>
              </div>
            </template>
            <div class="certificate-content">
              <img
                :src="cert.image"
                alt="Certificate Image"
                class="certificate-image"
              />
              <div class="certificate-info">
                <p class="certificate-description">{{ cert.description }}</p>
                <div class="certificate-details">
                  <div class="detail-item">
                    <span class="label">获得时间:</span>
                    <span class="value">{{ cert.earnedDate }}</span>
                  </div>
                  <div class="detail-item">
                    <span class="label">有效期:</span>
                    <span class="value">{{ cert.validUntil }}</span>
                  </div>
                  <div class="detail-item">
                    <span class="label">等级:</span>
                    <span class="value level" :class="cert.level">{{
                      cert.levelText
                    }}</span>
                  </div>
                </div>
                <MyButton
                  class="view-button"
                  @click.stop="viewCertificate(cert)"
                >
                  <span style="font-size: 14px; color: #ffffff">查看证书</span>
                </MyButton>
              </div>
            </div>
          </el-card>
        </div>
      </div>

      <!-- 可获得的证书 -->
      <div class="section">
        <h3 class="section-title">可获得的证书</h3>
        <div class="certificate-grid">
          <el-card
            shadow="never"
            class="certificate-card available"
            v-for="cert in availableCertificates"
            :key="cert.id"
          >
            <template #header>
              <div class="certificate-header">
                <MyIcon name="lock" class="cert-icon locked" />
                <span class="certificate-title">{{ cert.title }}</span>
              </div>
            </template>
            <div class="certificate-content">
              <img
                :src="cert.image"
                alt="Certificate Image"
                class="certificate-image locked"
              />
              <div class="certificate-info">
                <p class="certificate-description">{{ cert.description }}</p>
                <div class="certificate-requirements">
                  <div class="requirement-title">获得条件:</div>
                  <ul class="requirement-list">
                    <li v-for="req in cert.requirements" :key="req">
                      {{ req }}
                    </li>
                  </ul>
                </div>
                <div class="progress-info">
                  <div class="progress-label">
                    完成进度: {{ cert.progress || 0 }}%
                  </div>
                  <el-progress
                    :percentage="cert.progress || 0"
                    :stroke-width="8"
                    :color="
                      (cert.progress || 0) === 100 ? '#67c23a' : '#409eff'
                    "
                  />
                </div>
                <MyButton
                  class="earn-button"
                  :disabled="(cert.progress || 0) < 100"
                  @click="earnCertificate(cert)"
                >
                  <span style="font-size: 14px; color: #ffffff">
                    {{ (cert.progress || 0) === 100 ? '获得证书' : '继续努力' }}
                  </span>
                </MyButton>
              </div>
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 依赖导入区
import {ref} from 'vue'
import {ElCard, ElProgress, ElMessage} from 'element-plus'
import MyButton from '@/components/common/MyButton.vue'
import CommonAside from '@/components/common/CommonAside.vue'
import MyIcon from '@aipbl/common/components/MyIcon/index.vue'

defineOptions({
  name: 'CertificatePage'
})

// 证书数据接口
interface Certificate {
  id: number
  title: string
  description: string
  image: string
  level: 'bronze' | 'silver' | 'gold' | 'diamond'
  levelText: string
  earnedDate?: string
  validUntil?: string
  requirements?: string[]
  progress?: number
}

// 变量声明区

// 已获得的证书
const earnedCertificates = ref<Certificate[]>([
  {
    id: 1,
    title: 'AI基础认知证书',
    description:
      '恭喜您完成AI基础知识学习，掌握了人工智能的核心概念和基本原理。',
    image:
      'https://www.figma.com/file/WOOlfcXFrCQmt5TEUv3pMM/image/8e18003b6b0fc52c83b44e4f9bac94d08a3c6861',
    level: 'bronze',
    levelText: '铜牌认证',
    earnedDate: '2024-03-15',
    validUntil: '2026-03-15'
  },
  {
    id: 2,
    title: '编程入门证书',
    description: '您已经成功入门编程世界，掌握了基础的编程思维和开发技能。',
    image:
      'https://www.figma.com/file/WOOlfcXFrCQmt5TEUv3pMM/image/8e18003b6b0fc52c83b44e4f9bac94d08a3c6861',
    level: 'silver',
    levelText: '银牌认证',
    earnedDate: '2024-02-28',
    validUntil: '2026-02-28'
  }
])

// 可获得的证书
const availableCertificates = ref<Certificate[]>([
  {
    id: 3,
    title: '机器学习专家证书',
    description: '深入掌握机器学习算法和应用，成为AI领域的专业人才。',
    image:
      'https://www.figma.com/file/WOOlfcXFrCQmt5TEUv3pMM/image/8e18003b6b0fc52c83b44e4f9bac94d08a3c6861',
    level: 'gold',
    levelText: '金牌认证',
    requirements: [
      '完成机器学习基础课程',
      '通过3个实践项目',
      '获得80分以上成绩'
    ],
    progress: 65
  },
  {
    id: 4,
    title: '深度学习大师证书',
    description: '掌握深度学习的高级技术，具备解决复杂AI问题的能力。',
    image:
      'https://www.figma.com/file/WOOlfcXFrCQmt5TEUv3pMM/image/8e18003b6b0fc52c83b44e4f9bac94d08a3c6861',
    level: 'diamond',
    levelText: '钻石认证',
    requirements: [
      '获得机器学习专家证书',
      '完成高级深度学习课程',
      '发布原创AI项目',
      '通过专家评审'
    ],
    progress: 20
  },
  {
    id: 5,
    title: 'Python编程高手证书',
    description: '熟练掌握Python编程语言，能够开发复杂的应用程序。',
    image:
      'https://www.figma.com/file/WOOlfcXFrCQmt5TEUv3pMM/image/8e18003b6b0fc52c83b44e4f9bac94d08a3c6861',
    level: 'gold',
    levelText: '金牌认证',
    requirements: [
      '完成Python进阶课程',
      '完成5个编程项目',
      '代码质量达到优秀标准'
    ],
    progress: 100
  }
])

// 逻辑处理区
const viewCertificate = (cert: Certificate) => {
  // 这里可以跳转到证书详情页面或弹出详情弹窗
  ElMessage.success(`查看证书: ${cert.title}`)
}

const earnCertificate = (cert: Certificate) => {
  if ((cert.progress || 0) === 100) {
    // 将证书从可获得列表移动到已获得列表
    const today = new Date()
    const earnedCert: Certificate = {
      ...cert,
      earnedDate: today.toISOString().split('T')[0],
      validUntil: new Date(
        today.getFullYear() + 2,
        today.getMonth(),
        today.getDate()
      )
        .toISOString()
        .split('T')[0]
    }

    earnedCertificates.value.push(earnedCert)
    const index = availableCertificates.value.findIndex(c => c.id === cert.id)
    if (index !== -1) {
      availableCertificates.value.splice(index, 1)
    }

    ElMessage.success(`恭喜获得证书: ${cert.title}`)
  } else {
    ElMessage.info('请先完成所有要求条件')
  }
}
</script>

<style scoped>
.certificate-wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  background-color: #f6f6f6;
}

.certificate-maintainer {
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  background-color: #ffffff;
  overflow-y: auto;
  margin: 20px 0 0 20px;
}

.certificate-maintainer > span {
  padding-top: 32px;
  height: 100px;
  font-size: 28px;
  font-weight: bold;
  padding-left: 40px;
  color: #333333;
}

.certificate-stats {
  display: flex;
  gap: 20px;
  padding: 0 40px 20px 40px;
  margin-bottom: 20px;
}

.stats-card {
  flex: 1;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  padding: 20px;
  text-align: center;
  color: white;
}

.stats-number {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 5px;
}

.stats-label {
  font-size: 14px;
  opacity: 0.9;
}

.section {
  margin-bottom: 40px;
  padding: 0 40px;
}

.section-title {
  font-size: 22px;
  font-weight: bold;
  color: #333333;
  margin-bottom: 20px;
  position: relative;
  padding-bottom: 8px;
}

.section-title::after {
  content: '';
  position: absolute;
  left: 16px;
  bottom: 0;
  width: 40px;
  height: 4px;
  background-color: #026bff;
  border-radius: 2px;
}

.certificate-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
  gap: 20px;
}

.certificate-card {
  border: none;
  overflow: visible;
  border-radius: 16px;
  transition: all 0.3s ease;
}

.certificate-card.earned {
  background: linear-gradient(135deg, #e7f0ff 0%, #f0f8ff 100%);
}

.certificate-card.available {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.certificate-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.certificate-card > :deep(.el-card__header) {
  border-bottom: none;
  padding: 20px 20px 10px 20px;
}

.certificate-card > :deep(.el-card__body) {
  padding: 10px 20px 20px 20px;
}

.certificate-header {
  display: flex;
  align-items: center;
  gap: 10px;
}

.cert-icon {
  font-size: 24px;
  color: #026bff;
}

.cert-icon.locked {
  color: #909399;
}

.certificate-title {
  font-size: 18px;
  font-weight: bold;
  color: #333333;
}

.certificate-content {
  display: flex;
  gap: 15px;
}

.certificate-image {
  width: 120px;
  height: 90px;
  object-fit: cover;
  border-radius: 12px;
  flex-shrink: 0;
}

.certificate-image.locked {
  filter: grayscale(100%) opacity(0.5);
}

.certificate-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.certificate-description {
  font-size: 14px;
  color: #666666;
  line-height: 1.5;
  margin: 0;
}

.certificate-details {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.detail-item {
  display: flex;
  gap: 8px;
  font-size: 13px;
}

.label {
  color: #909399;
  font-weight: 500;
  min-width: 70px;
}

.value {
  color: #333333;
}

.level {
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
}

.level.bronze {
  background-color: #cd7f32;
  color: white;
}

.level.silver {
  background-color: #c0c0c0;
  color: white;
}

.level.gold {
  background-color: #ffd700;
  color: #333;
}

.level.diamond {
  background: linear-gradient(45deg, #b9f2ff, #87ceeb);
  color: #333;
}

.certificate-requirements {
  font-size: 13px;
}

.requirement-title {
  color: #909399;
  font-weight: 500;
  margin-bottom: 5px;
}

.requirement-list {
  margin: 0;
  padding-left: 15px;
  color: #666666;
}

.requirement-list li {
  margin-bottom: 3px;
}

.progress-info {
  font-size: 13px;
}

.progress-label {
  color: #333333;
  margin-bottom: 5px;
  font-weight: 500;
}

.view-button,
.earn-button {
  height: 36px;
  width: 100px;
  background: linear-gradient(to right, #6696ff, #63a2fd);
  margin-top: auto;
  align-self: flex-end;
}

.earn-button:disabled {
  background: #c0c4cc !important;
  cursor: not-allowed;
}
</style>
