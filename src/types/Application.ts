import type { Company, Job } from '@/types/Job'

export interface Application {
  job: Job,
  company: Company,
  user: string,
  step: number,
}
