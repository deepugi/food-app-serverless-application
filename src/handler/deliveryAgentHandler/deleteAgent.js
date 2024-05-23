'use strict'
const deliveryAgentQueries = require('../../../sequelizeQueries/deliveryAgentQueries');

module.exports.deleteAgent= async (event, context, callback) => {

        // console.log('event'+JSON.stringify(event));


        console.log('event'+JSON.stringify(event?.body));

        console.log('context' + JSON.stringify(context));

        
        const data = event?.queryStringParameters;

        // const {Item_Name, Item_Description  } = data;
        // data.params
        await deliveryAgentQueries.deleteAgent(data).then((result) => {

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