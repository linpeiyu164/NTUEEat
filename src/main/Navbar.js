import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem'
import React, { useState } from "react";
import { FormControl, InputLabel, makeStyles } from '@material-ui/core';
import { 
    BrowserRouter as Router,
    Switch,
    Route,
    Link
    } from 'react-router-dom'  
// import Login from "./Login.js";
const navstyle=makeStyles((theme)=>({
    FormControl:{
        margin:theme.spacing(0),
        minWidth:200,
    },
    Button:{
        margin:theme.spacing(2),
        fullWidth:true,
        href:"http://localhost:3000",
        size:"large"

    }
}))
function Navbar(){
    const classes=navstyle();
    const[location,setLocal]=useState("");
    const[price,setPrice]=useState("");
    const[prefer,setPrefer]=useState("");
    const handleChangelocal=e=>{
        setLocal(e.target.value)
    };
    const handleChangeprice=e=>{
        setPrice(e.target.value)
    };
    const handleChangeprefer=e=>{
        setPrefer(e.target.value)
    };
    // const Login=()=>{

    // };
    return(
        <nav>
            <Link to="/"/>
            <Button className="home"></Button>
            <span>
            <FormControl className={classes.FormControl}>
                <InputLabel>location</InputLabel>
                <Select className="location"
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
            <FormControl className={classes.FormControl}>
                <InputLabel>Price</InputLabel>
                <Select className="pricing"
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
            <FormControl className={classes.FormControl}>
                <InputLabel>Preference</InputLabel>
                <Select className="preferences"
                labeled="select-prefer"
                id="prefer-select"
                displayEmpty
                value={prefer}
                onChange={handleChangeprefer}
                >
                    <MenuItem value={"韓式"}>韓式</MenuItem>
                    <MenuItem value={"壽司"}>壽司</MenuItem>
                    <MenuItem value={"牛肉麵"}>牛肉麵</MenuItem>
                    <MenuItem value={"泰式"}>泰式</MenuItem>
                    <MenuItem value={"咖哩"}>咖哩</MenuItem>
                    <MenuItem value={"義大利麵"}>義大利麵</MenuItem>
                </Select>
            </FormControl>
            <Button id="searchButton">search</Button>
            </span>
            {/* <link to="/Login">signin</link> */}
            <Button className="signin" >Login</Button>
        </nav>
    )
}

export default Navbar;