const restaurantCookingTB = require('../models/restaurantCookingInstructions');



// create Table
const createRestaurantCookingTB = () => {
    restaurantCookingTB.sync().then((result) => {
    // console.log(Restaurant+'response');
    return result;
})
.catch((err) =>{
  console.log('err'+ err);
})
};


const restaurantInstruction = async (info) => {

  const restaurantInstruction = await restaurantCookingTB.create(info);

  console.log('restaurantInstruction', restaurantInstruction);
  console.log('success updated');
  return restaurantInstruction;
}












module.exports = {
    createRestaurantCookingTB,
    restaurantInstruction
}
    
    
    
    
