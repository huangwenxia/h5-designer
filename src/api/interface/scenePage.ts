export interface listrow {
    id: number
    name: string
    desc: string
    sortIndex: number
    cover: string
    elements: string
    properties: string
    elementsPublish: string
    sceneId: number
    createdAt: string
    updatedAt: string
}

export interface listparam {
    sceneId: number
}

export interface saveparam {
    name: string
    sceneId: number
    cover?: string
    sortIndex?: string
    properties?: string
    elements?: string
}

export interface updateparam {
    id: number
    name?: string
    cover?: string
    sortIndex?: string
    properties?: string
    elements?: string
}
