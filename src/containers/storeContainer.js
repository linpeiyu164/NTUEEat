import { fetchStoreData } from '../routes/routes'
import BasicInfo from '../components/store/BasicInfo';
import Review from '../components/store/Review';

async function StoreContainer () {
    const data = await fetchStoreData();
    if (data !== "error"){
        const basicInfo = {
            storeName: data.storename,
            address: data.address,
            phone: data.phone,
            menus: data.picture
        }
        const review = {
            rating: data.rating,
            comments: data.comments
        }
        return (
            <div>
                <BasicInfo data={basicInfo}/>
                <Review data={review}/>
            </div>
        )
    }
    
}

export default StoreContainer;