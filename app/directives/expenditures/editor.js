"use strict";

angular
  .module("HomeAccountingFront")
  .directive("haExpenditureEditor", directiveConstructor);

function directiveConstructor(Expenditure) {
  return {
    controller: controller,
    controllerAs: "haEE"
  };

  function controller() {
    var vm = this;

    initialize();

    vm.save = save;

    function initialize() {
      vm.expenditure = Expenditure.initialize();

      angular.extend(vm.expenditure.form.data.attributes, {
        desc: "Papa fritas",
        amount: 22
      });
    }

    function save() {
      vm.expenditure.form.save().then(initialize);
    }
  }
}
