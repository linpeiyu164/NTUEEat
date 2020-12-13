import { Select } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Navbar from './Navbar'
import { 
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'  

function Main() {
    return (
        <div className="App">
          <Navbar />
          <Router className="down">
            <Route path="/stores">
              <div className="stores">
                <div className="store"></div>
              </div>
            </Route>
           </Router>
        </div>
        
      );
}
export default Main;