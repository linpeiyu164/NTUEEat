import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import AppBar from '@material-ui/core/AppBar';
import React ,{ useState }from "react";
import Toolbar from '@material-ui/core/Toolbar';

import PropTypes from 'prop-types';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import { FormControl, InputLabel, makeStyles} from '@material-ui/core';

import CssBaseline from '@material-ui/core/CssBaseline';
import MoreIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';

import './Navbar.css';
import instance from "../routes"
import { 
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom'  
// import {Link} from 'react-router';

const useStyles=makeStyles((theme)=>({
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
    // AppBar:{
    //     maxHeight:1,
    // },
    toolbar: {
        minHeight: 128,
        alignItems: 'fixed-end',
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(2),
    },
    // title: {
    //     flexGrow: 1,
    //     alignSelf: 'flex-end',
    // },
    Button:{
        margin:theme.spacing(2),
        alignSelf: 'flex',
        // size:"large"
    },
    Avatar:{
        margin:theme.spacing(0),

        // backgroundColor:theme.palette.secondary.main,
    },
}))
// function ScrollTop(props) {
//     const { children, window } = props;
//     const classes = useStyles();
//     // Note that you normally won't need to set the window ref as useScrollTrigger
//     // will default to window.
//     // This is only being set here because the demo is in an iframe.
//     const trigger = useScrollTrigger({
//       target: window ? window() : undefined,
//       disableHysteresis: true,
//       threshold: 100,
//     });
  
//     const handleClick = (event) => {
//       const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');
  
//       if (anchor) {
//         anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
//       }
//     };
  
//     return (
//       <Zoom in={trigger}>
//         <div onClick={handleClick} role="presentation" className={classes.root}>
//           {children}
//         </div>
//       </Zoom>
//     );
//   }
  
//   ScrollTop.propTypes = {
//     children: PropTypes.element.isRequired,
//     /**
//      * Injected by the documentation to work in an iframe.
//      * You won't need it on your project.
//      */
//     window: PropTypes.func,
//   };
  
export default function Navbar(){
    const classes=useStyles();
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
    const Login=()=>{
    };
    const Home=()=>{

    };
    return(
        // <div className=>
        <div className={classes.root}>
            <AppBar position="fixed" color="transparent">
                <Toolbar>
                    <Link className="navbar-brand" to="/">
                        <img src="../logo.svg"/>
                    </Link>
                {/* <Avatar className="home"    onClick={Home}></Avatar> */}
                {/* <Button className="home" src="../Image/icon.jpg"></Button> */}
                {/* <Typography className={classes.title} variant="h3" noWrap>
                NTUEEat
                </Typography> */}
                <span >
                    <FormControl className={classes.FormControl}  >
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
                {/* <Button id="searchButton">search</Button> */}

                </span>
                {/* <link className="navbar-brand" to="/Login"> */}
                    <Button className={classes.Button} variant="outlined" color="default" size="large">Signup</Button>
                {/* </link> */}
                
                <Link to="/login" style={{ textDecoration : "none"}}><Button className={classes.Button} variant="outlined" color="default" size="large">Login</Button></Link>
                <Link to="/profile" style={{ textDecoration : "none"}}><Button className={classes.Button} variant="outlined" color="default" size="large">Profile</Button></Link>
                {/* <IconButton aria-label="display more actions" edge="end" color="inherit">
                <MoreIcon />
                </IconButton> */}
                </Toolbar>
                {/* <Toolbar id="back-to-top-anchor" />
                <ScrollTop {...props}>
                <Fab color="secondary" size="small" aria-label="scroll back to top">
                <KeyboardArrowUpIcon />
                </Fab>
                </ScrollTop> */}
                
            </AppBar>
            
        </div>
       
    )
}

