const deliveryInstructionTB = require('../models/deliveryInstructionsTB');



// create Table
const createdeliveryInstructionTB = () => {
    deliveryInstructionTB.sync().then((result) => {
    // console.log(Restaurant+'response');
    return result;
})
.catch((err) =>{
  console.log('err'+ err);
})
};


const insertDeliveryInstruction = async (info) => {

  const deliveryInstruction = await deliveryInstructionTB.create(info);

  console.log('deliveryInstruction', deliveryInstruction);
  console.log('success updated');
  return deliveryInstruction;
}
















module.exports = {

    createdeliveryInstructionTB,
    insertDeliveryInstruction
    
}
    
    
    
    
