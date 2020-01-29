"use strict";
require("isomorphic-fetch");
require("underscore");
const graphql = require("graphql");
const express = require("express");
const expressGraphQl = require("express-graphql");
const { GraphQLSchema } = graphql;
const { query } = require("./schemas/queries");
const { mutation } = require("./schemas/mutations");
const path = require('path');
const auth = require('./auth');
const passport = require('passport')

// const requireAuth = passport.authenticate('ourloginstrategy', {session:false})


function requireAuth(req, res, next) {
  const grantAcces = false
  // Try to find the user 
  // if you can find it make grantAcces true

  if(grantAcces) {
    next();
  } else {
    // Forbidden
    // Redirect to login
    res.sendStatus(403);
  }
}

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

app.post('/submit-vd/:contract_id', function (req, res) {
  
  console.log(req.body);
  //_______________________________________________________
  const contract_id = req.params.contract_id

  // declaration
  const declaration_id = contract_id;

  // // general_info
  const type = req.body.type;
  const manufacture_date = req.body.manufacture_date;
  const mileage = req.body.mileage;
  const registration_number = req.body.registration_number;
  if(req.body.general_bensin === 'on'){
    const fuel = '1';
  } else if(req.body.general_diesel === 'on'){
    const fuel = '2';
  } else if(req.body.general_ovrigt === 'on'){
    const fuel = '3' + req.body.general_ovrigt_value;
  } else if(req.body.general_katalysator === 'on'){
    const fuel = '4';
  } 
  
  const gearbox = req.body.gearbox_automat === 'on' ? '1' : '2';          
  const repair_property = req.body.repair_property === 'on' ? true : false;   
  const car_safety_id = req.body.car_safety_id === 'on' ? true : false;        
  const notes = req.body.general_info_notes;            
  const created = req.body.general_info_created;                
    
  //engine_output              
  const engine_output_id = contract_id;         
  const kw = req.body.kw;             
  const hkr = req.body.hkr;

  // warrancy
  const warrancy_id = contract_id;     
  const bumper = req.body.bumper_yes === 'on' ? true : false;        
  const corrosion = req.body.corrosion_yes === 'on' ? true : false;             
  const collision_damage = req.body.collision_damage_yes === 'on' ? true : false;    
  const exhaust_commitment = req.body.exhaust_commitment_yes === 'on' ? true : false;          

  // mrf
  const mrf_id = contract_id;    
  const mrf_months_number = req.body.car_parts_months_number;
  const mrf_km = req.body.km;  

  // other_warrancy
  const other_warranty_id = contract_id;
  const other_warrancy_months_number = req.body.other_warrancy_months_number;     
  const other_warrancy_km = req.body.other_warrancy_km;    

  // car_parts
  const car_parts_id = contract_id;
  const months_number = req.body.car_parts_months_number;
  const car_parts_km = req.body.car_parts_km;          
  // const warranty_type 

  // timing_belt
  const timing_belt_id = contract_id;      
  const changed = req.body.timing_belt_changed_yes === 'on' ? true : false;        
  const annual_tax = req.body.timing_belt_annual_tax;  
  // const service_box   

  // latest_inspection
  const latest_inspection_id = contract_id;
  const date = req.body.latest_inspection_date;                
  const latest_inspection_mileage = req.body.latest_inspection_mileage;  

  // gearbox
  const car_condition_id = contract_id;
  const coupling = req.body.car_condition_coupling_assess + req.body.car_condition_coupling_costs;
  const gearbox_gearbox = req.body.car_condition_gearbox_assess + req.body.car_condition_gearbox_costs;     
  const end_gear = req.body.car_condition_end_gear_assess + req.body.car_condition_end_gear_costs;        
  const heating = req.body.car_condition_heating_assess + req.body.car_condition_heating_costs;         
  const battery = req.body.car_condition_battery_assess + req.body.car_condition_battery_costs;       
  const starter = req.body.car_condition_starter_assess + req.body.car_condition_starter_costs;      
  const generator = req.body.car_condition_generator_assess + req.body.car_condition_generator_costs;              
  const engine = req.body.car_condition_engine_assess + req.body.car_condition_engine_costs;                
  const ignition = req.body.car_condition_ignition_assess + req.body.car_condition_ignition_costs;               
  const compression = req.body.car_condition_compression_assess + req.body.car_condition_compression_costs;            
  const noise = req.body.car_condition_noise_assess + req.body.car_condition_noise_costs;                 
  const fuel = req.body.car_condition_fuel_assess + req.body.car_condition_fuel_costs;                  
  const cooling = req.body.car_condition_cooling_assess + req.body.car_condition_cooling_costs;               
  const air_conditioning = req.body.car_condition_air_conditiong_assess + req.body.car_condition_air_conditiong_costs;     
  const varnish = req.body.car_condition_varnish_assess + req.body.car_condition_varnish_costs;                
  const other = req.body.car_condition_other_asses + req.body.car_condition_other_costs;                 
  const total_repair_cost = req.body.car_condition_total_repair_cost;      
        
  // tires
  const tires_id =  contract_id;
  const vf = req.body.vf;        
  const hf = req.body.hf;         
  const vb = req.body.vb;         
  const hb = req.body.hb;         
  const tires_res = req.body.res;         
  const assessement = req.body.tires_assessement;
  const rope_costs = req.body.tires_rope_costs; 

  // body
  const body_id = contract_id; 
  const side_member = req.body.body_side_member === 'on' ? true : false;
  const crossbeam = req.body.body_crossbeam === 'on' ? true : false;    
  const floor = req.body.body_floor === 'on' ? true : false;       
  const wheel_arch = req.body.body_wheel_arch === 'on' ? true : false;    
  const body_other = req.body.body_other === 'on' ? true : false; 

  // wheel_system
  const wheel_system_id = contract_id;
  const deck = req.body.wheel_system_deck === 'on' ? true : false;           
  const shock = req.body.wheel_system_shock === 'on' ? true : false;           
  const bearings = req.body.wheel_system_bearings === 'on' ? true : false;       
  const spindelled = req.body.wheel_system_spindelled === 'on' ? true : false;      
  const front_link_arm = req.body.wheel_system_front_link_arm === 'on' ? true : false;  
  const back_link_arm = req.body.wheel_system_back_link_arm === 'on' ? true : false;  
  const feather = req.body.wheel_system_feather === 'on' ? true : false;        
  const spring_bracket = req.body.wheel_system_spring_bracket === 'on' ? true : false;  
  const wheel_system_other = req.body.wheel_system_other === 'on' ? true : false;    

  // drive
  const drive_id = contract_id;      
  const drive_fuel = req.body.drive_fuel === 'on' ? true : false;                
  const exhaust = req.body.drive_exhaust === 'on' ? true : false;            
  const transmission = req.body.drive_transmission === 'on' ? true : false;        
  const universal_joint = req.body.drive_universal_joint === 'on' ? true : false;    
  const power_supply = req.body.drive_power_supply === 'on' ? true : false;       
  const drive_battery = req.body.drive_battery === 'on' ? true : false;            

  // braking_system
  const braking_system_id = contract_id;
  const service_brake_front = req.body.braking_system_service_brake_front === 'on' ? true : false;    
  const service_brake_back = req.body.braking_system_service_brake_back === 'on' ? true : false;     
  const service_brake_movement = req.body.braking_system_service_brake_movement === 'on' ? true : false;  
  const brake_hose = req.body.braking_system_brake_hose === 'on' ? true : false;              
  const braking_system_battery = req.body.braking_system_battery === 'on' ? true : false;                 
  const braking_system_other = req.body.braking_system_other === 'on' ? true : false;      

  // control_system
  const control_system_id = contract_id;
  const articulation_joint = req.body.control_system_articulation_joint === 'on' ? true : false; 
  const steering_gear = req.body.control_system_steering_gear === 'on' ? true : false;      
  const track_control_arm = req.body.control_system_track_control_arm === 'on' ? true : false;  
  const control_system_other = req.body.control_system_other === 'on' ? true : false;    

  // karosseri
  const karosseri_id = contract_id;
  const door = req.body.karosseri_door === 'on' ? true : false;           
  const screen = req.body.karosseri_screen === 'on' ? true : false;         
  const windshield = req.body.karosseri_windshield === 'on' ? true : false;    
  const seat_belts = req.body.karosseri_seat_belts === 'on' ? true : false;    
  const loading_space = req.body.karosseri_loading_space === 'on' ? true : false; 
  const karosseri_other = req.body.karosseri_other === 'on' ? true : false;     

  // communication
  const communication_id = contract_id;
  const windscreen_wiper = req.body.communication_windscreen_wiper === 'on' ? true : false;     
  const windscreen_washer = req.body.communication_windscreen_wiper === 'on' ? true : false;    
  const rearview_mirror = req.body.communication_rearview_mirror === 'on' ? true : false;      
  const headlight_setting = req.body.communication_headlight_setting === 'on' ? true : false;    
  const headlamp_1 = req.body.communication_headlamp_1 === 'on' ? true : false;           
  const headlamp_2 = req.body.communication_headlamp_2 === 'on' ? true : false;            
  const signal_device = req.body.communication_signal_device === 'on' ? true : false;        
  const side_marker = req.body.communication_side_marker === 'on' ? true : false;          
  const headlight_front = req.body.ommunication_headlight_front === 'on' ? true : false;      
  const headlight_back = req.body.communication_headlight_back === 'on' ? true : false;       
  const direction_indicator = req.body.communication_direction_indicator === 'on' ? true : false;  
  const stop_lamps = req.body.communication_stop_lamps === 'on' ? true : false;           
  const reflex = req.body.communication_reflex === 'on' ? true : false;               
  const communication_other = req.body.communication_other === 'on' ? true : false;       

  // orchestration
  const orchestration_id = contract_id;
  const speedometer = req.body.orchestration_speedometer === 'on' ? true : false;   
  const orchestration_other = req.body.orchestration_other === 'on' ? true : false;  

  // facilities
  const facilities_id = contract_id;
  const facilities_coupling = req.body.facilities_coupling === 'on' ? true : false;         
  const trailer_contact = req.body.facilities_trailer_contact === 'on' ? true : false;  
  const facilities_other = req.body.facilities_other === 'on' ? true : false;      

  // environment
  const environment_id  = contract_id;
  const purification = req.body.environment_purification === 'on' ? true : false;     
  const emission_control = req.body.environment_emission_control === 'on' ? true : false; 
  const environment_exhaust  = req.body.environment_exhaust === 'on' ? true : false;          

  // var query = { query: '{ contract_id(contract_id: ' + 10 + ') {contract_id} }' };
  // var query = {query: 'mutation {addContract(contract_id:' + contract_id +
  //                                             ',creditors:"' + creditors + 
  //                                             '",balance_due:"' +  balance_due + 
  //                                             '",account_number:"' + account_number +
  //                                             '",checked_date:"' + checked_date + 
  //                                             '",informants:"' +  informants +
  //                                             '",signature:"' + signature + 
  //                                             '",buyer_date:"' + buyer_date + 
  //                                             '",buyer_city:"' + buyer_city + 
  //                                             '",buyer_representative:"' + buyer_representative + 
  //                                             '",registration_property:"' + registration_property + 
  //                                             '",chassis_numer:"' + chassis_numer + 
  //                                             '",mileage:' + mileage + 
  //                                             ',valuation:' + valuation + 
  //                                             ',first_registration_date:"' + first_registration_date + 
  //                                             '",manufactured_date:"' + manufactured_date + 
  //                                             '",colour:"' + colour + 
  //                                             '",valuation_date:"' + valuation_date + 
  //                                             '",deduction:"' + deduction + 
  //                                             '",approved_check:"' + approved_check + 
  //                                             '",service_book:"' + service_book + 
  //                                             '",warranty:"' + warranty + 
  //                                             '",purchase_price_adjusted:' + purchase_price_adjusted + 
  //                                             ',condition_and_notes:"' + condition_and_notes + 
  //                                             '",date:"' + date + 
  //                                             '",city:"' + city + 
  //                                             '",representative:"' + representative + 
  //                                             '",agreement_number:"' + agreement_number + 
  //                                             '",seller_or_buyer:"' + seller_or_buyer + 
  //                                             '",phone:"' + phone + 
  //                                             '",purchase_date:"' + purchase_date + 
  //                                             '",name:"' + name + 
  //                                             '",address:"' + address + 
  //                                             '",seller_phone:"' + seller_phone + 
  //                                             '",driver_name_phone:"' + driver_name_phone + 
  //                                             '",purchase_price:' + purchase_price + 
  //                                             ',vat:' + vat + 
  //                                             ',resolves_the_redemption_of_my_residual_debt:"' + resolves_the_redemption_of_my_residual_debt + 
  //                                             '",other_deductions:"' + other_deductions + 
  //                                             '",other_payments:"' + other_payments + 
  //                                             '",to_obtain:"' + to_obtain + 
  //                                             '") {contract_id}}'
  // }

  // console.log(query);
  
  // fetch('http://localhost:9000/graphql', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(query),
  // })
  //   .then(re => re.json())
  //   .then(re => {
  //     res.redirect('/contracts');
  //   });

  //_______________________________________________________
  res.redirect('/contracts');
  res.end();
});

app.get('/vd/:contract_id', /*requireAuth,*/ function(req, res) {

  var contract_id = req.params.contract_id;

  res.render(__dirname + "/ui/value_declaration/contract.html");
});

app.get('/contract/:contract_id', /*requireAuth,*/ function(req, res) {

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
      res.redirect('/contracts');
    });
  
  res.end();
})

app.get('/login', (req, res) => {

  res.render(__dirname + "/ui/index.html");

});

app.post('/signup', auth.signup);

app.post('/signin', auth.signin);

app.listen(9000, () =>
  console.log('GraphQL server running on localhost:9000')
);