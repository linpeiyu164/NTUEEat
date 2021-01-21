import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import OutlinedCard from "./OutlinedCard"
import { Grid, Paper} from '@material-ui/core';
import  datanotfound  from '../Image/data-not-found.jpg'
// import  { uploadStoreInfo, fetchStoreData } from "../routes/routes";
// import axios from "axios";
// import { 
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link
// } from 'react-router-dom' 

// const instance = axios.create({baseURL : "http://localhost:4000"});

const useStyles = makeStyles((theme)=>({
    list : {
      margin : theme.spacing(2)
    }  
  }));
  
export default function StoreList(props){
    const classes = useStyles();
    return( 
      <>
        <Grid container justify="center" className={classes.list}>
            {
              props.data ? 
              props.data.map(item=> {
                return (
                  <Grid item xs={8}>
                    <OutlinedCard data={item} key={item._id} />
                  </Grid>
                )}) : <img src={datanotfound} />
            }          
        </Grid>
      </>
    )
}
