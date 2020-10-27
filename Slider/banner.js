function createBannerArea(bannerArea, options) {
  // 创建放置图片的div
  var imgArea = document.createElement("div");
  // 创建放置角标的div
  var numberArea = document.createElement("div");
  // 当前显示第几张图片
  var curIndex = 1;
  // 自动切换的计时器
  var changeTimer = null;
  // 自动切换的时间间隔3s
  var interval = 3000;

  // 显示图片
  initImg();
  // 显示角标
  initNumbers();
  // 3.设置状态
  setStatus();
  // 4.自动切换
  autoChange();
  
  function initImg() {
    imgArea.style.width = "100%";
    imgArea.style.height = "100%";
    
    imgArea.style.display = "flex";
    imgArea.style.overflow = "hidden";
    for (let i = 0; i < options.length; i++) {
      const obj = options[i];
      const img = document.createElement("img");
      img.src = obj.imgUrl;
      img.style.width = "100%";
      img.style.height = "100%";
      
      imgArea.appendChild(img);
    }
    imgArea.addEventListener("mouseenter", function () {
      clearInterval(changeTimer);
      changeTimer = null;
    })
    imgArea.addEventListener("mouseleave", function () {
      autoChange();
    })
    bannerArea.appendChild(imgArea);
  }

 
  function initNumbers() {
    numberArea.style.textAlign = "center";
    numberArea.style.marginTop = "-25px";
    for (var i = 0; i < options.length; i++) {
      const span = document.createElement("span");
      span.style.display = "inline-block";
      span.style.margin = "0 7px";
      span.style.borderRadius = "50%";
      span.style.width = "12px";
      span.style.height = "12px";
      span.style.background = "lightgrey";
      span.style.cursor = "pointer";
     
      (function (index) {
        span.addEventListener("click", function () {
          curIndex = index;
          setStatus();
        })
      })(i)
      numberArea.appendChild(span);
    }
    bannerArea.appendChild(numberArea);
  }

 
  function setStatus() {
    // 设置角标背景色
    for (let i = 0; i < numberArea.children.length; i++) {
      if (i === curIndex) {
        // 当前显示的轮播图
        numberArea.children[i].style.background = "#ee926f";
      } else {
        numberArea.children[i].style.background = "lightgrey";
      }
    }
    // 设置图片位置
    var targetMarginLeft = curIndex * -100;
    imgArea.children[0].style.marginLeft = targetMarginLeft + "%";
  }

 
  function autoChange() {
    // changeTimer 全局变量
    changeTimer = setInterval(function () {      
      curIndex = (curIndex === options.length - 1) ? 0 : curIndex + 1;
      setStatus();
    }, interval);
  }
}