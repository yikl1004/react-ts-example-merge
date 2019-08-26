import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import autobind from 'autobind-decorator';

import { IMenus } from '@/store/menu';

import { Layout, Menu } from 'antd';
import { SelectParam } from 'antd/lib/menu';
import { IMenu } from '@/typings/menu';


interface IProps {
    menus?: IMenus
}

interface IState {
    menus: IMenu[]
    currentHeaderMenuIndex: string
}

@inject('menus')
@observer
@autobind
class Header extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            menus: this.props.menus!.menus,
            currentHeaderMenuIndex: this.props.menus!.currentHeaderMenuIndex
        }
    }

    onSelect(args: SelectParam) {
        if ( (this.props.menus as IMenus).changeIndex ) {
            (this.props.menus as IMenus).changeIndex(args.key) 
        }
    }

    render() {
        return (
            <Layout.Header className="header">
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={[this.state.currentHeaderMenuIndex]}
                    onSelect={this.onSelect}
                    style={{ lineHeight: '64px' }}
                >
                    { this.state.menus.map((item:IMenu, index: number) => (
                        <Menu.Item key={`${index+1}`}>{item.name}</Menu.Item>
                    )) }
                </Menu>
            </Layout.Header>
        )
    }
}

export default Header;