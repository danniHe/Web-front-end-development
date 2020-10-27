// 计算斐波那契的第n位
function fb(n) {
  if (n <= 0) {
    return 0;
  }
  if (n === 1 || n === 2) {
    return 1;
  } else {
    return fb(n - 1) + fb(n - 2);
  }
}


//isNaN()
function myIsNaN(num) {
  var res = Number(num) + '';  //用 + 拼接成字符串
  if (res == 'NaN') {  //NaN与任何都不相等，所以要与字符串'NaN'相比
    return true;
  } else {
    return false;
  }
}


// 重写typeof()
function myTypeof(value) {
  var type = typeof (value),
    toStr = Object.prototype.toString,
    strType = {
      '[object Object]': 'object',
      '[object Array]': 'array',
      '[object Number]': 'object number',
      '[object String]': 'object string',
      '[object Boolean]': 'object boolean'
    };
  if (value === null) {
    return 'null';
  } else if (type === 'object') {
    var ret = toStr.call(value);
    return strType[ret];
  } else {
    return type;
  }
}


//重写push()
// 数组自身有length属性, 增加每一项后会重新计算length值, 不需要显示this.length++
Array.prototype.myPush = function () {
  for (var i = 0; i < arguments.length; i++) {
    this[this.length] = arguments[i];
  }
  return this.length;
};


// 重写unshift(), 用splice()方法
Array.prototype.myUnshift = function () {
  var pos = 0;
  for (var i = 0; i < arguments.length; i++) {
    var item = arguments[i];
    this.splice(pos, 0, item);
    pos++;
  }
  return this.length;
};

// 重写unshift(), 用concat()方法
Array.prototype.myUnshift = function () {
  var argArr = Array.prototype.slice.call(arguments);  //类数组->数组
  var newArr = argArr.concat(this);
  return newArr;
}


// 重写forEach()
// array.myForEach(fn, this指向的对象(可选));
Array.prototype.myForEach = function (fn) {
  var arr = this,
    len = arr.length,
    _self = arguments[1] || window;

  for (var i = 0; i < len; i++) {
    fn.apply(_self, [arr[i], i, arr]);
  }
}


// 重写filter(), 深拷贝, 适用于数组的项是引用值
// array.myFilter(fn, this指向的对象(可选));
// fn = function (elem, index, array) {};
Array.prototype.myFilter = function (fn) {
  var arr = this,
    len = arr.length,
    _self = arguments[1] || window,
    newArr = [],
    item;

  for (var i = 0; i < len; i++) {
    // item = arr[i];
    item = deepClone(arr[i]);
    fn.apply(_self, [arr[i], i, arr]) ? newArr.push(item) : '';
  }
  return newArr;
}


// 重写map(), 深拷贝, 适用于数组的项是引用值
// array.myMap(fn, this指向的对象(可选));
Array.prototype.myMap = function (fn) {
  var arr = this,
    len = arr.length,
    _self = arguments[1] || window,
    newArr = [],
    item;
  for (var i = 0; i < len; i++) {
    // item = arr[i];
    item = deepClone(arr[i]);
    newArr.push(fn.apply(_self, [item, i, arr]));
  }
  return newArr;
};


// 重写reduce(),添加了arguments[2]可选,this指向
// array.myReduce(fn, initialValue, this)
Array.prototype.myReduce = function (fn, initialValue) {
  var arr = this,
    len = arr.length,
    arg3 = arguments[2] || window,
    item;

  for (var i = 0; i < len; i++) {
    item = arr[i];
    initialValue = fn.apply(arg3, [initialValue, item, i, arr]);
  }
  return initialValue;
};

// initialValue是可选的
Array.prototype.myReduce = function (fn) {
  var arr = this,
    len = arr.length,
    prev,
    _self = arguments[2] || window;

  if (typeof (arguments[1]) !== 'undefined') {
    prev = arguments[1];
    for (var i = 0; i < len; i++) {
      prev = fn.apply(_self, [prev, arr[i], i, arr]);
    }
  } else {
    prev = arr[0];
    for (var i = 1; i < len - 1; i++) {
      prev = fn.apply(_self, [prev, arr[i], i, arr]);
    }
  }
  return prev;
};


// 重写reduceRight
Array.prototype.myReduceRight = function (fn, initialValue) {
  var arr = this,
    len = arr.length,
    arg3 = arguments[2] || window;

  for (var i = len - 1; i >= 0; i--) {
    initialValue = fn.apply(arg3, [initialValue, arr[i], i, arr]);
  }
  return initialValue;
};


