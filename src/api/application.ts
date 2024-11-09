// 导入 axios配置
import request from "@/utils/request"



export const addApplication = data => request({
  url: '/app/addApplication',
  method: 'post',
  data
});

export const getApplicationByJob = (job) => request({
  url: '/app/getApplicationByJob',
  method: 'get',
  params: {job: job}
});

export const getApplicationByUser = data => request({
  url: '/app/getApplicationByUser',
  method: 'get',
  data
});

export const getApplicationByCompany = data => request({
  url: '/app/getApplicationByCompany',
  method: 'get',
  data
});



