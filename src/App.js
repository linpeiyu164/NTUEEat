//import logo from './logo.svg';
import './App.css';
//import Main from './main/Main';
//import Login from './main/Login.js/Login';
import { useState } from 'react';
import AddStore from './containers/AddStore';
import { 
  BrowserRouter as Router,
  Switch,
  Route,
  Link
  } from 'react-router-dom'  
import { render } from 'ejs';
import Store from './containers/storeContainer';

function App() {
  const [login, setLogin] = useState(false);
  const [username, setUsername] =useState('');
  function Login(){
  }

  return (
    <Store/>
  )
  /*
  return (
      <Router>
          <Route path="/" render={() => <Main username={username}/>}/>
          <Route path="/login" render={() =>  <Login setLogin={setLogin} setUsername={setUsername}/>}/>
      </Router>
    <Router>
      { <Switch> }
        <Route path="/" render={() => <Main username={username}/>}/>          
        <Route path="/Login" render={() => <Login setLogin={login} setUsername={username}/>}/>
        { <Route path="/AddStore" render={() => <Addstore username={username}/>}/> }
      { </Switch>  }
    </Router>

  )
  */
}
export default App;
