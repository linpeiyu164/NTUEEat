import { Select } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Navbar from './Navbar'
import { BrowserRouter as Router, Route} from 'react';
function Main(props) {
    return (
        <div className="App">
          <Navbar />
          <div className="down">
            <Router>
              <Route path="/stores">
                <div className="stores">
                  <div className="store"></div>
                </div>
              </ Route>
            </Router>
          </div>
        </div>
      );
}

export default Main;