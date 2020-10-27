// sTopBtn：图标
// header: 头部
var sTopBtn = document.getElementsByClassName('s-top-btn')[0],
  header = document.getElementsByClassName('list-hd')[0];

// 滚动显示、隐藏图标
addEvent(window, 'scroll', function () {
  var sTop = getScrollOffset().top;
  //检测滚轮的top距离
  sTopBtn.style.display = sTop ? 'block' : 'none'; 
});

//点击图标到顶部
addEvent(sTopBtn, 'click', function () {
  window.scrollTo(0, 0);
});

//点击header到顶部
addEvent(header, 'click', function () {
  window.scrollTo(0, 0);
});

