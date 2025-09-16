import {defineStore} from 'pinia'
import {v4 as uuidv4} from 'uuid'
import DefaultAvatar from '@aipbl/common/assets/DefaultAvatar.png'

export type ParentRelation = 'father' | 'mother'
export type AccountStatus = 'active' | 'disabled'

export interface StudentItem {
  id: string
  account: string
  avatar: string
  name: string
  status: AccountStatus
  gender: '男' | '女'
  birth: string // YYYY-MM-DD
  progress: string // e.g. L1-05
  school: string
  gradeClass: string // e.g. 三年2班
  parentName: string
  relation: ParentRelation
  phone: string
  password: string
  registerAt: string // YYYY-MM-DD HH:mm:ss
}

export interface StudentQuery {
  keyword: string // 姓名/电话/学校
}

function createMock(): StudentItem[] {
  return [
    {
      id: uuidv4(),
      account: '550e8400-e29b-446655441234',
      avatar: DefaultAvatar,
      name: '吴彬',
      status: 'active',
      gender: '男',
      birth: '2020-09-15',
      progress: 'L1-05',
      school: '阳光幼儿园',
      gradeClass: '三年2班',
      parentName: '吴彬',
      relation: 'father',
      phone: '159-6154-8643',
      password: 'a123456',
      registerAt: '2024-03-25 10:22:36'
    },
    {
      id: uuidv4(),
      account: '550e24012-e29b-446655440130',
      avatar: DefaultAvatar,
      name: '李伶',
      status: 'disabled',
      gender: '男',
      birth: '2020-09-15',
      progress: 'L1-05',
      school: '阳光幼儿园',
      gradeClass: '三年2班',
      parentName: '李玲',
      relation: 'mother',
      phone: '152-2361-2003',
      password: 'b123456',
      registerAt: '2024-02-08 09:10:00'
    },
    {
      id: uuidv4(),
      account: '550e841c-e29b-446655440010',
      avatar: DefaultAvatar,
      name: '王超斌',
      status: 'active',
      gender: '男',
      birth: '2020-09-15',
      progress: 'L1-05',
      school: '阳光幼儿园',
      gradeClass: '三年2班',
      parentName: '王艳斌',
      relation: 'father',
      phone: '133-4041-9319',
      password: 'c123456',
      registerAt: '2023-08-18 14:25:36'
    },
    {
      id: uuidv4(),
      account: '510e4400-e29b-446655440011',
      avatar: DefaultAvatar,
      name: '李依静',
      status: 'active',
      gender: '男',
      birth: '2020-09-15',
      progress: 'L1-05',
      school: '阳光幼儿园',
      gradeClass: '三年2班',
      parentName: '李依静',
      relation: 'father',
      phone: '153-5538-6192',
      password: 'd123456',
      registerAt: '2023-07-25 19:20:01'
    },
    {
      id: uuidv4(),
      account: '150e8400-e29b-446655440034',
      avatar: DefaultAvatar,
      name: '李海萍',
      status: 'active',
      gender: '女',
      birth: '2020-09-15',
      progress: 'L1-05',
      school: '阳光幼儿园',
      gradeClass: '三年2班',
      parentName: '李海萍',
      relation: 'mother',
      phone: '159-5483-8635',
      password: 'e123456',
      registerAt: '2023-04-10 08:03:29'
    }
  ]
}

export const useStudentStore = defineStore(
  'teacher-students',
  {
    state: () => ({
      students: createMock() as StudentItem[],
      query: {keyword: ''} as StudentQuery,
      currentPage: 1,
      pageSize: 10
    }),
    getters: {
      filtered(state): StudentItem[] {
        const kw = state.query.keyword.trim().toLowerCase()
        if (!kw) return state.students
        return state.students.filter(s => {
          return (
            s.name.toLowerCase().includes(kw) ||
            s.phone.replaceAll('-', '').includes(kw.replaceAll('-', '')) ||
            s.school.toLowerCase().includes(kw)
          )
        })
      },
      total(state): number {
        const kw = state.query.keyword.trim().toLowerCase()
        if (!kw) return state.students.length
        return state.students.filter(s => {
          return (
            s.name.toLowerCase().includes(kw) ||
            s.phone.replaceAll('-', '').includes(kw.replaceAll('-', '')) ||
            s.school.toLowerCase().includes(kw)
          )
        }).length
      },
      paged(state): StudentItem[] {
        const kw = state.query.keyword.trim().toLowerCase()
        const filtered = kw
          ? state.students.filter(s =>
              s.name.toLowerCase().includes(kw) ||
              s.phone.replaceAll('-', '').includes(kw.replaceAll('-', '')) ||
              s.school.toLowerCase().includes(kw)
            )
          : state.students
        const start = (state.currentPage - 1) * state.pageSize
        return filtered.slice(start, start + state.pageSize)
      }
    },
    actions: {
      setKeyword(keyword: string) {
        this.query.keyword = keyword
        this.currentPage = 1
      },
      setPage(page: number) {
        this.currentPage = page
      },
      setPageSize(size: number) {
        this.pageSize = size
        this.currentPage = 1
      },
      toggleStatus(id: string) {
        const s = this.students.find(i => i.id === id)
        if (s) s.status = s.status === 'active' ? 'disabled' : 'active'
      },
      addStudent(payload: Omit<StudentItem, 'id' | 'avatar' | 'registerAt' | 'status' | 'password'> & {status?: AccountStatus; avatar?: string; registerAt?: string; password?: string}) {
        const now = new Date()
        const item: StudentItem = {
          id: uuidv4(),
          avatar: payload.avatar || DefaultAvatar,
          registerAt:
            payload.registerAt ||
            `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`,
          status: payload.status || 'active',
          password: payload.password || 'a123456',
          ...payload
        }
        this.students.unshift(item)
      },
      updateStudent(id: string, patch: Partial<StudentItem>) {
        const idx = this.students.findIndex(s => s.id === id)
        if (idx >= 0) {
          this.students[idx] = {...this.students[idx], ...patch}
        }
      }
    },
    persist: true
  }
)
