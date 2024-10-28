interface Company {
  name: string
  location: string
  logo: string // 这里假设 logo 是一个相对于项目根目录的路径
  favoriteIcon: string // 图标类名
}

interface Tag {
  _id: number
  name: string
}

export interface Job {
  id: number
  company: Company
  tags: Tag[]
  position: string
  description: string
  salary: string // 薪资可以是一个字符串，因为它可能包含非数字字符（如货币符号）
}
