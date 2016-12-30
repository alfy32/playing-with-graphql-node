const {GraphQLObjectType, GraphQLString, GraphQLBoolean} = require('graphql');
const sexEnum = require('./enum_sex');

module.exports = new GraphQLObjectType({
  name: "Person",
  description: "A Family Tree person",
  fields: {
    id: {type: GraphQLString},
    name: {
      type: GraphQLString,
      resolve: (parent, args, req) =>
        req.res.locals.dataLoaders.persons.load(parent.id)
          .then((person) => person.summary.name)
    },
    sex: {
      type: sexEnum,
      resolve: (parent, args, req) =>
        req.res.locals.dataLoaders.persons.load(parent.id)
          .then((person) => person.summary.gender)
    },
    lifespan: {
      type: GraphQLString,
      resolve: (parent, args, req) =>
        req.res.locals.dataLoaders.persons.load(parent.id)
          .then((person) => person.summary.lifespan)
    },
    portraitUrl: {
      type: GraphQLString,
      resolve: (parent, args, req) =>
        req.res.locals.dataLoaders.portraitUrl.load(parent.id)
    },
    watching: {
      type: GraphQLBoolean,
      description: "Is the current user watching this person?",
      resolve: (parent, args, req) =>
        req.res.locals.dataLoaders.watching.load(parent.id)
    }
  }
});