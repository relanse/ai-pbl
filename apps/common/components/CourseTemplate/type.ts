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
export type CourseConnectionType = {
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
export type CourseChoicesType = {
  prompt: string
  title: string
  options: {id: string; content: string}[]
  correctAnswer: string
}
export type CourseDragType = {
  prompt: string
  title: string
  subtitle: string
  itemmean: string
  items: {
    id: string
    mean: string
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
export type CourseTemplateMap = {
  connection: CourseConnectionType
  choices: CourseChoicesType
  drag: CourseDragType
}
