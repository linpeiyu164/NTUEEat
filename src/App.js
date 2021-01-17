import './App.css';
<<<<<<< HEAD
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
import Review from './components/store/Review'
import BasicInfo from './components/store/BasicInfo';

function App() {
  const [login, setLogin] = useState(false);
  const [username, setUsername] =useState('');
  function Login(){
  }

  return (
    <BasicInfo/>
  )
  /*
=======
import React, { useState} from "react";
import Register from './Register'
import Random from './main/Random'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Navbar from './main/Navbar'
import Profile from './Profile'
// import { Grid } from '@material-ui/core'
import userContext from './userContext'
import Store from './containers/storeContainer'

function App() {
  const [user, setUser] = useState(null)
>>>>>>> 61ae470bfe1af4b9a5017e40f0f605dc87258263
  return (
    <Store/>
    /*
    <>
      <Router>
        <userContext.Provider value={{user, setUser}}>
            <Route path="/" exact component={Navbar} />
            <Route path="/login" exact component={Register} />
            <Route path="/main" />
            <Route path="/random" exact component={Random} />
            <Route path="/profile" exact component={Profile} />
        </userContext.Provider>
      </Router>
    </>
    */
  )
}
export default App;
