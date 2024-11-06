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


export interface Job {
  _id: string
  company: Company
  website: string
  department: string
  role: string
  degree: string
  experience: number
  location: string
  latitude: string
  longitude: string
  salaryFrom: number
  salaryTo: number
  advFrom: Date
  advTo: Date
  description: string
  requirements: string
  summary: string

}
