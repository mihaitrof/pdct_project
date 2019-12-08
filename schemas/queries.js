const { db } = require("../pgAdaptor");
const { GraphQLObjectType, GraphQLID, GraphQLList } = require("graphql");
const { ContractType, ContractIdsType, BalanceDueType, PurchaseAgreementType } = require("./types");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  type: "Query",
  fields: {
    getContractss: {
      type: GraphQLList(ContractType),
      resolve(parentValue, args) {
        const query = `SELECT 
                          b.*, pa.* 
                       FROM 
                          contract_ids c 
                       JOIN 
                          balance_due b 
                          ON
                              c.contract_id = b.contract_id
                       JOIN
                          purchase_agreement pa
                          ON
                              c.contract_id = pa.contract_id;`;

        return db
          .any(query)
          .then(res => res)
          .catch(err => err);
      }
    },
    getContractId: {
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
    getContracts: {
      type: GraphQLList(ContractIdsType),
      args: {},
      resolve(parentValue, args) {
        const query = `SELECT * FROM contract_ids`;
        const values = [];

        return db
          .any(query, values)
          .then(contract_id => contract_id)
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
    },
    getBalanceDueList: {
      type: GraphQLList(BalanceDueType),
      args: {},
      resolve(parentValue, args) {
        const query = `SELECT * FROM balance_due`;

        return db
          .any(query)
          .then(res => res)
          .catch(err => err);
      }
    },
    seller_or_buyer: {
      type: PurchaseAgreementType,
      args: { contract_id: { type: GraphQLID } },
      resolve(parentValue, args) {
        const query = `SELECT * FROM purchase_agreement WHERE contract_id=$1`;
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