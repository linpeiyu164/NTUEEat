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
 module.exports.checkPrice = checkPrice;
 module.exports.calculateAverageRating = calculateAverageRating;
