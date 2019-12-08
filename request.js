"use strict";
require("isomorphic-fetch");

var app = express();

app.use(express.json());

app.post('/submit-form', (req, res) => {
  const username = req.body.avtalsnummer
  console.log(username);
  
  fetch('http://localhost:9000/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: '{ contract_id(contract_id: 1) {contract_id} }' }),
  })
    .then(res => res.json())
    .then(res => console.log(res.data));
  
  res.end();
})

app.listen(9000, () =>
  console.log('GraphQL server running on localhost:9000')
);