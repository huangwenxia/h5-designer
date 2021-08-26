import { createStore } from "vuex"
import page, { PageStateProps } from "./page"
import user, { UserStateProps } from "./user"
export interface GlobalDataProps {
    page: PageStateProps
    user: UserStateProps
}
export default createStore<GlobalDataProps>({
    state: {
        page: {} as PageStateProps,
        user: {} as UserStateProps
    },
    mutations: {},
    actions: {},
    modules: { page, user }
})
