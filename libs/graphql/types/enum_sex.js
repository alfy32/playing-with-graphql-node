const {GraphQLEnumType} = require('graphql');

module.exports = new GraphQLEnumType({
  name: 'Sex',
  values: {
    MALE: {},
    FEMALE: {},
    UNKOWN: {}
  }
});