/* eslint-disable no-console */

import oauth2, { config } from './utils/oauth';

exports.handler = async (event, context, callback) => {
  const { code } = event.queryStringParameters;

  try {
    let token = await oauth2.authorizationCode.getToken({
      code,
      redirect_uri: config.redirect_uri,
      client_id: config.clientId,
      client_secret: config.clientSecret,
    });

    ({ token } = oauth2.accessToken.create(token));

    const tokenStr = encodeURIComponent(JSON.stringify(token));

    return callback(null, {
      statusCode: 302,
      headers: {
        'Set-Cookie': `token=${tokenStr}; api_key=${config.api_key}; Secure`,
        Location: '/app.html',
      },
      body: '',
    });
  } catch (error) {
    console.log('Access Token Error', error.message);
    console.log(error);
    return callback(null, {
      statusCode: error.statusCode || 500,
      body: 'Oops',
    });
  }
};
