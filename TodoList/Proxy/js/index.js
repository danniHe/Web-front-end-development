class TodoList {
  constructor(opt) {
    this.oInput = opt.todoList.getElementsByTagName('input')[0];
    this.oBtn = opt.todoList.getElementsByTagName('button')[0];
    this.oText = opt.todoList.getElementsByTagName('span')[0];
    this.oList = opt.todoList.getElementsByTagName('ul')[0];
    this.arr = opt.arr;

    const _self = this;

    // 创建input的输入对象
    this.inputObj = new Proxy({}, {
      // 当前对象，获取的对象属性，接收器（proxy)
      get(target, key, receiver) {
        return Reflect.get(target, key, receiver);
      },

      // 当前对象，设置的对象属性，设置的值，接收器（proxy）
      set(target, key, value, receiver) {
        if (key === 'text') {
          _self.oInput.value = value;
          _self.oText.innerText = value;
        }
        return Reflect.set(target, key, value, receiver);
      }
    });

    // 创建todoList数组
    this.todoObj = new Proxy([], {
      get(target, key, receiver) {
        return Reflect.get(target, key, receiver);
      },
      set(target, key, value, receiver) {
        if (key !== 'length') {
          const oLi = _self._createLi(value);
          _self.oList.appendChild(oLi);
        }
        return Reflect.set(target, key, value, receiver);
      }
    });

    this.init();
  }

  // 初始化方法
  init() {
    this.render();
    this.bindEvent();
  }

  // 初始渲染列表
  render() {
    this._initList();
  }

  // 事件处理函数绑定
  bindEvent() {
    this.oBtn.addEventListener('click', this.addItem.bind(this), false);
    this.oInput.addEventListener('input', this.showValue.bind(this), false);
  }

  // 点击增加项按钮的事件处理函数
  addItem() {
    this.todoObj.push(this.inputObj.text);
    this.inputObj.text = '';
  }

  // 输入框输入值的事件处理函数
  showValue() {
    this.inputObj.text = this.oInput.value;
  }

  // 初始化todoList列表
  _initList() {
    const oFragment = document.createDocumentFragment();

    this.arr.forEach((item) => {
      const oLi = this._createLi(item);
      oFragment.appendChild(oLi);
    });

    this.oList.appendChild(oFragment);
  }

  // 创建li方法
  _createLi(value) {
    const oLi = document.createElement('li');
    oLi.innerText = value;
    return oLi;
  }
}