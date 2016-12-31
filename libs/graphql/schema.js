const {GraphQLSchema, GraphQLObjectType, GraphQLString} = require('graphql');

const personType = require('./types/object_person');
const userType = require('./types/object_user');

const query = new GraphQLObjectType({
  name: "FamilySearchQuery",
  fields: {
    person: {
      type: personType,
      description: "Look up a Family Tree person by id",
      args: {
        id: {type: GraphQLString, description: "The id of the person. Defaults to startingPersonId preference"}
      },
      resolve: (parent, args, req) => {
        if (args.id) return {id: args.id};

        return req.res.locals.dataLoaders.preferences.load('tree.startingPersonId')
          .then((startingPersonId) => {
            return {id: startingPersonId}
          });
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

