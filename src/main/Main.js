// import Button from '@material-ui/core/Button';
import Navbar from './Navbar'
import StoreList from "./StoreList"
import Store from "./Store"
import { 
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'  

export default function Main() {
    return (
        <div className="App">
          <Navbar />
          <Router className="down">
            <Route path="/stores">
              <div className="stores">
                <StoreList className="storeList"/>
              </div>
            </Route>
            
            <Route path="/storedetail" render={() => <Store/>}/> 
           </Router>
        </div>
        
      );
}
