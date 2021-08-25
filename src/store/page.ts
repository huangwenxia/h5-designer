import { Module } from "vuex"
import { GlobalDataProps } from "./index"

export interface PageStateProps {
    elements: Array<ElementsType>
    currentElementsId: string
    currentElement: ElementsType
}
export interface ElementsType {
    style: StyleType
    type: string
    id: string
    text?: string
    attrs?: { src: string }
}
export interface StyleType {
    [key: string]: string | number | undefined
    fontSize?: number
    color?: string
    backgroundColor?: string
    textAlign?: string
    opacity?: number
    borderRadius?: string
    borderWidth?: number
    borderStyle?: string
    borderColor?: string
    left?: number
    top?: number
    width?: number
    height?: number
    lineHeight?: number
    fontWeight?: string
    textDecoration?: string
    zIndex?: number
    boxShadow?: string
    textAlignLast?: string
}
const editorModule: Module<PageStateProps, GlobalDataProps> = {
    state: {
        elements: [],
        currentElementsId: "",
        currentElement: {
            id: "",
            type: "",
            style: {}
        }
    },
    mutations: {
        elementAdd: (state: PageStateProps, data: ElementsType) => {
            state.elements.push(data)
            state.currentElementsId = data.id
        },
        setCurrent: (state: PageStateProps, id: string) => {
            state.currentElementsId = id
            if (id) {
                state.currentElement = state.elements.find((a) => a.id == id) || { id: "", type: "", style: {} }
            }
        }
    },
    getters: {
        getCurrentElement: (state) => {
            return state.elements.find((module) => module.id === state.currentElementsId)
        }
    }
}
export default editorModule
