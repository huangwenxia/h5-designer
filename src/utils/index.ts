import { ElementsType, AnimateType } from "@/store/page"

/**
 * 生成一个用不重复的ID
 */
export function genNonDuplicateID(randomLength: number | undefined) {
    return Number(Math.random().toString().substr(3, 6) + Date.now())
        .toString(36)
        .substr(0, randomLength)
}
/**
 * @description     对象深拷贝
 *
 * @param       { source:Object }         source为需要拷贝的源对象
 * @return      { Object }                返回拷贝后的新的对象
 *
 * */
export function deepClone<T extends Array<T> | any>(sourceData: T): T {
    if (Array.isArray(sourceData)) {
        return sourceData.map((item) => deepClone(item)) as T
    }
    if (typeof sourceData !== "object" || sourceData === null) {
        return sourceData
    }
    const obj: T = {} as T
    for (const key in sourceData) {
        if (typeof sourceData[key] === "object" && sourceData[key] !== null) {
            obj[key] = deepClone(sourceData[key])
        } else {
            obj[key] = sourceData[key]
        }
    }
    return obj
}

interface Style {
    [key: string]: string | number | undefined
}
export function styleToString(style: Style): string {
    if (style == null || style == undefined) return ""
    return Object.keys(style)
        .map((a) => {
            let value = style[a]
            if (
                [
                    "fontSize",
                    "borderRadius",
                    "width",
                    "height",
                    "right",
                    "lineHeight",
                    "top",
                    "left",
                    "marginBottom",
                    "marginTop",
                    "marginLeft",
                    "marginRight",
                    "paddingBottom",
                    "paddingTop",
                    "paddingLeft",
                    "paddingRight",
                    "borderTopWidth",
                    "borderRightWidth",
                    "borderBottomWidth",
                    "borderLeftWidth",
                    "borderBottomRightRadius",
                    "borderTopLeftRadius",
                    "borderBottomLeftRadius",
                    "borderTopRightRadius",
                    "borderWidth"
                ].indexOf(a) > -1 &&
                value
            ) {
                value = +parseFloat(value + "").toFixed(2) + "px"
            }
            return a.replace(/([A-Z])/g, "-$1".toLocaleLowerCase()).toLocaleLowerCase() + ":" + value
        })
        .join(";")
}

export function startAnimate(element: ElementsType): void {
    if (!element.id) return

    const dom = document.getElementById("element-" + element.id)
    const animations: Array<AnimateType> = element.animateList
    let index = 0
    dom?.classList.add("animate__animated")
    const action = () => {
        dom?.classList.add(animations[index].animateName)
        if (dom) {
            if (animations[index].delay) {
                dom.style.animationDelay = animations[index].delay + "s"
            }
            if (animations[index].duration) {
                dom.style.animationDuration = animations[index].duration + "s"
            }
            if (animations[index].infinite) {
                dom.style.animationIterationCount = "infinite"
            } else if (animations[index].iterationCount) {
                dom.style.animationIterationCount = animations[index].iterationCount + ""
            }
        }
        const delay = animations[index].delay || 0
        const duration = animations[index].duration || 0
        const time = (Number(duration) + Number(delay)) * 1000
        setTimeout(() => {
            index++
            dom?.classList.remove(animations[index - 1].animateName)
            if (index != animations.length) {
                action()
            }
        }, time)
    }

    action()
}

import html2canvas from "html2canvas"

// 生成快照
export const convertToImage = (container: HTMLElement, options = {}): Promise<string> => {
    // 设置放大倍数
    const scale = window.devicePixelRatio

    // 传入节点原始宽高
    const width = container.offsetWidth
    const height = container.offsetHeight

    // html2canvas配置项
    const ops = {
        scale,
        width,
        height,
        useCORS: true,
        allowTaint: false,
        ...options
    }

    return html2canvas(container, ops).then((canvas) => {
        // 返回图片的二进制数据
        return canvas.toDataURL("image/jpg")
    })
}
