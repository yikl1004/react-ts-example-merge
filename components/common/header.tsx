import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import { IMenus } from '@/store/menu';
import autobind from 'autobind-decorator';


interface IProps {
    menus: IMenus
}

@autobind
class Header extends Component<IProps, {}> {

    public state = {
        menus: this.props.menus.menus || []
    }

    onSelectMenu(args: any) {
        this.props.menus.changeIndex(args.key);
    }

    render() {
        return (
            <Layout.Header className="header">
                <div className="logo" />
                {this.state.menus.length ?
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['1']}
                        onSelect={this.onSelectMenu}
                        style={{ lineHeight: '64px' }}
                    >
                        {this.state.menus.map((item, index) => (
                            <Menu.Item key={`${index+1}`}>{item.name}</Menu.Item>
                        ))}
                    </Menu>
                    : null
                }
            </Layout.Header>
        )
    }
}

export default Header;