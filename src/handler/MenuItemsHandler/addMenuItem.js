'use strict'
const menuItemQueries = require('../../../sequelizeQueries/menuItemQueries');

module.exports.addMenuItems = async (event, context, callback) => {

        // console.log('event'+JSON.stringify(event));


        console.log('event'+JSON.stringify(event.body));
        // let info = {
        //     Item_Name: Item_Name,
        //     Item_Description:Item_Description ,
        //     Item_Price: Item_Price,
        //     Item_URL : Item_URL,
        //     Restaurant_Id: Restaurant_Id
            
        // }

        
        const data = JSON.parse(event.body);

        // const {Item_Name, Item_Description  } = data;
        await menuItemQueries.addMenuItems(data.params).then((result) => {

            const response = {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true,
                  },
                statusCode: 200,
                body: JSON.stringify(result)
            };
    
            callback(null, response);

        } ).catch((e)=> {

            console.log('error inside the menuItem', e);
            const response = {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true,
                  },
                statusCode: 400,
                body: JSON.stringify(e)
            };
    
            callback(null, response);
            
        })

//   await cartItemQueries.addCartItems(data).then((result) => {
//     console.log('result'+ JSON.stringify(result));
//     const response = {
//         statusCode: 200,
//         body: JSON.stringify(result)
//     };

//     callback(null, response);
// });

        // console.log('result'+ JSON.stringify(result));



        // console.log('context'+context);
        // allows for using callbacks as finish/error-handlers
        // context.callbackWaitsForEmptyEventLoop = false;
        // // const sql = "INSERT INTO MESSAGE (message) VALUES ('I am MySQL')";
        // con.query(sql, (err, res) => {
        //   if (err) {
        //     throw err
        //   }
        //   callback(null, '1 records inserted.');
        // })
        // const response = {
        //     statusCode: 200,
        //     body: 'success'
        // };

        // callback(null, response);

}