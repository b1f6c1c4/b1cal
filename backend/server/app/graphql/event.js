const { Event } = require('../../models/events');
const logger = require('../../logger')('graphql/event');

module.exports = {
  resolvers: {
    Mutation: {
      async upsertEvent(parent, args) {
        logger.debug('Mutation.upsertEvent', args);

        const { event } = args.input;

        try {
          const obj = new Event(event);
          await obj.save();
          logger.info('Event created', obj._id);
          return obj;
        } catch (e) {
          logger.error('Upsert event', e);
          return e;
        }
      },

      async deleteEvent(parent, args) {
        logger.debug('Mutation.deleteEvent', args);

        const { eId } = args.input;

        try {
          await Event.findByIdAndRemove(eId);
          logger.info('Event removed', eId);
          return true;
        } catch (e) {
          logger.error('Delete event', e);
          return e;
        }
      },

    },
  },
};
