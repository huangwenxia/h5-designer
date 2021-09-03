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

export function styleToString(style: any): string {
    if (style == null || style == undefined) return ""
    return Object.keys(style)
        .map((a) => {
            var value = style[a]
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
                ].indexOf(a) > -1
            ) {
                value = +parseFloat(value).toFixed(2) + "px"
            }
            return a.replace(/([A-Z])/g, "-$1".toLocaleLowerCase()).toLocaleLowerCase() + ":" + value
        })
        .join(";")
}

export function startAnimate(element: ElementsType) {
    if (!element.id) return

    var dom = document.getElementById("element-" + element.id)
    var animations: Array<AnimateType> = element.animateList
    var index = 0
    dom?.classList.add("animate__animated")
    var action = () => {
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
        let delay = animations[index].delay || 0
        let duration = animations[index].duration || 0
        let time = (Number(duration) + Number(delay)) * 1000
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