// 重写every
// array.myEvery(fn, this指向的对象(可选));
// 有一个不满足条件就停止遍历,条件就是后面的表达式;返回布尔值
Array.prototype.myEvery = function (fn) {
  var arr = this,
    len = arr.length,
    arg2 = arguments[1] || window,
    res = true;

  for (var i = 0; i < len; i++) {
    if (!fn.apply(arg2, [arr[i], i, arr])) {
      res = false;
      break;
    }
  }
  return res;
};


// 重写some
// 有一个满足条件就停止遍历
Array.prototype.mySome = function (fn) {
  var arr = this,
    len = arr.length,
    arg2 = arguments[1] || window,
    res = false;

  for (var i = 0; i < len; i++) {
    if (fn.apply(arg2, [arr[i], i, arr])) {
      res = true;
      break;
    }
  }
  return res;
};


// 数组去重
Array.prototype.unique = function () {
  var arr = this,
    _arr = [],
    isReapt;
  for (var i = 0; i < arr.length; i++) {
    isReapt = false;
    for (var j = i + 1; j < arr.length; j++) {
      if (arr[j] == arr[i]) {
        isReapt = true;
        break;
      }
    }
    if (!isReapt) {
      _arr.push(arr[i]);
    }
  }
  return _arr;
}

Array.prototype.unique = function () {
  var _arr = [],
    isReapt;
  for (var i = 0; i < this.length; i++) {
    isReapt = false;
    for (var j = 0; j < _arr.length; j++) {
      if (_arr[j] == this[i]) {
        isReapt = true;
        break;
      }
    }
    if (!isReapt) {
      _arr.push(this[i]);
    }
  }
  return _arr;
}

Array.prototype.unique = function () {
  var _self = this;
  return this.filter.call(_self, function (item, idx) {
    return _self.indexOf(item) === idx;
  });
}

Array.prototype.unique = function () {
  var temp = {},
    _arr = [],
    item;
  for (var i = 0; i < this.length; i++) {
    item = this[i];
    if (!temp.hasOwnProperty(item)) {
      temp[item] = item;
      _arr.push(item);
    }
  }
  return _arr;
}

function uniqueArr(array) {
  var _arr = [],
    _temp = new Map(),
    item;
  for (var i = 0; i < array.length; i++) {
    item = array[i];
    if (!_temp.get(item)) {
      _temp.set(item, 1);
      _arr.push(item);
    }
  }
  return _arr;
}


// 字符串去重
String.prototype.uniqueStr = function () {
  var temp = {},
    newStr = '';
  for (var i = 0; i < this.length; i++) {
    if (!temp.hasOwnProperty(this[i])) {
      temp[this[i]] = this[i];
      newStr += this[i];
    }
  }
  return newStr;
}


// 浅拷贝
function clone(origin) {
  // origin的类型
  var type = Object.prototype.toString.call(origin),
    tar;
  //只拷贝对象或数组 
  if (type === '[object Object]' || type === '[object Array]') {
    tar = type === '[object Object]' ? {} : [];
    // 遍历origin
    for (var key in origin) {
      //排除自定义的原型上的属性
      if (origin.hasOwnProperty(key)) {
        tar[key] = origin[key];
      }
    }
    return tar;
  }
}


// 深拷贝
function deepClone(origin, target) {
  var target = target || {},
    toStr = Object.prototype.toString,
    arrType = '[object Array]';
  for (var key in origin) {
    if (origin.hasOwnProperty(key)) {
      if (typeof (origin[key]) === 'object' && origin[key] !== null) {
        if (toStr.call(origin[key]) === arrType) {
          target[key] = [];
        } else {
          target[key] = {};
        }
        deepClone(origin[key], target[key]);
      } else {
        target[key] = origin[key];
      }
    }
  }
  return target;
}


// 判断是否是闰年
function isLeapYear(year) {
  return ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0))
    ? '是闰年'
    : '不是闰年';
}


//获取当前时间，年-月-日 时:分:秒
Date.prototype.getDateTime = function () {
  var year = this.getFullYear(),
    month = this.getMonth() + 1,
    day = this.getDate(),
    hours = this.getHours(),
    minutes = this.getMinutes(),
    seconds = this.getSeconds();

  function setZero(num) {
    if (num < 10) {
      num = '0' + num;
    }
    return num;
  }

  return year + '-' + setZero(month) + '-' + setZero(day) + ' ' + setZero(hours) + ':' + setZero(minutes) + ':' + setZero(seconds);
};



