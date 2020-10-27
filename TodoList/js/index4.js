// todoList插件
// 配置项
// plusBtn: 显示、隐藏输入框按钮
// inputWrap: 输入框盒子
// textInput: 输入框的文本
// addBtn: 输入框右边的增加、编辑项按钮
// list: 列表项的ul

// listTpl: 模板列表

// 改动：
// 1、图标库 font-awesome  修改为  iconfont
// 2、函数返回字符串模板  修改为  正则模板匹配
// 3、配置项的获取，标签的data-*属性  修改为  函数传参


; (function () {
  var inputShow = false,
    isEdit = false,
    curIdx = -1;

  var TodoList = function (opt) {
    this.plusBtn = opt.plusBtn;
    this.inputWrap = opt.inputWrap;
    this.textInput = opt.textInput;
    this.addBtn = opt.addBtn;
    this.oList = opt.list;
    this.listTpl = opt.listTpl;

    this.init();
  }

  TodoList.prototype = {
    init: function () {
      var _self = this;

      // 点击，显示、隐藏输入框
      addEvent(this.plusBtn, 'click', this.showInput.bind(_self));
      // 点击，增加、编辑项
      addEvent(this.addBtn, 'click', this.addBtnClick.bind(_self));
      // 点击，事件代理，编辑、删除项
      addEvent(this.oList, 'click', this.listClick.bind(_self));
    },

    // 事件处理函数，编辑、删除项
    listClick: function (e) {
      var _self = this,
        e = e || window.event,
        tar = e.target || e.srcElement,
        className = tar.className,
        oParentLi = tar.elemParent(2),
        oItems,
        itemLen,
        item;

      // 若点击编辑按钮
      if (className === 'edit-btn iconfont') {
        oItems = document.getElementsByClassName('item');
        itemLen = oItems.length;

        // 遍历，将所有li的类初始化，防止点击多个项的编辑按钮
        for (var i = 0; i < itemLen; i++) {
          item = oItems[i];
          item.className = 'item';
        }

        _self.isInputShow('open');
        oParentLi.className += ' active';
        _self.setInputStatus(oItems, oParentLi, 'edit');

        // 若点击删除按钮
      } else if (className === 'remove-btn iconfont') {
        oParentLi.remove();
        _self.isInputShow('close');
      }
    },

    // 事件处理函数，增加、编辑项
    addBtnClick: function () {
      var _self = this,
        textInput = _self.textInput.value,
        textInputLen = textInput.length,
        oItems = _self.oList.getElementsByClassName('item'),
        itemLen = oItems.length,
        content,
        oLi;

      // 未输入内容，返回
      if (textInputLen <= 0) {
        return;
      }

      // 去重
      if (itemLen > 0) {
        for (var i = 0; i < itemLen; i++) {
          content = elemChildren(oItems[i])[0].innerText;
          // 输入框的值 === 每项的值
          if (textInput === content) {
            alert('已存在该项');
            return;
          }
        }
      }

      // 若是编辑项
      if (isEdit) {
        elemChildren(oItems[curIdx])[0].innerText = textInput;
        _self.setInputStatus(oItems, null, 'add');

        // 若是增加项
      } else {
        oLi = document.createElement('li');
        oLi.className = 'item';
        oLi.innerHTML = _self.setTplToHTML(textInput);
        _self.oList.appendChild(oLi);
      }      
      _self.isInputShow('close');
    },



    // 事件处理函数，显示、隐藏输入框
    showInput: function () {
      var _self = this;

      if (inputShow) {
        _self.isInputShow('close');
      } else {
        _self.isInputShow('open');
      }
    },

    // 输入框的显示与否：显示、隐藏
    isInputShow: function (action) {
      var oItems = this.oList.getElementsByClassName('item');
      
      if (action === 'open') {
        this.inputWrap.style.display = 'block';
        inputShow = true;

      } else if (action === 'close') {
        this.inputWrap.style.display = 'none';
        inputShow = false;
        this.setInputStatus(oItems, null, 'add');
      }
    },

    // 设置输入框状态，增加、编辑项
    setInputStatus: function (oItems, target, status) {
      var idx,
        content,
        itemLen,
        item;

      // 编辑项
      if (status === 'edit') {
        idx = Array.prototype.indexOf.call(oItems, target);
        content = elemChildren(target)[0].innerText;

        this.addBtn.innerText = '编辑第' + (idx + 1) + '项';
        isEdit = true;
        curIdx = idx;
        this.textInput.value = content;

        // 增加项
      } else if (status === 'add') {
        itemLen = oItems.length;

        for (var i = 0; i < itemLen; i++) {
          item = oItems[i];
          item.className = 'item';          
        }

        this.addBtn.innerText = '增加项目';
        isEdit = false;
        curIdx = -1;
        this.textInput.value = '';
      }
    },

    setTplToHTML: function (text) {
      return this.listTpl.replace(/{{(.*?)}}/gim, text);
    }
  };




  window.TodoList = TodoList;
})();
