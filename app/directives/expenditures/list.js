"use strict";

angular
  .module("HomeAccountingFront")
  .directive("haExpenditureList", directiveConstructor);

function directiveConstructor(Expenditure) {
  return {
    controller: controller,
    controllerAs: "haEL",
    //templateUrl: "/templates/expenditures/list.html",
    //replace: true,
    bindToController: { onSelect: "&?" }
  };

  function controller($scope) {
    var vm = this;

    vm.selected = [];
    vm.destroySelected = destroySelected;
    vm.setFilters = setFilters;

    query();

    function destroySelected() {
      vm.selected.forEach((e) => {
        e.remove().then(() => {
          const i = vm.selected.indexOf(e);
          if (i !== -1) vm.selected.splice(i, 1);
        });
      });
    }

    function setFilters(filters) {
      this.filters = filters;
      query(filters);
    }

    function query(filters) {
      var request = Expenditure.all(filters);

      request.promise.then(() => {
        vm.expenditures = request.data;
      });
    }
  }
}
