// 立即执行函数、面向对象、模板渲染、事件代理

; (function (doc) {
  var Slider = function (opt) {
    this.cur = opt.cur;
    this.active = opt.active;
    this.sliderList = doc.getElementsByClassName(opt.sliderList)[0];
    this.thumbsList = doc.getElementsByClassName(opt.thumbsList)[0];
    this.sliderTpl = doc.getElementById(opt.sliderTpl).innerHTML;
    this.thumbTpl = doc.getElementById(opt.thumbTpl).innerHTML;
    this.data = JSON.parse(doc.getElementById(opt.data).innerHTML);
    this.init();
  }

  Slider.prototype = {
    init: function () {
      render(this.data, this.sliderTpl, this.sliderList);
      render(this.data, this.thumbTpl, this.thumbsList);
      this.initRender();
      this.thumbsList.addEventListener('click', this.bindClick.bind(this), false);
    },

    initRender: function () {
      var fSlideItem = this.sliderList.getElementsByClassName('slider-item')[0];
      var fThumbItme = this.thumbsList.getElementsByClassName('thumb-item')[0];
      fSlideItem.className = 'slider-item ' + this.active;
      fThumbItme.className = 'thumb-item ' + this.cur;
    },

    bindClick: function (e) {
      var sliderItems = this.sliderList.getElementsByClassName('slider-item'),
        thumbItems = this.thumbsList.getElementsByClassName('thumb-item');

      var e = e || window.event,
        tar = e.target || e.srcElement,
        tarItem = tar.elemParent(2),
        index = Array.prototype.indexOf.call(thumbItems, tarItem);

      for (var i = 0; i < thumbItems.length; i++) {
        var thumbItem = thumbItems[i],
          sliderItem = sliderItems[i];

        thumbItem.className = 'thumb-item';
        sliderItem.className = 'slider-item';

        tarItem.className += ' ' + this.cur;
        sliderItems[index].className += ' ' + this.active;
      }
    }
  };

  window.Slider = Slider;
})(document);

