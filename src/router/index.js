import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "mainPage",
    component: () => import("../views/mainPage.vue"),
  },
  {
    path: "/myPage",
    name: "myPage",
    component: () => import("../views/myPage.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login.vue"),
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("../views/signup.vue"),
  },
  {
    path: "/snsPage",
    name: "snsPage",
    component: () => import("../views/snsPage.vue"),
  },
  {
    path: "/auth",
    name: "auth",
    component: () => import("../views/loginAccess.vue"),
  },
  {
    path: "/usedMarket",
    name: "usedMarket",
    component: () => import("../views/usedMarket.vue"),
  },

  {
    path: "/infoPage",
    name: "infoPage",
    component: () => import("../views/infoPage.vue"),
  },
  {
    path: "/campingInfo",
    name: "campingInfo",
    component: () => import("../views/campingInfo.vue"),
  },
  {
    path: "/userFeed/:userIdx",
    name: "userFeed",
    component: () => import("../views/userFeed.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
