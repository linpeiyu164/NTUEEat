import React, { useState , useContext,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import StarIcon from '@material-ui/icons/Star';

import axios from "axios"
import userContext from '../userContext'
const instance = axios.create({baseURL : "http://localhost:4000/"});

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: 275,
    margin : theme.spacing(2),
    padding : theme.spacing(2)
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));
let c = 0;
export default function OutlinedCard(props) {
  const classes = useStyles();
  let {user} = useContext(userContext)
  console.log("user",user);
  const[check,setCheck]=useState(false)
  
  const Favorite=async()=>{
  console.log(props.data)
  if(user){
    const {data}= await instance.post("/users/favorite",{userID:user._id,storeID:props.data._id})
  }else{
    console.log("Login ,please");
  }
    
  }
  const UnFavorite=async()=>{
    console.log(props.data)
    if(user){
    const {data}= await instance.delete(`/users/favorite?USERID=${user._id}&STOREID=${props.data._id}`)
    }else{
      console.log("Login ,please");
    }
  }
  
  
  useEffect(async()=>{
    if(c==1){
    check? 
    Favorite()
    :
    UnFavorite()
    }
  },[check])
    return (
    <Card className={classes.root} variant="outlined">
        <Grid container direction="row" alignItems="center" spacing={2} justify="space-between">
          <Grid item>
            <Typography variant="h5" component="h2">
              {props.data.storename}
            </Typography>
          </Grid>
          <Grid item onClick={()=>{
                setCheck(!check);
                c=1;
                }}>
              <IconButton aria-label="add to favorites" disabled={!user}>
                {check?
                <FavoriteIcon color='error'/>:
                <FavoriteIcon />}
              </IconButton>
            </Grid>
          <Grid item container>
            <Grid item>
              <StarIcon></StarIcon>
            </Grid>
            <Grid item>
              <Typography>
              {props.rating? (`${props.props.rating} : `): 0 }
              </Typography>
            </Grid>
          </Grid>
        </Grid>

    </Card>
  )

  
}
