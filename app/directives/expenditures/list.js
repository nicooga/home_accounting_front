"use strict";

angular
  .module("HomeAccountingFront")
  .directive("haExpenditureList", directiveConstructor);

function directiveConstructor(Expenditure) {
  return {
    controller: controller,
    controllerAs: "haEL"
  };

  function controller($scope) {
    var vm = this;
    var request = Expenditure.all();

    request.promise.then(function() {
      vm.expenditures = request.data;
    });
  }
}
