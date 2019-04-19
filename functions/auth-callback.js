import oauth2, { config } from './utils/oauth'

exports.handler = async (event, context, callback) => {
  const { code } = event.queryStringParameters;

  try {
    const token = await oauth2.authorizationCode.getToken({
      code,
      redirect_uri: config.redirect_uri,
      client_id: config.clientId,
      client_secret: config.clientSecret,
    });

    const accessToken = oauth2.accessToken.create(token);

    return callback(null, {
      statusCode: 302,
      headers: {
        'X-Token': JSON.stringify(token),
        'X-AccessToken': JSON.stringify(accessToken),
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
