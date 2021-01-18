import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import OutlinedCard from "./OutlinedCard"
import { Grid, Paper } from '@material-ui/core';
import  { uploadStoreInfo, fetchStoreData } from "../routes/routes";
import axios from "axios";
import { 
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom' 

const instance = axios.create({baseURL : "http://localhost:4000"});

const useStyles = makeStyles((theme)=>({
    root: {
      minWidth: 275,
    },
    title: {
      fontSize: 14,
    },  
  }));
  
export default function StoreList(props){
    const classes = useStyles();
    // useEffect(async ()=>{
    //   const {favorIddata}= await instance.post("/users/favorite")
    //   // favorIddata.map(_id=>{
    //   //   const {data} = await instance.get("/users/favorites/${favorstore_id}");
    //   // })
      
    //   console.log("getuser",data);
      // if(data.msg){
      //   setContents(null)
      // }else if(data.Error){
      //   console.log(data.Error)
      // }else{
      //   setContents(data);
      // }
     
    // },[])
  
    return( 
        <>
        <Paper>
        <Grid container spacing={3} justify="center">
        <Grid item xs={6}  >
          {props.data ? 
          props.data.map(item=>
            // <Link to ={`/store/${item._id}`} style={{textDecoration:"none"}}>
              <OutlinedCard data={item} key={item._id} />  
            // </Link>
            )
            : null
          }          
        </Grid>
        <Grid item xs>
          {/* <Favorite/> */}
        </Grid>
      </Grid>
      </Paper>
        </>
    )
}
