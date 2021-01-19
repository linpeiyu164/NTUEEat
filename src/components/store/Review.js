import React, { useState, useEffect, useContext } from 'react';
import userContext from '../../userContext';
import { sendComment , reviseComment} from '../../routes/routes';
import { TextField, IconButton, Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography , Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';
import StarIcon from '@material-ui/icons/Star';
import RateStar from './Ratestar'
import StarBorderIcon from '@material-ui/icons/StarBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import userRateContext from './userRateContext'
import userCommentContext from './userCommentContext'

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
    //props.data
    const classes = useStyles();
    let { user } = useContext(userContext)
    let { userComment , setUserComment } = useContext(userCommentContext)
    let { userRate , setUserRate } = useContext(userRateContext)
    const [ edit, setEdit ] = useState()
    // const handleUpdateComment = (newComment) => {
    //     setUserComment(newComment)
    // }
    // const handleUpdateStar = (newRate) => {
    //     setUserRate(newRate)
    // }
    function CommentedBox (props) {
        //username rating content profilePic
        return (
            <ListItem key={Date.now() + Math.random()}>
                <ListItemAvatar>
                    <Avatar src={props.profilePic} />
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

    function TypeIn ({edit}) {
        // const [newRate, setNewRate] = useState()
        // const [newComment, setNewComment] = useState()
        // useEffect(() => {
        //     if(userComment !== newComment){
        //         handleUpdateComment(newComment)
        //     }
        //     if(userRate !== newRate){
        //         handleUpdateStar(newRate)
        //     }
        //     console.log(userComment)
        //     console.log(userRate)
        // }, [newComment, newRate])
        const {userComment, setUserComment} = useContext(userCommentContext)
        const {userRate, setUserRate} = useContext(userRateContext)
        const handleSubmit = async () => {
            if (userRate === 0) {
                alert('請給至少一顆星星的評價ㄛ');
            } else if(userComment === 0) {
                alert('請至少輸入一個字的評論ㄛ');
            } else {
                const data = {
                    storename: props.data.storename,
                    username: user.username,        
                    content: userComment,
                    rating: userRate,
                    storeid: props.data.storeId
                }
                try {
                    if(edit){
                        const response = await reviseComment(data)
                        console.log('response: ', response)
                    }else{
                        const response = await sendComment(data);
                        console.log('response: ', response)
                    }
                } catch (e) {
                    throw e
                }
            }
        }
        return (
            user ? 
            ((userComment && !edit) ? (
                    <CommentedBox username={user.username} rating={userRate} content={userComment} user={user.profilePic} />
                ): <div className={classes.typeInComment}>
                    <div style={{display: 'flex'}}>
                        <Avatar style={{right: '5px'}} src=""/>
                        <div>
                            <span style={{display: 'block'}}>{user.username}</span>
                            <RateStar 
                                handleSelectRate={setUserRate}
                                style={{display: 'block'}}
                            />
                        </div>
                    </div>
                    <TextField onChange={(e)=>{setUserComment(e.target.value)}} value={userComment}/>
                    <IconButton onClick={handleSubmit}>
                        <SendIcon />
                    </IconButton>
                </div>) : <div>先登入才可以評論ㄛ～</div>
        )
    }
    // useEffect(() => {
    //     console.log(userComment)
    // },[userComment])
    // remain: avatar
    function Comments (props) {
        let comments = []
        if (props.comments) {
            if (user) {//console.log("comments: ", props)
                props.comments.forEach(comment => {
                    if (comment.username !== user.username){
                        comments.push(<CommentedBox username={comment.username} rating={comment.rating} content={comment.content} profilePic={comment.profilePic}/>)
                        // console.log('comments: ', comments)
                    } else {
                        setUserComment(comment.content)
                        setUserRate(comment.rating)
                    }
                })
            } else {
            props.comments.forEach(comment => {
                comments.push(<CommentedBox username={comment.username} rating={comment.rating} content={comment.content} profilePic={comment.profilePic}/>)
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
            <TypeIn edit={edit} />
            {userComment ? (<Button onClick={ () => setEdit(true) }>修改</Button>) : null}
            <Comments comments={props.data&&props.data.comments}/>
        </div>
    )
}

export default Review;