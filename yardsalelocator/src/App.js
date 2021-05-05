import MyNavbar from "./components/Navbar";
import './App.css';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import CreatePost from './components/CreatePost';
import Home from './components/Home';
import Login from './components/Login';
import Posts from './components/Posts';
import Profile from './components/Profile';
import Signout from './components/Signout';
import Signup from './components/Signup';
import Loading from "./components/Loading";
import EditProfile from "./components/EditProfile";
import EditPost from "./components/EditPost";



function App() {
  return (
    <div>

      <div>
        <Router>
          <MyNavbar />
          <Route exact path='/' component={Home} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Signup} />
          <Route path='/post' component={Posts} />
          <Route path='/profile' component={Profile} />
          <Route path='/signout' component={Signout} />
          <Route path='/createpost' component={CreatePost} />
          <Route path='/loading' component={Loading} />
          <Route path='/editprofile' component={EditProfile} />
          <Route path='/editpost' component={EditPost} />
        </Router>
      </div>
    </div>

  );
}

export default App;
