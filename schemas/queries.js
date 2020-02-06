const { db } = require("../pgAdaptor");
const { GraphQLObjectType, GraphQLID, GraphQLList, GraphQLInt } = require("graphql");
const { ContractType, ContractIdsType, BalanceDueType, DeclarationIdType, UserType, PurchaseAgreementType, ValueDeclarationType } = require("./types");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  type: "Query",
  fields: {
    getVd:{
      type: ValueDeclarationType,
      args: { contract_id: { type: GraphQLID } },
      resolve(parentValue, args) {
        const query = `SELECT 
                          a.*, b.*, c.*, d.*, e.*, f.*, g.*, h.*, i.*, 
                          k.fuel AS drive_fuel, 
                          k.exhaust, 
                          k.transmission, 
                          k.universal_joint, 
                          k.power_supply, 
                          k.battery AS drive_battery, 
                          l.*, m.*, n.*, o.*, p.*, r.*, s.*, t.*, u.*, 
                          v.coupling AS coupling,
                          v.gearbox AS car_condition_gearbox,
                          v.end_gear AS end_gear,
                          v.heating AS heating,
                          v.battery AS battery,
                          v.starter AS starter,
                          v.generator AS generator,
                          v.engine AS engine,
                          v.ignition AS ignition,
                          v.compression AS compression,
                          v.noise AS noise,
                          v.fuel AS car_condition_fuel,
                          v.cooling AS cooling,
                          v.air_conditioning AS air_conditioning,
                          v.varnish AS varnish,
                          v.other AS other,
                          v.total_repair_cost AS total_repair_cost,
                          x.*, y.*
                       FROM 
                          contract_ids a
                       JOIN 
                          declaration b
                        ON
                          a.contract_id = b.contract_id
                       JOIN
                          engine_output c
                        ON
                          b.declaration_id = c.engine_output_id
                       JOIN
                          mrf d
                        ON
                          b.declaration_id = d.mrf_id
                       JOIN
                          other_warranty e
                        ON
                          b.declaration_id = e.other_warranty_id
                       JOIN
                          car_parts f
                        ON
                          b.declaration_id = f.car_parts_id
                       JOIN
                          general_info g
                        ON
                          b.declaration_id = g.declaration_id
                       JOIN
                          warrancy h
                        ON
                          b.declaration_id = h.warrancy_id
                       JOIN
                          body i
                        ON
                          b.declaration_id = i.body_id
                        JOIN
                          drive k
                        ON
                          b.declaration_id = k.drive_id
                        JOIN
                          braking_system l
                        ON
                          b.declaration_id = l.braking_system_id
                        JOIN
                          control_system m
                        ON
                          b.declaration_id = m.control_system_id
                        JOIN
                          karosseri n
                        ON
                          b.declaration_id = n.karosseri_id
                        JOIN
                          communication o
                        ON
                          b.declaration_id = o.communication_id
                        JOIN
                          orchestration p
                        ON
                          b.declaration_id = p.orchestration_id
                        JOIN
                          facilities r
                        ON
                          b.declaration_id = r.facilities_id
                        JOIN
                          latest_inspection s
                        ON
                          b.declaration_id = s.latest_inspection_id
                        JOIN
                          tires t
                        ON
                          b.declaration_id = t.tires_id
                        JOIN
                          timing_belt u
                        ON
                          b.declaration_id = u.timing_belt_id
                        JOIN
                          car_condition v
                        ON
                          b.declaration_id = v.car_condition_id
                        JOIN
                          environment x
                        ON
                          b.declaration_id = x.environment_id
                        JOIN
                          wheel_system y
                        ON
                          b.declaration_id = y.wheel_system_id

                       WHERE
                          a.contract_id = $1;`;
          const values = [args.contract_id];
        return db
          .one(query, values)
          .then(res => res)
          .catch(err => err);
      }
    },
    getContract: {
      type: ContractType,
      args: { contract_id: { type: GraphQLID } },
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
                       WHERE
                          c.contract_id = $1;`;
          const values = [args.contract_id];
        return db
          .one(query, values)
          .then(res => res)
          .catch(err => err);
      }
    },

    getDeclarationID: {
      type: DeclarationIdType,
      args: { contract_id: { type: GraphQLID } },
      resolve(parentValue, args) {
        const query = `SELECT * FROM declaration WHERE contract_id=$1`;
        const values = [args.contract_id];

        return db
          .one(query, values)
          .then(res => res)
          .catch(err => err);
      }
    },

    getContractInfo: {
      type: GraphQLList(PurchaseAgreementType),
      // args: { contract_id: { type: GraphQLID } },
      resolve(parentValue, args) {
        const query = `SELECT * FROM purchase_agreement`;
        // const values = [args.contract_id];

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

    getUser: {
      type: UserType,
      args: { email: { type: GraphQLID } },
      resolve(parentValue, args) {
        const query = `SELECT * FROM users WHERE email=$1`;
        const values = [args.email];

        return db
          .one(query, values)
          .then(res => res)
          .catch(err => err);
      }
    },

    getContractIds: {
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
    },

  }
});

exports.query = RootQuery;