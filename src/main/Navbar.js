import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import React, {useState, useContext, useEffect} from "react";
import Random from './Random'
import {Backdrop, FormControl, InputLabel, makeStyles, TextField, Grid, Paper, Box} from '@material-ui/core';
import userContext from '../userContext'
import './Navbar.css';


const useStyles = makeStyles((theme)=>({
    root: {
        flexGrow: 1,
        display : 'flex',
        // position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    FormControl:{
        marginRight : theme.spacing(7),
        marginLeft : theme.spacing(7),
        marginTop : theme.spacing(2),
        marginBottom : theme.spacing(2),
        // display : 'flex', 
        minWidth : '20%',
        minHeight : '10%',
        alignSelf : 'flex-end',
        flexGrow : 1,  
    },
    toolbar: {
        minHeight: 128,
        alignItems: 'fixed-end',
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(2),
    },
    submit : {
        margin : theme.spacing(5),
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
        // display : 'flex',
        backgroundColor: "#D4E6F1",
        borderRadius:20,
        padding : theme.spacing(2)
    },
    select : {
        minWidth : '40%'
    }
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
        <>
            <Paper className={classes.paper}>
                <Box className={classes.box2}>
                        <FormControl className={classes.FormControl}>
                        <InputLabel>location</InputLabel>
                        <Select className={classes.select}
                        labeled="select-location"
                        id="location-select"
                        displayEmpty
                        // value={location}
                        onChange={handleChangelocal}
                        >
                            {/* <MenuItem value="">Empty</MenuItem> */}
                            <MenuItem value={"118巷"}>118巷</MenuItem>
                            <MenuItem value={"公館"}>公館</MenuItem>
                            <MenuItem value={"溫州街"}>溫州街</MenuItem>

                        </Select>
                    </FormControl>
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
                            <MenuItem value={"台式"}>台式</MenuItem>
                            <MenuItem value={"中式"}>中式</MenuItem>
                            <MenuItem value={"韓式"} >韓式</MenuItem>
                            <MenuItem value={"日式"}>日式</MenuItem>
                            <MenuItem value={"美式"}>美式</MenuItem>
                            <MenuItem value={"南洋"}>南洋</MenuItem>
                            <MenuItem value={"其他"}>其他</MenuItem>
                        </Select>
                        </FormControl>
                        <FormControl className={classes.submit}>
                            <Button onClick={Submit}>Submit</Button>
                        </FormControl>
                    </Box>
                    <Box className={classes.box2} alignItems="center" justifyContent="center">
                        <TextField className={classes.button} value={search} variant="outlined" label="Restaurant name" onChange={(e) => handleSetSearch(e)}></TextField>
                        <Button className={classes.button} onClick={handleSearch}>Search</Button>
                    </Box>
            </Paper>
            <Backdrop open={open} className={classes.backdrop}>
                <Random CloseBackdrop={handleClose}/>
            </Backdrop>
        {/* // </Grid> */}
       </>
    )
}

