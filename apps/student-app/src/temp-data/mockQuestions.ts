// 测试题目数据 - 包含所有模板组件的完整参数格式

export interface QuestionData {
  id: number
  type: string
  data: any
}

export const mockQuestions: QuestionData[] = [
  // 选择题模板数据
  {
    id: 1,
    type: 'choices',
    data: {
      title: '什么是人工智能？',
      prompt: '请选择最准确的定义',
      img: '', // 添加缺失的 img 字段
      options: [
        {id: 'A', content: '让机器能够像人一样思考和行动的技术'},
        {id: 'B', content: '只是一种计算机程序'},
        {id: 'C', content: '用来替代人类工作的机器人'},
        {id: 'D', content: '一种新的编程语言'}
      ],
      correctAnswer: 'A'
    }
  },

  // 连线题模板数据
  {
    id: 2,
    type: 'connection',
    data: {
      title: 'AI概念连线',
      prompt: '请将左侧的概念与右侧的定义进行正确连接',
      robotPrompt: '仔细观察左右两侧的内容，将相关的概念和定义连接起来。',
      backgroundImage: '/src/assets/backgrounds/backgroundGirl.png',
      leftColumn: {
        title: 'AI概念',
        cards: [
          {id: '1', content: '机器学习', color: '#649FFE'},
          {id: '2', content: '深度学习', color: '#FF9401'},
          {id: '3', content: '神经网络', color: '#6EE188'}
        ]
      },
      rightColumn: {
        title: '定义说明',
        cards: [
          {id: '1', content: '模仿人脑神经元结构的算法', color: '#6EE188'},
          {id: '2', content: '让机器从数据中学习的方法', color: '#649FFE'},
          {id: '3', content: '使用多层神经网络的学习方法', color: '#FF9401'}
        ]
      },
      correctConnections: [
        {leftId: '1', rightId: '2'}, // 机器学习 -> 让机器从数据中学习的方法
        {leftId: '2', rightId: '3'}, // 深度学习 -> 使用多层神经网络的学习方法
        {leftId: '3', rightId: '1'} // 神经网络 -> 模仿人脑神经元结构的算法
      ]
    }
  },

  // 拖拽题模板数据
  {
    id: 3,
    type: 'drag',
    data: {
      title: 'AI应用分类',
      prompt: '将下面的AI应用拖拽到正确的分类中',
      robotPrompt: '观察每个应用的特点，将它们拖到对应的技术领域中。',
      subtitle: '将应用拖到正确的类别',
      backgroundImage: '/src/assets/backgrounds/backgroundVedio.png',
      itemmean: 'AI应用',
      items: [
        {id: '1', title: '语音识别', color: '#649FFE'},
        {id: '2', title: '图像识别', color: '#FF9401'},
        {id: '3', title: '机器翻译', color: '#6EE188'},
        {id: '4', title: '自动驾驶', color: '#A9A7FB'}
      ],
      targetmean: '应用领域',
      targets: [
        {
          id: '1',
          title: '自然语言处理',
          subtitle: 'NLP相关应用',
          correctItems: ['1', '3'] // 语音识别、机器翻译
        },
        {
          id: '2',
          title: '计算机视觉',
          subtitle: 'CV相关应用',
          correctItems: ['2', '4'] // 图像识别、自动驾驶
        }
      ]
    }
  },

  // 绘画题模板数据
  {
    id: 4,
    type: 'draw',
    data: {
      title: '绘制神经网络结构',
      prompt: '请在画板上绘制一个简单的神经网络结构图',
      robotPrompt:
        '使用画笔工具绘制神经网络的基本结构，包括输入层、隐藏层和输出层。',
      backgroundImage: '/src/assets/backgrounds/DefaultFindBackground.png',
      canvasConfig: {
        width: 600,
        height: 400,
        backgroundColor: '#ffffff'
      },
      tools: [
        {name: 'pen', label: '画笔', color: '#000000'},
        {name: 'eraser', label: '橡皮擦'},
        {name: 'clear', label: '清空画板'}
      ]
    }
  },

  // 表达题模板数据
  {
    id: 5,
    type: 'express',
    data: {
      title: '描述AI的工作原理',
      prompt: '请用自己的话描述人工智能是如何工作的',
      robotPrompt: '请详细描述你对人工智能工作原理的理解，可以举例说明。',
      backgroundImage: '/src/assets/backgrounds/backgroundSun.png',
      inputConfig: {
        type: 'textarea',
        placeholder: '请在这里输入你的答案...',
        minLength: 50,
        maxLength: 500,
        rows: 8
      },
      evaluationCriteria: [
        '是否提到了数据处理',
        '是否提到了算法学习',
        '是否给出了具体例子',
        '表达是否清晰完整'
      ]
    }
  },

  // 找找看模板数据
  {
    id: 6,
    type: 'find',
    data: {
      title: '找出隐藏的AI元素',
      prompt: '在下面的图片中找出所有与AI相关的元素',
      robotPrompt: '仔细观察图片，点击你认为与人工智能相关的物品或区域。',
      backgroundImage: '/src/assets/backgrounds/DefaultFindBackground.png',
      targetImage: '/src/assets/backgrounds/backgroundVedio.png',
      targets: [
        {
          id: '1',
          name: '机器人',
          x: 150,
          y: 200,
          width: 80,
          height: 100,
          description: '这是一个智能机器人'
        },
        {
          id: '2',
          name: '摄像头',
          x: 300,
          y: 150,
          width: 40,
          height: 60,
          description: '用于图像识别的摄像头'
        },
        {
          id: '3',
          name: '芯片',
          x: 450,
          y: 250,
          width: 60,
          height: 40,
          description: 'AI处理芯片'
        }
      ],
      foundTargets: []
    }
  },

  // 记忆卡片模板数据
  {
    id: 7,
    type: 'memory',
    data: {
      title: 'AI概念记忆游戏',
      prompt: '翻开卡片，找出相匹配的AI概念对',
      robotPrompt: '记住每张卡片的位置，找出意思相关或配对的卡片。',
      backgroundImage: '/src/assets/backgrounds/backgroundGirl.png',
      cards: [
        {
          id: '1',
          frontContent: '机器学习',
          backContent: 'Machine Learning',
          matchId: '2',
          isFlipped: false,
          isMatched: false
        },
        {
          id: '2',
          frontContent: 'ML',
          backContent: '机器学习缩写',
          matchId: '1',
          isFlipped: false,
          isMatched: false
        },
        {
          id: '3',
          frontContent: '深度学习',
          backContent: 'Deep Learning',
          matchId: '4',
          isFlipped: false,
          isMatched: false
        },
        {
          id: '4',
          frontContent: 'DL',
          backContent: '深度学习缩写',
          matchId: '3',
          isFlipped: false,
          isMatched: false
        },
        {
          id: '5',
          frontContent: '神经网络',
          backContent: 'Neural Network',
          matchId: '6',
          isFlipped: false,
          isMatched: false
        },
        {
          id: '6',
          frontContent: 'NN',
          backContent: '神经网络缩写',
          matchId: '5',
          isFlipped: false,
          isMatched: false
        }
      ],
      gameConfig: {
        maxFlipTime: 2000, // 卡片翻开显示时间(毫秒)
        shuffleCards: true // 是否随机打乱卡片位置
      }
    }
  }
]

// 导出单个题目类型的测试数据(便于单独测试)
export const getQuestionByType = (type: string): QuestionData | undefined => {
  return mockQuestions.find(question => question.type === type)
}

// 导出所有题目类型列表
export const getAllQuestionTypes = (): string[] => {
  return [...new Set(mockQuestions.map(q => q.type))]
}
