import { createStore } from "vuex"
import page, { PageStateProps } from "./page"
import user, { UserStateProps } from "./user"
import app, { AppStateProps } from "./app"
import * as I from "@/api/interface";
export interface GlobalDataProps {
    page: PageStateProps
    user: UserStateProps
    app: AppStateProps<I.app.SideBar>
}
export default createStore<GlobalDataProps>({
    state: {
        page: {} as PageStateProps,
        user: {} as UserStateProps,
        app: {} as AppStateProps<I.app.SideBar>,
    },
    mutations: {},
    actions: {},
    modules: { page, user,app }
})
