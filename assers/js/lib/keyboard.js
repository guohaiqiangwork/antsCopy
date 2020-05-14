/*
 * Keyboard类
 * @constructor Keyboard
 * */
(function(win,$){
	//判断组件库是否第一次载入,如果是初始化组件库
	win.Plugin = win.Plugin || {};
	
	//Keyboard类构造函数
	function Keyboard(cfgs){
		var default_configs = {
			animate : false,
			value : "",
			value_len : 6,
			bottom : -201,
			bottomMin : -201,
			bottomMax : 0,
			timerFun : null,
			time : 5,
			step : 20,
			className : 'softkeyboard',
			tap_hide : '.tap-hide',
			tap_num : '.tap-num',
			tap_point : '.tap-point',
			tap_ok : '.tap-ok',
			tap_delete : '.tap-delete',
			tipsMessage:'请输入6位数密码',
		};
		var configs = { 
			"id" : "money",
			"blackpwd" : ".blackpwd",
			"tapEventDom" : ".softkeyboard-area"
		};
		mui.extend(true,configs,default_configs,cfgs);
		this.configs = configs;
		this.init();
	}
	
	Keyboard.prototype = {
		init : function(){
			this.insertDom();
			this.bindEvent();
		},
		bindEvent : function(){//绑定事件
			var that = this;
			that.inputDom = document.getElementById(that.configs.id);
			that.blackpwd = $(that.configs.blackpwd);
			//点击金额区域
			mui('body').on('tap',that.configs.tapEventDom,function(){
				that.configs.timerFun = window.setTimeout(function(){
					that.showKeyBoard();
				},that.configs.time);
			})
			
			//点击收起键盘按钮
			mui('.' + this.configs.className).on('tap',that.configs.tap_hide,function(){
				that.configs.timerFun = window.setTimeout(function(){
					that.hideKeyBoard();
				},that.configs.time);
			})
			
			//点击数字键
			mui('.' + this.configs.className).on('tap',that.configs.tap_num + ' span',function(){
				var num = this.innerHTML;
				if(that.configs.value === '' && num === '0'){
					that.configs.value = '0.';
				}else if(that.configs.value === '0'){
					that.configs.value = num;
				}else{
					if(that.configs.value.indexOf('.') === -1){
						that.configs.value += num;
						
					}else{
						if(that.configs.value.length - 1 - that.configs.value.indexOf('.') === 2){
							
						}else{
							that.configs.value += num;
						}
					}
				}
				that.checkValue();
			})
			
			//点击小数点
			mui('.' + this.configs.className).on('tap',that.configs.tap_point + ' span',function(){
				var point = this.innerHTML;
				if(that.configs.value.indexOf('.') === -1){
					if(that.configs.value === ''){
						that.configs.value = '0.';
					}else{
						that.configs.value += point;
					}
					that.checkValue();
				}else{
					return false;
				}
			})
			
			//点击删除
			mui('.' + this.configs.className).on('tap',that.configs.tap_delete,function(){
				var len = that.configs.value.length;
				if(len > 0){
					that.configs.value = that.configs.value.slice(0,len-1);
					that.checkValue();
				}
			})
			
			//点击确认
			mui('.' + this.configs.className).on('tap',that.configs.tap_ok,function(){
				var node = this;
				var hideNode = document.querySelector(that.configs.tap_hide);
				if(node.classList.contains('disabled')){
					return false;
				}else{
					var password = $('.zfinput').val();
					var typeName = $('.zfinput').attr("typeName");
					var dataBase = {
							password: password,
							memberId: plus.storage.getItem('memberId')
						};
					if(password.length != 6){
						tipShow(that.configs.tipsMessage);
					}else{
						mui.trigger(hideNode,'tap');
						var orderNo = $('.zfinput').attr("orderNo") || '';
						var payment = $('.zfinput').attr("payment") || '';
						if(typeName=="setPage"){
							setPagePasswordFunc(mui,dataBase);
						}else if(typeName=="shopPageN" || typeName=="jijvPageN"){
							shoPage_SetPasswordFunc(mui,dataBase);
						}else if(typeName=="shopPageY"){
							shoPagePasswordFunc(mui,dataBase,orderNo,payment);
						}else if(typeName=="jijvPageY"){
							jijvgePasswordFunc(mui,dataBase,orderNo,payment);
						}else if(typeName=="tixPage"){
							/* orderNo-金额,payment-id */
							tixPage_Func(mui,dataBase,orderNo,payment);
						}else if(typeName=="shopPageYJF"){
							shoPagePasswordFuncJF(mui,dataBase,orderNo,payment);
						}
					}
				}
			})
			
		},
		checkValue : function(){//校验数据
			var that = this;
			var okNode = document.querySelector(that.configs.tap_ok);
			if(that.configs.value !== ""){
				if(okNode.classList.contains('disabled')){
					okNode.classList.remove('disabled')
				}
			}else{
				if(!okNode.classList.contains('disabled')){
					okNode.classList.add('disabled')
				}
			}
			/* if(that.configs.value.length > that.configs.value_len){
				that.configs.value = that.configs.value.slice(0,that.configs.value_len);
			}else{
				that.configs.value = (that.configs.value - 0).toFixed(2) + "";
			} */
			that.blackpwd.css('opacity', '0');
			if(that.configs.value.length <= 6){
				that.inputDom.value = that.configs.value;
			}
			that.blackpwd.slice(0, that.configs.value.length).css('opacity', '1')
		},
		submitCheckValue : function(){//提交校验
			var that = this;
			if(/\d{1,7}\.\d{0,1}$/.test(that.configs.value)){//校验如果是11.,0.这样的情况
				that.configs.value = (that.configs.value - 0).toFixed(2) + "";
				that.checkValue();
			}
		},
		showKeyBoard : function(){//显示键盘
			var that = this;
			that.configs.animate = true;
			that.dom.style.display = "block";
			if(that.configs.bottom < that.configs.bottomMax){
				that.configs.bottom += that.configs.step;
				that.dom.style.bottom = that.configs.bottom + 'px';
				that.configs.timerFun = window.setTimeout(function(){
					that.showKeyBoard();
				},that.configs.time);
			}else{
				that.dom.style.bottom = that.configs.bottomMax + 'px';
				window.clearTimeout(that.configs.timerFun);
				that.configs.animate = false;
				that.inputDom.classList.add('selected');
			}
			//console.log(that.configs.bottom);
		},
		hideKeyBoard: function(){//隐藏键盘
			var that = this;
			that.configs.animate = true;
			if(that.configs.bottom > that.configs.bottomMin){
				that.configs.bottom -= that.configs.step;
				that.dom.style.bottom = that.configs.bottom + 'px';
				that.configs.timerFun = window.setTimeout(function(){
					that.hideKeyBoard();
				},that.configs.time);
			}else{
				that.dom.style.bottom = that.configs.bottomMin + 'px';
				that.dom.style.display = "none";
				window.clearTimeout(that.configs.timerFun);
				that.configs.animate = false;
				that.inputDom.classList.remove('selected');
			}
			$('.table>div>.blackpwd').css('opacity', '0');
			$('.zfinput').val("");
			that.configs.value = "";
		},
		insertDom : function(){//插入节点
			var dom = document.createElement('div');
			dom.className = this.configs.className;
			dom.innerHTML = '<div class="item">' + 
								'<div class="pecent3">' + 
									'<ul>' + 
										'<li class="tap-num"><span>1</span></li>' + 
										'<li class="tap-num"><span>2</span></li>' + 
										'<li class="tap-num no-border-right"><span>3</span></li>' + 
									'</ul>' + 
									'<ul>' + 
										'<li class="tap-num"><span>4</span></li>' + 
										'<li class="tap-num"><span>5</span></li>' + 
										'<li class="tap-num no-border-right"><span>6</span></li>' + 
									'</ul>' + 
								'</div>' + 
								'<div class="pecent1">' + 
									'<div class="tap-delete"><span class="delete"><span class="iconfont icon-shanchu"></span></span></div>' + 
								'</div>' + 
							'</div>' + 
							'<div class="item">' + 
								'<div class="pecent3">' + 
									'<ul>' + 
										'<li class="tap-num"><span>7</span></li>' + 
										'<li class="tap-num"><span>8</span></li>' + 
										'<li class="tap-num no-border-right"><span>9</span></li>' + 
									'</ul>' + 
									'<ul class="lastItem">' + 
										'<li class="tap-point"><span>.</span></li>' + 
										'<li class="tap-num"><span>0</span></li>' + 
										'<li class="tap-hide no-border-right"><span class="iconfont icon-jianpan"></span></li>' + 
									'</ul>' + 
								'</div>' + 
								'<div class="pecent1">' + 
									'<div class="tap-ok lastItem disabled"><span>确定</span></div>' + 
								'</div>' + 
							'</div>';
			this.dom = dom;
			document.body.appendChild(dom);
		}
	}

	//将Keyboard类暴露在外部
	win.Plugin.Keyboard = Keyboard;
})(window,jQuery);