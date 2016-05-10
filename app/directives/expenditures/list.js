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
    request.promise.then(() => {
      vm.expenditures = request.data;
    });

    vm.selected = [];
    vm.destroySelected = destroySelected;

    function destroySelected() {
      vm.selected.forEach((e) => {
        e.remove().then(() => {
          const i = vm.selected.indexOf(e);
          if (i !== -1) vm.selected.splice(i, 1);
        });
      });
    }
  }
}
