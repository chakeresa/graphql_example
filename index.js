const express = express = require("express");
const express_graphql = express_graphql = require("express-graphql");
const { buildSchema } = { buildSchema } = require("graphql");
const app = express();

app.use('/graphql', express_graphql({
  schema: schema,
  rootValue: root,
  graphiql: true
}));

app.listen(3000, () => console.log('Express GraphQL Server Now Running On localhost:3000/graphql'));
