const graphql = require("graphql");
const db = require("../pgAdaptor").db;
const { GraphQLInt, GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean } = graphql;
const { UserType, ContractType, BalanceDueType, ContractIdsType, PurchaseAgreementType, ValueDeclarationType } = require("./types");

const RootMutation = new GraphQLObjectType({
  name: "RootMutationType",
  type: "Mutation",
  fields: {
    deleteContract:{
      type: ContractType,
      args:{
        contract_id: { type: GraphQLID }
      },
      resolve(parentValue, args) {

        const query = `DELETE FROM balance_due WHERE contract_id = $1;
                       DELETE FROM buyer WHERE contract_id = $1;
                       DELETE FROM purchase_property WHERE contract_id = $1;
                       DELETE FROM seller_or_registred_owner WHERE contract_id = $1;
                       DELETE FROM purchase_agreement WHERE contract_id = $1;
                       DELETE FROM seller WHERE contract_id = $1;
                       DELETE FROM regulation_purchase WHERE contract_id = $1;
                       DELETE FROM contract_ids WHERE contract_id = $1 RETURNING $1;`;

        const values = [args.contract_id];

        return db
          .one(query, values)
          .then(res => res)
          .catch(err => err);
      }
    },
    // Add new value declaration
    addVD: {
      type: ValueDeclarationType,
      args: {
        // contract_ids
        contract_id: { type: GraphQLID }, //$1

        // general_info
        type                : {type:  GraphQLString },  //$2
        manufacture_date    : {type:  GraphQLString },  //$3
        mileage             : {type:  GraphQLInt},      //$4
        registration_number : {type:  GraphQLString },  //$5
        fuel                : {type:  GraphQLString },  //$6
        gearbox             : {type:  GraphQLString },  //$7
        repair_property     : {type:  GraphQLBoolean},  //$8
        car_safety_id       : {type:  GraphQLInt},   //$9
        notes               : {type:  GraphQLString },  //$10
        created             : {type:  GraphQLString },  //$11

        //engine_output
        kw               : {type: GraphQLInt},     //$12  
        hkr              : {type:GraphQLString },  //$13 

        //warrancy
        bumper             : {type:  GraphQLBoolean}, //$14
        corrosion          : {type:  GraphQLBoolean}, //$15
        collision_damage   : {type:  GraphQLBoolean}, //$16
        exhaust_commitment : {type:  GraphQLString},  //$17

        // mrf
        mrf_months_number : {type:  GraphQLInt },  //$18
        mrf_km            : {type:  GraphQLInt },  //$19

        // other_warrancy
        other_warrancy_months_number : {type:  GraphQLInt},  //$20
        other_warrancy_km  : {type:  GraphQLInt},  //$21

        // car_parts
        months_number  : {type: GraphQLInt   }, //$22
        car_parts_km : {type: GraphQLInt   }, //$23
        // warranty_type  : {type: GraphQLString }, //$29

        // timing_belt
        changed              :{type:  GraphQLString},   //$24
        annual_tax           :{type:  GraphQLInt  },   //$25
        service_box          :{type:  GraphQLBoolean  }, //$26

        // latest_inspection
        date                 : {type:  GraphQLString}, //$27
        latest_inspection_mileage  : {type:  GraphQLString}, //$28

        // car_condition
        coupling          : {type: GraphQLString }, //$29
        car_condition_gearbox  : {type: GraphQLString }, //$30
        end_gear          : {type: GraphQLString }, //$31
        heating           : {type: GraphQLString }, //$32
        battery           : {type: GraphQLString }, //$33
        starter           : {type: GraphQLString }, //$34
        generator         : {type: GraphQLString }, //$35
        engine            : {type: GraphQLString }, //$36
        ignition          : {type: GraphQLString }, //$37 
        compression       : {type: GraphQLString }, //$38 
        noise             : {type: GraphQLString }, //$39
        car_condition_fuel : {type: GraphQLString }, //$40
        cooling           : {type: GraphQLString }, //$41
        air_conditioning  : {type: GraphQLString }, //$42
        varnish           : {type: GraphQLString }, //$43
        other             : {type: GraphQLString }, //$44
        total_repair_cost : {type: GraphQLString }, //$45

        // tires
        vf          :  {type: GraphQLString }, //$46
        hf          :  {type: GraphQLString }, //$47
        vb          :  {type: GraphQLString }, //$48
        hb          :  {type: GraphQLString }, //$49
        tires_res   :  {type: GraphQLString }, //$50
        assessement :  {type: GraphQLString }, //$51
        rope_costs  :  {type: GraphQLString }, //$52
        
        // body
        side_member    : {type: GraphQLBoolean}, //$53
        crossbeam      : {type: GraphQLBoolean}, //$54
        floor          : {type: GraphQLBoolean}, //$55
        wheel_arch     : {type: GraphQLBoolean}, //$56
        body_other          : {type: GraphQLBoolean}, //$57

        // wheel_system
        deck            : {type:  GraphQLBoolean }, //$58
        shock           : {type:  GraphQLBoolean }, //$59
        bearings        : {type:  GraphQLBoolean }, //$60
        spindelled      : {type:  GraphQLBoolean }, //$61
        front_link_arm  : {type:  GraphQLBoolean }, //$62
        back_link_arm   : {type:  GraphQLBoolean }, //$63
        feather         : {type:  GraphQLBoolean }, //$64
        spring_bracket  : {type:  GraphQLBoolean }, //$65
        wheel_system_other : {type:  GraphQLBoolean }, //$66

        // drive
        drive_fuel      : {type: GraphQLBoolean}, //$67
        exhaust         : {type: GraphQLBoolean}, //$68
        transmission    : {type: GraphQLBoolean}, //$69
        universal_joint : {type: GraphQLBoolean}, //$70
        power_supply    : {type: GraphQLBoolean}, //$71
        drive_battery   : {type: GraphQLBoolean}, //$72

        // braking_system
        service_brake_front    : {type: GraphQLBoolean }, //$73
        service_brake_back     : {type: GraphQLBoolean }, //$74
        service_brake_movement : {type: GraphQLBoolean }, //$75
        brake_hose             : {type: GraphQLBoolean }, //$76
        braking_system_battery : {type: GraphQLBoolean }, //$77
        braking_system_other   : {type: GraphQLBoolean }, //$78

        // control_system
        articulation_joint : {type: GraphQLBoolean },  //$79
        steering_gear      : {type: GraphQLBoolean },  //$80
        track_control_arm  : {type: GraphQLBoolean },  //$81
        control_system_other : {type: GraphQLBoolean }, //$82

        // karosseri
        door           : {type:  GraphQLBoolean },  //$83
        screen         : {type:  GraphQLBoolean },  //$84
        windshield     : {type:  GraphQLBoolean },  //$85
        seat_belts     : {type:  GraphQLBoolean },  //$86
        loading_space  : {type:  GraphQLBoolean },  //$87
        karosseri_other : {type:  GraphQLBoolean },  //$88

        // communication
        windscreen_wiper     : {type: GraphQLBoolean},  //$89
        windscreen_washer    : {type: GraphQLBoolean},  //$90
        rearview_mirror      : {type: GraphQLBoolean},  //$91
        headlight_setting    : {type: GraphQLBoolean},  //$92
        headlamp_1           : {type: GraphQLBoolean},  //$93
        headlamp_2           : {type: GraphQLBoolean},  //$94
        signal_device        : {type: GraphQLBoolean},  //$95
        side_marker          : {type: GraphQLBoolean},  //$96
        headlight_front      : {type: GraphQLBoolean},  //$97
        headlight_back       : {type: GraphQLBoolean},  //$98
        direction_indicator  : {type: GraphQLBoolean},  //$99
        stop_lamps           : {type: GraphQLBoolean},  //$100
        reflex               : {type: GraphQLBoolean},  //$101
        communication_other  : {type: GraphQLBoolean},  //$102

        // orchestration
        speedometer      : {type:  GraphQLBoolean},  //$103
        orchestration_other : {type:  GraphQLBoolean},  //$104

        // facilities
        facilities_coupling : {type:  GraphQLBoolean }, //$105
        trailer_contact : {type:  GraphQLBoolean },   //$106
        facilities_other : {type:  GraphQLBoolean },  //$107

        // environment
        purification        : {type:  GraphQLBoolean }, //$108
        emission_control    : {type:  GraphQLBoolean }, //$109
        environment_exhaust : {type:  GraphQLBoolean } //$110
      },
      resolve(parentValue, args) {
        const query = `INSERT INTO declaration(declaration_id, contract_id) VALUES ($1, $1);
                       INSERT INTO engine_output(engine_output_id, kw, hkr) VALUES ($1, $12, $14);
                       INSERT INTO mrf (mrf_id, months_number, km) VALUES ($1, $18, $19);
                       INSERT INTO other_warranty (other_warranty_id, months_number, km) VALUES ($1, $20, $21);
                       INSERT INTO car_parts (car_parts_id, months_number, km) VALUES ($1, $22, $23);
                       INSERT INTO general_info (type, manufacture_date, mileage, registration_number, fuel, gearbox, repair_property, car_safety_id, notes, created, declaration_id, engine_output_id) VALUES ($2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $1, $1);
                       INSERT INTO warrancy (warrancy_id, bumper, corrosion, collision_damage, exhaust_commitment, mrf_id, other_warranty_id, car_parts_id, declaration_id) VALUES ($1, $14, $15, $16, $17, $1, $1, $1, $1);
                       INSERT INTO body (body_id, side_member, crossbeam, floor, wheel_arch, other, declaration_id) VALUES ($1, $53, $54, $55, $56, $57, $1);
                       INSERT INTO drive (drive_id, fuel, exhaust, transmission, universal_joint, power_supply, battery, declaration_id) VALUES ($1, $67, $68, $69, $70, $71, $72, $1);
                       INSERT INTO braking_system (braking_system_id, service_brake_front, service_brake_back, service_brake_movement, brake_hose, battery, other, declaration_id) VALUES ($1, $73, $74, $75, $76, $77, $78, $1);
                       INSERT INTO control_system (control_system_id, articulation_joint, steering_gear, track_control_arm, other, declaration_id) VALUES ($1, $79, $80, $81, $82, $1);
                       INSERT INTO karosseri (karosseri_id, door, screen, windshield, seat_belts, loading_space, other, declaration_id) VALUES ($1, $83, $84, $85, $86, $87, $88, $1);
                       INSERT INTO communication (communication_id, windscreen_wiper, windscreen_washer, rearview_mirror, headlight_setting, headlamp_1, headlamp_2, signal_device, side_marker, headlight_front, headlight_back, direction_indicator, stop_lamps, reflex, other, declaration_id) VALUES ($1, $89, $90, $81, $92, $93, $94, $95, $96, $97, $98, $99, $100, $101, $102, $1);
                       INSERT INTO orchestration (orchestration_id, speedometer, other, declaration_id) VALUES ($1, $103, $104, $1);
                       INSERT INTO facilities (facilities_id, coupling, trailer_contact, other, declaration_id) VALUES ($1, $105, $106, $107, $1);
                       INSERT INTO latest_inspection (latest_inspection_id, date, mileage) VALUES ($1, $27, $28);
                       INSERT INTO tires (tires_id, vf, hf, vb, hb, res, assessement, rope_costs) VALUES ($1, $46, $47, $48, $49, $50, $51, $52);
                       INSERT INTO timing_belt (timing_belt_id, changed, annual_tax, service_box, declaration_id, latest_inspection_id) VALUES ($1, $24, $25, $26, $1, $1);
                       INSERT INTO car_condition (car_condition_id, coupling, gearbox, end_gear, heating, battery, starter, generator, engine, ignition, compression, noise, fuel, cooling, air_conditioning, varnish, other, total_repair_cost, declaration_id, tires_id) VALUES ($1, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39, $40, $41, $42, $43, $44, $45, $1, $1);
                       INSERT INTO environment (environment_id, purification, emission_control, exhaust, declaration_id) VALUES ($1, $108, $109, $110, $1);                   
                       INSERT INTO wheel_system (wheel_system_id, deck, shock, bearings, spindelled, front_link_arm, back_link_arm, feather, spring_bracket, other, declaration_id) VALUES ($1, $58, $59, $60, $61, $62, $63, $64, $65, $66, $1);
                       `;
        
        const values = [
          // contract_ids
          args.contract_id, //$1

          // general_info
          args.type                , //$2
          args.manufacture_date    , //$3
          args.mileage             , //$4
          args.registration_number , //$5
          args.car_condition_fuel  , //$6
          args.gearbox             , //$7
          args.repair_property     , //$8
          args.car_safety_id       , //$9
          args.notes               , //$10
          args.created             , //$11

          //engine_output
          args.kw               ,  //$12 
          args.hkr              ,  //$13 

          //warrancy
          args.bumper            , //$14
          args.corrosion         , //$15
          args.collision_damage  , //$16
          args.exhaust_commitment, //$17

          // mrf
          args.mrf_months_number ,   //$18
          args.kmrf_km            ,   //$19

          // other_warrancy
          args.other_warrancy_months_number ,   //$20
          args.other_warrancy_km ,   //$21

          // car_parts
          args.months_number ,  //$22
          args.car_parts_km  ,//$23
          // warranty_type  : {type: GraphQLString }, //$29

          // timing_belt
          args.changed        ,  //$24
          args.annual_tax     ,  //$25
          args.service_box    ,  //$26

          // latest_inspection
          args.date                 , //$27
          args.latest_inspection_mileage, //$28

          // car_condition
          args.coupling         ,  //$29
          args.car_condition_gearbox,  //$30
          args.end_gear         ,  //$31
          args.heating          ,  //$32
          args.battery          ,  //$33
          args.starter          ,  //$34
          args.generator        ,  //$35
          args.engine           ,  //$36
          args.ignition         ,  //$37 
          args.compression      ,  //$38 
          args.noise            ,  //$39
          args.fuel             ,  //$40
          args.cooling          ,  //$41
          args.air_conditioning ,  //$42
          args.varnish          ,  //$43
          args.other            ,  //$44
          args.total_repair_cost,  //$45

          // tires
          args.vf         , //$46
          args.hf         , //$47
          args.vb         , //$48
          args.hb         , //$49
          args.tires_res   , //$50
          args.assessement, //$51
          args.rope_costs , //$52
          
          // body
          args.side_member   ,//$53
          args.crossbeam     , //$54
          args.floor         , //$55
          args.wheel_arch    , //$56
          args.body_other    , //$57

          // wheel_system
          args.deck           , //$58
          args.shock          , //$59
          args.bearings       , //$60
          args.spindelled     , //$61
          args.front_link_arm , //$62
          args.back_link_arm  , //$63
          args.feather        , //$64
          args.spring_bracket , //$65
          args.wheel_system_other,//$66

          // drive
          args.drive_fuel     ,  //$67
          args.exhaust        ,  //$68
          args.transmission   ,  //$69
          args.universal_joint,  //$70
          args.power_supply   ,  //$71
          args.drive_battery  ,  //$72

          // braking_system
          args.service_brake_front   , //$73
          args.service_brake_back    , //$74
          args.service_brake_movement, //$75
          args.brake_hose            , //$76
          args.braking_system_battery, //$77
          args.braking_system_other  , //$78

          // control_system
          args.articulation_joint    ,   //$79
          args.steering_gear         ,   //$80
          args.track_control_arm     ,   //$81
          args.control_system_other  ,//$82

          // karosseri
          args.door             , //$83
          args.screen           , //$84
          args.windshield       , //$85
          args.seat_belts       , //$86
          args.loading_space    , //$87
          args.karosseri_other  ,  //88

          // communication
          args.windscreen_wiper    ,  //$89
          args.windscreen_washer   ,  //$90
          args.rearview_mirror     ,  //$91
          args.headlight_setting   ,  //$92
          args.headlamp_1          ,  //$93
          args.headlamp_2          ,  //$94
          args.signal_device       ,  //$95
          args.side_marker         ,  //$96
          args.headlight_front     ,  //$97
          args.headlight_back      ,  //$98
          args.direction_indicator ,  //$99
          args.stop_lamps          ,  //$100
          args.reflex              ,  //$101
          args.communication_other ,  //$102

          // orchestration
          args.speedometer         ,  //$103
          args.orchestration_other , //$104

          // facilities
          args.facilities_coupling , //$105
          args.trailer_contact     , //$106
          args.facilities_other    ,  //$107

          // environment
          args.purification         , //$108
          args.emission_control     , //$109
          args.environment_exhaust   //$110
      ];

      return db
        .multi(query, values)
        .then(res => res)
        .catch(err => err);
    }
  },
    // Add new contract from: <<url>>/create-contract/
    addContract:{
      type: ContractType,
      args: {
        contract_id: { type: GraphQLID }, //$1
        // balance_due
        creditors: { type: GraphQLString }, //$2
        balance_due: { type: GraphQLString }, //$3
        account_number: { type: GraphQLString }, //$4
        checked_date: { type: GraphQLString }, //$5
        informants: { type: GraphQLString }, //$6
        signature: { type: GraphQLString }, //$7
        // buyer
        buyer_date: { type: GraphQLString}, //$8
        buyer_city: { type: GraphQLString }, //$9
        buyer_representative: { type: GraphQLString }, //$10
        // purchase_property
        registration_property: { type: GraphQLString }, //$11
        chassis_numer: { type: GraphQLString }, //$12
        mileage: { type: GraphQLInt }, //$13
        valuation: { type: GraphQLInt }, //$14
        first_registration_date: { type: GraphQLString }, //$15
        manufactured_date: { type: GraphQLString }, //$16
        colour: { type: GraphQLString }, //$17
        valuation_date: { type: GraphQLString }, //$18
        deduction: { type: GraphQLString }, //$19
        approved_check: { type: GraphQLString }, //$20
        service_book: { type: GraphQLString }, //$21
        warranty: { type: GraphQLString }, //$22
        purchase_price_adjusted: { type: GraphQLInt }, //$23
        condition_and_notes: { type: GraphQLString }, //$24
        // seller_or_registred_owner
        date: { type: GraphQLString }, //$25
        city: { type: GraphQLString }, //$26
        representative: { type: GraphQLString }, //$27
        // purchase_agreement
        agreement_number : { type: GraphQLString }, //$28
        seller_or_buyer : { type: GraphQLString }, //$29
        phone : { type: GraphQLString }, //$30
        purchase_date : { type: GraphQLString }, //$31
        // seller
        name : { type: GraphQLString }, //$32
        address : { type: GraphQLString }, //$33
        seller_phone : { type: GraphQLString }, //$34
        driver_name_phone : { type: GraphQLString }, //$35
        // regulation_purchase
        purchase_price : { type: GraphQLInt }, //$36
        vat : { type: GraphQLInt }, //$37
        resolves_the_redemption_of_my_residual_debt : { type: GraphQLString }, //$38
        other_deductions : { type: GraphQLString }, //$39
        other_payments : { type: GraphQLString }, //$40
        to_obtain : { type: GraphQLString }, //$41
        },
        resolve(parentValue, args) {
        const query = `INSERT INTO contract_ids(contract_id) VALUES ($1);
                       INSERT INTO balance_due(contract_id, creditors, balance_due, account_number, checked_date, informants, signature) VALUES ($1, $2, $3, $4, $5, $6, $7);
                       INSERT INTO buyer(contract_id, date, city, representative) VALUES ($1, $8, $9, $10);
                       INSERT INTO purchase_property(contract_id, registration_property, chassis_numer, mileage, valuation, first_registration_date, manufactured_date, colour , valuation_date, deduction, approved_check, service_book, warranty, purchase_price_adjusted, condition_and_notes) VALUES ($1, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24);
                       INSERT INTO seller_or_registred_owner(contract_id, date, city, representative) VALUES ($1, $25, $26, $27);
                       INSERT INTO purchase_agreement(contract_id, agreement_number, seller_or_buyer, phone, purchase_date) VALUES ($1, $28, $29, $30, $31);
                       INSERT INTO seller(contract_id, name, address, phone, driver_name) VALUES ($1, $32, $33, $34, $35);
                       INSERT INTO regulation_purchase(contract_id, purchase_price, vat, resolves_the_redemption_of_my_residual_debt, other_deductions, other_payments, to_obtain) VALUES ($1, $36, $37, $38, $39, $40, $41);`;
        
        const values = [
          args.contract_id,
          // balance_due
          args.creditors,
          args.balance_due,
          args.account_number,
          args.checked_date,
          args.informants,
          args.signature,
          // buyer
          args.buyer_date,
          args.buyer_city,
          args.buyer_representative,
          // purchase_property
          args.registration_property,
          args.chassis_numer,
          args.mileage,
          args.valuation,
          args.first_registration_date,
          args.manufactured_date,
          args.colour,
          args.valuation_date,
          args.deduction,
          args.approved_check,
          args.service_book,
          args.warranty,
          args.purchase_price_adjusted,
          args.condition_and_notes,
          // seller_or_registred_owner
          args.date,
          args.city,
          args.representative,
          // purchase_agreement
          args.agreement_number,
          args.seller_or_buyer,
          args.phone,
          args.purchase_date,
          // seller
          args.name,
          args.address,
          args.seller_phone,
          args.driver_name_phone,
          // regulation_purchase
          args.purchase_price,
          args.vat,
          args.resolves_the_redemption_of_my_residual_debt,
          args.other_deductions,
          args.other_payments,
          args.to_obtain
        ];

        return db
          .multi(query, values)
          .then(res => res)
          .catch(err => err);
        
      }
    },
    // Add balance
    addBalanceDue: {
      type: BalanceDueType,
      args: {
        contract_id: { type: GraphQLID },
        creditors: { type: GraphQLString },
        balance_due: { type: GraphQLString },
        account_number: { type: GraphQLString },
        checked_date: { type: GraphQLString },
        informants: { type: GraphQLString },
        signature: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        const query = `INSERT INTO balance_due(contract_id, creditors, balance_due, account_number, checked_date, informants, signature) VALUES ($1, $2, $3, $4, $5, $6, $7)`;
        const values = [
          args.contract_id,
          args.creditors,
          args.balance_due,
          args.account_number,
          args.checked_date,
          args.informants,
          args.signature
        ];

        return db
          .one(query, values)
          .then(res => res)
          .catch(err => err);
      }
    },

    addContractId: {
      type: ContractIdsType,
      args: {
        contract_id: { type: GraphQLID }
      },
      resolve(parentValue, args) {
        const query = `INSERT INTO contract_ids(contract_id) VALUES ($1) RETURNING contract_id`;
        const values = [
          args.contract_id
        ];

        return db
          .one(query, values)
          .then(res => res)
          .catch(err => err);
      }
    },

    addPurchaseAgreement: {
      type: PurchaseAgreementType,
      args: {
        contract_id: { type: GraphQLString },
        agreement_number: { type: GraphQLString},
        seller_or_buyer: { type: GraphQLString },
        phone: { type: GraphQLString },
        purchase_date: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        const query = `INSERT INTO purchase_agreement(contract_id, agreement_number, seller_or_buyer, phone, purchase_date) VALUES ($1, $2, $3, $4, $5)`;
        const values = [
          args.contract_id,
          args.agreement_number,
          args.seller_or_buyer,
          args.phone,
          args.purchase_date
        ];

        return db
          .one(query, values)
          .then(res => res)
          .catch(err => err);
      }
    },

    addUser: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        const query = `INSERT INTO users(email, password) VALUES ($1, $2) RETURNING *`;
        const values = [
          args.email,
          args.password
        ];

        return db
          .one(query, values)
          .then(res => res)
          .catch(err => err);
      }
    }
  }
});

exports.mutation = RootMutation;