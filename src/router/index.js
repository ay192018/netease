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
    path: "/PersonalCenter/:id",
    name: "PersonalCenter",
    component: () => import("@/components/PersonalCenter/"),
    props: true,
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
  {
    path: "/everysongs",
    name: "everysongs",
    component: () => import("@/components/everysongs/"),
  },
  {
    path: "/Ranking",
    name: "Ranking",
    component: () => import("@/components/Ranking/"),
  },
  {
    path: "/userprofile/:id",
    name: "userprofile",
    component: () => import("@/components/userprofile/"),
    props: true,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
