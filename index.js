"use strict";
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
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  

  // Pass to next layer of middleware
  next();
});
app.use(cors({origin: 'http://localhost:9000/'}));
app.use(
  '/',
  expressGraphQl({
    schema: schema,
    graphiql: true
  })
);

app.listen(9000, () =>
  console.log('GraphQL server running on localhost:9000')
);