// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
const {Twilio} = require("twilio");
const accountSID = 'AC604a20a813a2264aaff67d7aca41bc34'
const authToken = '8562dc5158fd5d832f6392030b788d24'
const twilioPhone = '+14155238886'
const targetPhone = '+917040406398'

let response;

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */
exports.lambdaHandler = async (event, context) => {
    try {
        const client = new Twilio(accountSID, authToken);

        await client.messages
            .create({
                from: `whatsapp:${twilioPhone}`,
                body: 'I love you always ',
                to: `whatsapp:${targetPhone}`
            })
            .then(message => console.log(message.sid))
            .catch(error => console.error(error));

        await client.messages
            .create({
                body: 'This is trial message 2 ',
                messagingServiceSid: 'MG193bf92d548127c8657450d92a36883f',
                to: '+917040406398'
            })
            .then(message => console.log(message.sid))
            .catch(error => console.error(error));

        // const ret = await axios(url);
        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                message: 'hello world',
                // location: ret.data.trim()
            })
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};
