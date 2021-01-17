import { fetchStoreData } from '../routes/routes'
import BasicInfo from '../components/store/BasicInfo';
import Review from '../components/store/Review';
import { useEffect, useState } from 'react';

function StoreContainer () {
    let data;
    const [ basicInfo, setBasicInfo ] = useState(null)
    const [ review, setReview ] = useState(null)
    useEffect(async () => {
        data = await fetchStoreData('6002fc538915aed1db40fd15');
        setBasicInfo({
            storeName: data.storename,
            address: data.address,
            phone: data.phone,
            menus: data.picture
        })
        setReview({
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
                <BasicInfo data={basicInfo&&basicInfo}/>
                <Review data={review&&review}/>
            </div>
        )
    }
    
}

export default StoreContainer;