const {GraphQLObjectType, GraphQLString, GraphQLBoolean} = require('graphql');
const sexEnum = require('./enum_sex');
const artifactManagerService = require('./../../service/artifact-manager-service');
const watchService = require('./../../service/watch-service');

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
      resolve(parent, args, req) {
        return artifactManagerService.getPortraitUrlPromise(parent, args, req);
      }
    },
    watching: {
      type: GraphQLBoolean,
      description: "Is the current user watching this person?",
      resolve(parent, args, req) {
        return watchService.getWatchingPromise(parent, args, req);
      }
    }
  }
});