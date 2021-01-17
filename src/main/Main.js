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
import axios from "axios"
import Alert from '@material-ui/lab/Alert';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { makeStyles, Snackbar , IconButton} from '@material-ui/core'
import { useState ,useEffect , useContext} from 'react'
import userContext from '../userContext'

const useStyles = makeStyles(theme => ({
  snackbar : {
    padding : theme.spacing(1)
  }
}))


const instance = axios.create({baseURL : "http://localhost:4000/stores"});
export default function Main() {
  
  let {user} = useContext(userContext)
  const classes = useStyles()
  const [content,setContents]=useState("") 
  
  const[location,setLocal]=useState("");
  const[price,setPrice]=useState("");
  const[prefer,setPrefer]=useState("");
  let [error,setError] = useState(null)
  //Select={location,price,prefer}
  const handleSetLocal = (e) => {
    setLocal(e)
  }
  const handleSetPrice = (e) => {
    setPrice(e)
  }
  const handleSetPrefer = (e) => {
    setPrefer(e)
  }
  const handleClose = (e) => {
    setError(false)
  }
  const handleError = () => {
      setError(false)
  }
  useEffect(async ()=>{
    const {data} = await instance.get("/");
    if(data.msg){
      setContents(null)
    }else if(data.Error){
      console.log(data.Error)
    }else{
      setContents(data);
    }
    console.log(location,price,prefer)
  },[])

  const Submit=async()=>{
    const {data} = await instance.post("/",{
      pricing:price,
      location:location,
      preferences:prefer
    });
    if(data.msg){
      setContents(null)
    }else if(data.Error){
      console.log(data.Error)
    }else{
      setContents(data);
    }
    console.log(content);
  }
  
  return (
      <div className="main">
      
        <Navbar Local={handleSetLocal} Price={handleSetPrice} Prefer={handleSetPrefer} submit={Submit}/>
        <div className="stores">
          <StoreList className="storeList" data={content}/>
        </div>
        <Snackbar className={classes.snackbar}
                            anchorOrigin={{ vertical : 'top', horizontal : 'right' }}
                            open={error} 
                            onClose={handleClose}
                            autoHideDuration={2000} 
                            action={
                                <IconButton size="small" aria-label="close" color="inherit" onClick={handleError} >
                                    <HighlightOffIcon fontSize="small" />
                                </IconButton>
                            }
                        >
                            <Alert severity="error" onClose={handleError}>
                            {error ? `${error}` : null}
                            </Alert>
                        </Snackbar>
      </div>
      
    );
}
