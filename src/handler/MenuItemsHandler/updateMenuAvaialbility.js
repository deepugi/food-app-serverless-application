'use strict'
const menuItemsQueries = require('../../../sequelizeQueries/menuItemQueries');

module.exports.updateMenuItemsAvailability= async (event, context, callback) => {

        console.log('event'+JSON.stringify(event.body));

        
        const data = JSON.parse(event.body);
        // data.params
        await menuItemsQueries.updateItemAvailability(data?.params).then((result) => {


            console.log('resultResponse', result);
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

            console.log('error', e);
            console.log('error inside tha catch', e);
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


}