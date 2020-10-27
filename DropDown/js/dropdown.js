/* 下拉菜单插件
 * 配置项
 * dropdown：元素
 *        项数
*/

; (function () {
  var timer = null,
    listHeight = 0,
    speed = 2;

  var DropDown = function (opt) {
    this.oDropDown = opt.dropdown;
    this.oList = this.oDropDown.getElementsByClassName('list')[0];

    this.init();
  }

  DropDown.prototype = {
    init: function () {
      addEvent(this.oDropDown, 'mouseenter', this.showList.bind(this, true));
      addEvent(this.oDropDown, 'mouseleave', this.showList.bind(this, false));
    },

    showList: function (show) {
      // 下面用到了计时器，将this保存一下
      var _self = this;
      clearInterval(timer);

      if (show) {
        // 显示下拉列表的动画
        timer = setInterval(function () {
          // 40*5（每项高度*项数）
          if (listHeight >= 200) {
            clearInterval(timer);
          } else {
            // 每隔1ms，列表高度+2
            listHeight = parseInt(getStyles(_self.oList, 'height')) + speed;
            _self.oList.style.height = listHeight + 'px';
          }
        }, 1);

        this.oDropDown.className += " up";
      } else {
        // 隐藏下拉列表的动画
        timer = setInterval(function () {
          if (listHeight <= 0) {
            clearInterval(timer);
          } else {
            // 每隔1ms，列表高度-2
            listHeight = parseInt(getStyles(_self.oList, 'height')) - speed;
            _self.oList.style.height = listHeight + 'px';
          }
        }, 1);

        this.oDropDown.className = "dropdown";
      }
    }
  }
  window.DropDown = DropDown;
})();
