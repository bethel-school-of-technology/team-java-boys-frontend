import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

export class Loading extends Component {
    
    componentDidMount() {
        window.location.reload();
    }


    render() {
        return (
            <div>
                <Redirect to="/post" />
            </div>
        )
    }
}

export default Loading