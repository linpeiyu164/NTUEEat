import './App.css';
import React, { useState} from "react";
import Register from './Register'
import Random from './main/Random'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Navbar from './main/Navbar'
import Profile from './Profile'
import AddStore from './containers/AddStore';
import Mainbar from './main/Mainbar'
import Main from './main/Main'
// import { Grid } from '@material-ui/core'
import userContext from './userContext'
import Store from './containers/storeContainer'
import StoreMap from './StoreMap'
// import Geolocator from './Geolocator'
function App() {
  const [ user, setUser ] = useState(null)
  return (
    <>
    {/* <Geolocator /> */}
    {
      <>
      <Router>
        <userContext.Provider value={{user, setUser}}>
            <Mainbar />
            <Route exact path="/">
              <Main />
            </Route>
            <Route path="/store/:id">
              <Store/>
            </Route>
            <Route path="/login" exact component={Register} />
            <Route path="/random" exact component={Random} />
            <Route path="/profile" exact component={Profile} />
            <Route path="/addstore" exact component={AddStore} />
        </userContext.Provider>
      </Router>
      </>
    }
    </>
  )
}
export default App;