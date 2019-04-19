import simpleOauth from 'simple-oauth2';

export const config = {
  api_key: process.env.API_KEY,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  authorizePath: 'https://accounts.google.com/o/oauth2/v2/auth',
  redirect_uri: 'https://cal.b1f6c1c4.info/.netlify/functions/auth-callback',
  tokenHost: 'https://www.googleapis.com',
  tokenPath: '/oauth2/v4/token',
};

export default simpleOauth.create({
  client: {
    id: config.clientId,
    secret: config.clientSecret,
  },
  auth: {
    tokenHost: config.tokenHost,
    tokenPath: config.tokenPath,
    authorizePath: config.authorizePath,
  },
});
