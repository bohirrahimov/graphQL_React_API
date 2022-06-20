This GraphQL API has 2 queries and 1 mutation. 
Queries are:
 - getObject, which takes in page (optional int) and api_key (required string). If an API key provided is valid (meaning it can be found in the database) then getObject returns 30 commits from facebook/react repository. If a page is provided it will take 30 commits from that page. It should be noted that page 1 will show the last 30 commits, page 2 will contain 31-60 last commits etc. If page number is not provided getObject will assume page 1.

 - getHello, returns the string "Hello World". It is the only query/mutation that does not require API key to work

Mutation:
-getApi, creates new API key. It takes in 2 parameters: api_key and randomizer. api_key is needed to authorize the action and is required. Randomizer is an optional parameter that will be used to create a hash for an API key. Randomizer will then be mixed with timestamp and generate a sha1 hash that will be stored in the database. 
There is one API key already created: "545022ca38adf1a623d921fd7ee888f19f792abd". It can be used to create new API keys and retrieve information form GitHub repository.