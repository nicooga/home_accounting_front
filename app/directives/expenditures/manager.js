"use strict";

angular
  .module("HomeAccountingFront")
  .directive("haExpenditureManager", directiveConstructor);

function directiveConstructor(Expenditure, $mdDialog, $mdToast) {
  return {
    controller: controller,
    controllerAs: "haEM",
    templateUrl: "/templates/expenditures/manager.html",
    replace: true
  };

  function controller() {
    this.openEditModal = openEditModal;

    function openEditModal(expenditure) {
      this.currentDialog = $mdDialog.show({
        template: `
          <ha-expenditure-editor
            expenditure="ctrl.expenditure"
            on-save="ctrl.onSave()"
          ></ha-expenditure-editor>
        `,
        controller: ()=>{},
        controllerAs: "ctrl",
        locals: {
          expenditure: expenditure,
          onSave: onSave
        },
        bindToController: true
      })

      function onSave() {
        $mdToast.showSimple("SUCCESS");
        $mdDialog.hide(this.currentDialog);
      }
    }
  }
}
