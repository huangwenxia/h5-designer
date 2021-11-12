import { Module, ActionTree, Commit } from "vuex"
import * as I from "@/api/interface/index"
import { GlobalDataProps } from "@/store/index"
import api from "@/api/index"
import { deepClone } from "@/utils"
import { ref } from "vue";

export interface AppStateProps <T>{
    sidebar:T
}
const currentMenu:string = '';
const appModule: Module<AppStateProps<I.app.SideBar>, GlobalDataProps> = {
    state: {
        sidebar: {
            selectedKeys: [],
            openKeys: [],
        },
    },
    mutations: {
        setSideBar: (state:AppStateProps<I.app.SideBar>,data:I.app.CurrSideBar,) => {
            state.sidebar.selectedKeys.pop();
            state.sidebar.openKeys.pop();
            state.sidebar.selectedKeys.push(data.currentRoute)
            state.sidebar.openKeys.push(data.currentMenu)
        },
        setOpenKeys: (state:AppStateProps<I.app.SideBar>,data:string[],) => {
            state.sidebar.openKeys = data;
        },
    },
    getters: {
        getSideBar: (state:AppStateProps<I.app.SideBar>,data:I.app.CurrSideBar,) => {
            return state.sidebar
        }
    },
    actions: <ActionTree<AppStateProps<I.app.SideBar>, GlobalDataProps>>{

    }
}

export default appModule
