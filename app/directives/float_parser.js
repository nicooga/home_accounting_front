"use strict";

angular
.module("HomeAccountingFront")
.directive("floatParser", directiveConstructor);

function directiveConstructor() {
  return {
    require: "ngModel",
    restrict: "A",
    link: link
  };

  function link(_, __, ___, ngModel) {
    ngModel.$parsers.push((v) => v && v.toString());
    ngModel.$formatters.push((v) => v && parseFloat(v));
  }
}
