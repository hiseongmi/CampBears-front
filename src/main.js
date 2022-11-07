import { createApp } from "vue";
// import '../src/assets/css/app.css';
// import '../src/assets/css/app.css.map';
import App from "./App.vue";
import router from "./router";
import store from "./store";

// import "./assets/css/app.css";
// window.Kakao.init("37b652b280e20ff8c7240ecd75bfdbb5");
createApp(App).use(router).use(store).mount("#app");
