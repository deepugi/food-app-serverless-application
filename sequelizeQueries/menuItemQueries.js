// const express = require('express');
// const mysql = require('mysql2');
const menuItemTB = require('../models/menuItemsTB');
const sequelize = require('sequelize');
const Op = sequelize.Op;



// create Table
const createMenuItemsTable = () => {
  const menuItemTable = menuItemTB.sync({ force: true }).then((result) => {
    // console.log(Restaurant+'response');
    return result;
  })
    .catch((err) => {
      console.log('err' + err);
    })
};



//Insert into table - initial data 

const addInitialMenuItems = async (Item_Name, Item_Description, Item_Price, Item_URL, Restaurant_Id) => {
  // Name, City, ImageURL, Email, Is_Closed, Rating
  let info = {
    Item_Name: Item_Name,
    Item_Description: Item_Description,
    Item_Price: Item_Price,
    Item_URL: Item_URL,
    Restaurant_Id: Restaurant_Id

  }

  const menuItems = await menuItemTB.create(info)
  // res.status(200).send(product)
  console.log('success inserted');
  // console.log(JSON.stringify(product));
}



const addMenuItems = async (info) => {
  // Name, City, ImageURL, Email, Is_Closed, Rating
  //   let info = {
  //     Name: Name,
  //     Email_Id: Email_Id,
  //     UserRole: UserRole,
  //     sub : sub,
  // }

  const menuItems = await menuItemTB.create(info);
  console.log('success inserted');
  return menuItems;
  // res.status(200).send(menuItems);
  // return menuItems;

  // console.log(JSON.stringify(product));
}



//  get all restaurants

const getAllMenuItems = async (req, res) => {


  const { restaurantId } = req?.query;
  console.log('IDvalue', restaurantId);
  let menuItems;


  if (restaurantId !== undefined) {
    menuItems = await menuItemTB.findAll({ where: { Restaurant_Id: { [Op.like]: "%" + restaurantId + "%" } } });
  }
  if (restaurantId === undefined) {
    menuItems = await menuItemTB.findAll({});
  }
  // let menuItems = await menuItemTB.findAll({});
  res.status(200).send(menuItems);
}

// Item_Price: priceValue,
// Id:Id

const updateMenuPrice = async (info) => {

  const { Item_Price, Id } = info;

  // console.log('updatedDetails', orderId);
  const updatedMenu = await menuItemTB.update({ Item_Price: Item_Price },
    {
      where: { Id: Id }
    }
  );

  console.log('updatedMenu', updatedMenu);
  console.log('success updated');
  return updatedMenu;
}

const updateItemAvailability = async (info) => {

  const { Is_Available, Id } = info;

  // console.log('updatedDetails', orderId);
  const updatedMenu = await menuItemTB.update({ Is_Available: Is_Available },
    {
      where: { Id: Id }
    }
  );

  console.log('updatedMenu', updatedMenu);
  console.log('success updated');
  return updatedMenu;
}



const deleteMenuItems = async (info) => {

  //id is menu_id to get the product details
  const {Id } = info;
  // {name: "Chandler Bing", email: "cb@gmail.com"}

  
  const deletedmenuItems = await menuItemTB.destroy( 
    {
      where: { Id: Id }
    }
  );
  
  console.log('deletedmenuItems', deletedmenuItems);
  console.log('success updated');
  return deletedmenuItems;
  }


  //add cart Items
// const addMenuItems = async (info) => {
  // Name, City, ImageURL, Email, Is_Closed, Rating
//   let info = {
//     Name: Name,
//     Email_Id: Email_Id,
//     UserRole: UserRole,
//     sub : sub,
// }

//id is menu_id to get the product detai;s


// const {Item_Name, Item_Description, Item_Price, Item_URL, Restaurant_Id   } = info;
// // {name: "Chandler Bing", email: "cb@gmail.com"}
// console.log('info values', info);
// const getUserId = await userTableQueries.getOneUser(userId);

// const User_Id = getUserId.Id;

// console.log('UserData from user Table', User_Id);


// const cartItems = await cartItemsTable.create({ Quantity: quantity, price: price, Menu_ID: id, User_ID:User_Id});
// // res.status(200).send(menuItems);
// // return menuItems;
// console.log('cartItems', cartItems);
// console.log('success inserted');
// return cartItems;
// // return getUserId;

// // return getUserId;
// // console.log(JSON.stringify(product));
// }












module.exports = {
  createMenuItemsTable,
  addInitialMenuItems,
  addMenuItems,
  getAllMenuItems,
  updateMenuPrice,
  deleteMenuItems,
  updateItemAvailability

}



