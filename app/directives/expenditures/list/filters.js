"use strict";

angular
.module("HomeAccountingFront")
.directive("haExpenditureListFilters", directiveConstructor);

function directiveConstructor(Tag, $q) {
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
    vm.getTags = getTags;

    function submit() {
      const tagIds = vm.form.$tags &&
        vm.form.$tags.map((t) => t.data.id);

      const filters =
        angular.extend({}, {"tag-ids": tagIds}, vm.form);
      delete filters.$tags;

      vm.onSubmit({$filters: filters})
    };

    function reset() {
      initializeForm();
      vm.onSubmit();
    };

    function initializeForm() {
      vm.form = {
        "expent-at-lteq": new Date(),
        $tags: []
      };
    }

    function getTags(text) {
      const regexp = new RegExp(text, "i");

      return $q((resolve, reject) => {
        const request = Tag.all();

        request.promise.then(()=> {
          const result =
            request.data.filter(
              (t) => t.data.attributes.name.match(regexp));

          resolve(result);
        });
      });
    }
  }
}
