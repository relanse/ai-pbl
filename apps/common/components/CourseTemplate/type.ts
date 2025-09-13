export type CourseDataType<T extends keyof CourseTemplateMap> = {
  courseName: string
  version: string
  meta: {author: string; createTime: string; updateTime: string}
  pages: {
    uniqueId: string
    pageId: number
    templateType: string
    data: CourseTemplateMap[T]
  }[]
}
//连一连json模板格式
export type ConnectionTemplateType = {
  prompt: string
  leftColumn: {
    title: string
    cards: {
      id: string
      content: string
      tag: string
      img: string
      color: string
    }[]
  }
  rightColumn: {
    title: string
    cards: {id: string; content: string}[]
  }
  wrongMsg: string
}
//选择题json模板格式
export type ChoiceTemplateType = {
  prompt: string
  title: string
  options: {id: string; content: string}[]
  correctAnswer: string
}

//拖拽json模板格式
export type DragTemplateType = {
  prompt: string
  title: string
  subtitle: string
  itemmean: string
  items: {
    id: string
    title: string
    color: string
  }[]
  targetmean: string
  targets: {
    id: string
    title: string
    subtitle: string
    correctItems: string[] // array of item titles that belong to this target
  }[]
}
// 找一找json模板格式
export type FindItemType = {
  id: string // 唯一ID
  x: number // x 坐标 (百分比)
  y: number // y 坐标 (百分比)
  text: string // 物品名称
  img: string // 物品图标URL
  found: boolean // 在预览模式下是否已被发现
}
export type FindTemplateType = {
  prompt: string
  backgroundImg: string
  items: FindItemType[]
}

//记忆卡片模板
export type MemoryTemplateType = {
  prompt: string
  cards: {
    id: string
    value: string
    flipped: boolean
    matched: boolean
  }[]
}
//表达模板
export type ExpressTemplateType = {
  prompt: string
  title: string
  textareaExample: string
  textareaInput: string
  category: string
  cards: {
    id: string
    name: string
    icon: string
    prompt: string
  }[]
}
//绘画模板
export type DrawTemplateType = {
  prompt: string
  title: string
  draw: string
  colors: string[]
  createModes: {
    createType: string
    subtitle: string
  }[]
  createIdea: {
    title: string
    ideas: string[]
  }
}
//模板组件映射
export type CourseTemplateMap = {
  connection: ConnectionTemplateType
  choices: ChoiceTemplateType
  drag: DragTemplateType
  find: FindTemplateType
  express: ExpressTemplateType
  draw: DrawTemplateType
}
