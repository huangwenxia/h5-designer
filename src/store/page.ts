import { Module } from "vuex"
import { GlobalDataProps } from "./index"

export interface PageStateProps {
    elements: Array<ElementsType>
    currentElementsId: string
    currentElement: ElementsType
    currentPageId: string
}
export interface ElementsType {
    style: StyleType
    type: string
    id: string
    text?: string
    attrs: { src?: string }
    animateList: Array<AnimateType>
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
    fontStyle?: string
    transform?: string
}

export interface AnimateType {
    animateName: string
    label: string
    id?: string
    delay?: number //动画延迟时间
    duration?: number //动画完成时间
    iterationCount?: number //动画播放次数
    infinite?: boolean //循环
}
const editorModule: Module<PageStateProps, GlobalDataProps> = {
    state: {
        elements: [],
        currentElementsId: "",
        currentElement: {
            id: "",
            type: "",
            style: {},
            animateList: [],
            attrs: {}
        },
        currentPageId: ""
    },
    mutations: {
        elementAdd: (state: PageStateProps, data: ElementsType) => {
            state.elements.push(data)
            state.currentElementsId = data.id
            state.currentElement = state.elements.find((a) => a.id == data.id) || { id: "", type: "", style: {}, animateList: [], attrs: {} }
        },
        setCurrent: (state: PageStateProps, id: string) => {
            state.currentElementsId = id
            if (id) {
                state.currentElement = state.elements.find((a) => a.id == id) || { id: "", type: "", style: {}, animateList: [], attrs: {} }
            }
        },
        setElements: (state: PageStateProps, elements: Array<ElementsType>) => {
            state.elements = elements
        },
        setPageId: (state: PageStateProps, id: string) => {
            state.currentPageId = id
        }
    },
    getters: {
        getCurrentElement: (state) => {
            return state.elements.find((module) => module.id === state.currentElementsId)
        }
    }
}
export default editorModule
