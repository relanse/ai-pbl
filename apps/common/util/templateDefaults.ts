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
    case 'choices':
      return {
        title: '请输入标题',
        subtitle: '请输入副标题',
        options: [
          {id: 'A', text: '请输入选项内容'},
          {id: 'B', text: '请输入选项内容'},
          {id: 'C', text: '请输入选项内容'}
        ],
        correctAnswer: 'A'
      }
    default:
      return {}
  }
}
