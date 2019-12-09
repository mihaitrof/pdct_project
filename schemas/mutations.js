const graphql = require("graphql");
const db = require("../pgAdaptor").db;
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean } = graphql;
const { ContractType, BalanceDueType, ContractIdsType, PurchaseAgreementType } = require("./types");

const RootMutation = new GraphQLObjectType({
  name: "RootMutationType",
  type: "Mutation",
  fields: {
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
        registration_propert: { type: GraphQLString }, //$11
        chassis_numer: { type: GraphQLString }, //$12
        mileage: { type: GraphQLString }, //$13
        valuation: { type: GraphQLString }, //$14
        first_registration_date: { type: GraphQLString }, //$15
        manufactured_date: { type: GraphQLString }, //$16
        colour: { type: GraphQLString }, //$17
        valuation_date: { type: GraphQLString }, //$18
        deduction: { type: GraphQLString }, //$19
        approved_check: { type: GraphQLString }, //$20
        service_book: { type: GraphQLString }, //$21
        warranty: { type: GraphQLString }, //$22
        purchase_price_adjusted: { type: GraphQLString }, //$23
        condition_and_notes: { type: GraphQLString } //$24
        },
        resolve(parentValue, args) {
        const query = `INSERT INTO contract_ids(contract_id) VALUES ($1);
                       INSERT INTO balance_due(contract_id, creditors, balance_due, account_number, checked_date, informants, signature) VALUES ($1, $2, $3, $4, $5, $6, $7);
                       INSERT INTO buyer(contract_id, date, city, representative) VALUES ($1, $8, $9, $10);
                       INSERT INTO purchase_property(contract_id, chassis_numer)`;
        const values = [
          args.contract_id,
          args.creditors,
          args.balance_due,
          args.account_number,
          args.checked_date,
          args.informants,
          args.signature,
          args.buyer_date,
          args.buyer_city,
          args.buyer_representative
        ];

        return db
          .multi(query, values)
          .then(res => res)
          .catch(err => err);
      }
    },
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