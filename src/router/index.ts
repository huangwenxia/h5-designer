import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"
import store from "@/store"
import LayoutPersonal from "@/components/layout/LayoutPersonal.vue"
import LayoutContent from "@/components/layout/LayoutContent.vue"
const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "home",
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
        redirect: "/personal/design",
        meta: { title: "personal", icon: "personal", noCache: true },
        children: [
            {
                path: "design",
                component: LayoutPersonal,
                redirect: "/personal/design/myWorks",
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
                redirect: "/personal/analyze/data",
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
                redirect: "/personal/account/myMaterial",
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
    },
    {
        path: "/detail",
        name: "detail",
        component: () => import("@/views/detail/index.vue")
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})
interface routeItem {
    path: string
    name: string
    component: () => Promise<typeof import("*.vue")>
}
//???????????????????????????
const notfoundRoute: routeItem = {
    path: "/:catchAll(.*)",
    name: "404",
    component: () => import("@/views/public/404.vue")
}
router.addRoute(notfoundRoute)
router.beforeEach((to, from, next) => {
    store.commit("setSideBar", {
        currentRoute: to.path,
        currentMenu: to.matched.length == 1 ? to.matched[0].path : to.matched[1].path
    })

    const whiteList = ["/login", "/home", "/401", "/404", "/403", "/register"] // ???????????????????????????
    // next();return;//????????????????????????
    // initSideBar(to.path)
    if (to.path === "/" || whiteList.indexOf(to.path) != -1 || to.path.indexOf("login") > -1) {
        // ????????????????????????????????????
        next()
    } else {
        if (!store.getters.getUserInfo.id) {
            // ????????????????????????
            store
                .dispatch("GET_USER_INFO")
                .then(() => {
                    // ??????user_info
                    next({
                        path: to.path,
                        query: to.query,
                        params: to.params,
                        replace: false
                    })
                })
                .catch((err) => {
                    console.error(err)
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
