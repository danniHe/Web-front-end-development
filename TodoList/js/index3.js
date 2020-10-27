// todoList插件
// 配置项
// plusBtn: 显示、隐藏输入框按钮
// inputArea: 输入框盒子
// addBtn: 输入框右边的增加、编辑项按钮
// list: 列表项的ul
// itemClass: 列表项li的类名

; (function (node) {
  var TodoList = function () {
    _self = this;
    this.node = node;
    this.inputShow = false;
    this.isEdit = false;
    this.curIdx = -1;

    // 默认配置项
    this.defaultConfig = {
      "plusBtn": "",
      "inputArea": "",
      "addBtn": "",
      "list": "",
      "itemClass": ""
    }

    // 获取配置项
    this.config = this.getConfig();

    // 遍历默认配置项
    for (var key in this.defaultConfig) {
      // 检查配置项是否配置齐全
      if (!this.config.hasOwnProperty(key)) {
        console.log(errorInfo(key));
        return;
      }
    }

    // 调用设置配置项的方法
    this.setConfig();

    // 点击，显示、隐藏输入框
    addEvent(this.plusBtn, 'click', function () {
      _self.showInput.call(_self);
    });

    // 点击，增加、编辑项
    addEvent(this.addBtn, 'click', this.addBtnClick.bind(_self));

    // 点击，事件代理，编辑、删除项
    addEvent(this.oList, 'click', function (e) {
      var e = e || window.event,
        tar = e.target || e.srcElement;

      _self.listClick.call(_self, tar);
    });
  };

  TodoList.prototype = {
    // 获取配置
    getConfig: function () {
      return JSON.parse(this.node.getAttribute('data-config'));
    },

    // 设置配置项，做好缓存
    setConfig: function () {
      var config = this.config,
        node = this.node;
      this.plusBtn = node.getElementsByClassName(config.plusBtn)[0];
      this.inputArea = node.getElementsByClassName(config.inputArea)[0];
      this.addBtn = this.inputArea.getElementsByClassName(config.addBtn)[0];
      this.oList = node.getElementsByClassName(config.list)[0];
      this.content = this.inputArea.getElementsByClassName('content')[0];
      this.itemClass = config.itemClass;
    },

    // 事件处理函数，显示或隐藏输入框
    showInput: function () {
      var _self = this;

      if (this.inputShow) {
        setInputShow.call(_self, 'close');
      } else {
        setInputShow.call(_self, 'open');
      }
    },

    // 事件处理函数，增加项 或 编辑项
    addBtnClick: function () {
      var _self = this,
        content = this.content.value,
        contentLen = content.length,
        oItems = this.oList.getElementsByClassName('item'),
        itemLen = oItems.length,
        text;

      //有填内容，才增加项
      if (contentLen <= 0) {
        return;
      }

      // 去重
      if (itemLen > 0) {
        for (var i = 0; i < itemLen; i++) {
          text = elemChildren(oItems[i])[0].innerText;
          if (text === content) {
            alert('已存在该项');
            return;
          }
        }
      }

      // 若是编辑项状态
      if (this.isEdit) {
        // 将输入框编辑后的值赋给编辑项里的文本
        elemChildren(oItems[this.curIdx])[0].innerText = content;

        // 输入框回归到初始状态
        setInputStatus.apply(_self, [oItems, null, 'add']);

        // 若是增加项
      } else {
        var oLi = document.createElement('li');
        oLi.className = this.itemClass;
        oLi.innerHTML = itemTpl(content);
        this.oList.appendChild(oLi);
      }

      // 隐藏输入框
      setInputShow.call(_self, 'close');
    },

    // 事件处理函数，事件代理，编辑、删除项
    listClick: function (tar) {
      var _self = this,
        className = tar.className,
        oParent = tar.elemParent(2),
        oItems = this.oList.getElementsByClassName('item'),
        itemLen = oItems.length;

      // 若点击编辑按钮
      if (className === 'edit-btn fa fa-edit') {

        // 遍历，将所有li的类初始化，防止点击多个项的编辑按钮 
        for (var i = 0; i < itemLen; i++) {
          item = oItems[i];
          item.className = 'item';
        }

        // 显示输入框
        setInputShow.call(_self, 'open');
        // 修改当前项的背景色
        oParent.className += ' active';
        // 设置输入框状态：编辑项
        setInputStatus.apply(_self, [oItems, oParent, 'edit']);

        // 若点击删除按钮
      } else if (className === 'remove-btn fa fa-times') {
        // 移除当前项
        oParent.remove();

        // 隐藏输入框
        setInputShow.call(_self, 'close');
      }
    }
  };

  // 设置输入框：显示 或 隐藏
  function setInputShow(action) {
    var oItems = this.oList.getElementsByClassName('item');
    
    // 显示输入框
    if (action === 'open') {
      this.inputArea.style.display = 'block';
      this.inputShow = true;

      // 隐藏输入框，同时将输入框、按钮状态初始化
    } else if (action === 'close') {
      this.inputArea.style.display = 'none';
      this.inputShow = false;
      setInputStatus.apply(_self, [oItems, null, 'add']);
    }
  }

  // 设置输入框状态：增加项目 或 编辑第n项
  function setInputStatus(oItems, target, status) {

    // 编辑项目
    if (status === 'edit') {
      var idx = [].indexOf.call(oItems, target),
        text = elemChildren(target)[0].innerText;

      this.addBtn.innerText = '编辑第' + (idx + 1) + '项';
      this.isEdit = true;
      this.curIdx = idx;
      this.content.value = text;

      // 增加项目，也是输入框、按钮的初始状态
    } else if (status === 'add') {
      var itemLen = oItems.length,
        item;

      for (var i = 0; i < itemLen; i++) {
        item = oItems[i];
        item.className = 'item';
      }

      this.addBtn.innerText = '增加项目';
      this.isEdit = false;
      this.curIdx = -1;
      this.content.value = '';
    }
  }

  // 错误信息
  function errorInfo(key) {
    return new Error(
      '您没有配置参数' + key + '\n' +
      '必须配置的参数列表如下：\n' +
      '打开输入框按钮的元素类名：plusBtn\n' +
      '输入框区域的元素类名：inputArea\n' +
      '增加项目按钮的元素类名：addBtn\n' +
      '列表承载的元素类名：list\n' +
      '列表项承载的元素类名：itemClass'
    );
  }

  // 列表项模板
  function itemTpl(text) {
    return (
      '<p class="item-content">' + text + '</p>' +
      '<div class="btn-group">' +
      '<a href="javascript:;" class="edit-btn fa fa-edit"></a>' +
      '<a href="javascript:;" class="remove-btn fa fa-times"></a>' +
      '</div>'
    );
  }

  new TodoList();
})(document.getElementsByClassName('todo-wrap')[0]);

