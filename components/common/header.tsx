import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import { IMenus } from '@/store/menu';
import autobind from 'autobind-decorator';
import { inject, observer } from 'mobx-react';


interface IProps {
    menus?: IMenus
}

@inject('menus')
@observer
@autobind
class Header extends Component<IProps, {}> {


    render() {
        return (
            <Layout.Header className="header">
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={[this.props.menus!.currentHeaderMenuIndex]}
                    onSelect={args => this.props.menus!.changeIndex(args.key)}
                    style={{ lineHeight: '64px' }}
                >
                    {this.props.menus!.menus.map((item, index) => (
                        <Menu.Item key={`${index+1}`}>{item.name}</Menu.Item>
                    ))}
                </Menu>
            </Layout.Header>
        )
    }
}

export default Header;