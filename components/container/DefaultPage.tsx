import React, { Component, Fragment } from 'react'
import { PageHeader } from 'antd'


interface IProps {
    title: string
    subTitle?: string
    onBack?(event: Event): void
}

export default class DefaultPage extends Component<IProps, {}> {
    static defaultProps: IProps = {
        title: '',
        subTitle: '',
    }

    render() {
        const { title, subTitle } = this.props
        const pageHeaderProps = { title, subTitle }

        return (
            <Fragment>
                <PageHeader {...pageHeaderProps}/>
                {this.props.children}
            </Fragment>
        )
    }
}
