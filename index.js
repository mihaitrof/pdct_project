"use strict";
require("isomorphic-fetch");
require("underscore");
const graphql = require("graphql");
const express = require("express");
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
  console.log(req.body);
  const contract_id = 22;
  const agreement_number = req.body.agreement_number;
  const creditors = req.body.creditors;
  const balance_due = req.body.balance_due;
  const account_number = req.body.account_number;
  const checked_date = req.body.checked_date;
  const informants = req.body.informants;
  const signature = req.body.signature;
  const buyer_date = req.body.buyer_date;
  const buyer_city = req.body.buyer_city;
  const buyer_representative = req.body.buyer_representative;

  // var query = { query: '{ contract_id(contract_id: ' + 10 + ') {contract_id} }' };
  var query = {query: 'mutation {addContract(contract_id:' + contract_id +
                                              ',creditors:"' + creditors + 
                                              '",balance_due:"' +  balance_due + 
                                              '",account_number:"' + account_number +
                                              '",checked_date:"' + checked_date + 
                                              '",informants:"' +  informants +
                                              '",signature:"' + signature + 
                                              '",buyer_date:"' + buyer_date + 
                                              '",buyer_city:"' + buyer_city + 
                                              '",buyer_representative:"' + buyer_representative + 
                                              '") {contract_id}}'
  }
  console.log(query);
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