export const getTemplateDefaultData = (templateType: string) => {
  switch (templateType) {
    case 'connection':
      return {
        prompt: '连线题',
        leftColumn: {title: '左侧标题', cards: []},
        rightColumn: {title: '右侧标题', cards: []},
        matches: [],
        defaultWrongMessage: '匹配错误'
      }
    default:
      return {}
  }
}
