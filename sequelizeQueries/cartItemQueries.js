const cartItemsTable = require('../models/cartItemsTB');
const userTableQueries  = require('../sequelizeQueries/userQueries'); 
const sequelize = require('sequelize');
const Op = sequelize.Op;



// create Table
const createCartItemsTable = () => {
const cartTable = cartItemsTable.sync().then((result) => {
    // console.log(Restaurant+'response');
    return result;
})
.catch((err) =>{
  console.log('err'+ err);
})
};


//Insert into table - initial data 

// const addInitialUsers = async ( Name, Email_Id, UserRole, sub ) => {
//   // Name, City, ImageURL, Email, Is_Closed, Rating
//   let info = {
//     Name: Name,
//     Email_Id: Email_Id,
//     UserRole: UserRole,
//     sub : sub,
// }

// const users = await usersTB.create(info)
// // res.status(200).send(product)
// console.log('success inserted');
// // console.log(JSON.stringify(product));
// }


//add cart Items
const addCartItems = async (info) => {
  // Name, City, ImageURL, Email, Is_Closed, Rating
//   let info = {
//     Name: Name,
//     Email_Id: Email_Id,
//     UserRole: UserRole,
//     sub : sub,
// }

//id is menu_id to get the product detai;s
const {id, price, quantity, userId} = info;
// {name: "Chandler Bing", email: "cb@gmail.com"}
console.log('info values', info);
const getUserId = await userTableQueries.getOneUser(userId);

const User_Id = getUserId.Id;

console.log('UserData from user Table', User_Id);


const cartItems = await cartItemsTable.create({ Quantity: quantity, price: price, Menu_ID: id, User_ID:User_Id});
// res.status(200).send(menuItems);
// return menuItems;
console.log('cartItems', cartItems);
console.log('success inserted');
return cartItems;
// return getUserId;

// return getUserId;
// console.log(JSON.stringify(product));
}




//add cart Items
const updateCartItems = async (info) => {

//id is menu_id to get the product detai;s
const {id, quantity, userId } = info;
// {name: "Chandler Bing", email: "cb@gmail.com"}
console.log('info values', info);
const getUserId = await userTableQueries.getOneUser(userId);

const User_Id = getUserId.Id;

const cartItems = await cartItemsTable.update( {Quantity: quantity},

  {
    where: {
      [Op.and]: [
        { Menu_ID: { [Op.like]: "%" + id + "%" } },

        {
          User_ID:
            { [Op.like]: "%" + User_Id + "%" }
        }

      ]
    }
  }
);

console.log('cartItems', cartItems);
console.log('success updated');
return cartItems;
}


const deleteCartItems = async (info) => {

//id is menu_id to get the product details
const {id, userId } = info;
// {name: "Chandler Bing", email: "cb@gmail.com"}
console.log('info values', info);
const getUserId = await userTableQueries.getOneUser(userId);

const User_Id = getUserId.Id;

const cartItems = await cartItemsTable.destroy( 
  {
    where: {
      [Op.and]: [
        { Menu_ID: { [Op.like]: "%" + id + "%" } },
        {
          User_ID:
            { [Op.like]: "%" + User_Id + "%" }
        }
      ]
    }
  }
);

console.log('cartItems', cartItems);
console.log('success updated');
return cartItems;
}






const addUsers = async (req, res) => {
  // Name, City, ImageURL, Email, Is_Closed, Rating
  let info = {
    Name: Name,
    Email_Id: Email_Id,
    UserRole: UserRole,
    sub : sub,
}


const users = await usersTB.create(info)
res.status(200).send(users);
console.log('success inserted');
// console.log(JSON.stringify(product));
}



//  get all restaurants

const getAllUsers = async (req, res) => {
  let users = await usersTB.findAll({});
  res.status(200).send(users);
}



// add Product

// const addProduct = async () => {

//     const restaurant = await restaurantTB.create({
//         name: "Manasa"
//       });
//     return restaurant;
// }

// const routes = express.Router({
//     mergeParams: true
// });

// routes.get('/', (req, res,next) =>{
//   res.status(200).send({"name": "deepa"});
// }
// );


// routes.post('/api/create', async(req, res) =>{
//     const response = await addProduct();
//     res.status(200).send(response);
//     console.log(response+'response');
// }
// );


// module.exports = {
//     routes,
// };

module.exports = {
createCartItemsTable,
addCartItems,
updateCartItems,
deleteCartItems
}



