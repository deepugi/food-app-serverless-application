const { DATE } = require('sequelize');
const orderTB = require('../models/OrderTB');
const userTableQueries = require('../sequelizeQueries/userQueries');



// create Table
const createOrderTable = () => {
  orderTB.sync({ force: true }).then((result) => {
    // console.log(Restaurant+'response');
    return result;
  })
    .catch((err) => {
      console.log('err' + err);
    })
};





// update wallet amount after paying the amount

//add cart Items
// create
const insertOrder = async (info) => {

  //id is menu_id to get the product detai;s
  const { orderStatus, orderedDate, userId, restaurantId } = info;
  // {name: "Chandler Bing", email: "cb@gmail.com"}
  console.log('info values', info);
  const getUserId = await userTableQueries.getOneUser(userId);

  const User_Id = getUserId.Id;


  console.log('userId', User_Id);

  const walletItems = await orderTB.create({ orderStatus: orderStatus, orderedDate: new DATE, userId: User_Id, restaurantId: restaurantId, });

  console.log('cartItems', walletItems);
  console.log('success updated');
  return walletItems;
}

//add update order Items
const updateOrder = async (info) => {

  const { orderId, orderStatus, agentId } = info;

  console.log('updatedDetails', orderId);


  const updatedOrders = await orderTB.update({ orderStatus: orderStatus, agentId: agentId },
    {
      where: { Id: orderId }
    }
  );

  console.log('updatedOrders', updatedOrders);
  console.log('success updated');
  return updatedOrders;
}
// orderId: Id
// agentId: value


const updateAgentId = async (info) => {

  const { orderId,  agentId } = info;

  console.log('updatedDetails', orderId);


  const updatedOrders = await orderTB.update({ agentId: agentId },
    {
      where: { Id: orderId }
    }
  );

  console.log('updatedOrders', updatedOrders);
  console.log('success updated');
  return updatedOrders;
}






module.exports = {
  createOrderTable,
  insertOrder,
  updateOrder,
  updateAgentId
}




