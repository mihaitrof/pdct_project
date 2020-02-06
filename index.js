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
// const auth = require('./auth');
const passport = require('passport');

var session = require('client-sessions');



function requireAuth(req, res, next) {
  var grantAcces = false;
  if(req.session.user){
    console.log(req.session);
    grantAcces = true;
  }

  if(grantAcces) {
    next();
  } else {
    // Forbidden
    // Redirect to login
    res.redirect('/dashboard/');
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

app.use(session({
  cookieName: 'session',
  secret: 'random_string_goes_here',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}));

app.get('/logout', function(req, res) {
  req.session.destroy();
  res.redirect('/dashboard/');
})

app.post('/login', function(req, res) {

  var email = req.body.email;

  var q = `{getUser(email:"${email}"){email, password}}`;

  var query = {query: q};

  fetch('http://localhost:9000/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(query)
  })
    .then(result => result.json())
    .then(result => {

        if (result.data.getUser == null) {
          var error = "email";
          res.redirect('/dashboard/' + error);
        } else {
          if (req.body.password === result.data.getUser.password) {
            req.session.user = true;
            res.redirect('/contracts');
            console.log("Success");
          } else {
            var error = "password";
            res.redirect('/dashboard/' + error);
 
          }
        }
      });
});

app.post('/submit-vd/:contract_id', function (req, res) {
  
  // console.log(req.body);
  //_______________________________________________________
  const contract_id = req.params.contract_id

  // declaration
  const declaration_id = contract_id;

  // // general_info
  const type = req.body.type;
  const manufacture_date = req.body.manufacture_date;
  const mileage = req.body.mileage;
  const registration_number = req.body.registration_number;
  const fuel = 0;
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
  const car_safety_id = req.body.car_safety_id === 'on' ? 1 : 0;        
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
  const mrf_km = req.body.mrf_km;  

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
  const annual_tax = req.body.annual_tax ? req.body.annual_tax : 0;  
  // const service_box   

  // latest_inspection
  const latest_inspection_id = contract_id;
  const date = '2020-01-01';                
  const latest_inspection_mileage = 0;  

  // car_condition
  const car_condition_id = contract_id;
  const coupling = req.body.car_condition_coupling_assess + ' ' + req.body.car_condition_coupling_costs;
  const car_condition_gearbox = req.body.car_condition_gearbox_assess + ' ' + req.body.car_condition_gearbox_costs;     
  const end_gear = req.body.car_condition_end_gear_assess + ' ' + req.body.car_condition_end_gear_costs;        
  const heating = req.body.car_condition_heating_assess + ' ' + req.body.car_condition_heating_costs;         
  const battery = req.body.car_condition_battery_assess + ' ' + req.body.car_condition_battery_costs;       
  const starter = req.body.car_condition_starter_assess + ' ' + req.body.car_condition_starter_costs;      
  const generator = req.body.car_condition_generator_assess + ' ' + req.body.car_condition_generator_costs;              
  const engine = req.body.car_condition_engine_assess + ' ' +req.body.car_condition_engine_costs;                
  const ignition = req.body.car_condition_ignition_assess + ' ' + req.body.car_condition_ignition_costs;               
  const compression = req.body.car_condition_compression_assess + ' ' + req.body.car_condition_compression_costs;            
  const noise = req.body.car_condition_noise_assess + ' ' + req.body.car_condition_noise_costs;                 
  const car_condition_fuel = req.body.car_condition_fuel_assess + ' ' +req.body.car_condition_fuel_costs;                  
  const cooling = req.body.car_condition_cooling_assess + ' ' +req.body.car_condition_cooling_costs;               
  const air_conditioning = req.body.car_condition_air_conditiong_assess + ' ' +req.body.car_condition_air_conditiong_costs;     
  const varnish = req.body.car_condition_varnish_assess + ' ' +req.body.car_condition_varnish_costs;                
  const other = req.body.car_condition_other_asses + ' ' + req.body.car_condition_other_costs;                 
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

  var query = {query: 'mutation {addVD(contract_id:' + contract_id +
                                
                                              // general_info
                                              ',type:"' + type +              
                                              '",manufacture_date:"' + manufacture_date  +
                                              '",mileage:' + mileage  +
                                              ',registration_number:"' + registration_number  +
                                              '",fuel:"' + fuel +
                                              '",gearbox:"' + gearbox  +
                                              '",repair_property:' + repair_property  +
                                              ',car_safety_id:' + car_safety_id  +
                                              ',notes:"' +  notes +
                                              '",created:"' + created  +

                                              // engine_output
                                              '",kw:' + kw  +   
                                              ',hkr:"' + hkr + 

                                              // warrancy
                                              '",bumper:' + bumper +  
                                              ',corrosion:' + corrosion +  
                                              ',collision_damage:' + collision_damage +  
                                              ',exhaust_commitment:"' + exhaust_commitment +  

                                              // mrf
                                              '",mrf_months_number:' + mrf_months_number +
                                              ',mrf_km:' + mrf_km +       
                                              
                                              // other_warrancy
                                              ',other_warrancy_months_number:' + other_warrancy_months_number + 
                                              ',other_warrancy_km:' + other_warrancy_km + 

                                              // car_parts
                                              ',months_number:' + months_number + 
                                              ',car_parts_km:' + car_parts_km +

                                              // timing_belt
                                              ',changed:"' + changed +       
                                              '",annual_tax:' + annual_tax +   
                                              // 'service_box' + service_box +  

                                              // latest_inspection
                                              ',date:"' + date + 
                                              '",latest_inspection_mileage:"' + latest_inspection_mileage + 

                                              // car_condition
                                              '",coupling:"' + coupling +        
                                              '",car_condition_gearbox:"' + car_condition_gearbox +        
                                              '",end_gear:"' + end_gear +       
                                              '",heating:"' + heating +        
                                              '",battery:"' +  battery +      
                                              '",starter:"' +  starter +      
                                              '",generator:"' + generator +        
                                              '",engine:"' + engine +          
                                              '",ignition:"' + ignition +         
                                              '",compression:"' + compression +      
                                              '",noise:"' + noise +            
                                              '",car_condition_fuel:"' + car_condition_fuel +             
                                              '",cooling:"' + cooling +          
                                              '",air_conditioning:"' + air_conditioning + 
                                              '",varnish:"' + varnish +         
                                              '",other:"' + other +            
                                              '",total_repair_cost:"' + total_repair_cost + 

                                              // tires
                                              '",vf:"' + vf +          
                                              '",hf:"' + hf +         
                                              '",vb:"' + vb +        
                                              '",hb:"' + hb +        
                                              '",tires_res:"' + tires_res +         
                                              '",assessement:"' + assessement + 
                                              '",rope_costs:"' + rope_costs + 

                                              // body
                                              '",side_member:' + side_member + 
                                              ',crossbeam:' + crossbeam +     
                                              ',floor:' + floor +         
                                              ',wheel_arch:' + wheel_arch +     
                                              ',body_other:' + body_other +   
                                              
                                              // wheel_system
                                              ',deck:' + deck +         
                                              ',shock:' + shock +        
                                              ',bearings:' + bearings +        
                                              ',spindelled:' + spindelled +     
                                              ',front_link_arm:' + front_link_arm +  
                                              ',back_link_arm:' + back_link_arm +  
                                              ',feather:' + feather +       
                                              ',spring_bracket:' + spring_bracket +   
                                              ',wheel_system_other:' + wheel_system_other + 

                                              // drive
                                              ',drive_fuel:' + drive_fuel +    
                                              ',exhaust:' + exhaust +        
                                              ',transmission:' + transmission +   
                                              ',universal_joint:' + universal_joint +
                                              ',power_supply:' + power_supply +    
                                              ',drive_battery:' + drive_battery +  

                                              // braking_system
                                              ',service_brake_front:' + service_brake_front +   
                                              ',service_brake_back:' + service_brake_back +   
                                              ',service_brake_movement:' + service_brake_movement +
                                              ',brake_hose:' + brake_hose +           
                                              ',braking_system_battery:' + braking_system_battery + 
                                              ',braking_system_other:' + braking_system_other +  

                                              // control_system
                                              ',articulation_joint:' + articulation_joint + 
                                              ',steering_gear:' + steering_gear +     
                                              ',track_control_arm:' + track_control_arm +  
                                              ',control_system_other:' + control_system_other +

                                              // karosseri
                                              ',door:' + door +       
                                              ',screen:' + screen +         
                                              ',windshield:' + windshield +      
                                              ',seat_belts:' + seat_belts +   
                                              ',loading_space:' + loading_space + 
                                              ',karosseri_other:' + karosseri_other + 

                                              // communication
                                              ',windscreen_wiper:'  + windscreen_wiper +   
                                              ',windscreen_washer:' + windscreen_washer +  
                                              ',rearview_mirror:' + rearview_mirror +    
                                              ',headlight_setting:' + headlight_setting + 
                                              ',headlamp_1:' + headlamp_1 +         
                                              ',headlamp_2:' + headlamp_2 +         
                                              ',signal_device:' + signal_device +      
                                              ',side_marker:' + side_marker +        
                                              ',headlight_front:' + headlight_front +    
                                              ',headlight_back:' + headlight_back +     
                                              ',direction_indicator:' + direction_indicator + 
                                              ',stop_lamps:' + stop_lamps +         
                                              ',reflex:' + reflex +             
                                              ',communication_other:' + communication_other +  

                                              // orchestration
                                              ',speedometer:' + speedometer +     
                                              ',orchestration_other:' + orchestration_other +
                                              
                                              // facilities
                                              ',facilities_coupling:' + facilities_coupling + 
                                              ',trailer_contact:' + trailer_contact +
                                              ',facilities_other:' + facilities_other +

                                              // environment
                                              ',purification:' + purification +
                                              ',emission_control:' + emission_control +     
                                              ',environment_exhaust:' + environment_exhaust + 
                          
                                              ') {contract_id}}'
  }

  // console.log(query);
  
  fetch('http://localhost:9000/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(query),
  })
    .then(re => re.json())
    .then(re => {
      res.redirect('/contracts');
    });

  //_______________________________________________________
  // res.redirect('/contracts');
  res.end();
});

