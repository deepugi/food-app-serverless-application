'use strict'
const deliveryAgentQueries = require('../../../sequelizeQueries/deliveryAgentQueries');

module.exports.updateDeliveryAgentDetails = async (event, context, callback) => {

        console.log('event'+JSON.stringify(event.body));

        
        const data = JSON.parse(event.body);
        // data.params
        await deliveryAgentQueries.updateDeliveryDetails(data?.params).then((result) => {


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