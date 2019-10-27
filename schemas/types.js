const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString } = graphql;

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

exports.ContractIdsType = ContractIdsType;
exports.BalanceDueType = BalanceDueType;