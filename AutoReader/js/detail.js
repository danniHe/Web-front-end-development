/*
*  小说自动阅读器插件
*  配置项
*  1、sTopBtn：回到顶部按钮
*  2、playBtn：播放与暂停按钮
*  3、playImg：播放图标
*  4、pauseImg：暂停图标
*/

// 改动：
// 1、ES6对象方法的简写形式，
// 2、事件处理函数的this传递方式，call改为bind

; (function () {
  var vHeight = getViewportSize().height,
    sHeight = getScrollSize().height,
    playing = false,
    t = null;

  var AutoReader = function (opt) {
    this.sTopBtn = opt.sTopBtn;
    this.playBtn = opt.playBtn;
    this.playImg = opt.playImg;
    this.pauseImg = opt.pauseImg;

    this.init();
  }

  AutoReader.prototype = {
    init() {
      var _self = this;

      // 滚动显示、隐藏按钮
      addEvent(window, 'scroll', _self.sTopBtnShow.bind(_self));

      // 点击按钮回到顶部
      addEvent(_self.sTopBtn, 'click', _self.backToTop.bind(_self));

      // 点击按钮自动播放与暂停
      addEvent(_self.playBtn, 'click', _self.setAutoPlay.bind(_self));
    },

    // 设置自动播放
    setAutoPlay() {
      var sTop = getScrollOffset().top,
        _self = this;

      if (sHeight === vHeight + sTop) {
        console.log(1);
        return;
      }

      if (!playing) {
        t = setInterval(function () {
          var sTop = getScrollOffset().top;

          if (sHeight <= vHeight + sTop) {
            _self.stopPlay();
            return;
          } else {
            window.scrollBy(0, 1);
            _self.playBtn.style.backgroundImage = 'url(' + _self.pauseImg + ')';
            playing = false;
          }
          playing = true;
        }, 50);
      } else {
        _self.stopPlay();
      }
    },

    // 停止播放
    stopPlay() {
      clearInterval(t);
      this.playBtn.style.backgroundImage = 'url(' + this.playImg + ')';
      playing = false;
    },

    // 回到顶部按钮显示与隐藏
    sTopBtnShow() {
      var sTop = getScrollOffset().top,
        sTopBtn = this.sTopBtn;

      sTopBtn.style.display = sTop ? 'block' : 'none';
    },

    // 回到顶部
    backToTop() {
      window.scrollTo(0, 0);
      this.stopPlay();
    }
  };

  window.AutoReader = AutoReader;
})();