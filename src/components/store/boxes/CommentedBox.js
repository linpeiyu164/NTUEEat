import React from 'react'
import { ListItem, ListItemAvatar, ListItemText, Typography, Avatar } from '@material-ui/core'
import StarIcon from '@material-ui/icons/Star';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        width: '30%'
    },
    inlineStar: {
        display: "inline"
    }
}))
//username rating content
function CommentedBox (props) {
    const classes = useStyles();
    return (
        <ListItem key={Date.now() + Math.random()} className={classes.root}>
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

export default CommentedBox;