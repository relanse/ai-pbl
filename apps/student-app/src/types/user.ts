export enum Grade {
  Grade1 = '一年级',
  Grade2 = '二年级',
  Grade3 = '三年级',
  Grade4 = '四年级',
  Grade5 = '五年级',
  Grade6 = '六年级'
}
export type UserInfoType = {
  name: string
  age: number
  gender: '男' | '女'
  telephone: number
  grade: Grade
  school: string
  parent: string
}

export type UserStateType = {
  userid: string
  username: string
  avatarUrl: string
  token: string
}
