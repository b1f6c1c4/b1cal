/* eslint-disable no-console */

import oauth2, { config } from './utils/oauth';

exports.handler = (event, context, callback) => callback(null, {
  statusCode: 302,
  headers: {
    Location: oauth2.authorizationCode.authorizeURL({
      redirect_uri: config.redirect_uri,
      scope: [
        'https://www.googleapis.com/auth/calendar.events',
        // 'https://www.googleapis.com/auth/calendar.readonly',
      ],
    }),
    'Cache-Control': 'no-cache',
  },
  body: '',
});
