<<<<<<< HEAD
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
=======
import React from 'react'
import StoreMap from './StoreMap'
import Register from './Register'
function App(){
  return(
    <>
      {/* <StoreMap storename="新馬辣" coordinates={[25, 121]} location={"100台北市中正區汀州路三段295號"} rating={"4.3"}/> */}
      <Register />
    </>
>>>>>>> imageupload
  )
}
export default App;
