import React, { Component, Fragment } from 'react'
import DefaultPage from '@/components/container/DefaultPage';
import Wow from './components/wow';


export default class About extends Component {
    render() {
        return (
            <Fragment>
                <DefaultPage>
                    <div>WOW</div>
                    <Wow/>
                </DefaultPage>
            </Fragment>
        )
    }
}