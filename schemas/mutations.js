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
        car_safety_id       : {type:  GraphQLString},   //$9
        notes               : {type:  GraphQLString },  //$10
        created             : {type:  GraphQLString },  //$11

        //engine_output
        // engine_output_id : {type: GraphQLString},  //$12
        kw               : {type: GraphQLInt},     //$13   
        hkr              : {type:GraphQLString },  //$14 

        //warrancy
        // warrancy_id        : {type:  GraphQLString},  //$15
        bumper             : {type:  GraphQLBoolean}, //$16
        corrosion          : {type:  GraphQLBoolean}, //$17
        collision_damage   : {type:  GraphQLBoolean}, //$18
        exhaust_commitment : {type:  GraphQLString},  //$19

        // mrf
        // mrf_id        : {type:  GraphQLString }, //$20
        months_number : {type:  GraphQLInt },  //$21
        km            : {type:  GraphQLInt },  //$22

        // other_warrancy
        // other_warranty_id : {type:  GraphQLString}, //$23
        months_number     : {type:  GraphQLInt},  //$24
        km                : {type:  GraphQLInt},  //$25

        // car_parts
        // car_parts_id   : {type: GraphQLString  }, //$25
        months_number  : {type: GraphQLInt   }, //$27
        car_parts_km : {type: GraphQLInt   }, //$28
        // warranty_type  : {type: GraphQLString }, //$29

        // timing_belt
        // timing_belt_id       :{type:  GraphQLString  }, //$30
        changed              :{type:  GraphQLString},   //$31
        annual_tax           :{type:  GraphQLInt  },   //$32
        service_box          :{type:  GraphQLBoolean  }, //$33

        // latest_inspection
        // latest_inspection_id : {type:  GraphQLString}, //$34
        date                 : {type:  GraphQLString}, //$35
        mileage              : {type:  GraphQLString}, //$36

        // car_condition
        // car_condition_id  : {type: GraphQLString }, //$37
        coupling          : {type: GraphQLString }, //$38
        gearbox           : {type: GraphQLString }, //$39
        end_gear          : {type: GraphQLString }, //$40
        heating           : {type: GraphQLString }, //$41
        battery           : {type: GraphQLString }, //$42
        starter           : {type: GraphQLString }, //$43
        generator         : {type: GraphQLString }, //$44
        engine            : {type: GraphQLString }, //$45
        ignition          : {type: GraphQLString }, //$46 
        compression       : {type: GraphQLString }, //$47 
        noise             : {type: GraphQLString }, //$48
        fuel              : {type: GraphQLString }, //$49
        cooling           : {type: GraphQLString }, //$50
        air_conditioning  : {type: GraphQLString }, //$51
        varnish           : {type: GraphQLString }, //$52
        other             : {type: GraphQLString }, //$53
        total_repair_cost : {type: GraphQLString }, //$54

        // tires
        // tires_id    :  {type: GraphQLString }, //$55
        vf          :  {type: GraphQLString }, //$56
        hf          :  {type: GraphQLString }, //$57
        vb          :  {type: GraphQLString }, //$58
        hb          :  {type: GraphQLString }, //$59
        res         :  {type: GraphQLString }, //$60
        assessement :  {type: GraphQLString }, //$61
        rope_costs  :  {type: GraphQLString }, //$62
        
        // body
        // body_id        : {type: GraphQLString}, //$63
        side_member    : {type: GraphQLString}, //$64
        crossbeam      : {type: GraphQLBoolean}, //$65
        floor          : {type: GraphQLBoolean}, //$66
        wheel_arch     : {type: GraphQLBoolean}, //$67
        other          : {type: GraphQLBoolean}, //$68
        declaration_id : {type: GraphQLBoolean}, //$69

        // wheel_system
        // wheel_system_id : {type:  GraphQLString }, //$70
        deck            : {type:  GraphQLBoolean }, //$71
        shock           : {type:  GraphQLBoolean }, //$72
        bearings        : {type:  GraphQLBoolean }, //$73
        spindelled      : {type:  GraphQLBoolean }, //$74
        front_link_arm  : {type:  GraphQLBoolean }, //$75
        back_link_arm   : {type:  GraphQLBoolean }, //$76
        feather         : {type:  GraphQLBoolean }, //$77
        spring_bracket  : {type:  GraphQLBoolean }, //$78
        wheel_system_other : {type:  GraphQLBoolean }, //$79

        // drive
        // drive_id        : {type: GraphQLString}, //$80
        drive_fuel      : {type: GraphQLBoolean}, //$81
        exhaust         : {type: GraphQLBoolean}, //$82
        transmission    : {type: GraphQLBoolean}, //$83
        universal_joint : {type: GraphQLBoolean}, //$84
        power_supply    : {type: GraphQLBoolean}, //$85
        drive_battery   : {type: GraphQLBoolean}, //$86

        // braking_system
        // braking_system_id      : {type: GraphQLString }, //$87
        service_brake_front    : {type: GraphQLBoolean }, //$88
        service_brake_back     : {type: GraphQLBoolean }, //$89
        service_brake_movement : {type: GraphQLBoolean }, //$90
        brake_hose             : {type: GraphQLBoolean }, //$91
        braking_system_battery : {type: GraphQLBoolean }, //$92
        braking_system_other   : {type: GraphQLBoolean }, //$93

        // control_system
        // control_system_id  : {type: GraphQLString}, //$94
        articulation_joint : {type: GraphQLBoolean },  //$95
        steering_gear      : {type: GraphQLBoolean },  //$96
        track_control_arm  : {type: GraphQLBoolean },  //$97
        control_system_other : {type: GraphQLBoolean }, //$98

        // karosseri
        // karosseri_id   : {type:  GraphQLString }, //$99
        door           : {type:  GraphQLBoolean },  //$100
        screen         : {type:  GraphQLBoolean },  //$101
        windshield     : {type:  GraphQLBoolean },  //$102
        seat_belts     : {type:  GraphQLBoolean },  //$103
        loading_space  : {type:  GraphQLBoolean },  //$104
        karosseri_other : {type:  GraphQLBoolean },  //$105

        // communication
        // communication_id     : {type: GraphQLString}, //$106
        windscreen_wiper     : {type: GraphQLBoolean},  //$107
        windscreen_washer    : {type: GraphQLBoolean},  //$108
        rearview_mirror      : {type: GraphQLBoolean},  //$109
        headlight_setting    : {type: GraphQLBoolean},  //$110
        headlamp_1           : {type: GraphQLBoolean},  //$111
        headlamp_2           : {type: GraphQLBoolean},  //$112
        signal_device        : {type: GraphQLBoolean},  //$113
        side_marker          : {type: GraphQLBoolean},  //$114
        headlight_front      : {type: GraphQLBoolean},  //$115
        headlight_back       : {type: GraphQLBoolean},  //$116
        direction_indicator  : {type: GraphQLBoolean},  //$117
        stop_lamps           : {type: GraphQLBoolean},  //$118
        reflex               : {type: GraphQLBoolean},  //$119
        communication_other  : {type: GraphQLBoolean},  //$120

        // orchestration
        // orchestration_id : {type:  GraphQLString}, //$121
        speedometer      : {type:  GraphQLBoolean},  //$122
        orchestration_other : {type:  GraphQLBoolean},  //$123

        // facilities
        // facilities_id   : {type:  GraphQLString },  //$124
        facilities_coupling : {type:  GraphQLBoolean }, //$125
        trailer_contact : {type:  GraphQLBoolean },   //$126
        facilities_other : {type:  GraphQLBoolean },  //$127

        // environment
        // environment_id   : {type:  GraphQLString }, //$128
        purification        : {type:  GraphQLBoolean }, //$129
        emission_control    : {type:  GraphQLBoolean }, //$130
        environment_exhaust : {type:  GraphQLBoolean } //$131
      },
      resolve(parentValue, args) {
        const query = `INSERT INTO declaration(declaration_id) VALUES ($1);
                       INSERT INTO engine_output(engine_output_id, kw, hkr) VALUES ($1, $13, $14);
                       INSERT INTO mrf (mrf_id, months_number, km) VALUES ($1, $21, $2);
                       INSERT INTO other_warrancy (other_warranty_id, months_number, km) VALUES ($1, $24, $25);
                       INSERT INTO car_parts (car_parts_id, months_number, km) VALUES ($1, $27, $28);
                       INSERT INTO general_info (type, manufacture_date, mileage, registration_number, fuel, gearbox, repair_property, car_safety_id, notes, created, declaration_id, engine_output_id) VALUES ($2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $1, $1);
                       INSERT INTO warrancy (warrancy_id, bumper, corrosion, collision_damage, exhaust_commitment, mrf_id, other_warranty_id, car_parts_id, declaration_id) VALUES ($1, $16, $17, $18, $19, $1, $1, $1, $1);
                       INSERT INTO body (side_member, crossbeam, floor, wheel_arch, other, declaration_id) VALUES ($1, $64, $65, $66, $67, $68, $1);
                       INSERT INTO drive (drive_id, fuel, exhaust, transmission, universal_joint, power_supply, battery, declaration_id) VALUES ($1, $81, $82, $83, $84, $85, $86, $1);
                       INSERT INTO braking_system (braking_system_id, service_brake_front, service_brake_back, service_brake_movement, brake_hose, battery, other, declaration_id) VALUES ($1, $88, $89, $90, $91, $92, $93, $1);
                       INSERT INTO control_system (control_system_id, articulation_joint, steering_gear, track_control_arm, other, declaration_id) VALUES ($1, $95, $96, $97, $98, $1);
                       INSERT INTO karosseri (karosseri_id, door, screen, windshield, seat_belts, loading_space, other, declaration_id) VALUES ($1, $100, $101, $102, $103, $104, $105, $1);
                       INSERT INTO communication (communication_id, windscreen_wiper, windscreen_washer, rearview_mirror, headlight_setting, headlamp_1, headlamp_2, signal_device, side_marker, headlight_front, headlight_back, direction_indicator, stop_lamps, reflex, other, declaration_id) VALUES ($1, $107, $108, $109, $110, $111, $112, $113, $114, $115, $116, $117, $118, $119, $120, $1);
                       INSERT INTO orchestration (orchestration_id, speedometer, other, declaration_id) VALUES ($1, $122, $123, $1);
                       INSERT INTO facilities (facilities_id, coupling, trailer_contact, other, declaration_id) VALUES ($1, $125, $126, $127, $1);
                       INSERT INTO timing_belt (timing_belt_id, changed, annual_tax, declaration_id, latest_inspection_id) VALUES ($1, $31, $32, $33, $1, $1);
                       INSERT INTO latest_inspection (latest_inspection_id, date, mileage) VALUES ($1, $35, $36);
                       INSERT INTO car_condition (car_condition_id, coupling, gearbox, end_gear, heating, battery, starter, generator, engine, ignition, compression, noise, fuel, cooling, air_conditioning, varnish, other, total_repair_cost, declaration_id, tires_id) VALUES ($1, $38, $39, $40, $41, $42, $43, $44, $45, $46, $47, $48, $49, $50, $51, $52, $53, $54, $1, $1);
                       INSERT INTO environment (environment_id, purification, emission_control, exhaust, declaration_id) VALUES ($1, $129, $130, $131, $1);
                       INSERT INTO tires (tires_id, vf, hf, vb, hb, res, assessement, rope_costs) VALUES ($1, $56, $57, $58, $59, $60, $61, $62);
                       INSERT INTO wheel_system (wheel_system_id, deck, shock, bearings, spindelled, front_link_arm, back_link_arm, feather, spring_bracket, other, declaration_id) VALUES ($1, $71, $72, $73, $74, $75, $76, $77, $78, $79);
                       `;
        
        const values = [
          // contract_ids
          args.contract_id, //$1

          // general_info
          args.type                , //$2
          args.manufacture_date    , //$3
          args.mileage             , //$4
          args.registration_number , //$5
          args.fuel                , //$6
          args.gearbox             , //$7
          args.repair_property     , //$8
          args.car_safety_id       , //$9
          args.notes               , //$10
          args.created             , //$11

          //engine_output
          // args.engine_output_id ,  //$12
          args.kw               ,  //$13   
          args.hkr              ,  //$14 

          //warrancy
          // args.warrancy_id       , //$15
          args.bumper            , //$16
          args.corrosion         , //$17
          args.collision_damage  , //$18
          args.exhaust_commitment, //$19

          // mrf
          // args.mrf_id        ,  //$20
          args.months_number ,   //$21
          args.km            ,   //$22

          // other_warrancy
          // args.other_warranty_id,  //$23
          args.months_number    ,   //$24
          args.km               ,   //$25

          // car_parts
          // args.car_parts_id  ,  //$25
          args.months_number ,  //$27
          args.car_parts_km  ,//$28
          // warranty_type  : {type: GraphQLString }, //$29

          // timing_belt
          // args.timing_belt_id ,  //$30
          args.changed        ,  //$31
          args.annual_tax     ,  //$32
          args.service_box    ,  //$33

          // latest_inspection
          // args.latest_inspection_id , //$34
          args.date                 , //$35
          args.mileage              , //$36

          // car_condition
          // args.car_condition_id ,  //$37
          args.coupling         ,  //$38
          args.gearbox          ,  //$39
          args.end_gear         ,  //$40
          args.heating          ,  //$41
          args.battery          ,  //$42
          args.starter          ,  //$43
          args.generator        ,  //$44
          args.engine           ,  //$45
          args.ignition         ,  //$46 
          args.compression      ,  //$47 
          args.noise            ,  //$48
          args.fuel             ,  //$49
          args.cooling          ,  //$50
          args.air_conditioning ,  //$51
          args.varnish          ,  //$52
          args.other            ,  //$53
          args.total_repair_cost,  //$54

          // tires
          // args.tires_id   , //$55
          args.vf         , //$56
          args.hf         , //$57
          args.vb         , //$58
          args.hb         , //$59
          args.res        , //$60
          args.assessement, //$61
          args.rope_costs , //$62
          
          // body
          // args.body_id       ,//$63
          args.side_member   ,//$64
          args.crossbeam     , //$65
          args.floor         , //$66
          args.wheel_arch    , //$67
          args.other         , //$68
          args.declaration_id, //$69

          // wheel_system
          // args.wheel_system_id,//$70
          args.deck           , //$71
          args.shock          , //$72
          args.bearings       , //$73
          args.spindelled     , //$74
          args.front_link_arm , //$75
          args.back_link_arm  , //$76
          args.feather        , //$77
          args.spring_bracket , //$78
          args.wheel_system_other,//$79

          // drive
          // args.drive_id       , //$80
          args.drive_fuel     ,  //$81
          args.exhaust        ,  //$82
          args.transmission   ,  //$83
          args.universal_joint,  //$84
          args.power_supply   ,  //$85
          args.drive_battery  ,  //$86

          // braking_system
          // args.braking_system_id     ,//$87
          args.service_brake_front   , //$88
          args.service_brake_back    , //$89
          args.service_brake_movement, //$90
          args.brake_hose            , //$91
          args.braking_system_battery, //$92
          args.braking_system_other  , //$93

          // control_system
          // args.control_system_id     ,  //$94
          args.articulation_joint    ,   //$95
          args.steering_gear         ,   //$96
          args.track_control_arm     ,   //$97
          args.control_system_other  ,//$98

          // karosseri
          // args.karosseri_id     , //$99
          args.door             , //$100
          args.screen           , //$101
          args.windshield       , //$102
          args.seat_belts       , //$103
          args.loading_space    , //$104
          args.karosseri_other  ,  //$105

          // communication
          // args.communication_id    ,  //$106
          args.windscreen_wiper    ,  //$107
          args.windscreen_washer   ,  //$108
          args.rearview_mirror     ,  //$109
          args.headlight_setting   ,  //$110
          args.headlamp_1          ,  //$111
          args.headlamp_2          ,  //$112
          args.signal_device       ,  //$113
          args.side_marker         ,  //$114
          args.headlight_front     ,  //$115
          args.headlight_back      ,  //$116
          args.direction_indicator ,  //$117
          args.stop_lamps          ,  //$118
          args.reflex              ,  //$119
          args.communication_other ,  //$120

          // orchestration
          // args.orchestration_id    , //$121
          args.speedometer         ,  //$122
          args.orchestration_other , //$123

          // facilities
          // args.facilities_id       , //$124
          args.facilities_coupling , //$125
          args.trailer_contact     , //$126
          args.facilities_other    ,  //$127

          // environment
          // args.environment_id       , //$128
          args.purification         , //$129
          args.emission_control     , //$130
          args.environment_exhaust   //$131
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