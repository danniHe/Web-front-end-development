/*
*  小说自动阅读器插件
*  配置项
*  1、sTopBtn：回到顶部按钮
*  2、playBtn：播放与暂停按钮
*  3、playImg：播放图标
*  4、pauseImg：暂停图标
*/

; (function () {
  // 视口高度
  var vHeight = getViewportSize().height,
    // 文档（页面）高度
    sHeight = getScrollSize().height,
    // playing = false 代表默认是暂停状态         
    playing = false,
    t = null;

  var AutoReader = function (opt) {
    this.sTopBtn = opt.sTopBtn;
    this.playBtn = opt.playBtn;
    this.playImg = opt.playImg;
    this.pauseImg = opt.pauseImg;

    this.init();
  };

  AutoReader.prototype = {
    init: function () {
      var _self = this;

      if (!this.playBtn || !this.sTopBtn || !this.playImg || !this.pauseImg) {
        console.log('请完成所有配置项');
        return;
      }

      // 滚动显示、隐藏图标
      addEvent(window, 'scroll', function () {
        _self.sTopBtnShow.call(_self);
      });

      // 点击图标回到顶部
      addEvent(this.sTopBtn, 'click', function () {
        window.scrollTo(0, 0);
        _self.stopPlay();
      });

      // 点击自动播放
      addEvent(this.playBtn, 'click', function () {
        _self.setAutoPlay();
      });
    },

    //自动播放
    setAutoPlay: function () {
      var sTop = getScrollOffset().top,
        _self = this;

      //文档高度 === 视口高度 + 滚动距离
      if (sHeight === vHeight + sTop) {
        return;
      }

      // 暂停时点击
      if (!playing) {

        // 计时器
        t = setInterval(function () {
          // 重新计算滚动距离
          var sTop = getScrollOffset().top;

          // 滚动到底部
          if (sHeight <= vHeight + sTop) {
            _self.stopPlay();
            return;
          } else {
            // 未滚动到底部, 以1px/50ms的速度滚动
            window.scrollBy(0, 1);
            _self.playBtn.style.backgroundImage = 'url(' + _self.pauseImg + ')';
            playing = false;
          }

          playing = true;   // 计时器是异步代码，playing = true 代表播放状态           
        }, 50);
      } else {
        // 正在播放时点击，会暂停播放
        _self.stopPlay();
      }
    },

    // 停止播放
    stopPlay: function () {
      clearInterval(t);
      this.playBtn.style.backgroundImage = 'url(' + this.playImg + ')';
      playing = false;
    },

    //显示、隐藏回到顶部按钮的图标
    sTopBtnShow: function () {
      var sTop = getScrollOffset().top,
        sTopBtn = this.sTopBtn;

      sTopBtn.style.display = sTop ? 'block' : 'none';
    }
  };

  window.AutoReader = AutoReader;
})();
