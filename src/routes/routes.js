const axios = require('axios');

// AddStore
const uploadStoreInfo = async (encodedFiles) => {
    let response;
    try{
        const { data } = await axios.post('/stores/addstore', 
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
    return response;
}

// Store
const fetchStoreData = async (storeId) => {
    let response;
    await axios.get(`/stores/store/${storeId}`)
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
    await axios.post(`/stores/store/${data.storeid}`, data)
    .then(res => {response = res})
    .catch(err => {
        throw err
    })
    return response;
}

const reviseComment = async (data) => {
    let response;
    await axios.post('/users/comments', data)
    .then(res => response = res)
    .catch(err => {
        console.log(err)
    })
    return response
}

const getCoord = async (addr) => {
    let response;
    response = await axios.post('/stores/geo', {addr: addr})
    .then(res => {
        //console.log('data: ', res)
        return res.data
    })
    .catch(err => {
        response = 'error'
        console.log('error: ', err)
    })
    //console.log('response: ', response)
    return response
}

export { uploadStoreInfo, fetchStoreData, sendComment, reviseComment, getCoord };
