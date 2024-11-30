// 导入 axios配置
import request from "@/utils/request"



export const updateResume = data => request({
  url: '/app/updateResume',
  method: 'post',
  data
});

export const getResume= data => request({
  url: '/app/getResume',
  method: 'get',
  data
});
