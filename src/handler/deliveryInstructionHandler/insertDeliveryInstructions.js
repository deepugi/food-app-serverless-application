'use strict'
const deliveryInstructionsQueries = require('../../../sequelizeQueries/deliveryagentInstructionQueries');

module.exports.deliveryInstructions = async (event, context, callback) => {


        console.log('event'+JSON.stringify(event.body));
        const data = JSON.parse(event.body);

        await deliveryInstructionsQueries.insertDeliveryInstruction(data?.params).then((result) => {


            console.log('result value', result);

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

            console.log('error inside the addRestaurants', e);
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