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
