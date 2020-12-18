import { useState, useEffect } from 'react';
import { TextField, IconButton, Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import { SendIcon, StarIcon, StarBorderIcon, FavoriteIcon, FavoriteBorderIcon } from '@material-ui/icons';

function Review (props) {
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
                <Avatar src={}/>
                <TextField onChange={this.handleChange}/>
                <IconButton onClick={this.handleClick}>
                    <SendIcon />
                </IconButton>
            </div>
        )
    }

    function Comments () {
        return (
            <div>
                <List >

                </List>
            </div>
        )
        
    }
    return ( 
        <div>
            <StarHeartBar />
            <TypeIn />
            <Comments />
        </div>
    )
}

export default Review;