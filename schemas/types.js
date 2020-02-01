const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLBoolean } = graphql;

const ValueDeclarationType = new GraphQLObjectType({
  name: "VD",
  type: "Query",
  fields:{
    // contract_ids
    contract_id: { type: GraphQLString },

    // body
    body_id        : {type: GraphQLString},
    side_member    : {type: GraphQLString},
    crossbeam      : {type: GraphQLBoolean},
    floor          : {type: GraphQLBoolean}, 
    wheel_arch     : {type: GraphQLBoolean}, 
    body_other     : {type: GraphQLBoolean}, 

    // braking_system
    braking_system_id      : {type: GraphQLString },
    service_brake_front    : {type: GraphQLBoolean },
    service_brake_back     : {type: GraphQLBoolean },
    service_brake_movement : {type: GraphQLBoolean },
    brake_hose             : {type: GraphQLBoolean },
    braking_system_battery : {type: GraphQLBoolean },
    braking_system_other   : {type: GraphQLBoolean },
  
    // car_condition
    car_condition_id  : {type: GraphQLString   },  
    coupling          : {type: GraphQLString },  
    car_condition_gearbox : {type: GraphQLString },  
    end_gear          : {type: GraphQLString },  
    heating           : {type: GraphQLString },  
    battery           : {type: GraphQLString },  
    starter           : {type: GraphQLString },  
    generator         : {type: GraphQLString },  
    engine            : {type: GraphQLString },  
    ignition          : {type: GraphQLString },  
    compression       : {type: GraphQLString },  
    noise             : {type: GraphQLString },  
    fuel              : {type: GraphQLString },  
    cooling           : {type: GraphQLString },  
    air_conditioning  : {type: GraphQLString },  
    varnish           : {type: GraphQLString },  
    other             : {type: GraphQLString },  
    total_repair_cost : {type: GraphQLString },  

    // car_parts
    car_parts_id   : {type: GraphQLString  },
    months_number  : {type: GraphQLInt   },
    car_parts_km   : {type: GraphQLInt   },
    // warranty_type  : {type: GraphQLString },

    // communication
    communication_id     : {type: GraphQLString}, 
    windscreen_wiper     : {type: GraphQLBoolean},  
    windscreen_washer    : {type: GraphQLBoolean},  
    rearview_mirror      : {type: GraphQLBoolean},  
    headlight_setting    : {type: GraphQLBoolean},  
    headlamp_1           : {type: GraphQLBoolean},  
    headlamp_2           : {type: GraphQLBoolean},  
    signal_device        : {type: GraphQLBoolean},  
    side_marker          : {type: GraphQLBoolean},  
    headlight_front      : {type: GraphQLBoolean},  
    headlight_back       : {type: GraphQLBoolean},  
    direction_indicator  : {type: GraphQLBoolean},  
    stop_lamps           : {type: GraphQLBoolean},  
    reflex               : {type: GraphQLBoolean},  
    communication_other  : {type: GraphQLBoolean},  

    // control_system
    control_system_id  : {type: GraphQLString}, 
    articulation_joint : {type: GraphQLBoolean },  
    steering_gear      : {type: GraphQLBoolean },  
    track_control_arm  : {type: GraphQLBoolean },  
    control_system_other : {type: GraphQLBoolean }, 

    // declaration
    declaration_id : {type: GraphQLString}, 

    // drive
    drive_id        : {type: GraphQLString}, 
    drive_fuel      : {type: GraphQLBoolean},
    exhaust         : {type: GraphQLBoolean},
    transmission    : {type: GraphQLBoolean},
    universal_joint : {type: GraphQLBoolean},
    power_supply    : {type: GraphQLBoolean},
    drive_battery   : {type: GraphQLBoolean},

    // engine_output
    engine_output_id : {type: GraphQLString},  
    kw               : {type: GraphQLInt},    
    hkr              : {type:GraphQLString },  

    // environment
    environment_id   : {type:  GraphQLString },
    purification     : {type:  GraphQLBoolean },
    emission_control : {type:  GraphQLBoolean },
    environment_exhaust : {type:  GraphQLBoolean },

    // facilities
    facilities_id   : {type:  GraphQLString },  
    facilities_coupling : {type:  GraphQLBoolean },   
    trailer_contact : {type:  GraphQLBoolean },   
    facilities_other : {type:  GraphQLBoolean },   

    // general_info
    type                : {type:  GraphQLString },  
    manufacture_date    : {type:  GraphQLString },  
    mileage             : {type:  GraphQLInt},  
    registration_number : {type:  GraphQLString },  
    fuel                : {type:  GraphQLString },  
    gearbox             : {type:  GraphQLString },  
    repair_property     : {type:  GraphQLBoolean},  
    car_safety_id       : {type:  GraphQLString}, 
    notes               : {type:  GraphQLString },  
    created             : {type:  GraphQLString },  

    // karosseri
    karosseri_id   : {type:  GraphQLString }, 
    door           : {type:  GraphQLBoolean },  
    screen         : {type:  GraphQLBoolean },  
    windshield     : {type:  GraphQLBoolean },  
    seat_belts     : {type:  GraphQLBoolean },  
    loading_space  : {type:  GraphQLBoolean },  
    karosseri_other : {type:  GraphQLBoolean },  

    // latest_inspection
    latest_inspection_id : {type:  GraphQLString}, 
    date                 : {type:  GraphQLString}, 
    latest_inspection_mileage : {type:  GraphQLString} , 

    // mrf
    mrf_id        : {type:  GraphQLString }, 
    months_number : {type:  GraphQLInt },  
    km            : {type:  GraphQLInt },  

    // orchestration
    orchestration_id : {type:  GraphQLString}, 
    speedometer      : {type:  GraphQLBoolean},  
    orchestration_other : {type:  GraphQLBoolean},  
 
    // other_warrancy
    other_warranty_id : {type:  GraphQLString}, 
    other_warrancy_months_number     : {type:  GraphQLInt},  
    other_warrancy_km                : {type:  GraphQLInt},  

    // timing_belt
    timing_belt_id       :{type:  GraphQLString  },  
    changed              :{type:  GraphQLString},   
    annual_tax           :{type:  GraphQLInt  },   
    // service_box          :{type:  GraphQLBoolean  },   

    // tires
    tires_id    :  {type: GraphQLString },
    vf          :  {type: GraphQLString }, 
    hf          :  {type: GraphQLString }, 
    vb          :  {type: GraphQLString }, 
    hb          :  {type: GraphQLString }, 
    tires_res   :  {type: GraphQLString }, 
    assessement :  {type: GraphQLString }, 
    rope_costs  :  {type: GraphQLString }, 
   
    // warrancy
    warrancy_id        : {type:  GraphQLString}, 
    bumper             : {type:  GraphQLBoolean}, 
    corrosion          : {type:  GraphQLBoolean}, 
    collision_damage   : {type:  GraphQLBoolean}, 
    exhaust_commitment : {type:  GraphQLString}, 

    // wheel_system
    wheel_system_id : {type:  GraphQLString },
    deck            : {type:  GraphQLBoolean }, 
    shock           : {type:  GraphQLBoolean }, 
    bearings        : {type:  GraphQLBoolean }, 
    spindelled      : {type:  GraphQLBoolean }, 
    front_link_arm  : {type:  GraphQLBoolean }, 
    back_link_arm   : {type:  GraphQLBoolean }, 
    feather         : {type:  GraphQLBoolean }, 
    spring_bracket  : {type:  GraphQLBoolean }, 
    wheel_system_other : {type:  GraphQLBoolean }
    }
});

