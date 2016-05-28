"use strict";

angular
.module("HomeAccountingFront")
.value("ENV", {
  API_HOST: $PROCESS_ENV_API_URL || "http://localhost:4000/api"
});
