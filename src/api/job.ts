// 导入 axios配置
import request from "@/utils/request"


export const updateJob = data => request({
  url: '/app/updateJob',
  method: 'post',
  data
});

export const getJobsByCompanyId= companyId => request({
  url: '/app/getJobsByCompanyId',
  method: 'get',
  params: {company: companyId}
});

export const getJobs= data => request({
  url: '/app/getJobs',
  method: 'get',
  data
});

export const getJobById= (id) => request({
  url: '/app/getJobById',
  method: 'get',
  params: {id}
});

export const getJobsByRole= (keyword) => request({
  url: '/app/getJobsByRole',
  method: 'get',
  params: {keyword}
});




export const deleteJob= (jobId) => request({
  url: '/app/deleteJob',
  method: 'get',
  params: {job: jobId}
});

