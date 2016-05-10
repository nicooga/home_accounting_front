"use strict";

angular
.module("HomeAccountingFront")
.config(($mdThemingProvider) => {
  var customPrimary = {
    "50": "#a8bac3",
    "100": "#99aeb8",
    "200": "#8aa2ae",
    "300": "#7a96a3",
    "400": "#6b8a99",
    "500": "607D8B",
    "600": "#566f7c",
    "700": "#4b626d",
    "800": "#41545e",
    "900": "#36474f",
    "A100": "#b7c6cd",
    "A200": "#c6d2d8",
    "A400": "#d5dee2",
    "A700": "#2c3940"
  };

  $mdThemingProvider.definePalette("customPrimary", customPrimary);

  var customAccent = {
    "50": "#b80000",
    "100": "#d10000",
    "200": "#eb0000",
    "300": "#ff0505",
    "400": "#ff1f1f",
    "500": "#ff3838",
    "600": "#ff6b6b",
    "700": "#ff8585",
    "800": "#ff9e9e",
    "900": "#ffb8b8",
    "A100": "#ff6b6b",
    "A200": "#FF5252",
    "A400": "#ff3838",
    "A700": "#ffd1d1"
  };

  $mdThemingProvider.definePalette("customAccent", customAccent);

  var customWarn = {
    "50": "#ffe186",
    "100": "#ffda6d",
    "200": "#ffd453",
    "300": "#ffce3a",
    "400": "#ffc720",
    "500": "#FFC107",
    "600": "#ecb100",
    "700": "#d39e00",
    "800": "#b98b00",
    "900": "#a07800",
    "A100": "#ffe7a0",
    "A200": "#ffeeb9",
    "A400": "#fff4d3",
    "A700": "#866500"
  };

  $mdThemingProvider.definePalette("customWarn", customWarn);

  var customBackground = {
    "50": "#ffffff",
    "100": "#ffffff",
    "200": "#ffffff",
    "300": "#ffffff",
    "400": "#ffffff",
    "500": "#fff",
    "600": "#f2f2f2",
    "700": "#e6e6e6",
    "800": "#d9d9d9",
    "900": "#cccccc",
    "A100": "#ffffff",
    "A200": "#ffffff",
    "A400": "#ffffff",
    "A700": "#bfbfbf"
  };

  $mdThemingProvider.definePalette("customBackground", customBackground);

  $mdThemingProvider
    .theme("default")
    .primaryPalette("customPrimary")
    .accentPalette("customAccent")
    .warnPalette("customWarn")
    .backgroundPalette("customBackground")
});
