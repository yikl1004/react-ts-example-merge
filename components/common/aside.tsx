import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { inject, observer } from 'mobx-react'
import { IMenu } from '@/typings/menu';
import { IMenus } from '@/store/menu';


interface IProps {
    menus: IMenus
}

@inject('menus')
@observer
class Aside extends Component<IProps, {}> {

    getCurrentMenu(): IMenu[] {
        const index = +this.props.menus.currentHeaderMenuIndex - 1
        console.log(this.props.menus.menus[index])
        return this.props.menus.menus[index].children || [];
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
                { this.getCurrentMenu().map((menu, index) => (
                    <Menu.SubMenu
                        key={`sub${index + 1}`}
                        title={ menu.icon ? 
                            <span>
                                <Icon type={menu.icon} />
                                {menu.name}
                            </span>
                            :
                            menu.name
                        }
                    >
                        { Array.isArray(menu.children) && menu.children.map((child, index2) => (
                            <Menu.Item key={`${index + 1}-${index2 + 1}`}>{child.name}</Menu.Item>
                        ))}
                    </Menu.SubMenu>
                ))}
                </Menu>
            </Layout.Sider>
        )
    }
}

export default Aside;