import { createContext, useContext } from 'react'
import { useStaticRendering } from 'mobx-react'
import { toJS } from 'mobx'
import jsonStringifySafe from 'json-stringify-safe'
import { createMenus, IMenus } from '@/store/menu'


useStaticRendering(!process.browser);



export class RootStore {
    menus: IMenus;

    constructor(store: RootStore) {
        this.menus = createMenus(typeof store !== 'undefined' ? store.menus : null);
    }
}

export const initStore = (store: RootStore | undefined): RootStore =>
    new RootStore(store as RootStore);

// on Server
export const dehydrate = (store: RootStore) => 
    jsonStringifySafe(toJS(store));

// on Client
export const rehydrate = () => 
    initStore((window as any).__STATE);







/**
 * @description 함수형 컴포넌트에서 ContextAPI를 사용하는 경우 아래 참고!!!!
 */
// global context
export interface GlobalContext {
  rootStore: RootStore
}
export const globalContext = createContext<GlobalContext>({} as GlobalContext);

// Provider & Consumer
export const GlobalContextProvider = globalContext.Provider;
export const GlobalContextConsumer = globalContext.Consumer;

// like hooks utils
export const useMenus = () => {
  const global = useContext(globalContext);

  return global.rootStore.menus;
}