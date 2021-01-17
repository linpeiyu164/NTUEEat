import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import AppBar from '@material-ui/core/AppBar';
import React, {useState , useContext} from "react";
import Toolbar from '@material-ui/core/Toolbar';
import Random from './Random'
import { IconButton, Backdrop, FormControl, InputLabel, makeStyles, TextField, Grid, Paper} from '@material-ui/core';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import FaceIcon from '@material-ui/icons/Face';
import './Navbar.css';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import userContext from '../userContext'
import foodIcon from '../Image/foodicon.png'
// import instance from "../routes"
import { 
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom'  

const useStyles = makeStyles((theme)=>({
    root: {
        flexGrow: 1,
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    FormControl:{
        margin:theme.spacing(5),
        minWidth:280,
        minHeight:3,
        alignSelf: 'flex-end',
        flexGrow: 1,
        
    },
    toolbar: {
        minHeight: 128,
        alignItems: 'fixed-end',
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(2),
    },
    Button:{
        margin:theme.spacing(2),
        alignSelf: 'flex',
    },
    Avatar:{
        margin:theme.spacing(0),
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    paper : {
        marginTop : theme.spacing(16)
    }
}))

export default function Navbar(){
    let {user} = useContext(userContext)
    const classes=useStyles();
    const[location,setLocal]=useState("");
    const[price,setPrice]=useState("");
    const[prefer,setPrefer]=useState("");
    const[open, setOpen] = useState(false)
    const[search, setSearch] = useState('')
    const handleChangelocal=e=>{
        setLocal(e.target.value)
    };
    const handleChangeprice=e=>{
        setPrice(e.target.value)
    };
    const handleChangeprefer=e=>{
        setPrefer(e.target.value)
    };
    const handleClose = () => {
        setOpen(false)
    }
    const handleSetSearch = (e) => {
        setSearch(e.target.value)
    }
    const handleSearch = () => {
    }
    return(
        <Grid container>
            <Paper className={classes.paper}>
                    {/* <Link className="navbar-brand" to="/">
                        <img src={foodIcon}/>
                    </Link> */}
                <Grid item container>
                    <Grid item xs={4}>
                        <FormControl className={classes.FormControl}>
                        <InputLabel>location</InputLabel>
                        <Select className="select"
                        labeled="select-location"
                        id="location-select"
                        displayEmpty
                        value={location}
                        onChange={handleChangelocal}
                        >
                            <MenuItem value="">Empty</MenuItem>
                            <MenuItem value={"118"}>118</MenuItem>
                            <MenuItem value={"公館"}>公館</MenuItem>
                        </Select>
                    </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl className={classes.FormControl} >
                        <InputLabel>Price</InputLabel>
                        <Select className="select"
                        labeled="select-price"
                        id="price-select"
                        displayEmpty
                        value={price}
                        onChange={handleChangeprice}
                        >
                            <MenuItem value={""}>Empty</MenuItem>
                            <MenuItem value={"$"}>$</MenuItem>
                            <MenuItem value={"$$"}>$$</MenuItem>
                            <MenuItem value={"$$$"}>$$$</MenuItem>
                        </Select>
                    </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl className={classes.FormControl} >
                        <InputLabel>Preference</InputLabel>
                        <Select className="select"
                        labeled="select-prefer"
                        id="prefer-select"
                        displayEmpty
                        value={prefer}
                        onChange={handleChangeprefer}
                        >
                            <MenuItem value={""}>Empty</MenuItem>
                            <MenuItem value={"韓式"} >韓式</MenuItem>
                            <MenuItem value={"壽司"}>壽司</MenuItem>
                            <MenuItem value={"牛肉麵"}>牛肉麵</MenuItem>
                            <MenuItem value={"泰式"}>泰式</MenuItem>
                            <MenuItem value={"咖哩"}>咖哩</MenuItem>
                            <MenuItem value={"義大利麵"}>義大利麵</MenuItem>
                        </Select>
                    </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField value={search} onChange={(e) => handleSetSearch(e)}></TextField>
                        <Button onClick={handleSearch}>Search</Button>
                    </Grid>
                </Grid>
            </Paper>
            <Backdrop open={open} className={classes.backdrop}>
                <Random CloseBackdrop={handleClose}/>
            </Backdrop>
        </Grid>
       
    )
}

