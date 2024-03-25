export interface datacrumb {
    title: string
    path: string
    withLang?: boolean
}
export interface Stat {
    count: number
    alias: string
}
export interface resourceRightNav {
    id: number
    name: string
    parentId: number | null
    folders: any[]
}
export interface resourceRightNavLink {
    name: string
    id: number
    active?: boolean
}
export interface resourceNav {
    title: string
    Children: resourceNavLink[]
}
export interface resourceNavLink {
    title: string
    id: number
    active?: boolean
}
export type ResourceType = 'DOCX' | 'PDF' | 'HTML'
export interface DataItem {
    title: string
    icon: JSX.Element
    children?: {
        title: JSX.Element | string
        path: string
    }[]
    link?: string
}
export interface resourceItem {
    title: string
    id: number
    parentId: number
    type?: string
    folders?: any[]
}
export interface resource {
    name: string
    id: number
    type: string
    parentId: number
    children?: resourceItem[]
    order?: number
    folders?: resourceItem[]
    deleteItem?: any //(id: string) => void | undefined | any;
    file_path?: string
    language?: string
    isDeleted?: boolean
}
export type FileFormatType = {
    type: string
    icon: React.ReactNode
}
export type FormatType = ResourceType

export interface TableProps {
    columns: string[]
    data: { [key: string]: any }[] // Update the type of the 'data' prop
    withPermissions?: boolean
    Icon?: Boolean
    withActions?: boolean
    pagination?: React.ReactNode
    onDelete?: (id: number, onclose: () => void) => void
    deleteTiltlePopup?: string
    deleteDescriptionPopup?: string
    exportToExcel?: (data: any[]) => void
    title?: string
    messageTitle?: string
    newPicture?: Boolean
    isLoading?: boolean
    isFailed?: boolean
    typeofUpdate?: (string & 'link') | 'popup'
    UPath?: string
    onUpdateForm?: (id: number, closemodal: any) => React.ReactNode
    updateTitlepopup?: string
    // setPage : (page:number)=>void
    // setLimit : (page:number)=>void
}
export interface NotesCardProps {
    id: string
    slug: string
    date: string
    title: string
    level: string
    source: string
    specialities: string[]
    pathology: string
}


export interface ScrollIntoViewAnimation {
    /** target element alignment relatively to parent based on current axis */
    alignment?: 'start' | 'end' | 'center';
}