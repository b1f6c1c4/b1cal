/* eslint-disable no-console */

import oauth2, { config } from './utils/oauth';

exports.handler = async (event) => {
  try {
    const match = event.headers.cookie.match(/credential=([^;]*)/);
    if (!match) {
      throw new Error('Cookie not found');
    }
    const { token } = JSON.parse(decodeURIComponent(match[1]));
    let accessToken = oauth2.accessToken.create(token);

    accessToken = await accessToken.refresh();
    accessToken.apiKey = config.api_key;

    const tokenStr = encodeURIComponent(JSON.stringify(accessToken));

    return {
      statusCode: 204,
      headers: {
        'Set-Cookie': `credential=${tokenStr}; Secure; Path=/`,
      },
      body: '',
    };
  } catch (error) {
    console.log('Access Token Error Refresh', error.message);
    console.log(error);
    return {
      statusCode: error.statusCode || 500,
      body: '',
    };
  }
};
