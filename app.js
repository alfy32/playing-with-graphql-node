// require('dotenv').config({silent: true});

const express = require('express');
const graphqlHTTP = require('express-graphql');
const cookieParser = require('cookie-parser');

const accessLogger = require('./middlewares/access-logger');
const authorization = require('./middlewares/authorization');
const personCache = require('./middlewares/person-cache');

const PORT = process.env.PORT || 4000;
const schema = require('./libs/graphql/schema');

const app = express();

app.use(cookieParser());
app.use(accessLogger);
app.use(authorization);
app.use(personCache);

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}));

app.listen(PORT, () => console.log(`Running a GraphQL API server at localhost:${PORT}/graphql`));

