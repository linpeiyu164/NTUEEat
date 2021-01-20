
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import React, {useState , useContext} from "react";
import Random from './Random'
import { IconButton, Backdrop, FormControl, InputLabel, makeStyles, TextField, Grid, Paper} from '@material-ui/core';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import FaceIcon from '@material-ui/icons/Face';
import './Navbar.css';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import HomeIcon from '@material-ui/icons/Home';
import userContext from '../userContext'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import foodIcon from '../Image/foodicon.png'
import { Avatar } from '@material-ui/core';

// import instance from "../routes"
import { Link } from 'react-router-dom'  

const useStyles=makeStyles((theme)=>({
    appbar:{
        display: 'flex',
        padding : theme.spacing(3),
        backgroundColor : "#D4E6F1"
    },
    Button:{
        margin:theme.spacing(2),
        alignSelf: 'flex',
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    }
}))

export default function Mainbar(){
    let {user, setUser} = useContext(userContext)
    const classes=useStyles();
    const[open, setOpen] = useState(false)
    const handleClose = () => {
        setOpen(false)
    }
    const handleLogOut = () => {
        setUser(null)
    }
    return(
        <>
        <Grid container>
        <AppBar className={classes.appbar}>
            <Grid item container spacing={2} style={{display: "flex" , justifyContent: 'flex-end'}}>
                {
                    (user) ? (
                        <>
                        <Grid item><Link to='/' style={{ textDecoration : "none" }}><IconButton><HomeIcon></HomeIcon></IconButton></Link></Grid>
                        <Grid item><IconButton><Link to='/' style={{ color : "none" }}><ExitToAppIcon onClick={handleLogOut}></ExitToAppIcon></Link></IconButton></Grid>
                        <Grid item><Link to="/addstore" style={{ textDecoration : "none"}}><IconButton><AddCircleIcon></AddCircleIcon></IconButton></Link></Grid>
                        <Grid item><IconButton onClick={() => setOpen(prev => !prev)}><EmojiObjectsIcon></EmojiObjectsIcon></IconButton></Grid>
                        <Grid item><Link to="/profile" style={{ textDecoration : "none"}}><IconButton><Avatar src={user.profilePic} /></IconButton></Link></Grid>
                        </>
                    ) : (
                        <Grid item>
                            <Link to="/login" style={{ textDecoration : "none"}}><Button className={classes.Button} variant="outlined" color="default" size="large">Login</Button></Link>
                            <Link to='/' style={{ textDecoration : "none" }}><IconButton><HomeIcon></HomeIcon></IconButton></Link>
                            <IconButton onClick={() => setOpen(prev => !prev)}><EmojiObjectsIcon></EmojiObjectsIcon></IconButton>
                        </Grid>
                    )
                }
            </Grid>
        </AppBar>
        </Grid>
        <Backdrop open={open} className={classes.backdrop}>
            <Random CloseBackdrop={handleClose}/>
        </Backdrop>
        </>
    )
}

