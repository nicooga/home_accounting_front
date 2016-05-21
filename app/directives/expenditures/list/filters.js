"use strict";

angular
.module("HomeAccountingFront")
.directive("haExpenditureListFilters", directiveConstructor);

function directiveConstructor() {
  return {
    controller: controller,
    controllerAs: "haELF",
    scope: { onSubmit: "&" },
    bindToController: true,
    templateUrl: "/templates/expenditures/list/filters.html"
  };

  function controller() {
    const vm = this;

    initializeForm();

    vm.submit = submit;
    vm.reset = reset;

    function submit() { vm.onSubmit({$filters: vm.form}) };

    function reset() {
      initializeForm();
      vm.onSubmit();
    };

    function initializeForm() {
      vm.form = {
        "date-lteq": new Date(),
        "tag-names": []
      };
    }
  }
}
