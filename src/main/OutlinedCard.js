import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import { produceWithPatches } from 'immer';
const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function OutlinedCard(props) {
  const classes = useStyles();
  const [pricetag,setPriceTag]=useState("")
  // if(props.pricing[0]==1){
  //   setPriceTag("$")
  // }else if(props.pricing[1]==1){
  //   setPriceTag("$$")
  // }else if(props.pricing[2]==1){
  //   setPriceTag("$$$")
  // }
  console.log(props)
  console.log(props.props.storename);
    return (
    <Card className={classes.root} variant="outlined" >
      
        {/* <Typography className={classes.title} color="textSecondary" gutterBottom noWrap>
          {props.type}
        </Typography> */}
        <Grid container>
          <Grid item>
            <Typography variant="h5" component="h2">
              {props.props.storename}
            </Typography>
          </Grid>
          <Grid item>
             <IconButton aria-label="add to favorites">
          <FavoriteIcon />
          </IconButton>
          </Grid>
          <Grid item>
          {props.rating? <div><StarIcon /><h5>{props.props.rating} </h5></div>:<div><StarIcon /><h5>0</h5></div>}
          </Grid>

        </Grid>

    </Card>
  )

  
}
