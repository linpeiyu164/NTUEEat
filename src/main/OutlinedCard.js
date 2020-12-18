import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
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
  if(props.pricing[0]==1){
    setPriceTag("$")
  }else if(props.pricing[1]==1){
    setPriceTag("$$")
  }else if(props.pricing[2]==1){
    setPriceTag("$$$")
  }
  
    return (
    <Card className={classes.root} variant="outlined" onclick="learnmore">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom noWrap>
          {props.type}
        </Typography>

        <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
            <FavoriteIcon />
            </IconButton>
        </CardActions>

        <Typography variant="h5" component="h2">
          {props.storename}
        </Typography>
        
        <div>
            if(props.pricing[0]==1){}
        </div>
        <Typography className={classes.pos} color="textSecondary">
          {pricetag}
          {" "}
          {props.location}
        </Typography>
        
        {/* 星星等第 */}
        <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
                {/* {for(let i=0;i<props.star;i++){
                    <StarIcon />
                }} */}
            
            </IconButton>
        </CardActions>

        <Typography variant="body2" component="p">
          address:{props.address}
          <br />
          phone: {props.phone}
        </Typography>


        
      </CardContent>
    </Card>
  )

  
}
