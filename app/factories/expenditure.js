"use strict";

angular
  .module("HomeAccountingFront")
  .run(factoryConfig)
  .factory("Expenditure", factoryConstructor);

function factoryConfig($jsonapi) {
  var schema = {
    type: "expenditure",
    attributes: {
      desc: { presence: true },
      amount: { presence: true },
      "expent-at": { presence: true }
    }
  };

  var restSource =
    $jsonapi.sourceRest
    .create("Rest source", "http://localhost:4000/api/expenditures");
  var synchronizer = $jsonapi.synchronizerSimple.create([restSource]);

  $jsonapi.addResource(schema, synchronizer);
}

function factoryConstructor($jsonapi) {
  return $jsonapi.getResource("expenditure");
}
