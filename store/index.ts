import { createMenus } from '@/store/menu';
import { createContext, useContext } from 'react';


export class RootStore {
    menus = createMenus();
}

// global context
export interface GlobalContext {
  rootStore: RootStore
}

export const globalContext = createContext<GlobalContext>({} as GlobalContext);
export const GlobalContextProvider = globalContext.Provider;
export const GlobalContextConsumer = globalContext.Consumer;

export const useTodos = () => {
  const global = useContext(globalContext);

  return global.rootStore.menus;
}