const orderItemsTB = require('../models/orderItemsTB');
const sequelize = require('sequelize');
const Op = sequelize.Op;



// create Table
const createOrderItemsTable = () => {
orderItemsTB.sync().then((result) => {
    return result;
})
.catch((err) =>{
  console.log('err'+ err);
})
};



const insertOrderItems= async (info) => {

  //id is menu_id to get the product detai;s
  const { quantity, price, menuId, orderId } = info;
  // {name: "Chandler Bing", email: "cb@gmail.com"}
  // console.log('info values', info);
  // const getUserId = await userTableQueries.getOneUser(userId);
  // const User_Id = getUserId.Id;


  // console.log('userId', User_Id);

  const OrderItems = await orderItemsTB.create({ quantity: quantity , price: price, orderId:orderId, menuId: menuId });

  console.log('OrderItems', OrderItems);
  console.log('success updated');
  return OrderItems;
}




module.exports = {
    createOrderItemsTable,
    insertOrderItems
}



