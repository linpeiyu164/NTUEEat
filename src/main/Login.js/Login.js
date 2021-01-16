import { makeStyles } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import instance from "../../routes"
import axios from 'axios';
import { 
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from 'react-router-dom'  
const LoginStyle=makeStyles((theme)=>({
    root:{
        height:"100vh"
    },
    image:{
        backgroundImage:"./Image/LoginImage.jpg",
        backgroundRepeat:"no-repeat",
        backgroundColor:
        theme.palette==="light" ?theme.palette.gray[50] :theme.palette.grey[900],
        backgroundsize:"cover",
        backgroundPosition:"center",
    },
    paper:{
        margin:theme.spacing(8,4),
        display:"flex",
        flexDirection:"column",
        alignItems:'center',
    },
    avatar:{
        margin:theme.spacing(1),
        backgroundColor:theme.palette.secondary.main,
    },
    form:{
        width:"100%",
        marginTop:theme.spacing(1),
    },
    submit:{
        margin:theme.spacing(3,0,2),
    },
}));
export default function Login(props) {
    const classes=LoginStyle();
    // function submitInfo () {

    // }
    return (
        
        <Grid container className={classes.root}>
            <Link to="/"/>
            <CssBaseline/>
            <Grid item xs={false} sm={4} md={7} className={classes.image}/>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>    
                    </Avatar>
                    <Typography component="h1" variant="h5">
                    sign in    
                    </Typography> 
                    <form className={classes.form} noValidate>
                        <TextField 
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="account"
                            label="account"
                            name="account"
                            autoComplete="account"
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            label="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submint"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign In
                        </Button>
                    </form>
                </div>
            </Grid>
           
            
        </Grid>
    )
}