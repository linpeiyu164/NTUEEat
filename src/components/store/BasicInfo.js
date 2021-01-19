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
            display: 'flex',
            flexWrap: 'wrap',
            width: '100%'
        },
        imageContainer: {
            position: 'relative',
            border: '5px',
            height: 100,
            '&:hover': {
                cursor: 'pointer',
            }
        },
        imageButton: {
            position: 'absolute',
            height: '100%',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            backgroundSize: 'cover',
            backgroundPosition: 'center'

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
    function MenuGrid (props) {
        // console.log(props.data)
        return (
            <div className={classes.menuGrid}>
                {props.data&&props.data.menus.map(menu => {
                    const [ open, setOpen ] = TogglePic();
                    // console.log(menu)
                    return (
                        <div key={Date.now()+Math.random()}>
                            <ButtonBase
                                onClick={() => setOpen(true)}
                            >
                                <div className={classes.imageContainer} >
                                    <img src={menu} style={{height: '100%'}}/>
                                </div>
                            </ButtonBase>
                            <Backdrop className={classes.backdrop} open={open} onClick={() => setOpen(false)}>
                                <img src={menu}/>
                            </Backdrop>
                        </div>
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
                    <ListItemText primary={props.data&&props.data.storeName} />
                </ListItem>

                <ListItem>
                    <ListItemIcon>
                        <RoomIcon />
                    </ListItemIcon>
                    <ListItemText primary={props.data&&props.data.address} />
                </ListItem>

                <ListItem>
                    <ListItemIcon>
                        <PhoneIcon />
                    </ListItemIcon>
                    <ListItemText primary={props.data&&props.data.phone} />
                </ListItem>
            </List>
            <MenuGrid data={props.data}/>
        </div>
    )
}

export default BasicInfo;