"use strict";

require("angular");
require("angular-material");
require("angular-material-data-table");
require("angular-aria");

angular.module("HomeAccountingFront", [
  "ngAria",
  "ngMaterial",
  "md.data.table",
  "angular-jsonapi",
  "angular-jsonapi-rest",
]);

// Factories
require("factories/expenditure");

// Directives
require("directives/expenditures/manager");
require("directives/expenditures/list");
require("directives/expenditures/editor");
