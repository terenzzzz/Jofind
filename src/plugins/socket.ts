// src/plugins/socket.js
import {API_URL} from "@/utils/connection";
import { io } from 'socket.io-client';

export default {
  install: (app) => {
    // 创建 socket.io 实例，连接到指定的服务器
    const socket = io(API_URL);  // 替换为实际的服务器地址

    // 将 socket 实例添加到全局属性
    app.config.globalProperties.$socket = socket;

    // 你可以在这里设置一些全局的事件监听器
    socket.on('connect', () => {
      console.log('Connected to Socket.io server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from Socket.io server');
    });
  }
};
