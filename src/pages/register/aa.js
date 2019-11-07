window.onload = function asd() {
    function getEle(selector) { 
        return document.querySelector(selector); 
    }
    var box = getEle("#box"), bgColor = getEle(".bgColor"), txt = getEle(".txt"), slider = getEle(".slider"), icon = getEle(".slider>i"), successMoveDistance = box.offsetWidth - slider.offsetWidth, downX, isSuccess = false; 
    slider.onmousedown = mousedownHandler; 
    function mousedownHandler(e) { 
        bgColor.style.transition = "";
         slider.style.transition = ""; 
         var e = e || window.event || e.which; 
         downX = e.clientX; 
         document.onmousemove = mousemoveHandler; 
         document.onmouseup = mouseupHandler; 
    }; 
    function getOffsetX(offset, min, max) {
        if (offset < min) { 
            offset = min; 
        } else if (offset > max) {
             offset = max; 
        }
        return offset;
    }
    function mousemoveHandler(e) {
        var e = e || window.event || e.which; 
        var moveX = e.clientX; 
        var offsetX = getOffsetX(moveX - downX, 0, successMoveDistance);
         bgColor.style.width = offsetX + "px"; 
         slider.style.left = offsetX + "px"; 
         if (offsetX == successMoveDistance) { 
             success(); 
        }
        e.preventDefault();
    }; 
    function mouseupHandler(e) {
        if (!isSuccess) { 
            bgColor.style.width = 0 + "px"; 
            slider.style.left = 0 + "px"; 
            bgColor.style.transition = "width 0.8s linear"; 
            slider.style.transition = "left 0.8s linear"; 
        }
        document.onmousemove = null; 
        document.onmouseup = null;
    }; 
    function success() { 
        isSuccess = true; 
        txt.innerHTML = "解锁成功";
        console.log(this)
        window.localStorage.setItem("isSuccess",true)
        bgColor.style.backgroundColor = "lightgreen"; 
        slider.className = "slider active"; 
        icon.className = "iconfont iconchenggong"; 
        slider.onmousedown = null; 
        document.onmousemove = null; 
        setTimeout(()=>{
            isSuccess=false
            asd()
            mouseupHandler()
            asd()
            localStorage.removeItem("isSuccess");
            
        txt.innerHTML = "请滑动解锁";
        },30000)
        
    };
}
