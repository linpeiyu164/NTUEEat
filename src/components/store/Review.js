import React, { useState, useEffect, useContext } from 'react';
import userContext from '../../userContext';
import { sendComment } from '../../routes/routes';
import { TextField, IconButton, Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';
import StarIcon from '@material-ui/icons/Star';
import RateStar from './Ratestar'
import StarBorderIcon from '@material-ui/icons/StarBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '10px',
    },
    commentList: {
        overflow: 'scroll'
    },
    inlineStar: {
        display: 'inline'
    },
    typeInComment: {
        
    }
}));
function Review (props) {
    const classes = useStyles();
    //let {user} = useContext(userContext)
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
        const [ rate, setRate ] = useState(0);
        const [ typeIn, setTypeIn ] = useState('');
        const handleChange = event => {
            setTypeIn(event.target.value);
        }
        const handleSubmit = async () => {
            if (rate === 0) {
                alert('請給至少一顆星星的評價ㄛ');
            } else if(typeIn.length === 0) {
                alert('請至少輸入一個字的評論ㄛ');
            } else {
                console.log('storeid: ', props.data.storeId)
                const data = {
                    storename: props.data.storename,
                    username: 'selina',
                    content: typeIn,
                    rating: rate,
                    storeid: props.data.storeId
                }
                try {
                    await sendComment(data)
                } catch (e) {
                    throw e
                }
            }
        }
        return (
            <div className={classes.typeInComment}>
                <div style={{display: 'flex'}}>
                    <Avatar style={{right: '5px'}} src=""/>
                    <div>
                        <span style={{display: 'block'}}>Selina</span>
                        <RateStar 
                            handleSelectRate={setRate}
                            style={{display: 'block'}}
                        />
                    </div>
                </div>
                
                <TextField onChange={handleChange} value={typeIn}/>
                <IconButton onClick={handleSubmit}>
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
        <div className={classes.root}>
            
            <TypeIn />
            <Comments />
        </div>
    )
}

export default Review;