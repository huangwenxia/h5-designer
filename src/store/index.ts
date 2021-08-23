import { createStore } from "vuex"
import page, { PageStateProps } from "./page"

export interface GlobalDataProps {
    page: PageStateProps
  }

export default createStore<GlobalDataProps>({
    state: {
        page: {} as PageStateProps
    },
    mutations: {},
    actions: {},
    modules: {page}
})
