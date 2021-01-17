import { useState , useContext, useEffect} from 'react'
import userContext from './userContext'
import { Tabs, Tab , Typography, Avatar, Card, CardContent, Box,Button, IconButton, TextField, ButtonGroup, Paper} from '@material-ui/core'
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles'
import { blue } from "@material-ui/core/colors";
import { Link } from 'react-router-dom'
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import axios from 'axios'
import RateStar from './Ratestar'
import DeleteIcon from '@material-ui/icons/Delete';

const instance = axios.create({ baseURL : "http://localhost:4000/users" })

const useStyle = makeStyles(theme => ({
    AppBar : {
        marginTop : theme.spacing(15),
        marginLeft : theme.spacing(2),
        marginRight : theme.spacing(2)
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
      margin : theme.spacing(2),
      padding : theme.spacing(4)
    },
    visit : {
      margin : theme.spacing(2)
    },
    box1 : {
      borderRadius:20,
      padding : theme.spacing(1),
    },
    box2 : {
      backgroundColor: "#D4E6F1",
      borderRadius:20,
      padding : theme.spacing(2)
    },
    box3 : {
      backgroundColor: "#D4E6F1",
      borderRadius:20,
      width : '100%'
    },
    textfield : {
      padding : theme.spacing(2),
      borderRadius:20,
      width : '95%'
    },
    button : {
      margin : theme.spacing(2),
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
    },
    typography: {
      h1: {
        fontSize: 18,
      },
      body1: {
        fontWeight: 1000,
      },
      body2:{
        fontWeight : 500
      }
    },
  });

function User() {
    const classes = useStyle()
    let {user} = useContext(userContext)
    let [selectedTab, setSelectedTab] = useState(0)
    let [comments, setComments] = useState()
    let [favorites, setFavorites] = useState()
    let [editComment, setEditComment] = useState()
    let [updatedContent, setUpdatedContent] = useState()
    let [updatedStar, setUpdatedStar] = useState()
    useEffect(() => {
      getFavorites()
    },[])
    const handleChange = (event, newValue) => {
      setSelectedTab(newValue);
    };
    const getComments = async () => {
      // returns entire user with comments populated
      const {data} = await instance.get(`/comments/${user._id}`)
      setComments([...data])
    }
    const getFavorites = async () => {
      // returns entire user with favorites populated
      const {data} = await instance.get(`/favorites/${user._id}`)
      setFavorites([...data])
    }
    const handleRemoveFavorite = async (e) => {
      // returns entire user with favorites populated
      const {data} = await instance.delete(`/favorite?USERID=${user._id}&STOREID=${e.target.id}`)
      setFavorites([...data])
    }
    const handleEditComment = async (e) => {
      setEditComment(e.target.id)
    }
    const handleDeleteComment = async (e) => {
      const {data} = await instance.delete(`/comments?USERID=${user._id}&COMMENTID=${e.target.id}`)
      setComments([...data])
    }
    const handleSubmit = async () => {
      // renew the comment
      if(updatedStar && updatedContent){
        // use the setEditComment to send the comment back
        const {data} = await instance.post('/comments', {
          _id : editComment,
          content : updatedContent,
          rating : updatedStar
        })
        setComments(prev => {
          let newComments = prev.map(comment => {
            if(comment._id === data._id){
              comment.content = data.content
              comment.rating = data.rating
            }
            return comment
          })
          return newComments
        })
      }
      setEditComment(null)
      setUpdatedContent('')
      setUpdatedStar(null)
    }
    return(
        <MuiThemeProvider theme={theme}>
            <Paper 
            className={classes.AppBar}
            indicatorColor="secondary"
            style={{ background : "#D4E6F1", color : "#000000" }}
            position="static">
            {/* <Avatar className={classes.Avatar}>P</Avatar> */}
            <Typography className={classes.username} variant="h3" style={{color : "#000000"}}>{user.username}</Typography>
            <Tabs value={selectedTab} onChange={handleChange}>
                <Tab className={classes.Tab} value={0} label="Favorites" onClick={getFavorites}/>
                <Tab className={classes.Tab} value={1} label="Reviews" onClick={getComments}/>
                <Tab className={classes.Tab} value={2} label="Settings"/>
            </Tabs>
            </Paper>
            {(selectedTab === 0 && favorites) ? (
              favorites.map(store => {
                return(
                  <Card className={classes.Card}>
                    <CardContent>
                      <Typography style={{ display: 'inline-block' }} >{store.storename}</Typography>
                      <Link style={{textDecoration : "none"}}to={`/store/${store._id}`}>
                        <Button className={classes.visit}variant="outlined">Visit</Button>
                      </Link>
                      <IconButton onClick={(e) => {handleRemoveFavorite(e)}}>
                        <RemoveCircleOutlineIcon style={{ display: 'inline-block' }} id={store._id}></RemoveCircleOutlineIcon>
                      </IconButton>
                    </CardContent>
                  </Card>)
              })) : null}
            {(selectedTab === 1 && comments) ? (
              comments.map(comment => {
                if(editComment===comment._id){
                  return(
                    <>
                    <Card className={classes.Card}>
                    <CardContent>
                      <Box className={classes.box1}>
                      <Typography variant="body1">{comment.storename}</Typography>
                      <RateStar handleSelectRate={setUpdatedStar}/>
                      </Box>
                      <Box className={classes.box3}>
                      <TextField  className={classes.textfield}value={updatedContent} onChange={(e)=>setUpdatedContent(e.target.value)}></TextField>
                      <Button className={classes.button} onClick={handleSubmit}>Update</Button>
                      </Box>
                    </CardContent>
                    </Card>
                    </>
                  )
                }
                return(
                  <Card className={classes.Card}>
                    <CardContent>
                      <Box className={classes.box1}>
                      <Typography variant="body1">{comment.storename}</Typography>
                      <Typography style={{ display : 'inline-block'}} variant="body2">{`rating : ${comment.rating}`}</Typography>
                      </Box>
                      <Box className={classes.box2}>
                      <Typography style={{ display : 'block'}} variant="body2">{comment.content}</Typography>
                      </Box>
                      <Box className={classes.box1}>
                        <ButtonGroup>
                        <IconButton onClick={(e) => {handleEditComment(e)}}><EditIcon id={comment._id}></EditIcon></IconButton>
                        <IconButton onClick={(e) => {handleDeleteComment(e)}}><DeleteIcon id={comment._id}></DeleteIcon></IconButton>
                        </ButtonGroup>
                      </Box>
                    </CardContent>
                  </Card>
                )
              })
            ) : null}
        </MuiThemeProvider>
    )
}
export default User;