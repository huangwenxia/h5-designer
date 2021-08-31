import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"
import store from "@/store"
import LayoutPersonal from "@/components/layout/LayoutPersonal.vue"
import LayoutContent from "@/components/layout/LayoutContent.vue"
const routes: Array<RouteRecordRaw> = [
    {
        path: "/home",
        name: "Home",
        component: () => import("@/views/home/index.vue")
    },
    {
        path: "/login",
        name: "Login",
        component: () => import(/* webpackChunkName: "about" */ "@/views/login/index.vue")
    },
    {
        path: "/register",
        name: "Register",
        component: () => import(/* webpackChunkName: "about" */ "@/views/register/index.vue")
    },
    {
        path: "/personal",
        name: "PersonalCenter",
        component: LayoutContent,
        redirect: "personal/design",
        meta: { title: "personal", icon: "personal", noCache: true },
        children: [
            {
                path: "design",
                component: LayoutPersonal,
                redirect: "personal/design/myWorks",
                name: "design",
                meta: { title: "design", icon: "design", noCache: true },
                children: [
                    {
                        path: "myWorks",
                        component: () => import("@/views/personal/design/myWorks.vue"),
                        name: "myWorks",
                        meta: { title: "myWorks", icon: "myWorks", noCache: true }
                    },
                    {
                        path: "material",
                        component: () => import("@/views/personal/design/material.vue"),
                        name: "material",
                        meta: { title: "material", icon: "material", noCache: true }
                    }
                ]
            },
            {
                path: "analyze",
                name: "analyze",
                component: LayoutPersonal,
                redirect: "personal/analyze/data",
                meta: { title: "analyze", icon: "analyze", noCache: true },
                children: [
                    {
                        path: "data",
                        component: () => import("@/views/personal/analyze/data.vue"),
                        name: "data",
                        meta: { title: "data", icon: "data", noCache: true }
                    }
                ]
            },
            {
                path: "account",
                name: "account",
                component: LayoutPersonal,
                redirect: "personal/account/myMaterial",
                meta: { title: "account", icon: "account", noCache: true },
                children: [
                    {
                        path: "myMaterial",
                        component: () => import("@/views/personal/account/myMaterial.vue"),
                        name: "myMaterial",
                        meta: { title: "myMaterial", icon: "myMaterial", noCache: true }
                    },
                    {
                        path: "myCollect",
                        component: () => import("@/views/personal/account/myCollect.vue"),
                        name: "myCollect",
                        meta: { title: "myCollect", icon: "myCollect", noCache: true }
                    }
                ]
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
interface routeItem {
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
        if (!store.getters.getUserInfo.id) {
            // 判断页面是否刷新
            store
                .dispatch("GET_USER_INFO")
                .then(() => {
                    // 拉取user_info
                    next({
                        path: to.path,
                        query: to.query,
                        params: to.params,
                        replace: false
                    })
                })
                .catch(() => {
                    const path = "/login"
                    next({
                        path: path,
                        query: { redirect: to.fullPath },
                        replace: true
                    })
                })
        } else {
            next()
        }
    }
})
export default router
