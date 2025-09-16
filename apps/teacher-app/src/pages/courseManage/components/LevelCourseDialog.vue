<template>
  <el-dialog v-model="visible" :title="isEdit ? '编辑等级课程' : '新建等级课程'" width="720px" :close-on-click-modal="false" @close="onCancel">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="96px">
      <el-form-item label="课程标题" prop="name" required>
        <el-input v-model="form.name" placeholder="请输入" />
      </el-form-item>

      <el-form-item label="课程介绍" prop="intro">
        <el-input v-model="form.intro" type="textarea" :rows="4" placeholder="请输入课程简介" maxlength="50" show-word-limit />
      </el-form-item>

      <el-form-item label="课程封面" prop="cover">
        <div class="cover-upload">
          <el-upload class="cover-uploader" :show-file-list="false" :auto-upload="false" accept="image/*" :on-change="onCoverChange">
            <div v-if="!form.cover" class="cover-placeholder">点击添加封面图</div>
            <div v-else class="cover-preview">
              <img :src="form.cover" alt="cover" />
              <el-icon class="trash" @click.stop="removeCover"><i class="ep-delete" /></el-icon>
            </div>
          </el-upload>
          <div class="hint">建议900*600px，JPG、PNG格式，图片小于5M</div>
        </div>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="onCancel">取消</el-button>
        <el-button @click="onSaveDraft">暂存</el-button>
        <el-button type="primary" @click="onPublish">发布</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref, watch, computed } from 'vue'
import { ElForm, ElFormItem, ElInput, ElUpload, ElButton, ElMessage, ElIcon,ElDialog} from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { useCourseStore, type CourseItem } from '@/stores/courseStore'

const props = defineProps<{ modelValue: boolean; course?: CourseItem | null }>()
const emits = defineEmits<{ (e:'update:modelValue', v:boolean):void; (e:'saved', id:string):void }>()

const visible = ref(false)
watch(() => props.modelValue, v => visible.value = v)
watch(visible, v => emits('update:modelValue', v))

const isEdit = computed(() => !!props.course?.id)
const formRef = ref<FormInstance | null>(null)
const form = reactive<{ id?:string; name:string; intro:string; cover:string; published?: boolean }>({ id:'', name:'', intro:'', cover:'', published:false })

watch(() => props.course, (c) => {
  form.id = c?.id
  form.name = c?.name || ''
  form.intro = c?.intro || ''
  form.cover = c?.cover || ''
  form.published = c?.published || false
}, { immediate: true })

const rules: FormRules = {
  name: [{ required: true, message: '请输入课程标题', trigger: 'blur' }],
}

const onCoverChange = (uploadFile: any) => {
  const raw: File | undefined = uploadFile?.raw
  if (!raw) return
  const allow = ['image/jpeg','image/png']
  if (!allow.includes(raw.type)) return ElMessage.warning('仅支持 JPG/PNG 图片')
  const isLt5M = raw.size / 1024 / 1024 < 5
  if (!isLt5M) return ElMessage.warning('图片需小于5M')
  const reader = new FileReader()
  reader.onload = () => {
    const img = new Image()
    img.onload = () => {
      // 裁剪为 900x600（3:2）
      const targetW = 900, targetH = 600, ratio = targetW / targetH
      const iw = img.width, ih = img.height, ir = iw / ih
      let sx = 0, sy = 0, sw = iw, sh = ih
      if (ir > ratio) {
        // 过宽，裁剪宽度
        sw = ih * ratio
        sx = (iw - sw) / 2
      } else if (ir < ratio) {
        // 过高，裁剪高度
        sh = iw / ratio
        sy = (ih - sh) / 2
      }
      const canvas = document.createElement('canvas')
      canvas.width = targetW
      canvas.height = targetH
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, targetW, targetH)
      form.cover = canvas.toDataURL('image/jpeg', 0.92)
      formRef.value?.validateField('cover').catch(() => {})
    }
    img.src = String(reader.result)
  }
  reader.readAsDataURL(raw)
}
const removeCover = () => {
  form.cover = ''
  formRef.value?.validateField('cover').catch(() => {})
}

const store = useCourseStore()
const validate = async () => {
  const ok = await formRef.value?.validate().catch(() => false)
  return !!ok
}

const persist = (published: boolean) => {
  if (isEdit.value && form.id) {
    store.updateCourse(form.id, { name: form.name, intro: form.intro, cover: form.cover, published })
    emits('saved', form.id)
    ElMessage.success(published ? '已发布' : '已保存')
    visible.value = false
  } else {
    const created = store.createCourse({ name: form.name, intro: form.intro, cover: form.cover, published })
    emits('saved', created.id)
    ElMessage.success(published ? '已发布' : '已保存')
    visible.value = false
  }
}

const onSaveDraft = async () => { if (await validate()) persist(false) }
const onPublish = async () => { if (await validate()) persist(true) }
const onCancel = ()=> visible.value = false
</script>

<style scoped>
.cover-upload{ display:flex; align-items:flex-start; gap:12px; }
.cover-placeholder{ width:240px; height:160px; background:#e9eef5; border-radius:12px; display:flex; align-items:center; justify-content:center; cursor:pointer; }
.cover-preview{ position:relative; }
.cover-preview img{ width:240px; height:160px; object-fit:cover; border-radius:12px; }
.cover-preview .trash{ position:absolute; right:8px; top:8px; background:#fff; border-radius:50%; padding:4px; cursor:pointer; color:#9aa0a6; }
.hint{ color:#9aa0a6; }
.dialog-footer{ display:flex; justify-content:flex-end; gap:10px; }
</style>