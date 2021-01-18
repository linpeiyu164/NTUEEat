import { useState, useEffect } from 'react';
import SendIcon from '@material-ui/icons/Send';
import RateStar from './Ratestar';
import { Avatar, TextField, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { sendComment, reviseComment } from '../../../routes/routes';

const useStyles = makeStyles(theme => ({
    root: {

    }
}))

// <TypeInBox 
//     user={user} 
//     storeName={props.data&&props.data.storeName} 
//     storeId={props.data&&props.data.storeId} 
//     commented={commented} 
//     setEditing={setEditing} 
//     userComment={userComment} 
//     handleEdit={(value) => setUserComment(value)} 
//     />)
// */
function TypeInBox ({ user, storeName, storeId, commented, setEditing, userComment, handleEdit}) {
    const classes = useStyles();
    const [newComment, setNewComment] = useState('');

    const [newRate, setRate] = useState(0)
    // props.setEditing(false)

    /*
    const comment =  new Comment({
        store : req.body.storeid,
        storename : req.body.storename,
        username : req.body.username,
        content : req.body.content,
        rating : req.body.rating
    })
    */

    useEffect(async() => {
        try {
            if (!props.commented) {
                const response = await sendComment(data);
            } else {
                const response = await reviseComment(data);
                console.log('response: ', response)
            }
        } catch (e) {
            throw e
        }
    },[data])

    const handleSubmit = async () => {
        if (newRate === 0) {
            alert('請給至少一顆星星的評價ㄛ');
        }else if(newComment === 0) {
            alert('請至少輸入一個字的評論ㄛ');
        }else{
            if(props.commented){
                setData({
                    storeid : storeId,
                    storename : storeName,
                    username : user.username,
                    content: newComment,
                    rating: newRate,  
                })
            }else{
                setData({
                    storeid : storeId,
                    
                    content: newComment,
                    rating: newRate, 
                })
            }
            setEditing(false)
            handleEdit(data)
        }
    }
    const handleChange = (e) => {
        setNewComment(e.target.value)
    }
    return (
        <div className={classes.root}>
            <div style={{display: 'flex'}}>
                <Avatar style={{right: '5px'}} src=""/>
                <div>
                    <span style={{display: 'block'}}>{user && user.username}</span>
                    <RateStar 
                        handleSelectRate={setRate}
                        style={{display: 'block'}}
                    />
                </div>
            </div>
            <TextField onChange={handleChange} value={newComment}/>
            <IconButton onClick={handleSubmit}>
                <SendIcon />
            </IconButton>
        </div>
    )
}

export default TypeInBox