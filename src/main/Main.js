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
import { useState ,useEffect } from 'react'

import axios from "axios"
const instance = axios.create({baseURL : "http://localhost:4000/stores"});
export default function Main() {
  // const Select=""
  const [content,setContents]=useState("") 
  // const [Select,setSelect]=useState("")
  const[location,setLocal]=useState("");
  const[price,setPrice]=useState("");
  const[prefer,setPrefer]=useState("");
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
  useEffect(async ()=>{
    const {data} = await instance.get("/");
    setContents(data);
    // console.log(location,price,prefer)
  },[])

  const Submit=async(e)=>{
    const {data} = await instance.post("/",{
      pricing:price,
      location:location,
      preferences:prefer
    });
    setContents(data);
  }
  
  return (
      <div className="main">
      
        <Navbar Local={handleSetLocal} Price={handleSetPrice} Prefer={handleSetPrefer} submit={Submit}/>
        <div className="stores">
          <StoreList className="storeList" data={content}/>
        </div>

      </div>
      
    );
}