//getDay(),判断当天是星期几
Date.prototype.getWeekDay = function (lang) {
  var day = this.getDay();
  switch (day) {
    case 0:
      return lang === 'chs' ? '星期天' : 'Sunday';
      break;
    case 1:
      return lang === 'chs' ? '星期一' : 'Monday';
      break;
    case 2:
      return lang === 'chs' ? '星期二' : 'Tuesday';
      break;
    case 3:
      return lang === 'chs' ? '星期三' : 'Wednesday';
      break;
    case 4:
      return lang === 'chs' ? '星期四' : 'Thursday';
      break;
    case 5:
      return lang === 'chs' ? '星期五' : 'Friday';
      break;
    case 6:
      return lang === 'chs' ? '星期六' : 'Saturday';
      break;
  }
};
// --------------------------------------------------------------------------------------


// 查找父节点node的元素子节点
// 代替children, IE7及以下不支持
function elemChildren(node) {
  // 定义类数组
  var temp = {
    'length': 0,
    'push': Array.prototype.push,
    'splice': Array.prototype.splice
  };

  var children = node.childNodes,
    len = children.length,
    item;

  for (var i = 0; i < len; i++) {
    item = children[i];
    if (item.nodeType === 1) {
      temp.push(item);
      //或
      //temp[temp.length] = item;
      //temp['length']++;
    }
  }
  return temp;
}


//获取元素的第n个子元素节点
Element.prototype.elemChildren = function (n) {
  var children = this.childNodes,
    len = children.length,
    item,
    type = typeof (n);

  var temp = {
    'length': 0,
    'push': Array.prototype.push,
    'splice': Array.prototype.splice
  };

  for (var i = 0; i < len; i++) {
    item = children[i];
    if (item.nodeType === 1) {
      temp.push(item);
    }
  }
  if (n !== undefined && type !== 'number') {
    return undefined;
  }
  return (n === undefined) ? temp : temp[n];
}


//判断元素有没有子元素节点
Element.prototype.hasChildren = function () {
  var children = this.childNodes,
    len = children.length,
    item;

  for (var i = 0; i < len; i++) {
    item = children[i];
    if (item.nodeType === 1) {
      return true;
    }
  }
  return false;
}

//查找元素的第n层父级元素
Element.prototype.elemParent = function (n) {
  var type = typeof (n),
    elem = this;

  if (type === 'undefined' || type !== 'number') {
    return elem.parentNode;
  } else if (n < 0) {
    return elem;
  }

  while (n) {
    if (elem.nodeName === 'HTML') {
      elem = null;
      return elem;
    }
    elem = elem.parentNode;
    n--;
  }
  return elem;
}


//node.insertAfter();
Element.prototype.insertAfter = function (target, afterNode) {
  var nextElem = afterNode.nextElementSibling;
  if (nextElem) {
    this.insertBefore(target, nextElem);
  } else {
    nextElem.appendChild(target);
  }
};



//获取整个文档尺寸，宽+高
function getScrollSize() {
  if (document.body.scrollWidth) {
    return {
      width: document.body.scrollWidth,
      height: document.body.scrollHeight
    }
  } else {
    return {
      width: document.documentElement.scrollWidth,
      height: document.documentElement.scrollHeight
    }
  }
}


//获取视口尺寸，宽+高
function getViewportSize() {
  if (window.innerWidth) {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
  } else {
    // IE9、IE8及以下    
    if (document.compatMode === 'BackCompat') {
      // 怪异模式
      return {
        width: document.body.clientWidth,
        height: document.body.clientHeight
      }
    } else {
      // 标准模式
      return {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
      }
    }
  }
}


//获取页面滚动的距离，水平+垂直距离
function getScrollOffset() {
  if (window.pageXOffset) {
    return {
      left: window.pageXOffset,
      top: window.pageYOffset
    }
  } else {
    // IE9部分和IE8及其以下
    return {
      left: document.body.scrollLeft + document.documentElement.scrollLeft,
      top: document.body.scrollTop + document.documentElement.scrollTop
    }
  }
}


