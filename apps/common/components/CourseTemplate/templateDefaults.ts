import DefaultFindBackground from '../../assets/backgrounds/DefaultFindBackground.png'
import {
  ConnectionTemplateType,
  FindTemplateType,
  CourseChoicesType,
  CourseDragType,
  MemoryTemplateType
} from './type'
import {v4 as uuidv4} from 'uuid'

export const getTemplateDefaultData = (templateType: string) => {
  const newId = uuidv4()
  switch (templateType) {
    case 'connection':
      return <ConnectionTemplateType>{
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
    case 'choices':
      return <CourseChoicesType>{
        prompt: '小测试来了！',
        title: '下面哪个最准确地描述了人工智能?',
        options: [
          {id: 'A', content: '只能执行固定程序的机器'},
          {id: 'B', content: '能够像人类一样学习和思考的技术'},
          {id: 'C', content: '专门用来玩游戏的软件'}
        ],
        correctAnswer: 'B'
      }
    case 'drag':
      return <CourseDragType>{
        prompt: '请将左侧的卡片拖拽到右侧对应的分类中。',
        title: '动物分类',
        subtitle: '将动物拖到正确的类别',
        itemmean: '动物',
        items: [
          {id: uuidv4(), title: '老虎', color: '#649FFE'},
          {id: uuidv4(), title: '老鹰', color: '#FF9401'},
          {id: uuidv4(), title: '鲸鱼', color: '#6EE188'},
          {id: uuidv4(), title: '麻雀', color: '#A9A7FB'}
        ],
        targetmean: '动物类别',
        targets: [
          {
            id: uuidv4(),
            title: '哺乳动物',
            subtitle: '用母乳喂养后代的动物',
            correctItems: ['老虎', '鲸鱼']
          },
          {
            id: uuidv4(),
            title: '鸟类',
            subtitle: '有羽毛和翅膀的动物',
            correctItems: ['老鹰', '麻雀']
          }
        ]
      }
    case 'find':
      return <FindTemplateType>{
        prompt: '找一找下面有什么用到ai的物品',
        backgroundImg: DefaultFindBackground,
        items: []
      }
    case 'memory':
      return <MemoryTemplateType>{
        prompt: '翻开卡片找到配对！',
        cards: []
      }
    default:
      return {}
  }
}
