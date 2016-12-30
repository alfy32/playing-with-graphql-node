const {GraphQLObjectType, GraphQLString} = require('graphql');

module.exports = new GraphQLObjectType({
  name: "User",
  description: "A Family Tree user",
  fields: {
    birthdate: {
      type: GraphQLString,
      resolve: (parent, args, req) =>
        req.res.locals.dataLoaders.user.load("CURRENT")
          .then((user) => user.birthdate)
    },
    cisUserId: {
      type: GraphQLString,
      resolve: (parent, args, req) =>
        req.res.locals.dataLoaders.user.load("CURRENT")
          .then((user) => user.id)
    },
    contactName: {
      type: GraphQLString,
      resolve: (parent, args, req) =>
        req.res.locals.dataLoaders.user.load("CURRENT")
          .then((user) => user.contactName)
    },
    country: {
      type: GraphQLString,
      resolve: (parent, args, req) =>
        req.res.locals.dataLoaders.user.load("CURRENT")
          .then((user) => user.country)
    },
    cpUserId: {
      type: GraphQLString,
      resolve: (parent, args, req) =>
        req.res.locals.dataLoaders.user.load("CURRENT")
          .then((user) => user.cpUserId)
    },
    displayName: {
      type: GraphQLString,
      resolve: (parent, args, req) =>
        req.res.locals.dataLoaders.user.load("CURRENT")
          .then((user) => user.displayName)
    },
    email: {
      type: GraphQLString,
      resolve: (parent, args, req) =>
        req.res.locals.dataLoaders.user.load("CURRENT")
          .then((user) => user.email)
    },
    familyName: {
      type: GraphQLString,
      resolve: (parent, args, req) =>
        req.res.locals.dataLoaders.user.load("CURRENT")
          .then((user) => user.familyName)
    },
    givenName: {
      type: GraphQLString,
      resolve: (parent, args, req) =>
        req.res.locals.dataLoaders.user.load("CURRENT")
          .then((user) => user.givenName)
    },
    helperAccessPin: {
      type: GraphQLString,
      resolve: (parent, args, req) =>
        req.res.locals.dataLoaders.user.load("CURRENT")
          .then((user) => user.helperAccessPin)
    },
    mailingAddress: {
      type: GraphQLString,
      resolve: (parent, args, req) =>
        req.res.locals.dataLoaders.user.load("CURRENT")
          .then((user) => user.mailingAddress)
    },
    mailingAddressCity: {
      type: GraphQLString,
      resolve: (parent, args, req) =>
        req.res.locals.dataLoaders.user.load("CURRENT")
          .then((user) => user.mailingAddressCity)
    },
    mailingAddressCountry: {
      type: GraphQLString,
      resolve: (parent, args, req) =>
        req.res.locals.dataLoaders.user.load("CURRENT")
          .then((user) => user.mailingAddressCountry)
    },
    mailingAddressPostalCode: {
      type: GraphQLString,
      resolve: (parent, args, req) =>
        req.res.locals.dataLoaders.user.load("CURRENT")
          .then((user) => user.mailingAddressPostalCode)
    },
    mailingAddressProvince: {
      type: GraphQLString,
      resolve: (parent, args, req) =>
        req.res.locals.dataLoaders.user.load("CURRENT")
          .then((user) => user.mailingAddressProvince)
    },
    membershipId: {
      type: GraphQLString,
      resolve: (parent, args, req) =>
        req.res.locals.dataLoaders.user.load("CURRENT")
          .then((user) => user.membershipId)
    },
    personId: {
      type: GraphQLString,
      resolve: (parent, args, req) =>
        req.res.locals.dataLoaders.user.load("CURRENT")
          .then((user) => user.personId)
    },
    phoneNumber: {
      type: GraphQLString,
      resolve: (parent, args, req) =>
        req.res.locals.dataLoaders.user.load("CURRENT")
          .then((user) => user.phoneNumber)
    },
    preferredLanguage: {
      type: GraphQLString,
      resolve: (parent, args, req) =>
        req.res.locals.dataLoaders.user.load("CURRENT")
          .then((user) => user.preferredLanguage)
    },
    ward: {
      type: GraphQLString,
      resolve: (parent, args, req) =>
        req.res.locals.dataLoaders.user.load("CURRENT")
          .then((user) => user.ward)
    }
  }
});