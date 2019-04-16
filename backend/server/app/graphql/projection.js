const gqlProjection = require('graphql-advanced-projection');

module.exports = gqlProjection({
  Event: {
    proj: {
      eId: '_id',
    },
  },
});
