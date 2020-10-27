window.onload = function () {
  this.init();
}
function init() {
  initTodoList();
}

// todoList模块
// 改动
// 图标库 font-awesome  修改为  iconfont
// 函数返回字符串模板  修改为  正则模板匹配
var initTodoList = (function () {
  var showBtn = document.getElementsByClassName('j-show-input')[0],
    inputWrap = document.getElementsByClassName('input-wrap')[0],
    addItemBtn = document.getElementsByClassName('j-add-item')[0],
    textInput = document.getElementById('textInput'),
    oList = document.getElementsByClassName('j-list')[0],

    oListTpl = document.getElementById('listTpl').innerHTML,

    inputShow = false,
    isEdit = false,
    curIdx = null;

  // 显示、隐藏输入框
  addEvent(showBtn, 'click', showInput);
  // 增加、编辑项
  addEvent(addItemBtn, 'click', addItems);
  // 事件代理，编辑、删除项
  addEvent(oList, 'click', editItems);


  function editItems(e) {
    var e = e || window.event,
      tar = e.target || e.srcElement,
      className = tar.className,
      oParent = tar.elemParent(2),
      oItems = document.getElementsByClassName('item');

    // 若点击编辑按钮
    if (className === 'edit-btn iconfont') {
      var itemLen = oItems.length,
        tarIdx = Array.prototype.indexOf.call(oItems, oParent),
        item;

      // 遍历，将所有li的类初始化，防止点击多个项的编辑按钮
      for (var i = 0; i < itemLen; i++) {
        item = oItems[i];
        item.className = 'item';
      }

      isShowInput('open');
      oParent.className += ' active';

      isEdit = true;
      curIdx = tarIdx;
      addItemBtn.innerText = '编辑第' + (tarIdx + 1) + '项';
      textInput.value = elemChildren(oParent)[0].innerText;

      // 若点击删除按钮
    } else if (className === 'remove-btn iconfont') {
      oParent.remove();
      inputInitStatus();
      isShowInput('close');
    }
  }


  function addItems() {
    //去重，先动态获取li的每一项
    var oItems = document.getElementsByClassName('item'),
      itemLen = oItems.length,
      val = textInput.value,
      len = val.length,
      item,
      itemP,
      curItemP,
      text;

    if (len === 0) {
      return;
    }

    // 去重
    if (itemLen > 0) {
      for (var i = 0; i < itemLen; i++) {
        itemP = elemChildren(oItems[i])[0];
        text = itemP.innerText;
        if (text === val) {
          alert('已存在该项目')
          return;
        }
      }
    }

    // 若是编辑项状态
    if (isEdit) {
      item = oItems[curIdx];
      curItemP = elemChildren(item)[0];

      curItemP.innerText = val;
      item.className = 'item';
      inputInitStatus();

      // 若是增加项
    } else {
      var oLi = document.createElement('li');
      oLi.className = 'item';
      oLi.innerHTML = setTplToHTML(val);
      oList.appendChild(oLi);
    }
    textInput.value = '';
    isShowInput('close');
  }

  function showInput() {
    if (inputShow) {
      isShowInput('close');
      inputInitStatus();
    } else {
      isShowInput('open');
    }
  }

  // 输入框的初始状态
  function inputInitStatus() {
    isEdit = false;
    curIdx = null;
    textInput.value = '';
    addItemBtn.innerText = '增加项目';
  }

  function isShowInput(action) {
    if (action === 'close') {
      inputWrap.style.display = 'none';
      inputShow = false;
    } else if (action === 'open') {
      inputWrap.style.display = 'block';
      inputShow = true;
    }
  }

  function setTplToHTML(text) {
    return oListTpl.replace(/{{(.*?)}}/gim, text);
  }
});


