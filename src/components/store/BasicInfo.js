import { List, ListItem, ListItemIcon, ListItemText, GridList, GridListTile, Backdrop } from '@material-ui/core';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import RoomIcon from '@material-ui/icons/Room';
import PhoneIcon from '@material-ui/icons/Phone';

const classes = useStyles();
// Backdrop
function BasicInfo (props) {
    function MenuGrid () {
        return (
            <div className={}>
                <GridList>
    
                </GridList>
            </div>
            
        )
    }
    return (
        <div className={classes.list}>
            <List>
                <ListItem>
                    <ListItemIcon>
                        <RestaurantIcon />
                    </ListItemIcon>
                    <ListItemText primary={} />
                </ListItem>

                <ListItem>
                    <ListItemIcon>
                        <RoomIcon />
                    </ListItemIcon>
                    <ListItemText primary={} />
                </ListItem>

                <ListItem>
                    <ListItemIcon>
                        <PhoneIcon />
                    </ListItemIcon>
                    <ListItemText primary={} />
                </ListItem>
            </List>
            <MenuGrid />
        </div>
    )
}

export default BasicInfo;