interface Company {
  name: string
  location: string
  logo: string
  url: string
  latitude: number
  longitude: number
  size: number // 公司人数规模
  industry: string,
  founded: string
}

interface Tag {
  _id: number
  name: string
}

export interface Job {
  id: number
  company: Company
  tags: Tag[]
  department: string
  experience: string
  education: string
  location: string
  latitude: number
  longitude: number
  role: string
  conclusion: string // 总结这个职位
  description: string // 详细描述
  requirements: string
  salaryFrom: string
  salaryTo: string
  startDate: Date
  endDate: Date
}
