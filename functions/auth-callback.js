/* eslint-disable no-console */

import oauth2, { config } from './utils/oauth';

exports.handler = async (event) => {
  const { code } = event.queryStringParameters;

  try {
    const token = await oauth2.authorizationCode.getToken({
      code,
      redirect_uri: config.redirect_uri,
      client_id: config.clientId,
      client_secret: config.clientSecret,
    });

    const accessToken = oauth2.accessToken.create(token);
    accessToken.apiKey = config.api_key;

    const tokenStr = encodeURIComponent(JSON.stringify(accessToken));

    return {
      statusCode: 302,
      headers: {
        'Set-Cookie': `credential=${tokenStr}; Secure; Path=/`,
        Location: '/app.html',
      },
      body: '',
    };
  } catch (error) {
    console.log('Access Token Error', error.message);
    console.log(error);
    return {
      statusCode: error.statusCode || 500,
      body: '',
    };
  }
};
