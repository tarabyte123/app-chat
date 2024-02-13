import { io } from "socket.io-client";

const URL ="https://worldcup-io-assignment.onrender.com";

export const socket = io(URL, {
  autoConnect: false,
});
