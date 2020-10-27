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

// 模板渲染
function render(data, tpl, oList) {
  var list = '';
  data.forEach(function (elem) {
    list += tpl.replace(/{{(.*?)}}/gim, function (node, key) {
      return {
        img: elem.img
      }[key];
    });
  });
  oList.innerHTML = list;
}