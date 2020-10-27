window.onload = function () {
  init();
}

function init() {
  initTodoList();
}

// todoList模块
var initTodoList = (function () {
  var showBtn = document.getElementsByClassName('j-show-input')[0],
    inputWrap = document.getElementsByClassName('input-wrap')[0],
    addItemBtn = document.getElementsByClassName('j-add-item')[0],
    textInput = document.getElementById('textInput'),
    oList = document.getElementsByClassName('j-list')[0],

    // 标记
    // 输入框的显示与否
    inputShow = false,
    // 每一项编辑与否
    isEdit = false,
    // 当前项的index
    curIdx = null;

  //点击，显示、隐藏输入框
  addEvent(showBtn, 'click', showInput);

  //点击，增加、编辑项  
  addEvent(addItemBtn, 'click', addItems);

  // 点击，事件代理，编辑、删除项
  addEvent(oList, 'click', editItems);


  // 事件处理函数，编辑、删除项
  function editItems(e) {
    var e = e || window.event,
      tar = e.target || e.srcElement,
      className = tar.className,
      oParent = tar.elemParent(2),
      oItems = document.getElementsByClassName('item');

    // 若点击编辑按钮
    if (className === 'edit-btn fa fa-edit') {
      var itemLen = oItems.length,
        tarIdx = Array.prototype.indexOf.call(oItems, oParent),
        item;

      // 遍历，将所有li的类初始化，防止点击多个项的编辑按钮
      for (var i = 0; i < itemLen; i++) {
        item = oItems[i];
        item.className = 'item';
      }

      // 显示输入框
      isShowInput('open');
      // 修改当前项的背景色
      oParent.className += ' active';

      // 输入框的编辑状态
      isEdit = true;
      curIdx = tarIdx;
      addItemBtn.innerText = '编辑第' + (tarIdx + 1) + '项';
      // 编辑状态下，输入框的值为编辑项里的文本
      textInput.value = elemChildren(oParent)[0].innerText;
      // 输入框的编辑状态

      // 若点击删除按钮  
    } else if (className === 'remove-btn fa fa-times') {
      oParent.remove();
      inputInitStatus();
      isShowInput('close');
    }
  }

  // 事件处理函数，增加、编辑项
  function addItems() {
    // 动态获取li的每一项
    var oItems = document.getElementsByClassName('item'),
      itemLen = oItems.length,
      val = textInput.value,
      len = val.length,
      // 当前项li
      item,
      // 每一项li的第一个子元素p
      itemP,
      // 当前li的第一个子元素p
      curItemP,
      text;


    // 必须要有输入值
    if (len === 0) {
      return;
    }

    // 项要去重
    if (itemLen > 0) {
      for (var i = 0; i < itemLen; i++) {
        itemP = elemChildren(oItems[i])[0];
        text = itemP.innerText;

        // 每项的文本值 === 输入框的值
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

      // 将输入框编辑后的值赋给编辑项里的文本
      curItemP.innerText = val;
      // 将当前li的类初始化
      item.className = 'item';
      // 输入框回归到初始状态
      inputInitStatus();

      // 若是增加项
    } else {
      var oLi = document.createElement('li');
      oLi.className = 'item';
      oLi.innerHTML = itemTpl(val);
      oList.appendChild(oLi);
    }

    textInput.value = '';  //这里不能写val，val是保存textInput.value的变量!!!!!
    isShowInput('close');
  }

  // 事件处理函数，显示或隐藏输入框
  function showInput() {
    if (inputShow) {
      isShowInput('close');
      inputInitStatus();
    } else {
      isShowInput('open');
    }
  }

  // 存储输入框的初始状态
  function inputInitStatus() {
    isEdit = false;
    curIdx = null;
    textInput.value = '';
    addItemBtn.innerText = '增加项目';
  }

  // 显示、隐藏输入框
  function isShowInput(action) {
    if (action === 'close') {
      inputWrap.style.display = 'none';
      inputShow = false;
    } else if (action === 'open') {
      inputWrap.style.display = 'block';
      inputShow = true;
    }
  }

  function itemTpl(text) {
    return (
      '<p class="item-content">' + text + '</p>' +
      '<div class="btn-group">' +
      '<a href="javascript:;" class="edit-btn fa fa-edit"></a>' +
      '<a href="javascript:;" class="remove-btn fa fa-times"></a>' +
      '</div>'
    );
  }
});
