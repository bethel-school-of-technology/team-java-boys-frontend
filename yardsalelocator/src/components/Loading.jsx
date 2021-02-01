import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

export class Loading extends Component {
    
    componentDidMount() {
    //     let token = localStorage.getItem('userToken');
    //     setTimeout(()=>{
    //         console.log("loading")
    //     },2000)
        
    //     localStorage.setItem('userToken', token)
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