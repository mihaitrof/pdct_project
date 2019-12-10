const { db } = require("../pgAdaptor");
const { GraphQLObjectType, GraphQLID, GraphQLList, GraphQLInt } = require("graphql");
const { ContractType, ContractIdsType, BalanceDueType, PurchaseAgreementType } = require("./types");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  type: "Query",
  fields: {
    getContractss: {
      type: GraphQLList(ContractType),
      resolve(parentValue, args) {
        const query = `SELECT 
                          b.*, pp.*, sro.*, pa.*, bu.date AS buyer_date, bu.city AS buyer_city, bu.representative AS buyer_representative, rp.*, s.*
                       FROM 
                          contract_ids c 
                       JOIN 
                          balance_due b 
                        ON
                          c.contract_id = b.contract_id
                       JOIN
                          purchase_property pp
                        ON
                          c.contract_id = pp.contract_id
                       JOIN
                          seller_or_registred_owner sro
                        ON
                          c.contract_id = sro.contract_id
                       JOIN
                          purchase_agreement pa
                        ON
                          c.contract_id = pa.contract_id
                       JOIN
                          buyer bu
                        ON
                          c.contract_id = bu.contract_id
                       JOIN
                          regulation_purchase rp
                        ON
                          c.contract_id = rp.contract_id
                       JOIN
                          seller s
                        ON
                          c.contract_id = s.contract_id
                          ;`;

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