app.get('/vd/new/:contract_id', requireAuth, function(req, res) {
  
  var contract_id = req.params.contract_id;

  var q = `{getDeclarationID(contract_id: ${contract_id})
          {declaration_id}}`

  var query = {query: q};

  fetch('http://localhost:9000/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(query)
  })
    .then(result => result.json())
    .then(result => {
      
        if(result.data.getDeclarationID == null){
          res.render(__dirname + "/ui/view_vd/contract.html");
        }else{
          res.redirect('/vd/' + contract_id);
        }
      });
});

app.get('/vd/:contract_id', requireAuth, function(req, res) {

  var contract_id = req.params.contract_id;

  var q = `{getVd(contract_id: ${contract_id})
          {type
          manufacture_date
          mileage
          registration_number
          fuel
          gearbox
          repair_property
          car_safety_id
          notes
          created
          kw  
          hkr
          bumper
          corrosion
          collision_damage
          exhaust_commitment
          mrf_months_number
          mrf_km
          other_warrancy_months_number
          other_warrancy_km
          months_number
          car_parts_km
          changed
          annual_tax
          date      
          latest_inspection_mileage
          coupling
          car_condition_gearbox
          end_gear
          heating
          battery
          starter
          generator
          engine
          ignition
          compression
          noise
          car_condition_fuel
          cooling
          air_conditioning
          varnish
          other
          total_repair_cost
          vf
          hf
          vb
          hb
          tires_res
          assessement
          rope_costs
          side_member
          crossbeam
          floor
          wheel_arch
          body_other
          deck
          shock
          bearings
          spindelled
          front_link_arm
          back_link_arm
          feather
          spring_bracket
          wheel_system_other
          drive_fuel
          exhaust
          transmission
          universal_joint
          power_supply
          drive_battery
          service_brake_front
          service_brake_back
          service_brake_movement
          brake_hose
          braking_system_battery
          braking_system_other
          articulation_joint
          steering_gear
          track_control_arm
          control_system_other
          door
          screen
          windshield
          seat_belts
          loading_space
          karosseri_other
          windscreen_wiper
          windscreen_washer
          rearview_mirror
          headlight_setting
          headlamp_1
          headlamp_2
          signal_device
          side_marker
          headlight_front
          headlight_back
          direction_indicator
          stop_lamps
          reflex
          communication_other
          speedometer
          orchestration_other
          facilities_coupling
          trailer_contact
          facilities_other
          purification
          emission_control
          environment_exhaust}}`

    var query = {query: q};
  
    fetch('http://localhost:9000/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(query)
    })
      .then(result => result.json())
      .then(result => {
          var data = result.data.getVd;
          data.mileage = data.mileage.toString();
          switch(data.gearbox){
            case '0':
              data.gearbox_automat = false;
              data.gearbox_manual = false;
              break;
            case '1':
              data.gearbox_automat = 'checked';
              data.gearbox_manual = false;
              break;
            case '2':
              data.gearbox_automat = false;
              data.gearbox_manual = 'checked';
              break;
          }
          data.general_bensin = false;
          data.general_diesel = false;
          data.general_ovrigt = false;
          data.general_katalysator = false;
          switch(data.fuel){
            case '0':
              data.general_bensin = false;
              data.general_diesel = false;
              data.general_ovrigt = false;
              data.general_katalysator = false;
              break;
            case '1':
              data.general_bensin = 'checked';
              data.general_diesel = false;
              data.general_ovrigt = false;
              data.general_katalysator = false;
              break;
            case '2':
              data.general_bensin = false;
              data.general_diesel = 'checked';
              data.general_ovrigt = false;
              data.general_katalysator = false;
              break;
            case '3':
              data.general_bensin = false;
              data.general_diesel = false;
              data.general_ovrigt = 'checked';
              data.general_katalysator = false;
              break;
            case '4':
              data.general_bensin = false;
              data.general_diesel = false;
              data.general_ovrigt = false;
              data.general_katalysator = 'checked';
              break;
          }
          
          Object.keys(data).forEach(function(key) {
            if(typeof data[key] == 'boolean'){
              if(data[key] == true){
                data[key] = 'checked';
              }
            }

            if(data[key] == 'true'){
                data[key] = 'checked';
            }
          });

          data.car_condition_coupling_assess = data.coupling.split(" ")[0];
          data.car_condition_coupling_costs = data.coupling.split(" ")[1];

          data.car_condition_gearbox_assess = data.car_condition_gearbox.split(" ")[0];
          data.car_condition_gearbox_costs = data.car_condition_gearbox.split(" ")[1];

          data.car_condition_end_gear_assess = data.end_gear.split(" ")[0];
          data.car_condition_end_gear_costs = data.end_gear.split(" ")[1];

          data.car_condition_heating_assess = data.heating.split(" ")[0];
          data.car_condition_heating_costs = data.heating.split(" ")[1];

          data.car_condition_battery_assess = data.battery.split(" ")[0];
          data.car_condition_battery_costs = data.battery.split(" ")[1];

          data.car_condition_starter_assess = data.starter.split(" ")[0];
          data.car_condition_starter_costs = data.starter.split(" ")[1];

          data.car_condition_generator_assess = data.generator.split(" ")[0];
          data.car_condition_generator_costs = data.generator.split(" ")[1];

          data.car_condition_engine_assess = data.engine.split(" ")[0];
          data.car_condition_engine_costs = data.engine.split(" ")[1];

          data.car_condition_ignition_assess = data.ignition.split(" ")[0];
          data.car_condition_ignition_costs = data.ignition.split(" ")[1];

          data.car_condition_compression_assess = data.compression.split(" ")[0];
          data.car_condition_compression_costs = data.compression.split(" ")[1];

          data.car_condition_compression_costs = data.noise.split(" ")[0];
          data.car_condition_compression_costs = data.noise.split(" ")[1];

          data.car_condition_fuel_assess = data.car_condition_fuel.split(" ")[0];
          data.car_condition_fuel_costs = data.car_condition_fuel.split(" ")[1];

          data.car_condition_cooling_assess = data.cooling.split(" ")[0];
          data.car_condition_cooling_costs = data.cooling.split(" ")[1];

          data.car_condition_air_conditiong_assess = data.cooling.split(" ")[0];
          data.car_condition_air_conditiong_costs = data.cooling.split(" ")[1];

          data.car_condition_varnish_assess = data.varnish.split(" ")[0];
          data.car_condition_varnish_costs = data.varnish.split(" ")[1];

          data.tires_assessement = data.assessement.split(" ")[0];
          data.tires_rope_costs = data.assessement.split(" ")[1];

          data.car_condition_other_asses = data.other.split(" ")[0];
          data.car_condition_other_costs = data.other.split(" ")[1];

          switch(data.bumper){
            case 'checked':
              data.bumper_yes = 'checked';
              data.bumper_no = false;
              break;
            default:
              data.bumper_yes = false;
              data.bumper_no = 'checked';
              break;
          }

          switch(data.service_book){
            case 'checked':
              data.timing_belt_service_box_yes = 'checked';
              data.timing_belt_service_box_no = false;
              break;
            default:
              data.timing_belt_service_box_yes = false;
              data.timing_belt_service_box_no = 'checked';
              break;
          }

          switch(data.corrosion){
            case 'checked':
              data.corrosion_yes = 'checked';
              data.corrosion_no = false;
              break;
            default:
              data.corrosion_yes = false;
              data.corrosion_no = 'checked';
              break;
          }

          switch(data.exhaust_commitment){
            case 'checked':
              data.exhaust_commitment_yes = 'checked';
              data.exhaust_commitment_no = false;
              break;
            default:
              data.exhaust_commitment_yes = false;
              data.exhaust_commitment_no = 'checked';
              break;
          }

          switch(data.collision_damage){
            case 'checked':
              data.collision_damage_yes = 'checked';
              data.collision_damage_no = false;
              break;
            default:
              data.collision_damage_yes = false;
              data.collision_damage_no = 'checked';
              break;
          }

          switch(data.changed){
            case 'checked':
              data.timing_belt_changed_yes = 'checked';
              data.timing_belt_changed_no = false;
              break;
            default:
              data.timing_belt_changed_yes = false;
              data.timing_belt_changed_no = 'checked';
              break;
          }

          if(data.mrf_months_number === null && data.mrf_km === null){
            data.mrf_yes = false;
            data.mrf_no = 'checked';
          }

          if(data.other_warrancy_months_number === null && data.other_warrancy_months_number === null){
            data.other_warranty_yes = false;
            data.other_warranty_no = 'checked';
          }else{
            data.other_warranty_yes = 'checked';
            data.other_warranty_no = false;
          }

          if(data.months_number === null && data.car_parts_km === null){
            data.car_parts_yes = false;
            data.car_parts_no = 'checked';
          } else{
            data.car_parts_yes = 'checked';
            data.car_parts_no = false;
          }

          Object.keys(data).forEach(function(key) {
            data[key] = data[key] + ' disabled';
          });    
          
          res.render(__dirname + "/ui/value_declaration/contract.html", data);
        });
});

app.get('/contract/:contract_id', requireAuth, function(req, res) {

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

app.get('/delete/:contract_id', requireAuth, (req, res) => {

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

            res.render(__dirname + "/ui/dashboard/index.html", {contracts:contracts});
          });
      });

});

app.get('/create-contract', requireAuth, (req, res) => {

  res.render(__dirname + "/ui/contract/index.html");

});

app.get('/contracts', requireAuth, (req, res) => {

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

  // console.log(query);
  
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

app.get('/dashboard', (req, res) => {
  res.render(__dirname + "/ui/login.html", {email: ''});

});

app.get('/dashboard/:error', (req, res) => {

  console.log(req.params.error);

  if(req.params.error == 'email'){
    res.render(__dirname + "/ui/login.html", {email: 'Wrong email'});
  }

  if(req.params.error == 'password'){     
    res.render(__dirname + "/ui/login.html", {email: 'Wrong password'});
  }
  
});

app.get('/register', (req,res) => {

  res.render(__dirname + "/ui/register.html");

})

// app.post('/signup', auth.signup);

// app.post('/signin', auth.signin);

app.listen(9000, () =>
  console.log('GraphQL server running on localhost:9000')
);