import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "play",
    },
    {
      path: "/play",
      name: "play",
      component: () => import("../views/NonoPlay.vue"),
    },
    {
      path: "/create",
      name: "create",
      component: () => import("../views/NonoCreate.vue"),
    },
    {
      path: "/edit",
      redirect: "play",
    },
  ],
});

export default router;
