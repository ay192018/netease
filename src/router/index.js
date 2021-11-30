import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "layout",
    component: () => import("@/views/layout/index.vue"),
    children: [
      {
        path: "",
        name: "find",
        component: () => import("@/views/find/index.vue"),
      },
      {
        path: "/podcast",
        name: "podcast",
        component: () => import("@/views/podcast/index.vue"),
      },
      {
        path: "/my",
        name: "my",
        component: () => import("@/views/my/index.vue"),
      },
      {
        path: "/follow",
        name: "follow",
        component: () => import("@/views/follow/index.vue"),
      },
      {
        path: "/Yuncun",
        name: "Yuncun",
        component: () => import("@/views/Yuncun/index.vue"),
      },
    ],
  },
  {
    path: "/songsinfo/:id",
    name: "songsinfo",
    component: () => import("@/components/songsinfo.vue"),
    props: true,
  },
  {
    path: "/search",
    name: "search",
    component: () => import("@/views/search/index.vue"),
  },
  {
    path: "/Gedansquare",
    name: "Gedansquare",
    component: () => import("@/components/Gedansquare/"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
