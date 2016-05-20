(function() {
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
      this.form = {
        "date-lteq": new Date(),
        "tag-names": []
      };
    }
  }
})();
