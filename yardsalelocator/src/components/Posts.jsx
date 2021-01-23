import React, { Component } from 'react'
import axios from 'axios'
import ReactTable from "react-table"; 
import 'react-table/react-table.css'
import CreatePost from './CreatePost';
import { Link, Route } from 'react-router-dom';
import { Button } from 'reactstrap';

//Axios info site: github.com/axios/axios

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
   <Button>
   <Link to='/createpost'>Create New Post </Link>
   </Button>
   <Route path='/createpost' 
        component={CreatePost}/> 
   </div>
   </>
    )
  }
}

//Fetch example from Darrin Deal Video https://vimeo.com/showcase/7506077/video/395976709
// constructor(props) {
//   super(props);

//   this.state = {
//     posts: []
//   }
// }

// componentDidMount() {
//   fetch("http://localhost:3306/yardsalebe/posts")
//   .then((req) => req.json())
//   .then(data => this.setState({posts: data}));

// }

// return (
//   <div>
//     {this.state.posts.map((item, index) => (
//       <div key={index}>
//       <h1>{item.title}</h1>
//       <p>{item.author}</p>
//       </div>
//     ))}
//   </div>
// )

//fetch info site: developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch   to post, button uses a fecth command, needed: URL, method, and body.