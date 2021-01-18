function checkPrice(low, high){
    let avg = Math.round((low + high)/2)
    let array = []
    if(avg > 200){
        array = [ 0, 0, 1 ]
    }
    else if((avg < 200 || avg === 200 ) && avg > 100){ 
        array = [ 0, 1, 0 ]
    }
    else{ 
        array = [ 1, 0, 0 ]
    }
    return array
}

function calculateAverageRating(store){
    let avg = 0
    store.comments.forEach(comment => {
        console.log(typeof comment.rating)
        avg += comment.rating
    })
    avg = avg/(store.comments.length)
    // avg = Math.round(avg, -1);
    return avg;
}

const getRandom = async (Collection) => {
    const total = await Collection.countDocuments();
    let random = Math.floor(Math.random() * total)
    const result = await Collection.findOne().skip(random)
    return result
}

const isValidPhone = (string) => {
    if(string.length !== 10){
        return false
    }
    for(let i = 0; i < string.length ; i++){
        if(isNaN(parseInt(string[i],10))){
            return false
        }
    }
    return true
}

const checkInput = (stores, req) => {
    if(!isValidPhone(req.body.phone)){
        return Promise.resolve({ Error : "Invalid phone number entered" })
    }
    for(let i = 0; i < stores.length; i++){
        if(stores[i].storename === req.body.storename){
            return Promise.resolve({ Error : "Another restaurant with the same name already exists"})
        }
        else if(stores[i].phone === req.body.phone){
            return Promise.resolve({ Error : "Another restaurant with the same phone number already exists"})
        }else if(stores[i].address === req.body.address){
            return Promise.resolve({ Error : "Another restaurant with the same address already exists"})
        }else if(isNaN(parseInt(req.body.lowestPrice, 10))){
            return Promise.resolve({ Error : "The lowest price you entered is not a number" })
        }else if(isNaN(parseInt(req.body.highestPrice, 10))){
            return Promise.resolve({ Error : "The highest price you entered is not a number" })
        }
    }
    return Promise.resolve({ Error : null })
}

module.exports.getRandom = getRandom;
module.exports.checkPrice = checkPrice;
module.exports.calculateAverageRating = calculateAverageRating;
module.exports.checkInput = checkInput;
