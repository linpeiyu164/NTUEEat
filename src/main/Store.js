/////////////it is going to delete 
import react,{useState} from "react";

import Grid from '@material-ui/core/Grid';
import Ratestar from "../Ratestar";
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

export default function Store(props){
    const classes = useStyles();
    const [comments, setComments] = useState([])
    
    return(
     
        <Paper className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <div className="info">
                        {/* ////把自己傳過來 */}
                    {/* <Typography></Typography> */}
                    </div>
                    
                    <div>
                        <Ratestar/>
                    </div>

                    <div className="comments">
                        <div className="comment array"></div> 
                        <div className="input">
                            <TextField id="outlined-basic" label="Conent" variant="outlined" />
                        </div>
                        
                    </div>

                    
                    
                </Grid>

                <Grid item xs={12} sm={6}>
                    <div className="map"></div>
                </Grid>
            </Grid>
        </Paper>
 
    )
}