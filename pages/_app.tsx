import React from 'react'
import App, { Container } from 'next/app'
import autobind from 'autobind-decorator'

import { GlobalContext, RootStore } from '@/store'
import { Provider } from 'mobx-react'

import '@/static/_style.scss'  // default style
import 'antd/dist/antd.css' // ant-design\

import DefaultLayout from '@/components/container/DefaultLayout'


interface IState {
    globalStore: GlobalContext
}

interface IProps {
    Component: any
    pageProps: any
    initialStore: RootStore
}


@autobind
class MyApp extends App<IProps, IState> {
    // Only uncomment this method if you have blocking data requirements for
    // every single page in your application. This disables the ability to
    // perform automatic static optimization, causing every page in your app to
    // be server-side rendered.
    //
    static async getInitialProps(appContext: any) {
        const store: RootStore = new RootStore();
        
        appContext.ctx.mobxStore = store

        let appProps = await super.getInitialProps(appContext)
    
        return {
            ...appProps,
            initialStore: store
        }

    }

    render() {
        const { Component, pageProps, initialStore } = this.props;
        const store = process.browser ? new RootStore() : initialStore;

        return (
            <Container>
                <Provider {...store}>
                    <DefaultLayout>
                        <Component {...pageProps} />
                    </DefaultLayout>
                </Provider>
            </Container>
        );
    }
}

export default MyApp;