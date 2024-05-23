const mysql = require('mysql2');
const restaurantTB = require('../models/restaurantTable');
const sequelize = require('sequelize');
const Op = sequelize.Op;

// const sequelize = require("../util/database");


// db.sequelize.sync().then((req) => {
// console.log('created db');
// }) 

// create main Model


// create Table
const createRestaurantTable = () => {
  const Restaurant = restaurantTB.sync({ force: true }).then((result) => {
    // console.log(Restaurant+'response');
    return result;
  })
    .catch((err) => {
      console.log('err' + err);
    })
};


//Insert into table - initial data 

const addInitialRestaurant = async (Name, City, ImageURL, Email, Is_Closed, Rating) => {
  // Name, City, ImageURL, Email, Is_Closed, Rating
  let info = {
    Name: Name,
    City: City,
    ImageURL: ImageURL,
    Email: Email,
    Is_Closed: Is_Closed,
    Rating: Rating
  }

  const product = await restaurantTB.create(info)
  // res.status(200).send(product)
  console.log('success inserted');
  // console.log(JSON.stringify(product));
}





const addRestaurant = async (info) => {
  // Name, City, ImageURL, Email, Is_Closed, Rating
  // let info = {
  //   Name: Name,
  //   City: City,
  //   ImageURL: ImageURL,
  //   Email: Email,
  //   Is_Closed: Is_Closed,
  //   Rating: Rating
  // }

  const restaurant = await restaurantTB.create(info)
  // res.status(200).send(restaurant);
  console.log('success inserted in restaurant');

  return restaurant;

  // console.log(JSON.stringify(product));
}



//  get all restaurants

const getAllProducts = async (req, res) => {
  let products;
  // console.log( JSON.stringify(req));
  const { city, searchType } = req?.query;
  // req.query in frontend



  if (city !== undefined && searchType === undefined) {
    products = await restaurantTB.findAll({ where: { City: { [Op.like]: "%" + req.query.city + "%" } } });
  }
  if (city !== undefined && searchType !== undefined) {

    products = await restaurantTB.findAll({
      where: {
        [Op.and]: [
          {
            Name:
              { [Op.like]: "%" + searchType + "%" }
          },

          {
            City:
              { [Op.like]: "%" + req.query.city + "%" }
          }

        ]
      }
    }
    );
  }

  //   if(req?.query?.city){
  //     products = await restaurantTB.findAll({ where: {City:{[Op.like]:"%"+req.query.city+"%"} }});
  // }

  if (city === undefined && searchType !== undefined) {
    products = await restaurantTB.findAll({
      where: {
        Name:
          { [Op.like]: "%" + searchType + "%" }
      },
    }
    );
  }

  if (city === undefined && searchType === undefined) {
    products = await restaurantTB.findAll({});
  }

  res.status(200).send(products);
}


//get restaurants based on the city 

const getAllProductsOfCity = async (req, res) => {

  // const products =  await Product.findAll({ where: { published: true }})
  // where:{name:{[Op.like]:"%"+examName+"%"}},
  let restaurants = await restaurantTB.findAll({ where: { City: { [like]: "%" + req.params.city + "%" } } });
  res.status(200).send(restaurants);
}

const updateRestaurantAvailability = async (info) => {

  const {Is_Closed, restaurantId  } = info;

  // console.log('updatedDetails', orderId);


  const updatedRestaurant = await restaurantTB.update( {Is_Closed: Is_Closed }, 
    {
      where: { Id:  restaurantId }
    }
  );
  
  console.log('updatedRestaurant', updatedRestaurant);
  console.log('success updated');
  return updatedRestaurant;
  }


  const deleteRestaurant = async (info) => {

    //id is menu_id to get the product details

       // restaurantId: Id;

    const { restaurantId } = info;
    // {name: "Chandler Bing", email: "cb@gmail.com"}
  
    
    const deletedRestaurant = await restaurantTB.destroy( 
      {
        where: { Id: restaurantId }
      }
    );
    
    console.log('deletedRestaurant', deletedRestaurant);
    console.log('success updated');
    return deletedRestaurant;

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
  createRestaurantTable,
  addRestaurant,
  getAllProducts,
  getAllProductsOfCity,
  updateRestaurantAvailability,
  deleteRestaurant
}



