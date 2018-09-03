## 简单的截图插件，只包含核心功能，其余样式都可以根据ui设计图自行更改。这样更加利于开发

目前只支持script便签静态文件引入

html 
必须有一个带有id的元素作为父元素（例如demo中id为jietu的div）。目的是为了防止样式冲突。
缩略图的img标签必须设定id（这个元素可以随意放在文档任何位置）。

	<div style="display: flex;" id='jietu'>
			<div class="screenshot-box-lwy">
				<div class="add-lwy">+</div>
				<input type="file" class="upimgs-lwy"  name="image" accept="image/png,image/jpeg"/>
			</div>
			<img id='littleImg' src="" style="width: 100px;height: 100px;margin-left: 40px;"/>
	</div>
	
js

	var demo = new screenshot({
	   		outBoxName:'#jietu', //放置原始图框的父元素，必填
	   	    width:300, //原始图的宽度，默认400px，非必填
	   		isFixed:true, //截图拖拽块是否固定宽高，ture是固定，false是自由大小截图，不填默认为false
	   		dragWidth:100, //截图拖拽块的大小，isFixed为true时设置才有用。默认为100px，非必填
	   		littleImgName:'littleImg', //缩略图的展示img标签的id名，必填
	   		complete:function(res){ //截图完成的返回函数，此时的返回数据是一个文件。直接可用来上传
	   			console.log(res)
	   		}
	   })

注释：结果为base64格式的图片格式，上传的时候用fromData上传。

	formData.append("image", 文件,文件名+".jpg"); 
