const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const { buildSchema } = require('graphql');
const { GraphQLJSON, GraphQLJSONObject } = require('graphql-type-json');
const fetch = require('node-fetch');
const app = express();
const sha1 = require('sha1');
const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("./mock.db", sqlite3.OPEN_READWRITE, (err)=>{
  if(err) return console.error(err.message);


  console.log("Connection is successful!");
})








const schema = buildSchema(`
  scalar JSON
  type Query {
    getObject (page: Int, api_key: String!): JSON
    getHello : String
  }

  type Mutation {
    getApi(randomizer :String, api_key: String!): JSON
  }
`);

var root = {
    JSON: GraphQLJSON,

    getHello:() => {
      return "Hello World!";
    },
    
    getObject: async ({page = 100, api_key} ) => {
      const check = await checkAPI(api_key);
      if(check){  
        const response = await fetch('https://api.github.com/repos/facebook/react/commits?page='+page);
        return response.json();
      }else{
        return {
          message: "Invalid API key"
        };
      }
        
    },

    getApi: async ({randomizer, api_key}) => {
      const newAPI =  sha1(randomizer + Date.now().toString());

      const isAuth = await checkAPI(api_key);

      const check = await addAPI(newAPI);
      if(check && isAuth){
        return {
          status: "Success",
          newAPI: newAPI
        }
      }else if(!isAuth){
        return{
          message: "Your API key is not valid."
        }
      }else{
        return {
          message: "There was a problem with your request, try again."
        }
      }

    }
    
};


app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');


async function checkAPI(api){
  const sql = "SELECT * from auth WHERE api_keys=?;";
  return new Promise((resolve) => {
  db.get(sql, [api], (err, row) => {
    console.log(row);
    if(row){
      resolve(true)
    }else{
      resolve(false)
    }
  })
  }).then((row) => {
    return row;
  });
}

async function addAPI(api){
const sql = "INSERT INTO auth (api_keys) values (?)";
return new Promise((resolve) => {
db.run(sql, [api], (err) => {
  if(!err){
    resolve(true)
  }else{
    resolve(false)
  }
})
}).then((row) => {
  return row;
});
}



