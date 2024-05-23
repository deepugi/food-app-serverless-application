const restaurantRatingTB = require('../models/restaurantRatingTB');



// create Table
const createrestaurantRatingTB= () => {
    restaurantRatingTB.sync().then((result) => {
    // console.log(Restaurant+'response');
    return result;
})
.catch((err) =>{
  console.log('err'+ err);
})
};



const restaurantRating= async (info) => {

  const restaurantrating = await restaurantRatingTB.create(info);

  console.log('restaurantrating', restaurantrating);
  console.log('success updated');
  return restaurantrating;
}














module.exports = {
    createrestaurantRatingTB,
    restaurantRating
}
    
    
    
    
