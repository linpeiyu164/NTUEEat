import React, { useState, useEffect, useContext } from 'react';
import userContext from '../../userContext';
import { sendComment , reviseComment} from '../../routes/routes';
import { TextField, IconButton, Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography ,Button, Paper, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';
import StarIcon from '@material-ui/icons/Star';
import RateStar from './Ratestar'
import StarBorderIcon from '@material-ui/icons/StarBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
// import userRateContext from './userRateContext'
import userCommentContext from './userCommentContext'

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '10px',
        overflow: 'hidden'
    },
    commentsContainer: {
        marginRight: '10%',
        width: '40%',
        display: 'absolute',
        overflowY: 'hidden',
        marginTop : 2,
        marginLeft : 2,
        //marginRight : theme.spacing(2),
        marginButtom: 6,
    },
    commentList: {
        height: '40%',
        position: 'absolute',
        overflowY: 'auto',
        width: '38%',
        marginRight: '5%'
    },
    inlineStar: {
        display: 'inline'
    },
    typeInComment: {
        margin: '3%'
    },
    notLogin: {
        textAlign: 'center',
        margin: 0
    },
    commentedBox: {
        display: 'flex'
    },
    box2 : {
        backgroundColor : "#D4E6F1",
        borderRadius : 20,
        padding : theme.spacing(2)
    }
}));

function Review (props) {
    //props.data
    const classes = useStyles();
    let { user } = useContext(userContext)
    // const [commented, setCommented] = useState()
    let { userComment , userRate, setUserRate, setUserComment, commented, setCommented, userCommentId, setUserCommentId,  edit, setEdit} = useContext(userCommentContext)
    // const handleUpdateComment = (newComment) => {
    //     setUserComment(newComment)
    // }
    // const handleUpdateStar = (newRate) => {
    //     setUserRate(newRate)
    // }
    useEffect(() => {
        if(userComment){
            setCommented(true)
        }
    }, [])
    useEffect(() => {

    }, [])
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

    function TypeIn () {
        let { userComment , userRate, setUserRate, setUserComment, commented, setCommented, userCommentId, setUserCommentId,  edit, setEdit} = useContext(userCommentContext)
        const handleSubmit = async () => {
            if (userRate === 0) {
                alert('請給至少一顆星星的評價ㄛ');
            } else if(userComment === 0) {
                alert('請至少輸入一個字的評論ㄛ');
            } else {
                let data = {
                    storename: props.data.storename,
                    username: user.username,        
                    content: userComment,
                    rating: userRate,
                    storeid: props.data.storeId
                }
                try {
                    if(edit){
                        data = {
                            ...data,
                            _id : userCommentId
                        }
                        const response = await reviseComment(data)
                        console.log('response: ', response.data)
                        if(response){
                            setCommented(true)
                            setEdit(false)
                        }
                    }else{
                        const response = await sendComment(data);
                        console.log('response: ', response.data)
                        if(response){
                            setCommented(true)
                            setUserCommentId(response.data._id)
                        }
                    }
                } catch (e) {
                    throw e
                }
            }
        }
        return (
            user ? 
            ((!edit && userComment && commented) ? (
                    <CommentedBox username={user.username} rating={userRate} content={userComment} profilePic={user.profilePic} />
                ): <div className={classes.typeInComment}>
                    <div style={{display: 'flex'}}>
                        <Avatar style={{right: '5px'}} src={user.profilePic}/>
                        <div>
                            <span style={{display: 'block'}}>{user.username}</span>
                            <RateStar 
                                handleSelectRate={setUserRate}
                                style={{display: 'block'}}
                            />
                        </div>
                    </div>
                    <TextField autoFocus onChange={(e)=>{setUserComment(e.target.value)}} value={userComment}/>
                    <IconButton onClick={handleSubmit}>
                        <SendIcon />
                    </IconButton>
                </div>) : <Box className={classes.box2}><div className={classes.notLogin}>先登入才可以評論ㄛ～</div></Box>
        )
    }
    
    function Comments (props) {
        const { userComment, setUserComment, userRate, setUserRate} = useContext(userCommentContext)
        let comments = []
        if (props.comments) {
            if (user) {//console.log("comments: ", props)
                props.comments.forEach(comment => {
                    if (comment.username !== user.username){
                        comments.push(<CommentedBox key={comment._id} username={comment.username} rating={comment.rating} content={comment.content} profilePic={comment.profilePic}/>)
                        // console.log('comments: ', comments)
                    } else {
                        console.log(comment)
                        setUserCommentId(comment._id)
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
            <div className={classes.commentsContainer}>
                <List className={classes.commentList} >
                {comments}
                </List>
            </div>
            
        )
        
    }
    return ( 
        <div className={classes.root}>
            <div className={classes.commentedBox}>
                 <TypeIn edit={edit} />
                {commented ? (<Button onClick={ () => setEdit(true) }>修改</Button>) : null}
                
            </div>
           <Comments comments={props.data&&props.data.comments}/>
        </div>
    )
}

export default Review;