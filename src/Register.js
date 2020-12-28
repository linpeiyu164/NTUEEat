import { TextField , Card, Button, InputAdornment, Grid, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import { useState , useContext} from 'react'
import logo from './Image/foodicon.png'
import { AccountCircle } from '@material-ui/icons'
import LockIcon from '@material-ui/icons/Lock';
import axios from 'axios'
import userContext from './userContext'
import { Redirect } from 'react-router-dom'

const instance = axios.create( { 
    baseURL : "http://localhost:4000/users"
})
const useStyle = makeStyles( theme => ({
    root : {
        minWidth: 275,
    },
    paper : {
        margin : theme.spacing(2),
        padding : theme.spacing(4),
        maxWidth : 'lg',
        minWidth: 'xs'
    },
    cardcontent : {
        margin : theme.spacing(1),
    },
    button : {
        padding : theme.spacing(1),
        margin : theme.spacing(2)
    },
    toppic : {
        width : '100%',
        height : '100%'
    }
}))
function Register(){
    let {user, setUser} = useContext(userContext)
    const classes = useStyle()
    let [username , setUsername] = useState('');
    let [password, setPassword] = useState('');
    let [usernameError, setUsernameError] = useState();
    let [passwordError, setPasswordError] = useState();
    let [registered, setRegistered] = useState();
    console.log(user)
    const handleUsername = (e) => {
        let target = e.target
        setUsername(target.value)
    }
    const handlePassword = (e) => {
        let target = e.target
        setPassword(target.value)
    }
    const handleRegister = async (e) => {
        if(username && password){
            setUsernameError(null)
            setPasswordError(null)
            let res = await instance.post('/register', {
                username : username,
                password : password
            })
            if(res.data.isUnique){
                // redirect to home page with user info
                console.log('successfully registered')
                setRegistered(true)
            }else{
                // check for username uniqueness
                setUsernameError('username has been used')
            }
        }else{
            if(!username){
                setUsernameError('Please enter a username')
            }else{
                setUsernameError(null)
            }
            if(!password){
                setPasswordError('Please enter a password')
            }else{
                setPasswordError(null);
            }
        }
    }
    const handleLogin = async (e) => {
        if(username && password){
            setUsernameError(null)
            setPasswordError(null)
            let res = await instance.post('/login', {
                username : username,
                password : password
            })
            console.log(res.data)
            if(res.data.invalidUser){
                setUsernameError('Invalid username')
            }
            if(res.data.invalidPassword){
                setPasswordError('Invalid password')
            }
            if(!res.data.invalidUser && !res.data.invalidPassword){
                setUser(res.data)
                setUsernameError(null)
                setPasswordError(null)
            }
        }else{
            if(!username){
                setUsernameError('Please enter a username')
            }else{
                setUsernameError(null)
            }
            if(!password){
                setPasswordError('Please enter a password')
            }else{
                setPasswordError(null);
            }
        }
    }
    return(
        (!user)?
        (<>
        <Card className={classes.paper} alignItems="center" >
            <Grid container direction="row" justify="center" >
                <Grid item>
                    <Typography variant="h1">NTUEEAT</Typography>
                </Grid>
                <Grid item container direction="column">
                <Grid
                    container  
                    item
                    alignItems="center"
                    justify="center"  
                    direction="column"
                >
                    <Grid item xs={8} className={classes.cardcontent}>
                        <img src={logo}/>
                    </Grid>
                    <Grid item xs={8} className={classes.cardcontent}>
                        {
                            registered ? (
                                <Typography>Registration successful</Typography>
                            ):null
                        }
                    </Grid>
                    <Grid item xs={8} className={classes.cardcontent}>
                        <TextField 
                            variant="outlined"
                            color="secondary"
                            label="Username"
                            placeholder="Username"
                            InputProps={{
                                startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle />
                                </InputAdornment>
                                ),
                            }}
                            onChange={handleUsername}
                            helperText={ usernameError ? `${usernameError}` : null }
                        />
                    </Grid>
                    <Grid item xs={8} className={classes.cardcontent}>
                    <TextField
                        variant="outlined"
                        color="secondary"
                        placeholder="Password"
                        label="Password"
                        InputProps={{
                            startAdornment: (
                            <InputAdornment position="start">
                                <LockIcon />
                            </InputAdornment>
                            ),
                        }}
                        onChange={handlePassword}
                        helperText={ passwordError ? `${passwordError}` : null }
                    />
                    </Grid>
                    <Grid item xs={8} className={classes.cardcontent}>
                        <Button onClick={handleRegister} variant="text" color="secondary" className={classes.button}>
                            Register
                        </Button>
                        <Button onClick={handleLogin} variant="text" color="secondary" className={classes.button}>
                            Login
                        </Button>
                    </Grid>
                </Grid>
                </Grid>
            </Grid>
            </Card>
        </>
        ): <Redirect to="/" />
    )
}
export default Register