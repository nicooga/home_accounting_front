"use strict";

angular
  .module("HomeAccountingFront")
  .directive("haExpenditureEditor", directiveConstructor);

function directiveConstructor(Expenditure) {
  return {
    templateUrl: "/templates/expenditures/editor.html",
    controller: controller,
    controllerAs: "haEE",
    scope: {
      expenditure: "=",
      onSave: "&?"
    },
    bindToController: true
  };

  function controller() {
    var vm = this;

    vm.save = save;
    vm.expenditure =
      vm.expenditure || Expenditure.initialize();

    function save() {
      vm.expenditure.form.save().then(vm.onSave);
    }
  }
}
