import { io } from 'socket.io-client';

// 创建一个 Socket.io 实例
const socket = io("http://localhost:5174");

export default socket;
