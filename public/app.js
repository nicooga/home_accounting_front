(function() {
  'use strict';

  var globals = typeof window === 'undefined' ? global : window;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = ({}).hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = null;
    hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = window;
var process;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("directives/expenditures/editor.js", function(exports, require, module) {
"use strict";

angular
  .module("HomeAccountingFront")
  .directive("haExpenditureEditor", directiveConstructor);

function directiveConstructor(Expenditure) {
  return {
    controller: controller,
    controllerAs: "haEE"
  };

  function controller() {
    var vm = this;

    initialize();

    vm.save = save;

    function initialize() {
      vm.expenditure = Expenditure.initialize();

      angular.extend(vm.expenditure.form.data.attributes, {
        desc: "Papa fritas",
        amount: 22
      });
    }

    function save() {
      vm.expenditure.form.save().then(initialize);
    }
  }
}

});

;require.register("directives/expenditures/list.js", function(exports, require, module) {
"use strict";

angular
  .module("HomeAccountingFront")
  .directive("haExpenditureList", directiveConstructor);

function directiveConstructor(Expenditure) {
  return {
    controller: controller,
    controllerAs: "haEL"
  };

  function controller($scope) {
    var vm = this;
    var request = Expenditure.all();

    request.promise.then(function() {
      vm.expenditures = request.data;
    });
  }
}

});

;require.register("factories/expenditure.js", function(exports, require, module) {
"use strict";

angular
  .module("HomeAccountingFront")
  .run(factoryConfig)
  .factory("Expenditure", factoryConstructor);

function factoryConfig($jsonapi) {
  var schema = {
    type: "expenditure",
    attributes: {
      desc: { presence: true },
      amount: { presence: true }
    }
  };

  var restSource =
    $jsonapi.sourceRest
    .create("Rest source", "http://localhost:4000/api/expenditures");
  var synchronizer = $jsonapi.synchronizerSimple.create([restSource]);

  $jsonapi.addResource(schema, synchronizer);
}

function factoryConstructor($jsonapi) {
  return $jsonapi.getResource("expenditure");
}

});

;require.register("index.jade", function(exports, require, module) {
var __templateData = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

var jade_indent = [];
buf.push("<!DOCTYPE html>\n<html ng-app=\"HomeAccountingFront\">\n  <head>\n    <title>Dead simple skeleton</title>\n    <meta charset=\"utf-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n    <link rel=\"stylesheet\" type=\"text/css\" href=\"/app.css\">\n    <script src=\"/vendor.js\"></script>\n    <script src=\"/app.js\"></script>\n    <script>require(\"initialize\")</script>\n  </head>\n  <body layout=\"column\">\n    <md-toolbar>\n      <div class=\"md-toolbar-tools\">\n        <h2 class=\"md-title\"><span>HomeAccounting</span></h2>\n      </div>\n    </md-toolbar>\n    <md-container flex layout=\"row\">\n      <md-card flex=\"25\">\n        <form ha-expenditure-editor ng-submit=\"haEE.save()\">\n          <md-input-container>\n            <label>Desc</label>\n            <input ng-model=\"haEE.expenditure.form.data.attributes.desc\">\n          </md-input-container>\n          <md-input-container>\n            <label>Amount</label>\n            <input ng-model=\"haEE.expenditure.form.data.attributes.amount\">\n          </md-input-container>\n          <button type=\"submit\" class=\"md-button md-primary md-raised\">Save</button>\n        </form>\n      </md-card>\n      <md-card flex>\n        <md-toolbar class=\"md-table-toolbar md-default\">\n          <div class=\"md-toolbar-tools\"><span>Expenditures</span></div>\n        </md-toolbar>\n        <md-table-container ha-expenditure-list>\n          <table md-table>\n            <thead md-head>\n              <tr md-row>\n                <th md-column>Desc</th>\n                <th md-column>Amount</th>\n              </tr>\n            </thead>\n            <tbody md-body>\n              <tr md-row md-select=\"expenditure\" ng-repeat=\"expenditure in haEL.expenditures track by expenditure.data.id\">\n                <td md-cell ng-bind=\"expenditure.data.attributes.desc\"></td>\n                <td md-cell><span ng-bind=\"expenditure.data.attributes.amount.currency\"></span> <span ng-bind=\"expenditure.data.attributes.amount.value\"></span></td>\n              </tr>\n            </tbody>\n          </table>\n        </md-table-container>\n      </md-card>\n    </md-container>\n    <md-toolbar>\n      <div class=\"md-toolbar-tools\">\n        <p>Brought to you by nicooga apps</p>\n      </div>\n    </md-toolbar>\n  </body>\n</html>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("initialize.js", function(exports, require, module) {
"use strict";

require("angular");
require("angular-material");
require("angular-material-data-table");

angular.module("HomeAccountingFront", [
  "ngMaterial",
  "md.data.table",
  "angular-jsonapi",
  "angular-jsonapi-rest"
]);

// Factories
require("factories/expenditure");

// Directives
require("directives/expenditures/list");
require("directives/expenditures/editor");

});

require.alias("brunch/node_modules/deppack/node_modules/node-browser-modules/node_modules/process/browser.js", "brunch/node_modules/deppack/node_modules/node-browser-modules/node_modules/process");
require.alias("brunch/node_modules/deppack/node_modules/node-browser-modules/node_modules/process/browser.js", "process");process = require('process');require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


//# sourceMappingURL=app.js.map