const ContractType = new GraphQLObjectType({
  name: "Contract",
  type: "Query",
  fields: {
    // contract_ids
    contract_id: { type: GraphQLString },
    // balance_due
    creditors: { type: GraphQLString },
    balance_due: { type: GraphQLString },
    account_number: { type: GraphQLString },
    checked_date: { type: GraphQLString },
    informants: { type: GraphQLString },
    signature: { type: GraphQLString },
    // purchase_agreement
    agreement_number: { type: GraphQLString},
    seller_or_buyer: { type: GraphQLString },
    phone: { type: GraphQLString },
    purchase_date: { type: GraphQLString },
    // buyer
    buyer_date: { type: GraphQLString},
    buyer_city: { type: GraphQLString },
    buyer_representative: { type: GraphQLString },
    // purchase_property
    registration_property: { type: GraphQLString },
    chassis_numer: { type: GraphQLString },
    mileage: { type: GraphQLInt },
    valuation: { type: GraphQLInt },
    first_registration_date: { type: GraphQLString },
    manufactured_date: { type: GraphQLString },
    colour: { type: GraphQLString },
    valuation_date: { type: GraphQLString },
    deduction: { type: GraphQLString },
    approved_check: { type: GraphQLString },
    service_book: { type: GraphQLString },
    warranty: { type: GraphQLString },
    purchase_price_adjusted: { type: GraphQLInt },
    condition_and_notes: { type: GraphQLString },
    // seller_or_registred_ower
    date: { type: GraphQLString },
    city: { type: GraphQLString },
    representative: { type: GraphQLString },
    // regulation_purchase
    purchase_price : { type: GraphQLInt },
    vat : { type: GraphQLInt },
    resolves_the_redemption_of_my_residual_debt: { type: GraphQLString },
    other_deductions: { type: GraphQLString },
    other_payments: { type: GraphQLString },
    to_obtain: { type: GraphQLString },
    // seller
    name: { type: GraphQLString },
    address: { type: GraphQLString },
    seller_phone: { type: GraphQLString },
    driver_name: { type: GraphQLString },
    driver_phone: { type: GraphQLString },
    personal_number: { type: GraphQLString },
    driver_license_number: { type: GraphQLString },
    postal_code: { type: GraphQLString },
    email: { type: GraphQLString }
  }
});

const ContractIdsType = new GraphQLObjectType({
  name: "ContractIDs",
  type: "Query",
  fields: {
    contract_id: { type: GraphQLString }
  }
});

const BalanceDueType = new GraphQLObjectType({
  name: "BalanceDue",
  type: "Query",
  fields: {
    contract_id: { type: GraphQLString },
    creditors: { type: GraphQLString },
    balance_due: { type: GraphQLString },
    account_number: { type: GraphQLString },
    checked_date: { type: GraphQLString },
    informants: { type: GraphQLString },
    signature: { type: GraphQLString }
  }
});

const PurchaseAgreementType = new GraphQLObjectType({
  name: "PurchaseAgreement",
  type: "Query",
  fields: {
    contract_id: { type: GraphQLString },
    agreement_number: { type: GraphQLString},
    seller_or_buyer: { type: GraphQLString },
    phone: { type: GraphQLString },
    purchase_date: { type: GraphQLString }
  }
});

const UserType = new GraphQLObjectType({
  name: "User",
  type: "Query",
  fields: {
    id: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  }
});



exports.ContractIdsType = ContractIdsType;
exports.BalanceDueType = BalanceDueType;
exports.PurchaseAgreementType = PurchaseAgreementType;
exports.ContractType = ContractType;
exports.UserType = UserType;
exports.ValueDeclarationType = ValueDeclarationType;