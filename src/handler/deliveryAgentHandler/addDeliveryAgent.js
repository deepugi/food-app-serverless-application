'use strict'
const deliveryAgentQueries = require('../../../sequelizeQueries/deliveryAgentQueries');

module.exports.addDeliveryAgent = async (event, context, callback) => {




        console.log('event'+JSON.stringify(event.body));
 
        
        const data = JSON.parse(event.body);

        // const {Item_Name, Item_Description  } = data;
        await deliveryAgentQueries.addDeliveryAgent(data.params).then((result) => {

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


}