const graphql = require("graphql");
const db = require("../pgAdaptor").db;
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean } = graphql;
const { BalanceDueType, ContractIdsType, PurchaseAgreementType } = require("./types");

const RootMutation = new GraphQLObjectType({
  name: "RootMutationType",
  type: "Mutation",
  fields: {
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
  }
});

exports.mutation = RootMutation;