import { fetchStoreData } from '../routes/routes'
import BasicInfo from '../components/store/BasicInfo';
import Review from '../components/store/Review';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {Paper, makeStyles} from '@material-ui/core'
const useStyles = makeStyles(theme => ({
    paper : {
        marginTop : theme.spacing(15),
        marginLeft : theme.spacing(2),
        marginRight : theme.spacing(2)
    }
}))
function StoreContainer (props) {
    const classes = useStyles();
    const { id } = useParams();
    let data;
    const [ basicInfo, setBasicInfo ] = useState(null)
    const [ review, setReview ] = useState(null)
    useEffect(async () => {
        data = await fetchStoreData(id);
        console.log("id: ", data._id)
        setBasicInfo({
            storeName: data.storename,
            address: data.address,
            phone: data.phone,
            menus: data.picture
        })
        setReview({
            storeName: data.storename,
            storeId: data._id,
            rating: data.rating,
            comments: data.comments
        })
    },[ id ])
    //const data = await fetchStoreData('6002e4d7d31a19a31b19086f');
    //console.log("data: ", data)
    if (data !== "error"){
        //console.log(basicInfo, review)
        return (
            (basicInfo && review)?
            (<div>
               <Paper className={classes.paper}>
               <BasicInfo data={basicInfo}/>
                <Review data={review}/>
               </Paper>
            </div>):null
        )
    }
    
}

export default StoreContainer;