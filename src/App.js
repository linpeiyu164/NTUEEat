import logo from './logo.svg';
import './App.css';
import Main from './main/Main';
import Login from './main/Login.js/Login';
import react ,{ useState } from "react";
import { 
  BrowserRouter as Router,
  Switch,
  Route,
  Link
  } from 'react-router-dom'  

function App() {
  const [login, setLogin] = useState(false);
  const [username, setUsername] =useState('');
  function Login(){
  }
  return (
      <Router>
          <Route path="/" render={() => <Main username={username}/>}/>
          <Route path="/login" render={() =>  <Login setLogin={Login} setUsername={setUsername}/>}/>
      </Router>
  )
}

export default App;
