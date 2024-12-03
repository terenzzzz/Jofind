// 导入 axios配置
import request from "@/utils/request"

export const createRoom = data => request({
  url: '/app/createRoom',
  method: 'post',
  data
});


export const getChatRoomBySeeker = data => request({
  url: '/app/getChatRoomBySeeker',
  method: 'get',
  data
});

export const getChatRoomByCompany = data => request({
  url: '/app/getChatRoomByCompany',
  method: 'get',
  data
});


export const getMsgByChatRoom = (chatRoom) => request({
  url: '/app/getMsgByChatRoom',
  method: 'get',
  params: {chatRoom}
});


