import { io } from 'socket.io-client';

// 声明一个全局的 socket 实例
let socket;

export const getSocket = () => {
  // 如果 socket 已经连接，就返回现有的实例
  if (!socket) {
    socket = io("http://localhost:5174", {
      transports: ['websocket', 'polling'], // 设置合适的传输方式
      reconnectionAttempts: 3, // 重连次数
      timeout: 5000, // 超时时间
      autoConnect: true, // 自动连接
    });

  }
  return socket;
};
