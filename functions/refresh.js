/* eslint-disable no-console */

import oauth2, { config } from './utils/oauth';

exports.handler = async (event) => {
  try {
    const match = event.cookie.match(/token=([^;])*/);
    if (!match) {
      throw new Error('Cookie not found');
    }
    const token = JSON.parse(decodeURIComponent(match[1]));
    let accessToken = oauth2.accessToken.create(token);

    accessToken = await accessToken.refresh();

    const tokenStr = encodeURIComponent(JSON.stringify(accessToken.token));

    return {
      statusCode: 204,
      headers: {
        'Set-Cookie': `token=${tokenStr}; api_key=${config.api_key}; Secure`,
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
