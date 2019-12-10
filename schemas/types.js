const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt } = graphql;

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
    purchase_price_adjustedvat: { type: GraphQLString },
    resolved_the_redemption_of_my_residual_debt: { type: GraphQLString },
    other_deductions: { type: GraphQLString },
    other_payments: { type: GraphQLString },
    to_obtain: { type: GraphQLString },
    // seller
    name: { type: GraphQLString },
    address: { type: GraphQLString },
    phone_driver_name: { type: GraphQLString },
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

exports.ContractIdsType = ContractIdsType;
exports.BalanceDueType = BalanceDueType;
exports.PurchaseAgreementType = PurchaseAgreementType;
exports.ContractType = ContractType;