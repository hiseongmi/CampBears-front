<script>
import { onMounted, onUnmounted, ref } from "vue";
import { apiClient } from "../utils/axios.js";
import chatUtil from "../utils/chat.util.js";

export default {
  name: "chat",
  setup() {
    let chatManager = undefined;
    const shotChat = ref(true);
    const userList = ref([
      {
        userIdx: "30427b11-cb21-43a0-adf9-dd487941f50e",
        userName: "김성미", userType: "USER"
      }
    ]);
    const targetUser = ref(undefined);
    const chatInfoList = ref([{ chatType: "ME", chatBody: "내가보낸거", ProfileImg: "", NickName: "나야" }, {
      chatType: "YOU",
      chatBody: "상태가 보낸거",
      ProfileImg: "",
      NickName: "너야"
    }]);
    const msg = ref("");
    const showChatController = () => {
      shotChat.value = !shotChat.value;
    };
    const doChatUser = async (user) => {
      targetUser.value = user;
      const d = await apiClient("chat/joinChat", { targetIdx: user.userIdx });
      if (d) {
        let chatInfo = d.data[0];
        console.log(chatInfo.chatIdx);
        chatManager = new chatUtil(chatInfo.chatIdx);
        chatManager.initChat();
      }
    };
    const handleInput = (e) => {
      msg.value = e.target.value;
    };
    const sendMsg = () => {
      const param = {
        chatType: "ME",
        chatBody: msg.value,
        ProfileImg: "",
        NickName: "너야"
      };
      if (msg) {
        // chatManager.sendMessage(msg);
        chatManager.sendMessage(param);
      }
    };
    const receiveHandler = (e) => {
      // console.log(e);
      console.log(e.detail);
      if (e.detail) {
        chatInfoList.value.push(e.detail);
      }

    };

    onMounted(() => {
      addEventListener("RECEIVE_MESSAGE", receiveHandler);
    });

    onUnmounted(() => {
      removeEventListener("RECEIVE_MESSAGE", receiveHandler);
    });
    return {
      shotChat,
      userList,
      targetUser,
      chatInfoList,
      showChatController,
      doChatUser,
      handleInput,
      sendMsg
    };
  },
  methods: {}
};
</script>
<template>
  <section class="chat">
    <div v-if="!shotChat" class="floating-icon" @click="showChatController()">챗</div>
    <div v-else class="main-area">
      <div class="title">CHAT</div>
      <div v-if="!targetUser" class="body">
        <div class="user-list">
          <div v-for="user in userList" @click="()=>doChatUser(user)">{{ user.userName }}</div>
        </div>
      </div>
      <div v-else class="chat-screen">
        <div v-for="chat in chatInfoList">
          <div class="chat-body" :class="chat.chatType">
            {{ chat.chatBody }}
          </div>
        </div>
        <div class="chat-util">
          <input type="text" @input="handleInput">
          <button @click="sendMsg">전송</button>
        </div>

      </div>
    </div>


  </section>
</template>

<style lang="scss">
.chat {
  position: fixed;
  right: 10%;
  bottom: 10%;

  .floating-icon {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #274fc5;
    display: flex;
    align-content: center;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    color: white;
    transition: 1s all;

    &:hover {
      cursor: pointer;
      width: 70px;
      height: 70px;
      background-color: #0f43d9;
    }
  }

  .main-area {
    width: 300px;
    height: 500px;
    background-color: white;
    border-radius: 20px;
    border: 1px solid black;
    padding: 20px;

    .title {
      text-align: center;
      font-size: 20px;
      margin-bottom: 20px;
    }

    .body {
      .user-list {
        div {
          height: 30px;
          width: 100%;
          border-bottom: 1px solid grey;

          &:hover {
            background-color: #cccccc;
            cursor: pointer;
          }
        }
      }
    }

    .chat-screen {
      display: flex;
      flex-direction: column;

      .chat-body {
        width: auto;
        height: 20px;
        background-color: #EEEEEE;
        margin-bottom: 10px;

        &.ME {
          color: red;
          text-align: right;
        }

        &.YOU {
          color: blue;
          text-align: left;
        }
      }

      .chat-util {
        display: flex;
        position: absolute;
        bottom: 20px;
        width: calc(100% - 40px);

        > input {
          margin-right: 20px;
        }
      }
    }
  }
}
</style>