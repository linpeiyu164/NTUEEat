import { TextField , Card, CardContent, CardActions, Button, InputAdornment} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles'
import { useState } from 'react'
import logo from './Image/Unknown.jpeg'
import { AccountCircle } from '@material-ui/icons'
import LockIcon from '@material-ui/icons/Lock';
import axios from 'axios'
const instance = axios.create( { baseURL : "http://localhost:4000/users" })

function Register(){
    let [userName , setUserName] = useState('');
    let [passWord, setPassWord] = useState('');
    let [userNameError, setUserNameError] = useState();
    let [passWordError, setPassWordError] = useState();
    let [loginError, setLoginError] = useState();
    let [registered, setRegistered] = useState();
    let [loggedIn , setLoggedIn] = useState();
    const handleUsername = (e) => {
        let target = e.target
        setUserName(target.value)
    }
    const handlePassword = (e) => {
        let target = e.target
        setPassWord(target.value)
    }
    const handleRegister = async (e) => {
        if(userName && passWord){
            setUserNameError(null)
            setPassWordError(null)
            let res = await instance.post('/register', {
                userName : userName,
                passWord : passWord
            })
            if(res.data.isUnique){
                // redirect to home page with user info
                console.log('successfully registered')
                setRegistered(true)
            }else{
                // check for username uniqueness
                setUserNameError('username has been used')
            }
        }else{
            if(!userName){
                setUserNameError('Please enter a username')
            }else{
                setUserNameError(null)
            }
            if(!passWord){
                setPassWordError('Please enter a password')
            }else{
                setPassWordError(null);
            }
        }
    }
    const handleLogin = async (e) => {
        if(userName && passWord){
            setUserNameError(null)
            setPassWordError(null)
            let res = await instance.post('/login', {
                userName : userName,
                passWord : passWord
            })
            if(res.userExists && res.passWordIsValid){
                // go on to the home page
                console.log('successfully logged in')
                setLoggedIn(true)
            }else{
                setLoginError('Invalid username or password')
            }
        }else{
            if(!userName){
                setUserNameError('Please enter a username')
            }else{
                setUserNameError(null)
            }
            if(!passWord){
                setPassWordError('Please enter a password')
            }else{
                setPassWordError(null);
            }
        }
    }
    return(
        <Card>
            <CardContent>
                <img src={logo} />
                <div style={{ marginTop : 20, marginBottom : 20}}>
                    <TextField 
                        variant="outlined"
                        color="secondary"
                        label="Username"
                        InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <AccountCircle />
                              </InputAdornment>
                            ),
                        }}
                        onChange={handleUsername}
                        helperText={ userNameError ? `${userNameError}` : null }
                    />
                </div>
                <div style={{ marginTop : 20, marginBottom : 20}}>
                <TextField
                    variant="outlined"
                    color="secondary"
                    label="Password"
                    InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockIcon />
                          </InputAdornment>
                        ),
                    }}
                    onChange={handlePassword}
                    helperText={ passWordError ? `${passWordError}` : null }
                />
                </div>
            </CardContent>
            <CardActions>
                <Button variant="outlined" color="primary" onClick={handleRegister}>
                    Register
                </Button>
                <Button variant="outlined" color="secondary" onClick={handleLogin}>
                    Login
                </Button>
            </CardActions>
        </Card>
    )
}
export default Register