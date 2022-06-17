const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const { buildSchema } = require('graphql');
const { GraphQLJSON, GraphQLJSONObject } = require('graphql-type-json');
const fetch = require('node-fetch');
const app = express();
var schema = buildSchema(`
  scalar JSON
  type Query {
    getObject (page: Int): JSON
  }
`);

var root = {
    JSON: GraphQLJSON,
    
    getObject: async ({page = 100} ) => {
        // if(!page){
        //     page = 1;
        // }
        const response = await fetch('https://api.github.com/repos/facebook/react/commits?page='+page);
        return response.json();
    }
    
};


app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');