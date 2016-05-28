"use strict";

angular
.module("HomeAccountingFront")
.directive("utcParser", directiveConstructor);

function directiveConstructor() {
  return {
    require: "ngModel",
    restrict: "A",
    link: link
  };

  function link(_, __, ___, ngModel) {
    //ngModel.$parsers.unshift((val) => moment.utc(val).format());
    ngModel.$formatters.unshift((val) => val && moment(val).toDate());
  }
}
