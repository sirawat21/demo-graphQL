import express from "express";
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from "graphql";

/* GraphQL schema */
const schema = buildSchema(`
type Query {
   root: String,
   message1: String,
   message2: String
}
`);

/* Apply GraphQL schema */
const root = () => ('root vallue');
const message1 = () => ('message 1');
const message2 = () => ('message 2');

/* API configuration */
const _CONF = {
  port: 3030,
};

/* API setup */
const api = express();
api.use(express.json());

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
api.get('/api/root', 
   graphqlHTTP({
      schema: schema,      // select schema
      rootValue: root,     // select root value
      graphiql: true,
   })
);
// message 1
api.get('/api/message1', 
   graphqlHTTP({
      schema: schema,
      rootValue: any,
      graphiql: true,
   })
);

/* API listen and initialising function */
api.listen(_CONF.port, () => {
  console.log(`API is running on port ${_CONF.port}`);
});
