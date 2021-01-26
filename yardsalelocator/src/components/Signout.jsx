import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'


export class Signout extends Component {
    userAuth=false;
    render() {
        return (
            <div>
                <Redirect to="/" />
            </div>
        )
    }
}

export default Signout
