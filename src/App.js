import './App.css';
import React ,{ useState } from "react";
import Register from './Register'
import Random from './main/Random'
import { BrowserRouter as Router } from 'react-router-dom'
function App() {
  return (
    <Router>
      <Random />
    </Router>
  )
}
export default App;
