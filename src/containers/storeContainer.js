import { fetchStoreData } from '../routes/routes'
import BasicInfo from '../components/store/BasicInfo';
import Review from '../components/store/Review';
import { useEffect, useState } from 'react';
import {Paper, makeStyles} from '@material-ui/core'
const useStyles = makeStyles(theme => ({
    paper : {
        marginTop : theme.spacing(15),
        marginLeft : theme.spacing(2),
        marginRight : theme.spacing(2)
    }
}))
function StoreContainer () {
    const classes = useStyles()
    let data;
    const [ basicInfo, setBasicInfo ] = useState(null)
    const [ review, setReview ] = useState(null)
    useEffect(async () => {
        data = await fetchStoreData('60039fe64aef0bee6124d989');
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
    },[])
    //const data = await fetchStoreData('6002e4d7d31a19a31b19086f');
    //console.log("data: ", data)
    if (data !== "error"){
        
        //console.log(basicInfo, review)
        return (
            <div>
               <Paper className={classes.paper}>
               <BasicInfo data={basicInfo&&basicInfo}/>
                <Review data={review&&review}/>
               </Paper>
            </div>
        )
    }
    
}

export default StoreContainer;