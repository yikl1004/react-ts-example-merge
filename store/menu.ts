import { observable, action } from "mobx";
import { IMenu } from "@/typings/menu";


export interface IMenus {
    currentHeaderMenuIndex: string
    menus: IMenu[]
    changeIndex(idx: string): void
}

class Menus implements IMenus {
    
    @observable currentHeaderMenuIndex: string = '1'
    
    @observable menus = [
        {
            name: 'nav 1',
            link: '/',
            children: [
                {
                    name: 'subnav 1',
                    link: '/',
                    icon: 'user',
                    children: [
                        { name: 'option 1', link: '/' },
                        { name: 'option 2', link: '/' },
                        { name: 'option 3', link: '/' },
                        { name: 'option 4', link: '/' }
                    ],
                },
                {
                    name: 'subnav 2',
                    link: '/',
                    icon: 'laptop',
                    children: [
                        { name: 'option 5', link: '/' },
                        { name: 'option 6', link: '/' },
                        { name: 'option 7', link: '/' },
                        { name: 'option 8', link: '/' }
                    ],
                },
                {
                    name: 'subnav 3',
                    link: '/',
                    icon: 'notification',
                    children: [
                        { name: 'option 9', link: '/' },
                        { name: 'option 10', link: '/' },
                        { name: 'option 11', link: '/' },
                        { name: 'option 12', link: '/' }
                    ],
                },
            ]
        },
        {
            name: 'nav 2',
            link: '/',
        }
    ]

    @action.bound
    changeIndex(idx: string): void {
        this.currentHeaderMenuIndex = idx
    }
}

export const createMenus = () => {
    return new Menus();
};