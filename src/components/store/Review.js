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
    let { user } = useContext(userContext);
    const [ userComment, setUserComment ] = useState(null)
    const [ userRate, setUserRate ] = useState(0);
    //const { rating, comments } = props.data;
    function CommentedBox (props) {
        return (
            <ListItem key={Date.now() + Math.random()}>
                <ListItemAvatar>
                    <Avatar src=""/>
                </ListItemAvatar>
                    <ListItemText 
                        primary={props.username}
                        secondary={
                            <React.Fragment>
                                <Typography
                                    component="span"
                                    className={classes.inlineStar}
                                    color="textPrimary"
                                >
                                    {props.rating} <StarIcon/>
                                </Typography>
                                {props.content}
                            </React.Fragment>
                        }
                    />
                
            </ListItem>
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
                    username: user.username,
                    content: typeIn,
                    rating: rate,
                    storeid: props.data.storeId
                }
                try {
                    const response = await sendComment(data);
                    console.log('response: ', response)
                } catch (e) {
                    throw e
                }
            }
        }
        return (
            user? 
            ( userComment?
                <CommentedBox username={user.username} rating={userRate} content={userComment}/>
                : <div className={classes.typeInComment}>
                    <div style={{display: 'flex'}}>
                        <Avatar style={{right: '5px'}} src=""/>
                        <div>
                            <span style={{display: 'block'}}>{user.username}</span>
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
                </div>) : <div>先登入才可以評論ㄛ～</div>
        )
    }
    // remain: avatar
    function Comments (props) {
        let comments = []
        if (props.comments) {
            if (user) {//console.log("comments: ", props)
                props.comments.forEach(comment => {
                    if (comment.username !== user.username){
                        
                        comments.push(<CommentedBox username={comment.username} rating={comment.rating} content={comment.content} />)
                        
                        console.log('comments: ', comments)
                    } else {
                        setUserComment(comment.content)
                        setUserRate(comment.rating)
                    }
                })
            } else {
            props.comments.forEach(comment => {
                comments.push(<CommentedBox username={comment.username} rating={comment.rating} content={comment.content} />)
                
                console.log('comments: ', comments)
            })
        }
        } 
        return (
            <List className={classes.commentList} >
                {comments}
            </List>
        )
        
    }
    return ( 
        <div className={classes.root}>
            
            <TypeIn />
            <Comments comments={props.data&&props.data.comments}/>
        </div>
    )
}

export default Review;