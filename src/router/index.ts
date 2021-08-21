import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import LayoutPersonal from "@/components/layout/LayoutPersonal.vue";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/home",
    name: "Home",
    component: () => import("@/views/home/index.vue"),
  },
  {
    path: "/login",
    name: "Login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/login/index.vue"),
  },
  {
    path: "/register",
    name: "Register",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/register/index.vue"),
  },
  {
    path: "/personal",
    name: "PersonalCenter",
    component: LayoutPersonal,
    redirect: "/personal/myWorks",
    meta: { title: "personal", icon: "user", noCache: true },
    children: [
      {
        path: "myWorks",
        component: () => import("@/views/personal/index.vue"),
        name: "myWorks",
        meta: { title: "myWorks", icon: "myWorks", noCache: true },
      },
    ],
  },
  {
    path: "/editor",
    name: "Editor",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/editor/index.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
