import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { IMenus } from '@/store/menu';
import autobind from 'autobind-decorator';
import { inject, observer } from 'mobx-react';


interface IProps {
    menus?: IMenus
}

@inject('menus')
@observer
@autobind
class Aside extends Component<IProps, {}> {

    render() {
        return (
            <Layout.Sider width={200} style={{ background: '#fff' }}>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1-1']}
                    defaultOpenKeys={['sub1']}
                    style={{ height: '100%', borderRight: 0 }}
                >
                    {
                        this.props.menus!.currentMenu.map((menu, index) => (
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
                        ))
                    }
                </Menu>
            </Layout.Sider>
        )
    }
}

export default Aside;