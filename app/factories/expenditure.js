"use strict";

angular
  .module("HomeAccountingFront")
  .run(factoryConfig)
  .factory("Expenditure", factoryConstructor);

function factoryConfig($jsonapi) {
  var schema = {
    type: "expenditure",
    attributes: {
      desc: [],
      amount: [],
      "expent-at": []
    }
  };

  var restSource =
    $jsonapi.sourceRest
    .create("Rest source", "http://localhost:4000/api/expenditures");
  var synchronizer = $jsonapi.synchronizerSimple.create([restSource]);

  $jsonapi.addResource(schema, synchronizer);
}

function factoryConstructor($jsonapi) {
  var resource = $jsonapi.getResource("expenditure");

  resource.initialize = function() {
    var res = this.__proto__.initialize.apply(this);
    res.form.data.attributes["expent-at"] = new Date();
    return res;
  }

  return resource;
}
