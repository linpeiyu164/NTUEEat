const axios = require('axios');

const instance = axios.create({baseURL : "http://localhost:4000"});

// AddStore
const uploadStoreInfo = async (encodedFiles) => {
    let response;
    await instance.post('/stores/addstore', 
        encodedFiles,
        { headers : {'Content-Type' : 'application/json'} }
    )
    .then(res => {
        console.log(res.data)
        if(res.data){
            response = res.data.error
            console.log(response)
        }else{
            response = 'success'
        }
    })
    .catch(err => {
        console.error('Error : ', err)
        response='error'
    });
    return response;
}

// Store
const fetchStoreData = async (storeId) => {
    let response;
    await instance.get(`/stores/store/${storeId}`)
    .then(res => {
        response = res.data;
    })
    .catch(err => { 
        console.error('Error : ',err)
        response = "error" 
    })
    return response;
}

// Comment
// const sendComment = async (data) => {
//     let response;
//     instance.post()
// }

export { uploadStoreInfo, fetchStoreData };
