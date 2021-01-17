import React, { useState, useEffect } from 'react';
import { TextField, IconButton, Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';
import StarIcon from '@material-ui/icons/Star';
import RateStar from './Ratestar'
import StarBorderIcon from '@material-ui/icons/StarBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

const useStyles = makeStyles((theme) => ({
    commentList: {
        overflow: 'scroll'
    },
    inlineStar: {
        display: 'inline'
    }
}));
function Review (props) {
    const classes = useStyles();
    //const { rating, comments } = props.data;
    function StarHeartBar () {
        return (
            <div>
                <div className="stars"></div>
                <div className="heart"></div>
            </div>
        )
    }

    function TypeIn () {
        const [ typeIn, setTypeIn ] = useState('');
        const handleChange = event => {
            setTypeIn(event.target.value);
        }
        const handleClick = () => {

        }
        return (
            <div>
                <Avatar src=""/>
                <TextField onChange={handleChange}/>
                <IconButton onClick={handleClick}>
                    <SendIcon />
                </IconButton>
            </div>
        )
    }
    // remain: avatar
    function Comments () {
        return (
            <List className={classes.commentList}>
                {props.data&&props.data.comments.map(comment => (
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar src=""/>
                                <ListItemText 
                                    primary={comment.username}
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                className={classes.inlineStar}
                                                color="textPrimary"
                                            >
                                                {comment.rating}<StarIcon/>
                                            </Typography>
                                            {comment.content}
                                        </React.Fragment>
                                    }
                                />
                            </ListItemAvatar>
                        </ListItem>
                    )
                )}
            </List>
        )
        
    }
    return ( 
        <div>
            <RateStar />
            <TypeIn />
            <Comments />
        </div>
    )
}

export default Review;