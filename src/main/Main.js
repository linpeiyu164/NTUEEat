// import Button from '@material-ui/core/Button';
import Navbar from './Navbar'
import StoreList from "./StoreList"
// import Store from "./Store"
import { 
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'  

export default function Main() {
    return (
        <div className="main">
          
          {/* <h1>hello</h1> */}

          <div className="stores">
            <StoreList className="storeList"/>
          </div>

        </div>
        
      );
}
