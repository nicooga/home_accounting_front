"use strict";

angular
  .module("HomeAccountingFront")
  .directive("haExpenditureManager", directiveConstructor);

function directiveConstructor(Expenditure) {
  return {
    //controller: controller,
    //controllerAs: "haEM",
    templateUrl: "/templates/expenditures/manager.html",
  };

  //function controller() { }
}
