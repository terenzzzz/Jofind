// 导入 axios配置
import request from "@/utils/request"



export const getSeekingStatus = data => request({
  url: '/app/getSeekingStatus',
  method: 'get',
  data
});
