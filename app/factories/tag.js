"use strict";

angular
.module("HomeAccountingFront")
.run(factoryConfig)
.factory("Tag", factoryConstructor);

function factoryConfig($jsonapi, ENV) {
  var
    schema = {
      type: "tag",
      attributes: {
        name: { presence: true },
      }
    },
    url = ENV.API_URL + "/tags",
    restSource = $jsonapi.sourceRest.create("Rest source", url),
    synchronizer = $jsonapi.synchronizerSimple.create([restSource]);

  $jsonapi.addResource(schema, synchronizer);
}

function factoryConstructor($jsonapi) {
  return $jsonapi.getResource("tag");
}
