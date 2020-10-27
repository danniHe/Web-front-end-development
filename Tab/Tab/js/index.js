//逻辑一，遍历
// if 判断，如果点击的不是当前显示的，也就是className无cur, 
// 就遍历初始化，去掉cur/active
// 把当前点击的加上cur/active

//写法一，小白写法，绝对不可取
// var tabs = document.getElementsByClassName('tab-item'),
//   pages = document.getElementsByClassName('page-item'),
//   len = tabs.length;

// for (var i = 0; i < len; i++) {
//   (function (i) {
//     tabs[i].onclick = function () {
//       console.log(i)
//       for (var j = 0; j < len; j++) {
//         tabs[j].className = 'tab-item';
//         pages[j].className = 'page-item';
//       }
//       this.className += ' cur';
//       pages[i].className += ' active';
//     }
//   })(i);
// }


//写法二，插件，面向对象(构造函数 + 原型) + 对象配置项，未用事件代理
// ; (function () {
//   var Tab = function (opt) {
//     this.tabs = document.getElementsByClassName(opt.tabItem);
//     this.pages = document.getElementsByClassName(opt.pageItem);
//     this.bindClick(opt.tabItem, opt.pageItem, opt.cur, opt.active);  //调用原型上的方法
//   }

//   Tab.prototype = {
//     bindClick: function (tabItem, pageItem, cur, active) {
//       var tabs = this.tabs,
//         pages = this.pages,
//         len = tabs.length;

//       // 未用事件代理
//       for (var i = 0; i < len; i++) {
//         (function (j) {
//           tabs[j].onclick = function () {
//             for (var k = 0; k < len; k++) {
//               tabs[k].className = tabItem;
//               pages[k].className = pageItem;
//             }
//             this.className += ' ' + cur;
//             pages[j].className += ' ' + active;
//           };
//         })(i);
//       }
//     }
//   };

//   window.Tab = Tab;
// })();



//写法三，模块化, 事件代理
// ; (function (doc) {
//   var oTab = doc.getElementsByClassName('tab')[0],
//     oPage = doc.getElementsByClassName('page')[0],
//     tabItems = oTab.getElementsByClassName('tab-item'),
//     pageItems = oPage.getElementsByClassName('page-item'),
//     len = tabItems.length;

//   var init = function () {
//     bindEvent();
//   };

//   function bindEvent() {
//     oTab.addEventListener('click', tabClick, false);
//   }

//   function tabClick(e) {
//     var e = e || window.event,
//       tar = e.target || e.srcElement,
//       // a标签成为了块级元素，那么tar就是a标签，所以需要找到tar的父级元素
//       tarParent = tar.parentNode,
//       curIdx = Array.prototype.indexOf.call(tabItems, tarParent);

//     if (tarParent.className === 'tab-item') {
//       for (var i = 0; i < len; i++) {
//         tabItems[i].className = 'tab-item';
//         pageItems[i].className = 'page-item';
//       }
//       tabItems[curIdx].className += ' cur';
//       pageItems[curIdx].className += ' active';
//     }

//   }

//   init();
// })(document);





// 逻辑二，给一个  初始化下标的标记curIdx
// curIdx 与 点击的下标thisIdx 不相等
// 去掉cur/active
// 更新初始化下标的标记
// 把当前点击的加上cur/active

// 写法：模块化，事件代理
; (function (doc) {
  var oTab = doc.getElementsByClassName('J_tab')[0],
    oPage = doc.getElementsByClassName('J_page')[0],
    tabItems = oTab.getElementsByClassName('tab-item'),
    pageItems = oPage.getElementsByClassName('page-item'),
    curIdx = 0;

  var init = function () {
    bindEvent();
  };

  function bindEvent() {
    oTab.addEventListener('click', tabClick, false);
  }

  function tabClick(e) {
    var e = e || window.event,
      tar = e.target || e.srcElement,
      tarParent = tar.parentNode,
      thisIdx = Array.prototype.indexOf.call(tabItems, tarParent);

    if (curIdx !== thisIdx) {
      tabItems[curIdx].className = 'tab-item';
      pageItems[curIdx].className = 'page-item';
      curIdx = thisIdx;      
      tabItems[curIdx].className += ' cur';
      pageItems[curIdx].className += ' active';
    }
  }

  init();

})(document);