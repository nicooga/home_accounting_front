"use strict";

angular
.module("HomeAccountingFront")
.run(factoryConfig)
.factory("Expenditure", factoryConstructor);

function factoryConfig($jsonapi, ENV) {
  var
    schema = {
      type: "expenditure",
      attributes: {
        desc: { presence: true },
        amount: {
          presence: true,
          numericality: { greaterThan: 0 }
        },
        "expent-at": { presence: true },
        "tag-names": {}
      }
    },
    url = ENV.API_HOST + "/expenditures",
    restSource = $jsonapi.sourceRest.create("Rest source", url),
    synchronizer = $jsonapi.synchronizerSimple.create([restSource]);

  $jsonapi.addResource(schema, synchronizer);
}

function factoryConstructor($jsonapi) {
  var resource = $jsonapi.getResource("expenditure");

  resource.initialize = function() {
    return ((instance) => {
      angular.extend(instance.form.data.attributes, {
        desc: "PRUEBA",
        amount: 666,
        "expent-at": new Date(),
        "tag-names": ["PRUEBA"]
      });

      return instance;
    })(this.__proto__.initialize.apply(this))
  }

  return resource;
}
