const walletTable = require('../models/walletTB');
const userTableQueries = require('../sequelizeQueries/userQueries');
const sequelize = require('sequelize');
const Op = sequelize.Op;


// create Table
const createWalletTable = () => {
  walletTable.sync().then((result) => {
    // console.log(Restaurant+'response');
    return result;
  })
    .catch((err) => {
      console.log('err' + err);
    })
};


const addInitialWallet = async (walletAmount, userId) => {
  // Name, City, ImageURL, Email, Is_Closed, Rating

  let info = {
    walletAmount: walletAmount,
    userId: userId

  }

  const walletDetails = await walletTable.create(info)
  // res.status(200).send(product)
  console.log('success inserted');

  // console.log(JSON.stringify(product));
}






//get wallet info using userId

const getCartItems = async (info) => {

  //id is menu_id to get the product details
  const { walletAmount, userId } = info;
  // {name: "Chandler Bing", email: "cb@gmail.com"}
  console.log('info values', info);
  const getUserId = await userTableQueries.getOneUser(userId);

  const User_Id = getUserId.Id;

  const cartItems = await cartItemsTable.findOne(
    {
      where: {
        userId:
          { [Op.like]: "%" + User_Id + "%" }
      }

    }
  );

}

// update wallet amount after paying the amount

//add cart Items
const updateWallet = async (info) => {

  //id is menu_id to get the product detai;s
  const { remainingAmount, userId } = info;
  // {name: "Chandler Bing", email: "cb@gmail.com"}
  const getUserId = await userTableQueries.getOneUser(userId);

  const User_Id = getUserId.Id;
  console.log('info values', info);
  // const User_Id = 1;

 const walletItems = await walletTable.update({ walletAmount: remainingAmount },
    {
      where: {
        userId:  User_Id 
      }
    }
  ).then((result) => {
    console.log('result', result);
  }).catch((e) => {
    console.log('eresult', e);
  });

  console.log('walletItems', walletItems);
  console.log('success updated');
  return walletItems;
}


module.exports = {
  createWalletTable,
  addInitialWallet,
  updateWallet
}

