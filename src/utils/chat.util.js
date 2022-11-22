import { io } from "socket.io-client";
import { CONSTANTS } from "../constants.js";
import commonUtil from "./common-util.js";

const CHAT_TYPE = {
  CONNECT: "connect",
  SEND: "send",
  RECEIVE: "receive",
  EXIT: "exit",
};

export default class chatUtil {
  #chatIdx;
  socket;
  loginUser;

  constructor() {
    // this.initChat = this.initChat.bind(this);
    this.receiveHandler = this.receiveHandler.bind(this);
    const d = commonUtil.getLocalStorage(CONSTANTS.KEY_LIST.USER_INFO);
    if (d) this.loginUser = JSON.parse(d);
    console.log("loginUSer : ", this.loginUser);
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
    console.log("보낸 메세지 : ");
    console.log(v);
    this.socket.emit(CHAT_TYPE.SEND, v);
  }

  onSubscribe() {
    this.socket.on(CHAT_TYPE.CONNECT, () => {
      console.log("connect!!!");
    });
    console.log("received");
    this.socket.on(CHAT_TYPE.RECEIVE, this.receiveHandler);
  }

  receiveHandler(e) {
    console.warn("데이터가 왔어요");
    console.warn(e.data);
    if (e.data.targetIdx === this.loginUser.userIdx) {
      dispatchEvent(new CustomEvent("RECEIVE_MESSAGE", { detail: e.data }));
    }
  }
}
