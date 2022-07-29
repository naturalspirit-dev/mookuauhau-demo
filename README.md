
# mookuauhau-demo

Front end Next/React demo for Hawaiians in Tech Hackathon 2022 Mo'okū'auhau project.

This implementation is available for use in the Hackathon as a starting point or base for future work.
It displays a tree graph with different Mo'okū'auhau. You can change the D3 algorithm for different visualizations. You can click on nodes to navigate the tree, we've found that radial algorithms work better for navigation. 

It is a skeleton project to show how you can use an Apollo client to connect to an endpoint and render the data with react force graph. Two endpoints are available for querying: a Hasura GraphQL endpoint, and a Neo4j endpoint. The Hasura GraphQL Engine sits in front of a relational Postgres database, and allows for GraphQL queries to it. The Neo4j database is schemaless graph database. The Neo4j platform has more built-in data visualization tools, but is more reliant on the Cypher query language.

Apollo client provider wraps the React app created at runtime, and is used for querying and caching data from the endpoint. Data is then parsed for use in react-force-graph-2D model by dividing it into sets of nodes and links. Next.js, by default, renders from the server side, however the force graph component must be rendered from the client side for react-force-graph to have complete access to DOM elements, for this the Next dynamic module is used.

The react-force-graph library is good for using D3 visualization algorithms in React, however it is not required, as there are many visualization libraries out there.

## Required tools
 - node.js
 - git

<br />

# Running Locally
To run this project locally, first clone the repository, install all the dependencies, and create the .env file.

### install with yarn

```
git clone https://github.com/josephpalma/mookuauhau-demo.git

cd ./mookuauhau-demo

yarn install

```

### install with npm 
```
git clone https://github.com/josephpalma/mookuauhau-demo.git

cd ./mookuauhau-demo

npm install
 
```

### create a .env file
Create a .env file in the root directory. Put the hasura or neo4j credentials here. Credentials can be found in the [onboarding doc](https://docs.google.com/document/d/168kfFlW7E-bOJjAk1T7u_36TIv2hiVjb8TDrxhJGd6Q/edit).
```
cp .env.example .env.local  # edit .env to add required settings
```
### run
```
yarn dev
```
or
```
npm run dev
```

# Querying and Development
It is recomended that you have an understanding of the [database schema](https://raw.githubusercontent.com/hawaiiansintech/mookuauhau-backend/main/static/mookuauhau-erd.png).

To build queries you dont have to be an expert in writing GraphQL statements, all ya gotta do is interact with the [Hasura API Explorer](https://cloud.hasura.io/public/graphiql?endpoint=https://hiptfotokdejybmpjmbc.nhost.run/v1/graphql) where you can build queries right in the UI and receive example json data back. Additionally if you go the Neo4j route, the [Neo4j Browser](http://n4j.hekili.net:27474/browser/) can run test queries in the Cypher query language and view the example data visually. 

Credentials for both platforms can be found in the [onboarding doc](https://docs.google.com/document/d/168kfFlW7E-bOJjAk1T7u_36TIv2hiVjb8TDrxhJGd6Q/edit).

For example queries, check out the [Mookuauhau-backend README.md](https://github.com/hawaiiansintech/mookuauhau-backend).

