import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

export class Loading extends Component {
    
    componentDidMount() {
        let token = localStorage.getItem('userToken')
        setTimeout(()=>{
            console.log("loading")
        },2000)
        window.location.reload();
        localStorage.setItem('userToken', token)
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