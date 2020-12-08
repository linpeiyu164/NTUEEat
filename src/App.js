import logo from './logo.svg';
import './App.css';
import Main from './main/Main';
import Login from './main/Login.js/Login';
import { BrowserRouter as Router, Route} from 'react-router-dom'  
import { useState } from 'react';
import AddStore from './main/addStore';

function App() {
  const [login, setLogin] = useState(false);
  const [username, setUsername] = useState('');
  function Login(){
  }

  return (
    <AddStore/>
  )
  /*
  return (
      <Router>
          <Route path="/" render={() => <Main username={username}/>}/>
          <Route path="/login" render={() =>  <Login setLogin={setLogin} setUsername={setUsername}/>}/>
      </Router>
  )
  */
}

export default App;
