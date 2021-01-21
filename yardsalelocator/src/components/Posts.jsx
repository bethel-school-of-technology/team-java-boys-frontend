import React, { Component } from 'react'
import axios from 'axios'
import ReactTable from "react-table"; 
import 'react-table/react-table.css'
import CreatePost from './CreatePost';
import { Link, Route } from 'react-router-dom';

export default class Posts extends Component {
  constructor(props){
    super(props)
    this.state = {
      users: [],
      loading:true
    }
  }
  async getUsersData(){
    const res = await axios.get('https://jsonplaceholder.typicode.com/users')
    console.log(res.data)
    this.setState({loading:false, users: res.data})
  }
  componentDidMount(){
    this.getUsersData()
  }
  render() {
    const columns = [{  
      Header: 'ID',  
      accessor: 'id',
     }
     ,{  
      Header: 'Name',  
      accessor: 'name' ,
      }
     
     ,{  
     Header: 'Username',  
     accessor: 'username' ,
     }
     ,{  
     Header: 'Phone',  
     accessor: 'phone',
     },
     {  
      Header: 'Email',  
      accessor: 'email',
      },
      {  
        Header: 'Website',  
        accessor: 'website',
        }
  ]
    return (
        <> <h1>Yard Sale Postings (Sample Texted Used)</h1>
        <div style={{width:'80vw'}}>
      <ReactTable  
      data={this.state.users}  
      columns={columns} 
      defaultPageSize={10}
   />
   <Link to='/createpost'>Create New Post </Link>
   <Route path='/createpost' 
        component={CreatePost}/> 
   </div>
   </>
    )
  }
}

