import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import OutlinedCard from "./OutlinedCard"
// import Favorite from "./Favorite"
import { Grid, Paper } from '@material-ui/core';
import axios from "axios"
import  { uploadStoreInfo, fetchStoreData } from "../routes/routes";
// const API_ROOT = 'http://localhost:4000/api'
// const instance = axios.create({
//   baseURL: API_ROOT
// })
const useStyles = makeStyles((theme)=>({
    root: {
      minWidth: 275,
    },
    title: {
      fontSize: 14,
    },  
  }));
  const instance = axios.create({baseURL : "http://localhost:4000/stores"});
export default function StoreList(){
    const classes = useStyles();
    const [content,setContents]=useState("") 
    // async function FindStore(){
    //     const get=await instance.get("/")
    //     try{setContents(get.data)}
    //     catch{
    //       console.log("error")
    //     }
    // }
    // const content=fetchStoreData
    // let [content,setac;
    useEffect(async ()=>{
      const {data} = await instance.get("/");
      setContents(data);
    },[])
    console.log("List",content)
    return( 
        <>
        <Paper>
        <Grid container spacing={3} justify="center">
        <Grid item xs={6}>
          {content?
            content.map(item=><OutlinedCard props={item} key={item._id}/>):<></>
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
