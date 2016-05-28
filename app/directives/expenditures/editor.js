"use strict";

angular
  .module("HomeAccountingFront")
  .directive("haExpenditureEditor", directiveConstructor);

function directiveConstructor(Expenditure, $q, Tag) {
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
    vm.getTags = getTags;

    function save() {
      vm.expenditure.form.save().then(vm.onSave);
    }

    // Yes repeated code, im done for today..
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
