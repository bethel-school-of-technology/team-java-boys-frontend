import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'


export class Signout extends Component {
    componentDidMount() {
        window.localStorage.clear();
        }

    render() {
        return (
            <div>
                <Redirect to="/" />
            </div>
        )
    }
}

export default Signout
