import { fetchStoreData } from '../routes/routes'
import BasicInfo from '../components/store/BasicInfo';
import Review from '../components/store/Review';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {Paper, makeStyles} from '@material-ui/core';
import Map from '../Geolocator'

//import userRateContext from '../components/store/userCommentContext'
import userCommentContext from '../components/store/userCommentContext'

const useStyles = makeStyles(theme => ({
    root: {
        overflow: 'visible',
        display: 'flex',
        
    },
    leftBar: {
        width: '40%'
    },
    paper : {
        display: 'absolute',
        marginTop : theme.spacing(20),
        marginLeft : theme.spacing(5),
        marginRight : theme.spacing(2),
        marginButtom: theme.spacing(3),
        height: '100%'
    },
    info : {
        marginLeft : theme.spacing(0),
        marginRight : theme.spacing(0),
        maxWidth: 360,
        width: '100%',
        height: '60%'
    },
    map: {
        marginTop: '15%',
        display: 'inline',
        width: '60%',
        marginRight: '5px'
    }
}))
function StoreContainer (props) {
    const classes = useStyles();
    const { id } = useParams();
    let data;
    const [ basicInfo, setBasicInfo ] = useState(null)
    const [ review, setReview ] = useState(null)
    const [ userComment, setUserComment] = useState(null);
    const [ userRate, setUserRate] = useState(null);
    const [commented, setCommented] = useState()
    const [userCommentId, setUserCommentId] = useState(null)
    const [ edit, setEdit ] = useState()
    const [address, setAddress] = useState()
    const [storename, setStorename] = useState()
    const [rating, setRating] = useState()
    useEffect(async () => {
        data = await fetchStoreData(id);
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
        setRating(data.rating)
        setAddress(data.address)
        setStorename(data.storename)
    },[ id ])
    //const data = await fetchStoreData('6002e4d7d31a19a31b19086f');
    //console.log("data: ", data)
    if (data !== "error"){
        //console.log(basicInfo, review)
        return (
            <div className={classes.root}>
                <userCommentContext.Provider value={{userComment, setUserComment , userRate , setUserRate, commented, setCommented, userCommentId, setUserCommentId, edit, setEdit, address, setAddress, storename, rating}}>
                    <div className={classes.leftBar}><Paper className={classes.paper}>
                        <BasicInfo data={basicInfo&&basicInfo}/>
                        <Review data={review&&review}/>
                    </Paper></div>
                    <div className={classes.map}>{(address&&storename&&rating)&&<Map />}</div>
                </userCommentContext.Provider>
            </div>
        )
    }
    
}

export default StoreContainer;