// 模拟的课程数据
const courseData = {
  '1': {
    id: '101',
    name: 'L1-1 人工智能的定义与演化',
    desc: '本课程将带您了解人工智能的基本概念、发展历程以及未来的发展趋势。',
    keyPoints: [
      '人工智能的定义与分类',
      '机器学习、深度学习与人工智能的关系',
      '人工智能发展简史上的里程碑事件',
      '当前主流的人工智能研究方向和应用领域'
    ],
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', // 示例视频
    materials: [
      {name: '课程讲义.pdf', size: '2.1MB'},
      {name: '相关论文集.zip', size: '10.5MB'},
      {name: '扩展阅读材料.docx', size: '0.8MB'}
    ]
  }
  // 可以根据需要添加更多课程数据
}

export interface CourseInfo {
  id: string
  name: string
  desc: string
  keyPoints: string[]
  videoUrl: string
  materials: {name: string; size: string}[]
}

/**
 * 根据课程ID获取课程详情
 * @param courseId 课程ID
 * @returns 课程详情
 */
export const getCourseDetail = (courseId: string): Promise<CourseInfo> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const course = courseData[courseId as keyof typeof courseData]
      if (course) {
        resolve(course)
      } else {
        reject(new Error('Course not found'))
      }
    }, 500) // 模拟网络延迟
  })
}
