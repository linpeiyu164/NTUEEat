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
        avg += comment.rating
    })
    avg = avg/(store.comments.length)
    avg = toString(avg)
    if(avg.length > 3){
        avg = `${avg[0]}+${avg[1]}+${avg[2]}`
    }
    return avg;
}

const getRandom = async (Store) => {
    const total = await Store.countDocuments();
    let random = Math.floor(Math.random() * total)
    const result = await Store.findOne().skip(random)
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
    for(let i = 0; i < stores.length; i++){
        if(stores[i].storename === req.body.storename){
            return { Error : "Another restaurant with the same name already exists"}
        }
        else if(stores[i].phone === req.body.phone){
            return { Error : "Another restaurant with the same phone number already exists"}
        }else if(stores[i].address === req.body.address){
            return { Error : "Another restaurant with the same address already exists"}
        }else if(isNaN(parseInt(req.body.lowestPrice, 10))){
            return { Error : "The lowest price you entered is not a number" }
        }else if(isNaN(parseInt(req.body.highestPrice, 10))){
            return { Error : "The highest price you entered is not a number" }
        }else{
            return { Error : null }
        }
    }
    if(!isValidPhone(req.body.phone)){
        return { Error : "Invalid phone number entered" }
    }
}

module.exports.getRandom = getRandom;
module.exports.checkPrice = checkPrice;
module.exports.calculateAverageRating = calculateAverageRating;
module.exports.checkInput = checkInput;