// 获取元素距离body的左上距离
function getElemDocPosition(elem) {
  // 获取元素的具有定位的父级
  var parent = elem.offsetParent,
    offsetLeft = elem.offsetLeft,
    offsetTop = elem.offsetTop;

  while (parent) {
    offsetLeft += parent.offsetLeft;
    offsetTop += parent.offsetTop;
    parent = parent.offsetParent;
  }

  return {
    left: offsetLeft,
    top: offsetTop
  }
}


// 同pageX/Y, IE9以下不支持，兼容性不好
// 鼠标位置相对于当前文档的坐标（包含滚动条的距离）
function pagePos(e) {
  //调用工具函数getScrollOffset()
  var sLeft = getScrollOffset().left,
    sTop = getScrollOffset().top,
    //IE8及以下的文档偏移量(margin)
    cLeft = document.documentElement.clientLeft || 0,
    cTop = document.documentElement.clientTop || 0;

  return {
    //可视坐标 + 滚动坐标 - 文档偏移量  
    X: e.clientX + sLeft - cLeft,
    Y: e.clientY + sTop - cTop
  }
}


//获取元素的样式属性
// 参数prop可选
function getStyles(elem, prop) {
  if (window.getComputedStyle) {
    if (prop) {
      return window.getComputedStyle(elem, null)[prop];
    } else {
      return window.getComputedStyle(elem, null);
    }
  } else {
    // IE8及以下
    if (prop) {
      return elem.currentStyle[prop];
    } else {
      return elem.currentStyle;
    }
  }
}



//添加事件处理函数
function addEvent(el, type, fn) {
  // W3C
  if (el.addEventListener) {
    el.addEventListener(type, fn, false);
  } else if (el.attchEvent) {
    // IE9以下
    el.attachEvent('on' + type, function () {
      //改变this指向，由window指向el 
      fn.call(el);
    });
  } else {
    // 句柄方式，兼容性最好
    el['on' + type] = fn;
  }
}


//清除事件处理函数
function removeEvent(elem, type, fn) {
  // W3C规范
  if (elem.addEventListener) {
    elem.removeEventListener(type, fn, false);
    // IE9以下
  } else if (elem.attachEvent) {
    elem.detachEvent('on' + type, fn);
  } else {
    // 句柄方式，兼容性最好
    elem['on' + type] = null;
  }
}


//取消冒泡
function cancelBubble(e) {
  var e = e || window.event;
  // W3C
  if (e.stopPropagation) {
    e.stopPropagation();
  } else {
    // IE
    e.cancelBubble = true;
  }
}


//取消默认事件
function preventDefaultEvent(e) {
  var e = e || window.event;
  //W3C，IE9不兼容
  if (e.prventDefault) {
    e.preventDefault();
  } else {
    //IE9以下
    e.returnValue = false;
  }
}

// ----------------------------------------------------------------------


//功能：用JSON数据代替正则模板，动态渲染页面
//参数：模板tpl,正则regTpl,配置模板里的项opt 
function setTplToHTML(tpl, regExp, opt) {
  return tpl.replace(regExp(), function (node, key) {
    return opt[key];
  });
}
function regTpl() {
  return new RegExp(/{{(.*?)}}/, 'gim');
}
//参数：模板tpl, 配置模板里的项opt 
function setTplToHTML(tpl, opt) {
  return tpl.replace(/{{(.*?)}}/gim, function (node, key) {
    return opt[key];
  });
}



// 归类函数
// sort: 分类依据
// data: 要分类的数据
function sortDatas(sort, data) {
  var cache = {};
  // foreign_key: 关联的键名
  // sortType: 归类方式
  return function (foreign_key, sortType) {
    if (sortType !== 'singleSort' && sortType !== 'multiSort') {
      console.log(new Error('Invalid sort type.[Only "singleType" and "multiSort" are valid values]'));
      return;
    }
    sort.forEach(function (sort) {
      var _id = sort.id;
      cache[_id] = [];
      data.forEach(function (data) {
        var foreignVal = data[foreign_key];
        switch (sortType) {
          case 'singleSort':
            if (foreignVal === _id) {
              cache[_id].push(data);
            }
            break;
          case 'multiSort':
            var _arr = foreignVal.split(',');
            _arr.forEach(function (val) {
              if (val === _id) {
                cache[_id].push(data);
              }
            });
            break;
          default:
            break;
        }
      });
    });
    return cache;
  }
}


