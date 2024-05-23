const mysql = require('mysql2');
const usersTB = require('../models/UsersTB');
const sequelize = require('sequelize');
const Op = sequelize.Op;


// create Table
const createUsersTable = () => {
const Restaurant = usersTB.sync({force:true}).then((result) => {
    // console.log(Restaurant+'response');
    return result;
})
.catch((err) =>{
  console.log('err'+ err);
})
};


//Insert into table - initial data 

const addInitialUsers = async ( Name, Email_Id, UserRole, sub ) => {
  // Name, City, ImageURL, Email, Is_Closed, Rating
  let info = {
    Name: Name,
    Email_Id: Email_Id,
    UserRole: UserRole,
    sub : sub,
}

const users = await usersTB.create(info)
// res.status(200).send(product)
console.log('success inserted');
// console.log(JSON.stringify(product));
}

//get one user based on the sub 
const getOneUser = async (userId) => {
  console.log('inside the getOneUser');
  let product = await usersTB.findOne({ where: { sub: { [Op.like]: "%" + userId + "%" }}})
  console.log('product', product);
  return product;
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
createUsersTable,
addInitialUsers,
addUsers,
getAllUsers,
getOneUser
}



