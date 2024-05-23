const deliveryRatingTB = require('../models/deliveryRatingTB');



// create Table
const createdeliveryRatingTB = () => {
    deliveryRatingTB.sync().then((result) => {
    // console.log(Restaurant+'response');
    return result;
})
.catch((err) =>{
  console.log('err'+ err);
})
};





const insertDeliveryRating = async (info) => {

  const deliveryratingtb = await deliveryRatingTB.create(info);

  console.log('deliveryratingtb', deliveryratingtb);
  console.log('success updated');
  return deliveryratingtb;
}












module.exports = {

    createdeliveryRatingTB,
    insertDeliveryRating
    
}
    
    
    
    
