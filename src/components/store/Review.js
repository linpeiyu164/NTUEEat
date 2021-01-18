import React, { useState, useEffect, useContext } from 'react';
import userContext from '../../userContext';
import CommentedBox from './boxes/CommentedBox';
import TypeInBox from './boxes/TypeInBox'
import { List, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '10px',
        overflow: 'hidden'
    },
    commentList: {
        overflow: 'scroll'
    },
    
    
}));

function Review (props) {
    console.log(props)
    /*
    setReview({
        storeName: data.storename,
        storeId: data._id,
        rating: data.rating,
        comments: data.comments
    })
    */
    const classes = useStyles();
    let { user } = useContext(userContext);
    const [ userComment, setUserComment ] = useState(null);
    const [ commented, setCommented ] = useState(false);
    const [ editing, setEditing ] = useState(false);
    const [ comments, setComments] = useState([])

    useEffect(() => {
        if (props.data.comments){
            if (user) {
                const array = props.data.comments.filter(comment => {
                    if(comment.username !== user.username){
                        return comment
                    }else{
                        setUserComment(comment)
                        setCommented(true);
                    }
                })
                setComments([...array])
            } else {
                setComments([...props.data.comments])
            }
        } 
    },[])

    return (
        <>
        {(user) ? 
        (
            <>
                {(userComment) ? (<CommentedBox 
                    username={user.username} 
                    rating={userComment.rating}
                    content={userComment.content} 
                />):(<TypeInBox 
                    user={user} 
                    storeName={props.data&&props.data.storeName} 
                    storeId={props.data&&props.data.storeId} 
                    commented={commented} 
                    setEditing={setEditing} 
                    userComment={userComment} 
                    handleEdit={(value) => setUserComment(value)} 
                    />)
                }
                <List className={classes.commentList}>
                    {comments.map(comment => {
                        <CommentedBox 
                            username={comment.username} 
                            rating={comment.rating} 
                            content={comment.content} 
                        />
                    })}
                </List>
            </>
        ):(
            <>
            <div>先登入才可以評論ㄛ～</div>
            <List className={classes.commentList}>
                {comments.map(comment => {
                    console.log(comments)
                    return(
                        <CommentedBox 
                            username={comment.username} 
                            rating={comment.rating} 
                            content={comment.content} 
                        />
                    )
                })}
            </List>
            </>
        )
        }
        </>
    )
}
    // }
    // return ( 
    //     <div className={classes.root}>
    //         {!user? <div>先登入才可以評論ㄛ～</div> : 
    //             (commented && !editing? 
    //                 <div style={{display: "flex", justifyContent: "flex-start"}}>
    //                     <CommentedBox className={classes.commentedBox} username={user.username} rating={userRate} content={userComment}/>
    //                     <Button variant="outlined" onClick={() => setEditing(true)}>修改評論</Button>
    //                     <Button variant="outlined">刪除評論</Button>
    //                 </div> : 
    //                 <TypeInBox 
    //                 user={user} 
    //                 storeName={props.data&&props.data.storeName} 
    //                 storeId={props.data&&props.data.storeId} 
    //                 commented={commented} 
    //                 commentId={userCommentId} 
    //                 setEditing={setEditing} 
    //                 userComment={userComment} 
    //                 handleEdit={(value) => setUserComment(value)} 
    //                 userRate={userRate} 
    //                 setUserRate={setUserRate} />)}
    //         <Comments comments={props.data&&props.data.comments}/>
    //     </div>
    // )


export default Review;