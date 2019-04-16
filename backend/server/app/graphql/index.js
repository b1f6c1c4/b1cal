const _ = require('lodash');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const { makeExecutableSchema } = require('graphql-tools');
const fs = require('fs');
const status = require('../../status');

const projs = require('./projection').resolvers;
const query = require('./query').resolvers;
const event = require('./event').resolvers;

/* istanbul ignore next */
const typeDefs = fs.readFileSync('./docs/public.graphql', 'utf8');

const Date = new GraphQLScalarType({
  name: 'Date',
  description: 'Date token.',
  serialize: (value) => value,
  parseValue: (value) => value,
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return ast.value;
    }
    return null;
  },
});

const resolvers = {
  Date,

  Query: {
    status: () => status,
  },
};

/* istanbul ignore next */
const schema = makeExecutableSchema({
  typeDefs,
  resolvers: _.merge(
    resolvers,
    projs,
    query,
    event,
  ),
});

module.exports = {
  resolvers,
  schema,
};
