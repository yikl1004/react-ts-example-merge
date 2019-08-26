import { observable, action, computed, runInAction } from "mobx"
import autobind from "autobind-decorator"
import axios from 'axios'
import { configure } from 'mobx'
import { IMenu } from "@/typings/menu"


configure({ enforceActions: 'observed' })


export interface IMenus {
    currentHeaderMenuIndex: string
    menus: IMenu[]
    changeIndex(idx: string): void
    currentMenu: IMenu[]
    getMenusData(): void
}

@autobind
class Menus implements IMenus {
    
    @observable
    public currentHeaderMenuIndex: string = '1'
    
    @observable
    public menus: IMenu[] = [];

    constructor(store: IMenus | null) {
        if ( store !== null ) {
            this.menus = store.menus
            this.currentHeaderMenuIndex = store.currentHeaderMenuIndex
        }
    }

    @computed
    get currentMenu(): IMenu[] {
        const index: number = +this.currentHeaderMenuIndex - 1
        if ( index > -1 && index < this.menus.length && typeof this.menus[index].children !== 'undefined' ) {
            return this.menus[index].children as IMenu[]
        } else {
            return [];
        }
    }

    @action
    public changeIndex(idx: string): void {
        this.currentHeaderMenuIndex = idx;
    }

    @action
    async getMenusData() {
        try {
            const res = await axios.get('http://localhost:8000/static/json/menu.json')
            runInAction(() => {
                this.menus = res.data;
            });
        } catch(err) {
            runInAction(() => {
                this.menus = [];
            })
        }
    }
}

export const createMenus = (store: IMenus | null): IMenus => {
    return new Menus(store);
};