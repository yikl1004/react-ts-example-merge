// menu
export interface IMenu {
    name: string
    link: string
    icon?: string
    children?: IMenu[]
}