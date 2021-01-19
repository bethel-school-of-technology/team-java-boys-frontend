import Navbar from "./components/Navbar";
import {BrowserRouter as Router} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div>
      <Router>
      <Navbar/>
      This will continue to be content.
      </Router>
    </div>
  );
}

export default App;
