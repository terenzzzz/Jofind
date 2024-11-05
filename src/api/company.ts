// 导入 axios配置
import request from "@/utils/request"



export const updateCompany = data => request({
  url: '/app/updateCompany',
  method: 'post',
  data
});


export const getCompanyById= data => request({
  url: '/app/getCompanyById',
  method: 'get',
  data
});
