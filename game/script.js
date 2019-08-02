window.onload = function() {
	var main = document.getElementById("main");
	var count = document.getElementById("count");
	var go = document.getElementById("go");

	//设置四种不同的颜色
	cols = ["#000", "#E15650", "#121B39", "#80A84E"];
	function CDiv(classname) {
		//创建节点，一个div一行
		var Div = document.createElement("div");
		//生成（0-3）的随机数，Math.floor()向下取整
		index = Math.floor(Math.random() * 4);
		Div.className = classname;

		for(var i = 0; i < 4; i ++) {
			//创建4个div，代表一行四个
			var iDiv = document.createElement("div");
			Div.appendChild(iDiv);
		}

		//判断main里面有没有元素
		if(main.children.length == 0) {
			main.appendChild(Div);
		} else {
			main.insertBefore(Div, main.children[0]);
		}
		//用上面随机数index,来设置四个div的颜色
		Div.children[index].style.backgroundColor = cols[index];
		//class设置为
		Div.children[index].className = "i";
	}

	function move(obj) {
		//设置速度和分数的初始值
		var speed = 5, num = 0;
		//设置定时器
		obj.timer = setInterval(function() {
			//速度+top
			var step = parseInt(getComputedStyle(obj, null)["top"]) + speed;
			obj.style.top = step + "px";
			if(parseInt(getComputedStyle(obj, null)["top"]) >= 0) {
				CDiv("row");
				obj.style.top = -150 + "px";
			}
			if(obj.children.length == 6) {
				for(var i = 0; i < 4; i ++) {
					//在main中有6个Div时，四块中的有颜色的那一块碰到底线游戏结束
					if(obj.children[obj.children.length - 1].children[i].className == "i") {
						obj.style.top = "-150px";
						count.innerHTML = "GAME OVER: " + num;
						//关闭定时器
						clearInterval(obj.timer);
						//显示开始游戏
						go.children[0].innerHTML = "GAME OVER";
						go.style.display = "block"; 
					}
				}
				obj.removeChild(obj.children[obj.children.length - 1]);	
			}
		 

			obj.onmousedown = function(event) {
				//点击的不是白色
				event = event || window.event;
				if((event.target ? event.target : event.srcElement).className == 'i') {
					//设置点击后的颜色
					(event.target ? event.target : event.srcElement).style.backgroundColor = "#bbb";
					//清空标记
					(event.target ? event.target : event.srcElement).className = '';
					//计分
					num++;
					count.innerHTML = 'current score: ' + num;
				}
				 else {
					obj.style.top = 0;
					count.innerHTML = 'GAME OVER: ' + num;
					//关闭定时器
					clearInterval(obj.timer);
					//显示开始游戏
					go.children[0].innerHTML = 'GAME OVER';
					go.style.display = "block"; 

				}
				//盒子加速
				if(num % 10 == 0) {
					speed++;
				}
			}


			//松开触发停止
			obj.onmouseup = function(event) {
			}	
		}, 20)
	}
	go.children[0].onclick = function() {
		if(main.children.length) {
			//清除main的盒子
			main.innerHTML = "";
		}
		//清空计分
		count.innerHTML = "GAME START"
		//隐藏开始盒子
		this.parentNode.style.display = "none";
		move(main);
	}


}
