import { computed, Ref } from "vue"
import { useStore, Store } from "vuex"
import { ElementsType, StyleType } from "@/store/page"
import { GlobalDataProps } from "@/store"
let store: Store<GlobalDataProps>
let moduleList: Ref<Array<ElementsType>>

interface eventType {
    startX: number
    startY: number
    moveable: boolean
    startW: number
    startH: number
    currentIndex: number | null
    direction: string | null
    cloneEle: HTMLElement | undefined
    editIndexMap: Array<number>
    eles: Array<elType>
    endX: number
    endY: number
}
interface elType {
    ele?: ElementsType
    startL: number
    startT: number
    startW: number
    startH: number
    top?: number
    width?: number
    left?: number
    height?: number
}
interface newStyleType {
    [key: string]: string | number | undefined
    top?: number
    left?: number
    width?: number
    height?: number
}
const dragEvent: eventType = {
    startX: 0,
    startY: 0,
    moveable: false,
    startW: 0,
    startH: 0,
    currentIndex: -1,
    direction: "",
    cloneEle: undefined,
    editIndexMap: [],
    eles: [],
    endX: 0,
    endY: 0
}
function onMousedown(e: MouseEvent): void {
    if (e.button === 2) return //忽略鼠标右键
    const target = e.currentTarget as HTMLElement
    dragEvent.moveable = true
    dragEvent.startX = e.pageX
    dragEvent.startY = e.pageY
    dragEvent.direction = target.getAttribute("data-direction")
    dragEvent.currentIndex = Number(target.getAttribute("data-index"))
    const ele: ElementsType = moduleList.value[dragEvent.currentIndex]
    const startL = ele.style?.left || 0
    const startT = ele.style?.top || 0
    const startW = ele.style?.width || 0
    const startH = ele.style?.height || 0
    dragEvent.eles = [
        {
            ele: ele,
            startL: startL,
            startT: startT,
            startW: startW,
            startH: startH
        }
    ]

    store.commit("setCurrent", ele.id)
    document.addEventListener("mousemove", onMousemove, false)
    document.addEventListener("mouseup", onMouseup, false)
}

type ReturnType = {
    onMousedown: (e: MouseEvent) => void
}
const mouseHook = (): ReturnType => {
    store = useStore()
    moduleList = computed(() => store.state.page.elements)

    const app: HTMLElement | null = document.getElementById("app")
    app && app.addEventListener("mousedown", docMousedown)
    return { onMousedown }
}
export default mouseHook
function docMousedown() {
    store.commit("setCurrent", "")
}
function onMousemove(e: MouseEvent) {
    if (!dragEvent.moveable) return
    e.preventDefault()
    dragEvent.endX = e.pageX
    dragEvent.endY = e.pageY
    const getNewStyle = (item: elType) => {
        const newStyle: newStyleType = {}
        switch (dragEvent.direction) {
            case "m":
                newStyle.left = item.startL + dragEvent.endX - dragEvent.startX
                newStyle.top = item.startT + dragEvent.endY - dragEvent.startY
                break
            case "n":
                newStyle.top = item.startT + dragEvent.endY - dragEvent.startY
                newStyle.height = item.startH - dragEvent.endY + dragEvent.startY
                break
            case "e":
                newStyle.width = item.startW + dragEvent.endX - dragEvent.startX
                break
            case "s":
                newStyle.height = item.startH + dragEvent.endY - dragEvent.startY
                break
            case "w":
                newStyle.width = item.startW - dragEvent.endX + dragEvent.startX
                newStyle.left = item.startL + dragEvent.endX - dragEvent.startX
                break
            case "nw": {
                newStyle.left = item.startL + dragEvent.endX - dragEvent.startX
                const width = item.startW - dragEvent.endX + dragEvent.startX
                const height = (width * item.startH) / item.startW
                newStyle.width = width
                newStyle.height = height
                newStyle.top = item.startT - height + item.startH
                break
            }
            case "ne": {
                const width = item.startW + dragEvent.endX - dragEvent.startX
                const height = (width * item.startH) / item.startW
                newStyle.width = width
                newStyle.height = height
                newStyle.top = item.startT - height + item.startH
                break
            }
            case "se": {
                const width = item.startW + dragEvent.endX - dragEvent.startX
                const height = (width * item.startH) / item.startW
                newStyle.width = width
                newStyle.height = height
                break
            }
            case "sw": {
                newStyle.left = item.startL + dragEvent.endX - dragEvent.startX
                const width = item.startW - dragEvent.endX + dragEvent.startX
                const height = (width * item.startH) / item.startW
                newStyle.width = width
                newStyle.height = height
                break
            }
        }
        if (newStyle.width) {
            newStyle.width = Number(newStyle.width?.toFixed(2))
        }
        if (newStyle.height) {
            newStyle.height = Number(newStyle.height?.toFixed(2))
        }

        return newStyle
    }

    dragEvent.eles.map((a) => {
        const newStyle: newStyleType = getNewStyle(a)
        for (const i in newStyle) {
            a.ele && (a.ele.style[i] = newStyle[i])
        }
    })
}
function onMouseup() {
    dragEvent.moveable = false
}
