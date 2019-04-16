const mongoose = require('mongoose');
const { Event } = require('../../models/events');
const logger = require('../../logger')('graphql/event');

module.exports = {
  resolvers: {
    Mutation: {
      async upsertEvent(parent, args) {
        logger.debug('Mutation.upsertEvent', args);

        const event = args.input;
        logger.trace('Event', event);

        try {
          const obj = new Event();
          if (event.eId) {
            obj._id = event.eId;
          } else {
            obj._id = new mongoose.Types.ObjectId();
          }
          obj.name = event.name;
          obj.start = event.start;
          obj.end = event.end;
          obj.location = event.location;
          obj.comment = event.comment;
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
          const res = await Event.findByIdAndDelete(eId);
          if (!res) {
            logger.debug('Event not exist');
            return false;
          }
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
