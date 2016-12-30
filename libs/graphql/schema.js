const {GraphQLSchema, GraphQLObjectType, GraphQLString} = require('graphql');

const personType = require('./types/object_person');
const userType = require('./types/object_user');

const query = new GraphQLObjectType({
  name: "FamilySearchQuery",
  fields: {
    person: {
      type: personType,
      args: {
        id: {type: GraphQLString}
      },
      resolve(parent, args) {
        return {
          id: args.id
        }
      }
    },
    user: {
      type: userType,
      resolve() {
        return {}
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: query
});

