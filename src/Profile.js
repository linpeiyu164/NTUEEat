import { useState , useContext} from 'react'
import userContext from './userContext'
import { AppBar, Tabs, Tab , Typography, Avatar, Card, CardContent, CardActionArea , Button, IconButton} from '@material-ui/core'
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { makeStyles } from '@material-ui/core/styles'
import { blue } from "@material-ui/core/colors";
import { Link } from 'react-router-dom'
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import axios from 'axios'
const instance = axios.create({ baseURL : "http://localhost:4000/users" })
const useStyle = makeStyles(theme => ({
    AppBar : {
        paddingTop : theme.spacing(6),
    },
    Tab : {
        padding : theme.spacing(3),
        paddingLeft : theme.spacing(4),
        paddingRight : theme.spacing(4),
    },
    Avatar : {
        margin : theme.spacing(5),
        padding : theme.spacing(15)
    },
    username : {
      paddingLeft : theme.spacing(4),
      paddingTop : theme.spacing(2),
      paddingBottom : theme.spacing(2)
    },
    Card : {
      margin : theme.spacing(3),
      padding : theme.spacing(4)
    }
}))

const theme = createMuiTheme({
    overrides: {
      MuiTabs: {
        indicator: {
          backgroundColor: blue[700]
        }
      },
      MuiTab: {
        root: {
        },
        selected: {
          backgroundColor: blue[700],
          color: blue[700],
        }
      }
    }
  });
function User() {
    const classes = useStyle()
    let {user} = useContext(userContext)
    let [selectedTab, setSelectedTab] = useState(0)
    let [comments, setComments] = useState()
    let [favorites, setFavorites] = useState()

    const handleChange = (event, newValue) => {
      setSelectedTab(newValue);
    };

    const getComments = async () => {
      const {data} = await instance.get(`/comment/${user._id}`)
      setComments([...data.comments])
    }

    const getFavorites = async () => {
      const {data} = await instance.get(`/favorites/${user._id}`)
      setFavorites([...data.favorites])
    }
    
    const handleRemoveFavorite = async (e) => {
      // console.log(e.target.id)
      // e.target.id is the icon inside the iconbutton
      const {data} = await instance.delete(`/favorite?USERID=${user._id}&STOREID=${e.target.id}`)
      setFavorites([...data.favorites])
    }
    return(
        <MuiThemeProvider theme={theme}>
            <AppBar 
            className={classes.AppBar}
            indicatorColor="secondary"
            style={{ background : "#D4E6F1", color : "#000000" }}
            position="static">
            <Avatar className={classes.Avatar}>P</Avatar>
            <Typography className={classes.username} variant="h3" style={{color : "#000000"}}>{user.username}</Typography>
            <Tabs value={selectedTab} onChange={handleChange}>
                <Tab className={classes.Tab} value={0} label="Favorites" onClick={getFavorites}/>
                <Tab className={classes.Tab} value={1} label="Reviews" onClick={getComments}/>
                <Tab className={classes.Tab} value={2} label="Settings"/>
            </Tabs>
            </AppBar>
            {(selectedTab === 0 && favorites) ? (
              favorites.map(store => {
                return(
                  <Card className={classes.Card}>
                    <CardContent>{store.storename}</CardContent>
                      <Link style={{textDecoration : "none"}}to={`/store/${store._id}`}><Button>Visit</Button></Link>
                      <IconButton onClick={(e) => {handleRemoveFavorite(e)}}><RemoveCircleOutlineIcon id={store._id}></RemoveCircleOutlineIcon></IconButton>
                  </Card>)
              })) : null}
            {(selectedTab === 1 && comments) ? (
              comments.map(comment => {
                return(
                  <Card>
                    <CardContent>
                      {comment.storename}
                      {comment.username}
                      {comment.content}
                      {comment.rating}
                    </CardContent>
                  </Card>
                )
              })
            ) : null}
        </MuiThemeProvider>
        
    )
}
export default User;