"use strict";

angular
.module("HomeAccountingFront")
.run(factoryConfig)
.factory("Tag", factoryConstructor);

function factoryConfig($jsonapi) {
  var schema = {
    type: "tag",
    attributes: {
      name: { presence: true },
    }
  };

  var restSource =
    $jsonapi.sourceRest
    .create("Rest source", "http://localhost:4000/api/tags");
  var synchronizer = $jsonapi.synchronizerSimple.create([restSource]);

  $jsonapi.addResource(schema, synchronizer);
}

function factoryConstructor($jsonapi) {
  window.Tag = $jsonapi.getResource("tag");
  return $jsonapi.getResource("tag");
}
