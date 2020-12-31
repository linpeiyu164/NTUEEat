const axios = require('axios');

const instance = axios.create({baseURL : "http://localhost:4000"});

// AddStore
const uploadStoreInfo = async (encodedFiles) => {
    let response;
    instance.post('/stores/addstore', 
        encodedFiles,
        { headers : {'Content-Type' : 'application/json'} }
    )
    .then(res => {response = res})
    .catch(err => {response = 'error'});
    return response;
}

// Store
const fetchStoreData = async (storeId) => {
    let response;
    instance.get(`store/:${storeId}`)
    .then(res => {
        const data = JSON.parse(res.data);
        response = data;
    })
    .catch(err => { response = "error" })
    return response;
}

export { uploadStoreInfo, fetchStoreData };
