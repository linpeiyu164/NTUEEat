const axios = require('axios');

const instance = axios.create({baseURL : "http://localhost:4000"});

// AddStore
const uploadStoreInfo = async (encodedFiles) => {
    const res = await instance.post('/stores/addstore', 
        encodedFiles,
        { headers : {'Content-Type' : 'application/json'} }
    )
    return res;
}

// Store
const fetchStoreData = async () => {
    const res = await instance.get()
}

export { uploadStoreInfo, fetchStoreData };