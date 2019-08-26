import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import autobind from 'autobind-decorator';

import { IMenus } from '@/store/menu';
import { IMenu } from '@/typings/menu';

import { Icon, Layout, Menu } from 'antd';


interface IProps {
    menus?: IMenus
}

interface IState {
    currentMenu: IMenu[]
}

@inject('menus')
@observer
@autobind
class Aside extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props)
        this.state = {
            currentMenu: (this.props.menus as IMenus).currentMenu
        }
    }

    subMenuTitleRender(menu: IMenu): JSX.Element | string {
        if ( menu.icon ) {
            return (
                <span>
                    <Icon type={menu.icon} />
                    {menu.name}
                </span>
            )
        } else {
            return menu.name;
        }
    }

    renderMenuItems(): (JSX.Element | null)[] {
        return this.state.currentMenu.map((menu: IMenu, index: number) => (
            menu.children ?
                <Menu.SubMenu
                    key={`sub${index + 1}`}
                    title={ this.subMenuTitleRender(menu) }
                >
                    { (menu['children'] || []).map((child, index2) => (
                        <Menu.Item key={`${index + 1}-${index2 + 1}`}>
                            {child.name}
                        </Menu.Item>
                    )) }
                </Menu.SubMenu>
                : null
        ))
    }

    render() {
        return (
            <Layout.Sider width={200} style={{ background: '#fff' }}>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1-1']}
                    defaultOpenKeys={['sub1']}
                    style={{ height: '100%', borderRight: 0 }}
                >
                    { this.renderMenuItems() }
                </Menu>
            </Layout.Sider>
        )
    }
}

export default Aside;