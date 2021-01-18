import React, { useState , useContext,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import StarIcon from '@material-ui/icons/Star';
import { 
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom' 

import axios from "axios"
import userContext from '../userContext'
import { Box } from '@material-ui/core';
const instance = axios.create({ baseURL : "http://localhost:4000/"});

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

export default function OutlinedCard(props) {
  const classes = useStyles();
  const[check, setCheck]=useState(null)
  const[firstcheck,setFirstcheck]=useState(false)
  let {user, setUser} = useContext(userContext)
  
  const Favorite = async() => {
  if(user && !firstcheck){
    const {data}= await instance.post("/users/favorite",{ 
      userID : user._id,
      storeID : props.data._id
    })
    const array = data.map(fav => fav._id)
    setUser(prev => {
      return {
        ...prev,
        favorites : [...array]
      }
    })
  }else{
    console.log("Login ,please");
  }
  }
  const UnFavorite=async()=>{
    if(user){
      const {data}= await instance.delete(`/users/favorite?USERID=${user._id}&STOREID=${props.data._id}`)
      console.log("userdata",data);
      const array = data.map(fav => fav._id)
      setUser(prev => {
        return {
          ...prev,
          favorites : [...array]
        }
      })
    }else{
      console.log("Login ,please");
    }
  }
  useEffect(async()=>{
    if(user){
      user.favorites.map(favor_id=>{if(props.data._id===favor_id){
        setCheck(true);
        setFirstcheck(true)}})
    }
  },[])
  useEffect(async()=>{
    if(user){
      if(check !== null){
        check ? Favorite() : UnFavorite()
      }
      console.log("check",check);
    }
  },[check])

    return (
    <Card className={classes.root} variant="outlined">
        <Grid container direction="row" alignItems="center" spacing={2} justify="space-between">
          <Grid item>
            <Link to ={`/store/${props._id}`} style={{textDecoration:"none",color:"black"}}>
              <Typography variant="h5" component="h2">
                {props.data.storename}
              </Typography>
            </Link>
          </Grid>

          <Grid item>
              <IconButton aria-label="add to favorites" onClick={() => setCheck(!check)} disabled={!user}>
                { check ?
                  <FavoriteIcon id={props.data._id} color='error'/> :
                  <FavoriteIcon />
                }
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
