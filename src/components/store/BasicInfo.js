import { useState } from 'react';
import { List, ListItem, ListItemIcon, ListItemText, GridList, GridListTile, Backdrop, ButtonBase, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import PhoneIcon from '@material-ui/icons/Phone';
import RoomIcon from '@material-ui/icons/Room';

const useStyles = makeStyles(theme => (
    {
        infoList: {

        },
        menuGrid: {

        },
        imageContainer: {
            position: 'relative',

        },
        image: {

        },
        imageBackdrop: {

        },
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff'
        }
    }
));

function TogglePic() {
    //const [ open, setOpen ] = useState(false)
    return useState(false);
}
// Backdrop
function BasicInfo (props) {
    const classes = useStyles();
    function MenuGrid () {
        return (
            <div className={classes.menuGrid}>
                {props.data.menus.map(menu => {
                    const [ open, setOpen ] = TogglePic();
                    return (
                        <>
                            <ButtonBase
                                key={Date.now()}
                                className={classes.imageContainer}
                                style=""
                                onClick={() => setOpen(true)}
                            >
                                <span className={classes.image} style={{backgroundImage: `url(${menu})`}}/>
                                <span className={classes.imageBackdrop}/>
                            </ButtonBase>
                            <Backdrop className={classes.backdrop} open={open} onClick={() => setOpen(false)}>
                                <img src={menu}/>
                            </Backdrop>
                        </>
                    )
                })}
            </div>     
        )
    }
    return (
        <div className={classes.infoList}>
            <List>
                <ListItem>
                    <ListItemIcon>
                        <RestaurantIcon />
                    </ListItemIcon>
                    <ListItemText primary={props.data.storeName} />
                </ListItem>

                <ListItem>
                    <ListItemIcon>
                        <RoomIcon />
                    </ListItemIcon>
                    <ListItemText primary={props.data.address} />
                </ListItem>

                <ListItem>
                    <ListItemIcon>
                        <PhoneIcon />
                    </ListItemIcon>
                    <ListItemText primary={props.data.phone} />
                </ListItem>
            </List>
            <MenuGrid />
        </div>
    )
}

export default BasicInfo;