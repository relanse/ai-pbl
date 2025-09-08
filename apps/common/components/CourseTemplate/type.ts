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
export type CourseTemplateMap = {
  connection: CourseConnectionType
}
