import axios from 'axios'
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import AppBar from '@material-ui/core/AppBar';
import React, {useState , useContext,useEffect} from "react";
import Toolbar from '@material-ui/core/Toolbar';
import Random from './Random'
import {Backdrop, FormControl, InputLabel, makeStyles, TextField, Grid, Paper, Box, Typography} from '@material-ui/core';
import './Navbar.css';
import userContext from '../userContext'

const instance = axios.create({ baseURL : "http://localhost:4000/stores" })

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
    button:{
        marginLeft : theme.spacing(2),
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
        marginTop : theme.spacing(16),
        marginRight : theme.spacing(2),
        marginLeft : theme.spacing(2),
        padding : theme.spacing(2)
    },
    box2 : {
        margin : theme.spacing(2),
        backgroundColor: "#D4E6F1",
        borderRadius:20,
        padding : theme.spacing(2)
    },
}))

export default function Navbar({Local,Price,Prefer,Submit,search,handleSearch,handlesetSearch}){
    let {user} = useContext(userContext)
    const classes=useStyles();
   
    const[open, setOpen] = useState(false)
    // const[search, setSearch] = useState('')
    const handleChangelocal= e =>{
        Local(e.target.value)
    };
    const handleChangeprice= e =>{
        Price(e.target.value)
    };
    const handleChangeprefer= e =>{
        Prefer(e.target.value)
    };
    const handleClose = () => {
        setOpen(false)
    }
    const handleSetSearch = (e) => {
        handlesetSearch(e.target.value)
    }
   
    
    {console.log("search",search);}
    return(
        <Grid container>
            <Paper className={classes.paper}>
                {/* <Link className="navbar-brand" to="/">
                    <img src={foodIcon}/>
                </Link> */}
                <Box className={classes.box2}>
                <Grid item container>
                    <Grid item xs={4}>
                        <FormControl className={classes.FormControl}>
                        <InputLabel>location</InputLabel>
                        <Select className="select"
                        labeled="select-location"
                        id="location-select"
                        displayEmpty
                        // value={location}
                        onChange={handleChangelocal}
                        >
                            {/* <MenuItem value="">Empty</MenuItem> */}
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
                        // value={price}
                        onChange={handleChangeprice}
                        >
                            {/* <MenuItem value={""}>Empty</MenuItem> */}
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
                        // value={prefer}
                        onChange={handleChangeprefer}
                        >
                            {/* <MenuItem value={""}>Empty</MenuItem> */}
                            <MenuItem value={"韓式"} >韓式</MenuItem>
                            <MenuItem value={"壽司"}>壽司</MenuItem>
                            <MenuItem value={"牛肉麵"}>牛肉麵</MenuItem>
                            <MenuItem value={"泰式"}>泰式</MenuItem>
                            <MenuItem value={"咖哩"}>咖哩</MenuItem>
                            <MenuItem value={"義大利麵"}>義大利麵</MenuItem>
                        </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <Button onClick={Submit}>Submit</Button>
                    </Grid>
                </Grid>
                </Box>
                    <Grid item xs={4}>
                        <Box className={classes.box2}>
                            <TextField value={search} variant="outlined" label="Restaurant name" onChange={(e) => handleSetSearch(e)}></TextField>
                            
                            <Button className={classes.button} onClick={handleSearch}>Search</Button>
                        </Box>
                    </Grid>
            </Paper>
            <Backdrop open={open} className={classes.backdrop}>
                <Random CloseBackdrop={handleClose}/>
            </Backdrop>
        </Grid>
       
    )
}

