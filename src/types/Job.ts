export interface Company {
  _id: string
  name: string
  location: string
  logo: string
  website: string
  latitude: string
  longitude: string
  size: number // 公司人数规模
  industry: string,
  founded: string,
  background: string
}

interface Tag {
  _id: number
  name: string
}

export interface Job {
  _id: string
  company: Company
  website: string
  department: string
  role: string
  degree: string
  experience: number
  location: string
  latitude: number
  longitude: number
  salaryFrom: string
  salaryTo: Date
  advFrom: Date
  advTo: string
  description: string
  requirements: string
  summary: string

}
