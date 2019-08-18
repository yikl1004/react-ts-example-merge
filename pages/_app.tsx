import React from 'react'
import App, { Container } from 'next/app'
import autobind from 'autobind-decorator'
import { Layout, Breadcrumb } from 'antd'

import Header from '@/components/common/header'
import Aside from '@/components/common/aside'

import '@/static/_style.scss'  // default style
import 'antd/dist/antd.css' // ant-design

import { GlobalContextProvider, GlobalContext, RootStore } from '@/store'


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
                <GlobalContextProvider value={{ rootStore: store}}>
                    <Layout>
                        <Header menus={store.menus}/>
                        <Layout hasSider>
                            <Aside menus={store.menus}/>
                            <Layout style={{ padding: '0 24px 24px' }}>
                                <Breadcrumb style={{ margin: '16px 0' }}>
                                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                                    <Breadcrumb.Item>List</Breadcrumb.Item>
                                    <Breadcrumb.Item>App</Breadcrumb.Item>
                                </Breadcrumb>
                                <Layout.Content
                                    style={{
                                        background: '#fff',
                                        padding: 24,
                                        margin: 0,
                                        minHeight: 280,
                                    }}
                                >
                                    <Component {...pageProps} />
                                </Layout.Content>
                            </Layout>
                        </Layout>
                    </Layout>
                </GlobalContextProvider>
            </Container>
        );
    }
}

export default MyApp;