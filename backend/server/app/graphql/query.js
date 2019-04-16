const { Event } = require('../../models/events');
const { project } = require('./projection');
const logger = require('../../logger')('graphql/query');

module.exports = {
  resolvers: {
    Query: {
      async events(parent, args, context, info) {
        logger.debug('Query.events', args);

        const { start, end } = args.input;

        try {
          const proj = project(info);
          logger.debug('Project', proj);

          const conds = {};
          if (start) {
            conds.end = { $gt: start };
          }
          if (end) {
            conds.start = { $lt: end };
          }
          logger.debug('Condition', conds);

          const docs = await Event.find(conds, proj);
          const objs = docs.map((d) => d.toObject());
          return objs;
        } catch (e) {
          logger.error('Query events', e);
          return e;
        }
      },

    },
  },
};
