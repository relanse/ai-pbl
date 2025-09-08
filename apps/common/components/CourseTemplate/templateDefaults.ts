import {v4 as uuidv4} from 'uuid'

export const getTemplateDefaultData = (templateType: string) => {
  const newId = uuidv4()
  switch (templateType) {
    case 'connection':
      return {
        prompt: '点击左右两边的卡片进行连线，思考AI应用模拟了人类的哪种能力',
        leftColumn: {
          title: 'AI应用实例',
          cards: [
            {
              id: newId,
              content: '语音助手',
              tag: '听懂说话',
              img: '',
              color: '#E0EFFF'
            }
          ]
        },
        rightColumn: {
          title: '对应人类能力',
          cards: [{id: newId, content: '听觉能力'}]
        },
        wrongMsg: '答错了,再试试吧'
      }
    default:
      return {}
  }
}
