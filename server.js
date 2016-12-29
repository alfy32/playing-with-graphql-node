const express = require('express');
const graphqlHTTP = require('express-graphql');
const {graphql, GraphQLSchema, GraphQLObjectType, GraphQLString} = require('graphql');
const fetch = require('node-fetch');

const sessionId = "USYSA4A8CD34E06090EACF92FB906BA53BB6_idses-prod01.a.fsglobal.net";

const getPerson = (personCache, id) => {
  if (!personCache[id]) {
    personCache[id] = fetch(`https://familysearch.org/tf/person/${id}/summary`, {
      method: "GET",
      headers: {Authorization: `Bearer ${sessionId}`}
    })
      .then((response) => {
        console.log(`Request: url=${response.url} status=${response.status}`);
        return response.json();
      });
  }

  return personCache[id];
};

const personType = new GraphQLObjectType({
  name: "Person",
  description: "A Family Tree person",
  fields: {
    id: {type: GraphQLString},
    name: {
      type: GraphQLString,
      resolve(parentValue, args, request) {
        return getPerson(request.locals.personCache, parentValue.id).then((person) => person.summary.name);
      }
    },
    sex: {
      type: GraphQLString,
      resolve(parentValue, args, request) {
        return getPerson(request.locals.personCache, parentValue.id).then((person) => person.summary.gender);
      }
    },
    lifespan: {type: GraphQLString,
    resolve(parentValue, args, request) {
      return getPerson(request.locals.personCache, parentValue.id).then((person) => person.summary.lifespan);
    }},
    portraitUrl: {
      type: GraphQLString,
      resolve(parentValue, args, request) {
        return fetch(`https://familysearch.org/artifactmanager/persons/personsByTreePersonId/${parentValue.id}/summary`, {
          method: "GET",
          headers: {Authorization: `Bearer ${sessionId}`}
        })
          .then((response) => {
            return response.json();
          })
          .then((treePersonSummary) => {
            return treePersonSummary.thumbSquareUrl || 'broken';
          })
      }
    },
    watching: {
      type: GraphQLString,
      resolve(parentValue, args, request) {
        return fetch(`https://familysearch.org/watch/watches?resourceId=${parentValue.id}_p_fs-ft_production-primary`, {
          method: "HEAD",
          headers: {Authorization: `Bearer ${sessionId}`}
        })
          .then((response) => {
            console.log(`Request: url=${response.url} status=${response.status}`);
            return response.status == 200;
          })
      }
    }
  }
});

const query = new GraphQLObjectType({
  name: "FamilySearchQuery",
  fields: {
    person: {
      type: personType,
      args: {
        id: {type: GraphQLString}
      },
      resolve(parentValue, args, request) {
        return {id: args.id}
      }
    }
  }
});

const middleware = (req, res, next) => {
  const start = Date.now();
  if (!req.locals) {
    req.locals = {
      personCache: {}
    };
  }

  const originalResEnd = res.end;
  res.end = function (chunk, encoding) {

    res.end = originalResEnd;
    res.end(chunk, encoding);

    const duration = Date.now() - start;

    console.log(`Endpoint time: method=${req.method} url=${req.baseUrl} time=${duration}`)
  };

  next();
};

const app = express();
app.use(middleware);
app.use('/graphql', graphqlHTTP({
  schema: new GraphQLSchema({query: query}),
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');