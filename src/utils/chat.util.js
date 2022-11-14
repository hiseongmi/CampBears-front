import { io } from "socket.io-client";
import { CONSTANTS } from "../constants.js";

const CHAT_TYPE = {
  CONNECT: "CONNECT",
  RESIVE: "recive",
};

export default class chatUtil {
  #chatIdx;
  socket;

  constructor(chatIdx) {
    this.chatIdx = chatIdx;
    // this.initChat = this.initChat.bind(this);
    this.receiveHandler = this.receiveHandler.bind(this);
  }

  initChat() {
    console.log("init chat");
    this.socket = io(CONSTANTS.CHAT_SERVER, {
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 3000,
      reconnectionAttempts: 100, // returns it if no parameters are passed
    });
    if (this.socket) {
      this.onSubscribe();
    }
  }

  destroyChat() {
    console.log("destroy chat util");
    this.socket.disabled();
  }

  sendMessage(v) {
    this.socket.emit("msg", v);
  }

  onSubscribe() {
    this.socket.on(CHAT_TYPE.CONNECT, () => {
      console.log("connect!!!");
    });
    this.socket.on(CHAT_TYPE.RESIVE, this.receiveHandler);
  }

  receiveHandler(e) {
    console.warn("데이터가 왔어요");
    console.warn(e);
    console.warn(e.data);
    dispatchEvent(new CustomEvent("RECEIVE_MESSAGE", { detail: e.data }));
  }
}
