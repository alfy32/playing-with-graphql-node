const {GraphQLSchema, GraphQLObjectType, GraphQLString} = require('graphql');

const personType = require('./types/object_person');

const query = new GraphQLObjectType({
  name: "FamilySearchQuery",
  fields: {
    person: {
      type: personType,
      args: {
        id: {type: GraphQLString}
      },
      resolve(parent, args, context) {
        return {
          id: args.id
        }
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: query
});

