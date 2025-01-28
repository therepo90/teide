// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"KTHS":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.config = void 0;
// pro cfg

const env = {
  DEV: {
    API: 'http://localhost:7801'
  },
  PROD: {
    API: 'https://api.teidepermit.eu'
  }
};
let cfg;
if ("production" === 'development') {
  cfg = env.DEV;
} else if ("production" === 'production') {
  cfg = env.PROD;
} else {
  cfg = env.DEV;
}
const config = exports.config = cfg;
console.log('env', {
  env: "production",
  config
});
},{}],"YaSC":[function(require,module,exports) {
"use strict";

var _cfg = require("./cfg");
// JavaScript do zwiększania licznika zadowolonych klientów, gdy element jest widoczny

let satisfiedCustomers = 0;
const targetSatisfiedCustomers = 450;
function updateSatisfiedCounter() {
  document.getElementById('satisfiedCounter').innerText = satisfiedCustomers;
  satisfiedCustomers += 1;
  if (satisfiedCustomers <= targetSatisfiedCustomers) {
    requestAnimationFrame(updateSatisfiedCounter);
  } else {
    document.getElementById('satisfiedCounter').innerText = targetSatisfiedCustomers + "+";
  }
}

// Intersection Observer do uruchamiania licznika, gdy pojemnik staje się widoczny
const satisfiedContainer = document.getElementById('satisfiedContainer');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log('in viewport');
      updateSatisfiedCounter();
      satisfiedContainer.style.opacity = 1; // Spraw, aby pojemnik był widoczny
      observer.unobserve(entry.target); // Przestań obserwować, gdy licznik zacznie się
    }
  });
}, {
  threshold: 0.5
}); // Dostosuj próg według potrzeb

// Rozpocznij obserwowanie pojemnika
observer.observe(satisfiedContainer);

// on content laoded

function openTripModal(trip, lang) {
  //console.log({a:this, arguments})
  console.log('opening modal');
  if (trip === 'teide' && lang === 'en') {
    document.getElementById('modal_teide_en').getElementsByClassName('modal-checkbox')[0].checked = true;
  }
  if (trip === 'teide' && lang === 'pl') {
    document.getElementById('modal_teide_pl').getElementsByClassName('modal-checkbox')[0].checked = true;
  }
}
console.log({
  config: _cfg.config
});
function initModalStuff(btnId, modalId, target, lang) {
  // Initialize Flatpickr for date fields
  document.getElementById(btnId).addEventListener('click', e => {
    e.preventDefault();
    openTripModal(target, lang);
  });
  const modal = document.getElementById(modalId);
  const startDate = modal.querySelector(`input[name="startDate"]`);
  const endDate = modal.querySelector(`input[name="endDate"]`);
  console.log({
    modalId,
    startDate,
    endDate
  });
  flatpickr(startDate, {
    dateFormat: "Y-m-d"
  });
  flatpickr(endDate, {
    dateFormat: "Y-m-d"
  });

  // Handle form submission
  console.log({
    modal
  });
  modal.getElementsByClassName('modal-payment-btn')[0].addEventListener('click', async e => {
    e.preventDefault(); // Prevent default form submission
    const form = modal.getElementsByClassName('modalForm')[0];
    const formData = new FormData(form);
    // check if form is valid
    if (!form.checkValidity()) {
      alert('Please fill out all fields');
      return;
    }

    // Convert FormData to an object
    const data = Object.fromEntries(formData.entries());
    //data.startDate = new Date(data.startDate);
    //data.endDate = new Date(data.endDate);
    const apiBase = _cfg.config.API;
    try {
      let targetUrl = `${apiBase}/api/teide-add`;
      switch (target) {
        case 'teide':
          targetUrl = lang === 'pl' ? `${apiBase}/api/teide-add` : `${apiBase}/api/teide-eng-add`;
          break;
        default:
          throw new Error('Invalid target');
      }
      const response = await fetch(targetUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        const resJson = await response.json();
        window.location.href = resJson.url;
        //e.target.reset(); // Reset form after successful submission
      } else {
        // get error message
        const errorRes = await response.json();
        alert('Failed to submit the form: error: ' + errorRes.error);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the form.');
    }
  });
}
window.initModalStuff = initModalStuff;
},{"./cfg":"KTHS"}]},{},["YaSC"], null)