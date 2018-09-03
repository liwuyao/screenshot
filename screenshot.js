function screenshot(options){
		/*
		  outBoxName： 外框盒子名字
		  isFixed：是否需要固定正方形截图窗
		  width：盒子宽度
		  littleImgName: 缩略图 ;
		  dragWidth; 固定截图拖拽块的宽度
		 */
		var outBoxName;
		var littleImgName;
		    outBoxName = options.outBoxName || false;
		    littleImgName = options.littleImgName || false;
		    if(!outBoxName || !littleImgName){
		    	console.error('outBoxName必须填');
		    }
		    if(!outBoxName || !littleImgName) return;
		var defaultLittleImg = options.defaultLittleImg || 'http://s16.sinaimg.cn/mw690/003gRgrCzy73OGZAV434f&690';
//		    初始化缩略图
		var littleImgElm = document.getElementById(littleImgName);
			littleImgElm.src = defaultLittleImg;
		var isFixed;
			isFixed = options.isFixed || false;
		var boxWidth;
			boxWidth = options.width || 400;
//		添加图片
		var outBoxElm = document.querySelector(outBoxName + ' .screenshot-box-lwy');
//				盒子宽度
			outBoxElm.style.width = boxWidth + 'px';
			outBoxElm.style.height = boxWidth + 'px';
		var boxHeight = boxWidth;
		var inputElm = document.querySelector(outBoxName + ' .upimgs-lwy');
		var addElm = document.querySelector(outBoxName + ' .add-lwy');
		var $Blob; //记录图片数据
		var c1 = document.createElement("canvas");
		var ctx1=c1.getContext("2d");
			c1.width = boxWidth;
			c1.height = boxHeight;
			outBoxElm.appendChild(c1);
		var isReady = false;
//		function addImg(){
//			return inputElm.click();
//		}
//		添加图片
		document.querySelector(outBoxName + ' .add-lwy').onclick=function(){
			return inputElm.click();
		};
//		监听图片更换
		inputElm.onchange=function(ev){
			var src = window.URL.createObjectURL(ev.target.files[0]);
			if(src){
				addElm.style.display = 'none';
				var img = new Image();
				    img.src = src;
				img.onload = function(){
							    ctx1.drawImage(img,0,0,boxWidth,boxHeight);
					}
				isReady = true;
			}
		}
//		创建窗口
			outBoxElm.onmousedown=function(e){
				if(!isReady) return;
				var e = e || event;
				var isDiv = document.querySelector(outBoxName + ' .window-lwy');
				if(isDiv){
					outBoxElm.removeChild(isDiv);
				}
//				记录光标初始位置
				var cursorX = e.offsetX;
				var cursorY = e.offsetY;
				var pageX = e.pageX;
				var pageY = e.pageY;
				//	记录光标变化值
				var changeX;
				var changeY;
//				记录截图盒子在window中的位置
				var winX = outBoxElm.offsetLeft;
				var winY = outBoxElm.offsetTop;
//				创建窗口
				var _div = document.createElement('div');
					_div.className = 'window-lwy';
//					设置窗口位置
				if(!isFixed){//自由截图
					_div.style.left = cursorX - winX + 'px';
					_div.style.top = cursorY -winY + 'px';
					outBoxElm.appendChild(_div);
					outBoxElm.onmousemove=function(ev){
						var ev = ev || event;
	//					记录光标变化值
					    changeX = ev.offsetX - cursorX;
						changeY = ev.offsetY - cursorY;
						_div.style.width = changeX + 'px';
						_div.style.height = changeY + 'px';
					}
					outBoxElm.onmouseup=function(){
						outBoxElm.onmousemove = null;
						var c2 = document.createElement("canvas");
							c2.width = changeX;
							c2.height = changeY;
						var ctx2=c2.getContext("2d");
						var img2 = new Image();
						    img2.src = c1.toDataURL("image/png");
						    img2.onload = function(){
								    ctx2.drawImage(img2,cursorX - winX,cursorY-winY,changeX,changeY,0,0,changeX,changeY)
								    var imgUrl = c2.toDataURL("image/png");
						    	        littleImgElm.src = imgUrl;
						    	    $Blob= getBlobBydataURI(littleImgElm.src,'image/jpeg')
						    	    options.complete($Blob);
							} 
					}	
				}else{//固定截图框
					console.log('yeye')
					var offsetWidth = options.dragWidth || 100;
						_div.style.width = offsetWidth + 'px';
						_div.style.height = offsetWidth + 'px';
					var left = cursorX - offsetWidth/2;
					var top = cursorY - offsetWidth/2;
						_div.style.left = left + 'px';
					    _div.style.top = top + 'px';
						outBoxElm.appendChild(_div);
					outBoxElm.onmousemove=function(ev){
						var ev = ev || event;
	//					记录光标变化值
					    changeX = ev.pageX - pageX;
						changeY = ev.pageY - pageY;
						_div.style.left = left + changeX + 'px';
						_div.style.top = top + changeY + 'px';
					}
					outBoxElm.onmouseup=function(){
						outBoxElm.onmousemove = null;
						var c2 = document.createElement("canvas");
							c2.width = offsetWidth;
							c2.height = offsetWidth;
						var ctx2=c2.getContext("2d");
						var img2 = new Image();
						    img2.src = c1.toDataURL("image/png");
						    img2.onload = function(){
								    ctx2.drawImage(img2,left + changeX,top + changeY,offsetWidth,offsetWidth,0,0,offsetWidth,offsetWidth)
								    var imgUrl = c2.toDataURL("image/png");
						    	        littleImgElm.src = imgUrl;
						    	    $Blob= getBlobBydataURI(littleImgElm.src,'image/jpeg')
						    	    options.complete($Blob);
							} 
					}
				}
			}
//			格式转换
		    function getBlobBydataURI(dataURI,type) { 
			    var binary = window.atob(dataURI.split(',')[1]); 
			    var array = []; 
			    for(var i = 0; i < binary.length; i++) { 
			        array.push(binary.charCodeAt(i)); 
			      } 
			    return new Blob([new Uint8Array(array)], {type:type }); 
		    } 
		}