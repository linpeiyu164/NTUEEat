const axios = require('axios');

const instance = axios.create({baseURL : "http://localhost:4000"});

// AddStore
const uploadStoreInfo = async (encodedFiles) => {
    let response;
    try{
        const { data } = await instance.post('/stores/addstore', 
            encodedFiles,
            { headers : {'Content-Type' : 'application/json'} }
        )
        // console.log('i success')
        console.log('data: ', data)
        if(data){
            response = data.message
            console.log(response)
        }else{
            console.log('flag')
            response = 'success'
        }
    }catch(err){
        console.log('i fail')
        response = 'client-side error'
    }
    // .then(res => {
    //     console.log("response", res.data)
    //     if(res.data){
    //         response = res.data.message
    //         console.log(response)
    //     }else{
    //         response = 'success'
    //     }
    // })
    // .catch(err => {
    //     console.log('clientside error')
    //     response = 'client-side error'
    // });
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

const sendComment = async (data) => {
    let response;
    await instance.post(`/stores/store/${data.storeid}`, data)
    .then(res => {response = res})
    .catch(err => {
        throw err
    })
    return response;
}

const reviseComment = async (data) => {
    let response;
    await instance.post('/users/comments', data)
    .then(res => response = res)
    .catch(err => {
        throw err
    })
    return response
}

export { uploadStoreInfo, fetchStoreData, sendComment, reviseComment };
