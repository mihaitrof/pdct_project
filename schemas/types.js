const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString } = graphql;

const ContractType = new GraphQLObjectType({
  name: "Contract",
  type: "Query",
  fields: {
    contract_id: { type: GraphQLString },
    creditors: { type: GraphQLString },
    balance_due: { type: GraphQLString },
    account_number: { type: GraphQLString },
    checked_date: { type: GraphQLString },
    informants: { type: GraphQLString },
    signature: { type: GraphQLString },
    agreement_number: { type: GraphQLString},
    seller_or_buyer: { type: GraphQLString },
    phone: { type: GraphQLString },
    purchase_date: { type: GraphQLString }
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