const { db } = require("../pgAdaptor");
const { GraphQLObjectType, GraphQLID } = require("graphql");
const { ContractIdsType, BalanceDueType } = require("./types");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  type: "Query",
  fields: {
    contract_id: {
      type: ContractIdsType,
      args: { contract_id: { type: GraphQLID } },
      resolve(parentValue, args) {
        const query = `SELECT * FROM contract_ids WHERE contract_id=$1`;
        const values = [args.contract_id];

        return db
          .one(query, values)
          .then(res => res)
          .catch(err => err);
      }
    },
    balance_due: {
      type: BalanceDueType,
      args: { contract_id: { type: GraphQLID } },
      resolve(parentValue, args) {
        const query = `SELECT * FROM balance_due WHERE contract_id=$1`;
        const values = [args.contract_id];

        return db
          .one(query, values)
          .then(res => res)
          .catch(err => err);
      }
    }
  }
});

exports.query = RootQuery;