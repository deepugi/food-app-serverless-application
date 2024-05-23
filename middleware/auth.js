const CognitoExpress = require('cognito-express')
// Setup CognitoExpress
const cognitoExpress = new CognitoExpress({
    region: 'us-east-1',
    cognitoUserPoolId: 'us-east-1_ZsW42bgPL',
    tokenUse: "access",
    tokenExpiration: 3600
  });


  exports.validateAuth = async (req, res, next) => {
    // Check that the request contains a token
    console.log('request',req);
    if (req.headers.Authorization && req.headers.Authorization.split(" ")[0] === "Bearer") {
      // Validate the token
      const token = req.headers.Authorization.split(" ")[1]
      console.log('token'+ token);
     await cognitoExpress.validate(token, function (err, response) {
        if (err) {
          // If there was an error, return a 401 Unauthorized along with the error
        //   res.status(401).send({"err": "unautherized"});
        //   res.status(401).send(err)
        console.log('error1'+ err);
        return err;
        
        } else {
          //Else API has been authenticated. Proceed.
        //   res.status(401).send({"name":"deepa"})
        console.log('Authentication Success');
        console.log('methodarn', req?.methodArn);
        return {
          "principalId": "apigateway.amazonaws.com",
          // "principalId": "Deepa",
          "policyDocument": {
              "Version": "2012-10-17",
              "Statement": [
                  {
                      "Action": "execute-api:Invoke",
                      "Effect": "Allow",
                      "Resource": '*'
                  }
              ]
          }
        };

          //  return next();
          // res.status(200).send("authenticated");
        }
      });
    } else {
      // If there is no token, respond appropriately 
      return 'no auth provided'
    }
  }
  