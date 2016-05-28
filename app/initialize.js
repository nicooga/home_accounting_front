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

// Config
require("config/env")
require("config/material_theme")

// Factories
require("factories/expenditure");
require("factories/tag");

// Directives
require("directives/utc_parser")
require("directives/float_parser")

require("directives/expenditures/manager");
require("directives/expenditures/list");
require("directives/expenditures/list/filters");
require("directives/expenditures/editor");
