; (function (doc) {
  let Slider = function (opt) {
    this.oSliderList = doc.getElementsByClassName('J_sliderList')[0];
    this.oTabList = doc.getElementsByClassName('J_tabList')[0];
    this.oTabBtns = this.oTabList.getElementsByTagName('span');
    this.timer = null;
    this.idx = 0;
  }

  Slider.prototype = {
    init: function () {
      this.autoPly();
    },

    autoPly: function () {
      var _self = this;
      this.timer = setInterval(function () {
        _self.sliderAction();
      }, 3000);
    },

    sliderAction: function () {
      var that = this;      

      this.oTabBtns.forEach(function (item) {
        item.className = 'tab-btn';
      })

      // 0与4对应第一张
      if (this.idx === 4) {
        startMove(this.oSliderList, {
          left: -this.idx * 853
        }, function () {
          that.idx = 0;
          that.oSliderList.style.left = '0px';
          that.oTabBtns[that.idx].className += ' cur';
        });
      } else {
        startMove(this.oSliderList, {
          left: -this.idx * 853
        });
        that.oTabBtns[that.idx].className += ' cur';
      }

      this.idx++;
    }
  }

  new Slider().init();
})(document);
