const graphql = require("graphql");
const db = require("../pgAdaptor").db;
const { GraphQLInt, GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean } = graphql;
const { UserType, ContractType, BalanceDueType, ContractIdsType, PurchaseAgreementType } = require("./types");

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
          args.to_obtain,
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
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        const query = `INSERT INTO users(name, email, password) VALUES ($1, $2, $3) RETURNING *`;
        const values = [
          args.name,
          args.email,
          args.password
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