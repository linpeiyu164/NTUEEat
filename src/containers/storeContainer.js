import { fetchStoreData } from '../routes/routes'
import BasicInfo from '../components/store/BasicInfo';
import Review from '../components/store/Review';
import { useEffect, useState ,useContext} from 'react';
import {Paper, makeStyles, Grid} from '@material-ui/core'
import {
    BrowserRouter as Router,
    useParams
  } from "react-router-dom";
const useStyles = makeStyles(theme => ({
    paper : {
        marginTop : theme.spacing(20),
        marginLeft : theme.spacing(5),
        marginRight : theme.spacing(2),
        marginButtom: theme.spacing(3)
    },
    info : {
        marginLeft : theme.spacing(0),
        marginRight : theme.spacing(0),
        backgroundSize: 'cover', 
        minWidth : 500,
        maxWidth: 360,
        width: '100%',
    }
}))
function StoreContainer (props) {
    const classes = useStyles();
    const { id } = useParams();
    let data;
    const [ basicInfo, setBasicInfo ] = useState(null)
    const [ review, setReview ] = useState(null)
    
    console.log("slug",id);

    useEffect(async () => {
        const data = await fetchStoreData(id);
        console.log("id: ", data._id)
        setBasicInfo({
            storeName: data.storename,
            address: data.address,
            phone: data.phone,
            menus: data.picture
        })
        setReview({
            storename: data.storename,
            storeId: data._id,
            rating: data.rating,
            comments: data.comments
        })
    },[id])
    //const data = await fetchStoreData('6002e4d7d31a19a31b19086f');
    //console.log("data: ", data)
    if (data !== "error"){
        
        //console.log(basicInfo, review)
        return (
        <div>
            <Grid container>
                <Grid item className={classes.info}>
                    <Paper className={classes.paper}>
                        <BasicInfo data={basicInfo && basicInfo}/>
                        <Review data={review&&review}/>
                    </Paper>
                </Grid>

                ////map
                <Grid item >
                    
                </Grid>

            </Grid>
            
                
                
        </div>
        )
    }
    
}

export default StoreContainer;