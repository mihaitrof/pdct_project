"use strict";
require("isomorphic-fetch");
require("underscore");
// require('html');
const graphql = require("graphql");
const express = require("express");
const expressGraphQl = require("express-graphql");
const { GraphQLSchema } = graphql;
const { query } = require("./schemas/queries");
const { mutation } = require("./schemas/mutations");
const path = require('path');

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

app.engine('html', require('ejs').renderFile);
app.use('/static', express.static('ui'));

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/ui/css')));

app.post('/submit-vd', function (req, res) {
  console.log(req.body);

  res.end();
});

app.get('/vd/:contract_id', function(req, res) {

  var contract_id = req.params.contract_id;

  res.render(__dirname + "/ui/value_declaration/contract.html");
});

app.get('/contract/:contract_id', function(req, res) {

  var contract_id = req.params.contract_id;

  var q = `{getContract(contract_id: ${contract_id})
          {creditors
          balance_due
          account_number
          checked_date
          informants
          signature
          agreement_number
          seller_or_buyer
          phone
          purchase_date
          buyer_date
          buyer_city 
          buyer_representative
          registration_property
          chassis_numer
          mileage
          valuation
          first_registration_date
          manufactured_date
          colour
          valuation_date
          deduction
          approved_check
          service_book
          warranty
          purchase_price_adjusted
          condition_and_notes
          date
          city
          representative
          purchase_price
          vat
          resolves_the_redemption_of_my_residual_debt
          other_deductions
          other_payments
          to_obtain
          name
          address
          driver_name
          driver_phone
          personal_number
          driver_license_number
          postal_code
          email}}`

  var query = {query: q};

  fetch('http://localhost:9000/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(query)
  })
    .then(result => result.json())
    .then(result => {
        var data = result.data.getContract;
        res.render(__dirname + "/ui/view-contract/index.html", data);
      
      });

  
});

app.get('/delete/:contract_id', (req, res) => {

  var contract_id = req.params.contract_id;

  var q = `mutation {
    deleteContract(contract_id: ${contract_id}) {
      contract_id
      }
  }`;

  var query = {query: q};

  fetch('http://localhost:9000/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(query)
  })
    .then(result => result.json())
    .then(result => {
          var q = `{
            getContractInfo {
              contract_id
              agreement_number
              seller_or_buyer 
              phone
              purchase_date
              }
                }`;

          var query = {query: q};

          fetch('http://localhost:9000/graphql', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(query)
          })
          .then(result => result.json())
          .then(result => {
            var contracts = result.data.getContractInfo;
            console.log(contracts);
            console.log("asddas");
            res.render(__dirname + "/ui/dashboard/index.html", {contracts:contracts});
          });
      });

});

app.get('/create-contract', (req, res) => {

  res.render(__dirname + "/ui/contract/index.html");

});

app.get('/contracts', (req, res) => {

  var q = `{
              getContractInfo {
                contract_id
                agreement_number
                seller_or_buyer 
                phone
                purchase_date
                }
            }`;
  
  var query = {query: q};

  fetch('http://localhost:9000/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(query)
  })
    .then(result => result.json())
    .then(result => {
        var contracts = result.data.getContractInfo;
        console.log(contracts);
        res.render(__dirname + "/ui/dashboard/index.html", {contracts:contracts});
      });

});

app.post('/submit-form', (req, res) => {



  // contract_ids
  const contract_id = Math.floor(Math.random() * 100000);
  // balance_due
  const creditors = req.body.creditors;
  const balance_due = req.body.balance_due;
  const account_number = req.body.account_number;
  const checked_date = req.body.checked_date;
  const informants = req.body.informants;
  const signature = req.body.signature;
  // buyer
  const buyer_date = req.body.buyer_date;
  const buyer_city = req.body.buyer_city;
  const buyer_representative = req.body.buyer_representative;
  // purchase_property
  const registration_property = req.body.registration_property;
  const chassis_numer = req.body.chassis_numer;
  const mileage = req.body.mileage;
  const valuation = req.body.valuation;
  const first_registration_date = req.body.first_registration_date;
  const manufactured_date = req.body.manufactured_date;
  const colour = req.body.colour;
  const valuation_date = req.body.valuation_date;
  const deduction = req.body.deduction;
  const approved_check = req.body.approved_check;
  const service_book = req.body.service_book;
  const warranty = req.body.warranty;
  const purchase_price_adjusted = req.body.purchase_price_adjusted;
  const condition_and_notes = req.body.condition_and_notes;
  // seller_or_registred_owner
  const date = req.body.date;
  const city = req.body.city;
  const representative = req.body.representative;
  // purchase_agreement
  const agreement_number = req.body.agreement_number;
  const seller_or_buyer = req.body.seller_or_buyer;
  const phone = req.body.phone;
  const purchase_date = req.body.purchase_date;
  // seller
  const name = req.body.name;
  const address = req.body.address;
  const seller_phone = req.body.phone;
  const driver_name_phone = req.body.driver_name_phone;
  // regulation_purchase
  const purchase_price = req.body.purchase_price;
  const vat = req.body.vat;
  const resolves_the_redemption_of_my_residual_debt = req.body.resolves_the_redemption_of_my_residual_debt;
  const other_deductions = req.body.other_deductions;
  const other_payments = req.body.other_payments;
  const to_obtain = req.body.to_obtain;

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
                                              '",registration_property:"' + registration_property + 
                                              '",chassis_numer:"' + chassis_numer + 
                                              '",mileage:' + mileage + 
                                              ',valuation:' + valuation + 
                                              ',first_registration_date:"' + first_registration_date + 
                                              '",manufactured_date:"' + manufactured_date + 
                                              '",colour:"' + colour + 
                                              '",valuation_date:"' + valuation_date + 
                                              '",deduction:"' + deduction + 
                                              '",approved_check:"' + approved_check + 
                                              '",service_book:"' + service_book + 
                                              '",warranty:"' + warranty + 
                                              '",purchase_price_adjusted:' + purchase_price_adjusted + 
                                              ',condition_and_notes:"' + condition_and_notes + 
                                              '",date:"' + date + 
                                              '",city:"' + city + 
                                              '",representative:"' + representative + 
                                              '",agreement_number:"' + agreement_number + 
                                              '",seller_or_buyer:"' + seller_or_buyer + 
                                              '",phone:"' + phone + 
                                              '",purchase_date:"' + purchase_date + 
                                              '",name:"' + name + 
                                              '",address:"' + address + 
                                              '",seller_phone:"' + seller_phone + 
                                              '",driver_name_phone:"' + driver_name_phone + 
                                              '",purchase_price:' + purchase_price + 
                                              ',vat:' + vat + 
                                              ',resolves_the_redemption_of_my_residual_debt:"' + resolves_the_redemption_of_my_residual_debt + 
                                              '",other_deductions:"' + other_deductions + 
                                              '",other_payments:"' + other_payments + 
                                              '",to_obtain:"' + to_obtain + 
                                              '") {contract_id}}'
  }

  console.log(query);
  
  fetch('http://localhost:9000/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(query),
  })
    .then(re => re.json())
    .then(re => {
      // res.redirect('/contracts');
     
    });
  
  res.end();
})

app.get('/login', (req, res) => {

  res.render(__dirname + "/ui/index.html");

});

app.listen(9000, () =>
  console.log('GraphQL server running on localhost:9000')
);