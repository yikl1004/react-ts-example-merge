import { observable, action, computed } from "mobx"
import { IMenu } from "@/typings/menu"
import autobind from "autobind-decorator"
import axios from 'axios'


export interface IMenus {
    currentHeaderMenuIndex: string
    menus: IMenu[]
    changeIndex(idx: string): void
    currentMenu: IMenu[]
}

@autobind
class Menus implements IMenus {
    
    @observable
    public currentHeaderMenuIndex: string = '1'
    
    @observable
    public menus: IMenu[] = [];

    @computed
    get currentMenu(): IMenu[] {
        const index: number = +this.currentHeaderMenuIndex - 1

        return this.menus[index]['children'] || []
    }

    @action
    public changeIndex(idx: string): void {
        console.log(this);
        this.currentHeaderMenuIndex = idx;
    }

    @action
    async getMenusData() {
        const res = await axios.get('/static/json/menu.json')
        console.log(res);
    }
}

export const createMenus = () => {
    return new Menus();
};