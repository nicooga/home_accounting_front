"use strict";

angular
  .module("HomeAccountingFront")
  .directive("haExpenditureEditor", directiveConstructor);

function directiveConstructor(Expenditure) {
  return {
    controller: controller,
    controllerAs: "haEE",
    templateUrl: "/templates/expenditures/editor.html",
    bindToController: { expenditure: "=" }
  };

  function controller($scope) {
    var vm = this;

    vm.save = save;
    vm.reset = reset;
    vm.setExpenditure = setExpenditure;

    $scope.$watch("expenditure", () => {
      !$scope.expenditure && reset();
    });

    function setExpenditure(e) { vm.expenditure = e; }
    function reset() { vm.expenditure = Expenditure.initialize(); }
    function save() { vm.expenditure.form.save().then(reset); }
  }
}
