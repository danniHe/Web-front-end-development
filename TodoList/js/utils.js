function addEvent(el, type, fn) {
  if (el.addEventListener) {
    el.addEventListener(type, fn, false);
  } else if (el.attchEvent) {
    el.attachEvent('on' + type, function () {
      fn.call(el);
    });
  } else {
    el['on' + type] = fn;
  }
}

function elemChildren(node) {
  var temp = {
    'length': 0,
    'push': Array.prototype.push,
    'splice': Array.prototype.splice
  },
    children = node.childNodes,
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
