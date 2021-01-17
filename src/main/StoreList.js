import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';

import OutlinedCard from "./OutlinedCard"
// import Favorite from "./Favorite"
import { Grid, Paper } from '@material-ui/core';

import  { uploadStoreInfo, fetchStoreData } from "../routes/routes";

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
    return( 
        <>
        <Paper>
        <Grid container spacing={3} justify="center">
        <Grid item xs={6}  >
          {props.data ? 
          props.data.map(item=><OutlinedCard data={item} key={item._id}/>) : null }
        </Grid>
        <Grid item xs>
          {/* <Favorite/> */}
        </Grid>
      </Grid>
      </Paper>
        </>
    )
}
