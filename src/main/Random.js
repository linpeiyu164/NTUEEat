import React, {useState, useEffect} from 'react'
import { Button, Grid, Typography, Card, Dialog} from '@material-ui/core'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'

const instance = axios

const useStyle = makeStyles( theme => ({
    root : {
        minWidth: 275,
    },
    outergrid : {
        margin : theme.spacing(2),
        padding : theme.spacing(4),
        maxWidth : 'lg',
        minWidth: 'xs'
    },
    card : {
        margin : theme.spacing(1),
        padding : theme.spacing(4),
    },
    innercard : {
        margin : theme.spacing(2),
        padding : theme.spacing(4),
        maxWidth : 'lg',
        minWidth: 'xs'
    },
    text : {
        margin : theme.spacing(1),
    },
    buttonHelp : {
        paddingLeft : theme.spacing(4),
        paddingRight : theme.spacing(4),
        margin : theme.spacing(1),
        fontSize : 15,
        borderRadius : 20
    },
    buttonEat : {
        paddingLeft : theme.spacing(2),
        paddingRight : theme.spacing(2),
        margin : theme.spacing(1),
        fontSize : 15,
        borderRadius : 20
    },
    header : {
        padding : theme.spacing(1),
        margin : theme.spacing(3),
    }
}))

function Random({ CloseBackdrop }){
    const classes = useStyle()
    const [result, setResult] = useState(null)
    const getResult = async () => {
        const res = await instance.get('/stores/random')
        // console.log(res.data)
        setResult(res.data)
    }
    const handleClose = () => {
        CloseBackdrop()
        setResult(null)
    }
    useEffect( () => {
        console.log(result)
    }, [result])
    return(
        <>
            <Grid container
                justify="center"
                direction="row"
                className={classes.outergrid}
            >
                <Card alignItems="center"
                    justify="center"
                    style={{backgroundColor: "#EBEBD3"}}
                    className={classes.card}
                >
                <Grid item
                    container 
                    direction="column"
                    justify="center" 
                >
                    <Grid item>
                        <Typography className={classes.header} variant="h2">今天吃什麼</Typography>
                    </Grid>
                    <Grid item>
                        {
                        (result) ? (
                            <Card 
                                alignItems="center"
                                className={classes.innercard}
                            >
                                <Typography variant="h5" style={{ display : "inline-block" }} className={classes.text}>{result.storename}</Typography>
                                <Link to={`/store/${result._id}`}
                                    style={{paddingLeft: 13, 
                                        textDecoration: 'none', 
                                        display: "inline-block", 
                                        alignSelf : "flex-end",
                                        float : "right"
                                    }}
                                >
                                    <Button
                                        onClick={()=>handleClose()}
                                        className={classes.buttonEat}
                                        style={{ 
                                            backgroundColor : "#3C3C3B",
                                            color : "#FFFFFF"
                                    }}>
                                        吃！
                                    </Button>
                                </Link>
                            </Card>
                        ):null
                        }
                    </Grid>
                    <Grid item 
                        container
                        justify="center"
                    >
                        <Button 
                            size="large"
                            onClick={getResult}
                        >
                            救救我！
                        </Button>
                        <Button onClick={handleClose}>close</Button>
                    </Grid>
                </Grid>
                </Card>
            </Grid>
        </>
    )
}

export default Random;