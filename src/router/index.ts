import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"
import LayoutPersonal from "@/components/layout/LayoutPersonal.vue"
const routes: Array<RouteRecordRaw> = [
    {
        path: "/home",
        name: "Home",
        component: () => import("@/views/home/index.vue")
    },
    {
        path: "/login",
        name: "Login",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ "@/views/login/index.vue")
    },
    {
        path: "/register",
        name: "Register",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ "@/views/register/index.vue")
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
                meta: { title: "myWorks", icon: "myWorks", noCache: true }
            }
        ]
    },
    {
        path: "/decoration",
        name: "decoration",
        component: () => import("@/views/decoration/index.vue")
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})
export interface routeItem {
    path: string
    name: string
    redirect: string
}
//没有发现路由重定向
const notfoundRoute: routeItem = {
    path: "/",
    name: "login",
    redirect: "/login"
}
router.addRoute(notfoundRoute)
router.beforeEach((to, from, next) => {
    const whiteList = ["/login", "/401", "/404", "/403", "/register"] // 不需要重定向白名单
    // next();return;//暂时去掉登录拦截
    // initSideBar(to.path)
    if (whiteList.indexOf(to.path) != -1 || to.path.indexOf("login") > -1) {
        // 在免登录白名单，直接进入
        next()
    } else {
        next()
        // if (!store.getters.user.id) {
        //     // 判断页面是否刷新
        //     store
        //         .dispatch("GetUserInfo", true)
        //         .then(() => {
        //             // 拉取user_info
        //             next({
        //                 path: to.path,
        //                 query: to.query,
        //                 params: to.params,
        //                 replace: false
        //             })
        //         })
        //         .catch(() => {
        //             const path = "/login"
        //             next({
        //                 path: path,
        //                 query: { redirect: to.fullPath },
        //                 replace: true
        //             })
        //         })
        // } else {
        //     next()
        // }
    }
})
export default router
