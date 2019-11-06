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
})({"epB2":[function(require,module,exports) {
var indexLi; // 控制修改时的完成按钮

var $add = $('.add');
var $alertName = $('.alertName');
var $alertUrl = $('.alertUrl');
var $done = $('.done');
var $cancle = $('.cancle');
var $alert = $('.alert');
var $liList = $('.liList');
var $list = $('.list');
var hashObj = JSON.parse(localStorage.getItem('hashMap'));
var hashMap = hashObj || [{
  // 用来存用户用户所收藏的网站
  name: 'Vue 官网',
  url: 'http://doc.vue-js.com/'
}];

function isPC() {
  var userAgentInfo = navigator.userAgent;
  var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
  var flag = true;

  for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }

  return flag;
} // 控制弹框出现函数


function alertFrame(title, name, url) {
  $('.alertTitle').text(title);
  $('.alertWrapper').css('display', 'block');
  $alert.css('display', 'block');
  $alertName.val(name || '');
  $alertUrl.val(url || ''); // $liList.css('pointer-events', 'none')
} // 控制弹框隐藏函数


function hideFrame() {
  $('.alertWrapper').css('display', 'none');
  $('.alert').css('display', 'none'); // $liList.css('pointer-events', 'auto')
}

function simplifyUrl(url) {
  return url.replace('http://', '').replace('https://', '').replace('www.', '').replace(/\/.*/, '');
} // 增加网站, index控制hashMap列表渲染的起始位置


function render() {
  var _loop = function _loop(i) {
    var name = hashMap[i].name;
    var url = simplifyUrl(hashMap[i].url);
    var $li = $("\n            <li class=\"liList\">\n                  <div>\n                      <div class=\"name\">\n                          <p>".concat(url[0].toUpperCase(), "</p>\n                      </div>\n                      <p class=\"desc\">").concat(name, "</p>\n                      <p class=\"icon-menu\" title=\"\u4FEE\u6539\u7F51\u7AD9\">\n                          <svg class=\"icon\">\n                              <use xlink:href=\"#icon-menu\"></use>\n                          </svg>\n                      </p>\n                  </div>\n             </li>\n        ")).insertBefore($add); // 点击菜单

    $li.on('click', '.icon-menu', function (e) {
      e.stopPropagation();
      var indexArr = Array.from(ul.children);
      indexLi = indexArr.indexOf($li[0]);
      alertFrame('修改网站信息', name, url);
    }); // PC端鼠标经过,几秒后出现菜单

    $li.hover(function () {
      $(this).find('.icon-menu').addClass('appear');
    }, function () {
      $(this).find('.icon-menu').removeClass('appear');
    });
    $li.on('click', function () {
      window.open(hashMap[i].url);
    });
  };

  for (var i = 0; i < hashMap.length; i++) {
    _loop(i);
  }
} // JS逻辑开始


render(); // 点击添加

$add.click(function () {
  alertFrame('增加网站');
}); // 点击完成

$done.click(function (e) {
  var name = $alertName.val();
  var url = $alertUrl.val();
  var parent = $(e.target.parentNode.parentNode);
  var title = parent.find('.alertTitle').text();

  if (title === '修改网站信息') {
    hashMap.forEach(function (item, index) {
      if (item.name === name && item.url === url) {
        hideFrame();
      } else if (index === indexLi) {
        item.name = name;
        item.url = url;
        $list.find('li:not(.add)').remove();
        render();
        hideFrame();
      }
    });
  } else {
    if (name && url) {
      var liObj = {
        name: name,
        url: url
      };
      hashMap.push(liObj);
      $list.find('li:not(.add)').remove();
      render();
    }

    hideFrame();
  }
}); // 点击删除

$alert.on('click', '.delete', function (e) {
  var value = $(e.target.parentNode.parentNode).find('.alertName').val();
  var index = hashMap.findIndex(function (item) {
    return item.name === value;
  });

  if (index !== -1) {
    hashMap.splice(index, 1);
    $list.find('li:not(.add)').remove();
    render();
  }

  hideFrame();
}); // 点击取消

$cancle.click(function () {
  hideFrame();
}); // 键盘事件
// $(document).keydown((e) =>{
//     if(isPC()){
//         let obj =hashMap.find((item) => {
//             return simplifyUrl(item.url)[0].toLowerCase() === e.key
//         })
//         if(obj){
//             window.open(obj.url)
//         }
//     }
// })

window.onbeforeunload = function () {
  // console.log(22222)
  var hashString = JSON.stringify(hashMap); // Object(Array) --> string

  localStorage.setItem('hashMap', hashString);
}; // console.log(JSON.stringify(hashMap))
// 解决safari上,onbeforeunload失效


window.addEventListener("pagehide", function (event) {
  if (event.persisted) {
    var hashString = JSON.stringify(hashMap); // Object(Array) --> string

    localStorage.setItem('hashMap', hashString);
  }
}, false);
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.6797da0a.js.map