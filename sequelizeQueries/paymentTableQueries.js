const paymentTB = require('../models/paymentTB');
const sequelize = require('sequelize');
const Op = sequelize.Op;



// create Table
const createPaymentTable = () => {
    paymentTB.sync().then((result) => {
    return result;
})
.catch((err) =>{
  console.log('err'+ err);
})
};


      
// const paymentType = paymentType;
// const paymentStatus = 'Paid';
// const orderId = response.Id;



const insertPayment = async (info) => {

  //id is menu_id to get the product detai;s
  const { paymentType, paymentStatus, orderId } = info;
  // {name: "Chandler Bing", email: "cb@gmail.com"}
  // console.log('info values', info);
  // const getUserId = await userTableQueries.getOneUser(userId);
  
  // const User_Id = getUserId.Id;


  // console.log('userId', User_Id);

  const paymentItems = await paymentTB.create({ paymentType: paymentType, orderId: orderId, paymentStatus:paymentStatus });
  
  console.log('cartItems', paymentItems);
  console.log('success updated');
  return paymentItems;
}







module.exports = {
    createPaymentTable,
    insertPayment
}



