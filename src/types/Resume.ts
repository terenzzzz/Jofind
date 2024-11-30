import type { DesiredJob } from '@/types/DesiredJob'
import type { WorkExperience } from '@/types/WorkExperience'
import type { ProjectExperience } from '@/types/ProjectExperience'
import type { EducationExperience } from '@/types/EducationExperience'
import type { LanguageExperience } from '@/types/LanguageExperience'


export interface Resume {
  name: string,
  birth: string,
  email: string,
  topDegree: string,
  phone: string,
  location: string,
  selfEvaluation: string,
  avatar: string,
  desiredJobs: [DesiredJob],
  workExperiences: [WorkExperience],
  projectExperiences: [ProjectExperience],
  educationExperiences: [EducationExperience],
  languageExperience: [LanguageExperience],
}
