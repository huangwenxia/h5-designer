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
    for (let key in sourceData) {
      if (typeof sourceData[key] === "object" && sourceData[key] !== null) {
        obj[key] = deepClone(sourceData[key])
      } else {
        obj[key] = sourceData[key]
      }
    }
    return obj
  }