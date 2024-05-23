const deliveryAgentTB = require('../models/DeliverAgentTB');
const sequelize = require('sequelize');
const Op = sequelize.Op;




// create Table
const createDeliveryAgentTable = () => {
    deliveryAgentTB.sync().then((result) => {
    // console.log(Restaurant+'response');
    return result;
})
.catch((err) =>{
  console.log('err'+ err);
})
};





//add cart Items
const updateDeliveryDetails = async (info) => {

  //id is menu_id to get the product detai;s
  const { IsAvailable, userId } = info;
  // {name: "Chandler Bing", email: "cb@gmail.com"}
  // const getUserId = await userTableQueries.getOneUser(userId);

  // const User_Id = getUserId.Id;
  console.log('IsAvailable', IsAvailable);
  // const User_Id = 2;

 const deliveryDetails = await deliveryAgentTB.update({ IsAvailable : IsAvailable },
    {
      where: {
        Name: userId 
      }
    }
  ).then((result) => {
    console.log('result', result);
  }).catch((e) => {
    console.log('eresult', e);
  });

  console.log('deliveryDetails', deliveryDetails);
  console.log('success updated');
  return deliveryDetails;
}



const addDeliveryAgent = async (info) => {
  // Name, City, ImageURL, Email, Is_Closed, Rating
  //   let info = {
  //     Name: Name,
  //     Email_Id: Email_Id,
  //     UserRole: UserRole,
  //     sub : sub,
  // }

  const delievryagent = await deliveryAgentTB.create(info)
  // res.status(200).send(menuItems);
  // return menuItems;
  console.log('success inserted');
  return delievryagent;
  // console.log(JSON.stringify(product));
}




const deleteAgent = async (info) => {

  const { agentId } = info;
  // {name: "Chandler Bing", email: "cb@gmail.com"}

  const deletedAgent = await deliveryAgentTB.destroy( 
    {
      where: { Id: agentId }
    }
  );
  
  console.log('deletedAgent', deletedAgent);
  console.log('success updated');
  return deletedAgent;
}










module.exports = {
  createDeliveryAgentTable,
  updateDeliveryDetails,
  addDeliveryAgent,
  deleteAgent
  }
      
    
    
    
