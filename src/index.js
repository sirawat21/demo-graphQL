import express from "express";
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from "graphql";

/* GraphQL schema */
const schema = buildSchema(`
   type Query {
      hello: String
   }
`);

/* Resolver function */
const root = {
   hello: () => {
      return "Hello World";
   },
}

/* API configuration */
const _CONF = {
  port: 3030,
};

/* API setup */
const api = express();
//api.use(express.json());

/* Route */
// root
/*
Example of GraphQL HTTP
RE: https://graphql.org/graphql-js/express-graphql/
graphqlHTTP({
  schema: GraphQLSchema,
  graphiql?: ?boolean,
  rootValue?: ?any,
  context?: ?any,
  pretty?: ?boolean,
  formatError?: ?Function,
  validationRules?: ?Array<any>,
}): Middleware
*/
api.get('/graphql',
   graphqlHTTP({
      schema: schema,      // select schema
      rootValue: root,     // select resolve func
      graphiql: true,      // UI enable
   })
);

/* API listen and initialising function */
api.listen(_CONF.port, () => {
  console.log(`API is running on port ${_CONF.port}`);
});
