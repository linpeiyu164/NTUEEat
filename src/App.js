import './App.css';
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
