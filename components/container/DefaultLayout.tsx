import React, { Component } from 'react'
import autobind from 'autobind-decorator'

import { Layout, Breadcrumb } from 'antd'
import Aside from '@/components/common/aside'
import Header from '@/components/common/header'


@autobind
export default class DefaultLayout extends Component {
    render() {
        return (
            <Layout>
                <Header/>
                <Layout hasSider>
                    <Aside/>
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
                            { this.props.children }
                        </Layout.Content>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}
