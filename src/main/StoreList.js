import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import OutlinedCard from "./OutlinedCard"
import Favorite from "./Favorite"
import Grid from '@material-ui/core/Grid';
import axios from "axios"
import instance from "../routes"
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

export default function StoreList(){
    const classes = useStyles();
    const [content,setContents]=useState("") 
    async function FindStore(){
        const get=await instance.get("/Store")
        try{setContents(get.data.contents)}
        catch{
          console.log("error")
        }
    }
    return( 
        <>
        <Grid container spacing={3}>
        
        <Grid item xs>
          {/* <Paper className={classes.paper}>xs</Paper> */}
        </Grid>
        <Grid item xs={6}>
          {content.map((item,index)=><OutlinedCard props={item} />)}
        </Grid>

        <Grid item xs>
          <Favorite/>
        </Grid>
      </Grid>
        </>
    )
}
