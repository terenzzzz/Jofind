// 导入 axios配置
import request from "@/utils/request"


export const updateJob = data => request({
  url: '/app/updateJob',
  method: 'post',
  data
});

export const getCompanyJobsByCompanyId= companyId => request({
  url: '/app/getCompanyJobsByCompanyId',
  method: 'get',
  params: {company: companyId}
});

export const deleteJob= (jobId) => request({
  url: '/app/deleteJob',
  method: 'get',
  params: {job: jobId}
});