// AJAX
var xhr = (function () {
  // 处理AJAX的配置参数opt
  function _doAjax(opt) {

    // 1、创建原生XMLHttpRequest对象
    var o = window.XMLHttpRequest ?
      new XMLHttpRequest() :
      // 兼容性：IE5/IE6使用ActiveXObject
      new ActiveXObject('Microsoft.XMLHTTP');

    if (!o) {
      throw new Error('您的浏览器不支持异步发起HTTP请求');
    }

    var opt = opt || {},
      // 规定请求的类型，GET 或 POST
      type = (opt.type || 'GET').toUpperCase(),
      // 请求是否异步处理
      async = '' + opt.async === 'false' ? false : true,
      // 预期的服务器响应的数据类型，JSON/XML/TEXT
      dataType = opt.dataType || 'JSON',
      // 在一个 jsonp 中重写回调函数的字符串
      jsonp = opt.jsonp || 'cb',
      // 在一个 jsonp 中规定回调函数的名称
      jsonpCallback = opt.jsonpCallback || 'jQuery' + randomNum() + '_' + new Date().getTime(),
      url = opt.url,
      // 规定要发送到服务器的数据
      data = opt.data || null,
      // 设置本地的请求超时时间（以毫秒计）
      timeout = opt.timeout || 30000,
      error = opt.error || function () { },
      success = opt.success || function () { },
      complete = opt.complete || function () { },
      t = null;

    // 必须要配置url
    if (!url) {
      throw new Error('您没有填写URL');
    }

    if (dataType.toUpperCase() === 'JSONP' && type !== 'GET') {
      throw new Error('如果dataType为JSONP，type请您设置GET或不设置');
    }

    if (dataType.toUpperCase() === 'JSONP') {
      var oScript = document.createElement('script');
      oScript.src = url.indexOf('?') === -1
        ? url + '?' + jsonp + '=' + jsonpCallback
        : url + '&' + jsonp + '=' + jsonpCallback;
      document.body.appendChild(oScript);
      document.body.removeChild(oScript);
      window[jsonpCallback] = function (data) {
        success(data);
      };
      return;
    }

    // 监听readystate
    o.onreadystatechange = function () {
      // 请求已完成，且响应已就绪
      if (o.readyState === 4) {
        // 获取资源成功
        if ((o.status >= 200 && o.status < 300) || o.status === 304) {
          // 根据不同的dataType来执行不同的成功的回调函数
          switch (dataType.toUpperCase()) {
            case 'JSON':
              success(JSON.parse(o.responseText));
              break;
            case 'TEXT':
              success(o.responseText);
              break;
            case 'XML':
              success(o.responseXML);
              break;
            default:
              success(JSON.parse(o.responseText));
          }
        } else {
          // 执行失败的回调函数
          error();
        }
        // 执行完成的回调函数
        complete();
        clearTimeout(t);
        t = null;
        o = null;
      }
    }

    // 配置发送的设置
    o.open(type, url, async);
    // POST请求方式下，必须设置请求头
    type === 'POST' && o.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // 发送请求，GET请求方式下，无；POST请求方式下，将data{obj}转化为查询字符串
    o.send(type === 'GET' ? null : formatDatas(data));

    // 超时设置
    t = setTimeout(function () {
      // 请求终止
      o.abort();
      clearTimeout(t);
      t = null;
      o = null;
      throw new Error('本次请求已超时，API地址：' + url);
    }, timeout);
  }

  // POST请求方式下，格式化参数，将obj转化成 a=1&b=2
  function formatDatas(obj) {
    var str = '';
    for (var key in obj) {
      str += key + '=' + obj[key] + '&';
    }
    return str.replace(/&$/, '');
  }

  // 
  function randomNum() {
    var num = '';
    for (var i = 0; i < 20; i++) {
      num += Math.floor(Math.random() * 10);
    }
    return num;
  }

  return {
    // 执行 AJAX（异步 HTTP）请求
    ajax: function (opt) {
      _doAjax(opt);
    },

    // 通过 HTTP POST 请求向服务器提交数据
    post: function (url, data, dataType, successCB, errorCB, completeCB) {
      _doAjax({
        type: 'POST',
        url: url,
        data: data,
        dataType: dataType,
        success: successCB,
        error: errorCB,
        complete: completeCB
      });
    },

    // 通过 HTTP GET 请求从服务器上请求数据
    get: function (url, dataType, successCB, errorCB, completeCB) {
      _doAjax({
        type: 'GET',
        url: url,
        dataType: dataType,
        success: successCB,
        error: errorCB,
        complete: completeCB
      })
    }
  }
})();


