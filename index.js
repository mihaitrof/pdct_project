"use strict";
require("isomorphic-fetch");
require("underscore");
const graphql = require("graphql");
const express = require("express");
var cors = require('cors');
const expressGraphQl = require("express-graphql");
const { GraphQLSchema } = graphql;
const { query } = require("./schemas/queries");
const { mutation } = require("./schemas/mutations");

const schema = new GraphQLSchema({
  query,
  mutation
});

var app = express();

app.use(
  '/graphql',
  expressGraphQl({
    schema: schema,
    graphiql: true
  })
);

app.use(express.urlencoded({ extended: false }));

app.post('/submit-form', (req, res) => {
  const username = req.body;
  console.log(username);
  // var query = { query: '{ contract_id(contract_id: ' + 10 + ') {contract_id} }' };
  var query = {query: 'mutation {addContractId(contract_id: 12) {contract_id}}'
  }
  fetch('http://localhost:9000/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(query),
  })
    .then(res => res.json())
    .then(res => console.log(res.data));
  
  res.end();
})

app.listen(9000, () =>
  console.log('GraphQL server running on localhost:9000')
);