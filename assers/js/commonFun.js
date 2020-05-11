/**
 * Author: jerry 
 * @description 公共函数记录
 * @param  //参数
 * @Date //2019-06-24
 */
// ---------------------------------------------start----
/**
 * 用户提示
 */
function tipShow(str) {
	plus.nativeUI.toast(str, {
		duration: "short",
		verticalAlign: "center"
	});
}
/**
 * 接口异常 用户提示
 */
function acceptDateErrorTip() {
	mui.alert('遇到了未知错误，请联系管理人员', '错误提示', function() {
		// info.innerText = '你刚关闭了警告框';
		plus.runtime.quit();
	});
}
/**
 * 退出登录清空存储部分数据
 */
function clearStorage() {
	// 清空所有存储的信息
	plus.storage.clear();
	plus.storage.setItem("lauchFlag", "true");
}
// 同城---------------------------------------------end----
/**  
 * 将毫秒数转化当前日期
 * @param { number } num  毫秒数
 * @return { string } dateTime [dateTime = new Date(1550915906000).toLocaleString()] 返回日期 eg:2019.6.24
 */
Date.prototype.toLocaleString = function() {
	function addZero(num) {
		if (num < 10)
			return "0" + num;
		return num;
	}
	//2019.02.02 12:00:00
	return this.getFullYear() + "." + addZero(this.getMonth() + 1) + "." + addZero(this.getDate())
	// +" "+ + addZero(this.getHours()) + ":" + addZero(this.getMinutes()) + ":" + addZero(this.getSeconds());
}
/**
 * 将过大数字转化为方便查看的简易形式
 * @param {string | number} num 需要转化的数字
 * @return {string} num 转化后的值 eg:1000->1k 21000->2.1w
 */
function numChange(num) {
	var num = parseInt(num);
	if (num >= 10000) {
		num = Math.floor(num / 10000 * 100) / 100 + "w";
	} else if (num >= 1000) {
		num = Math.floor(num / 1000 * 100) / 100 + 'k';
	} else {
		num = num;
	}
	return num;
}

/**
 * 用于把用utf16编码的字符转换成实体字符，以供后台存储 （可在客户端显示手机表情）
 * @param  {string} str 将要转换的字符串，其中含有utf16字符将被自动检出
 * @return {string}     转换后的字符串，utf16字符将被转换成&#xxxx;形式的实体字符
 */
function utf16toEntities(str) {
	var patt = /[\ud800-\udbff][\udc00-\udfff]/g; // 检测utf16字符正则
	str = str.replace(patt, function(char) {
		var H, L, code;
		if (char.length === 2) {
			H = char.charCodeAt(0); // 取出高位
			L = char.charCodeAt(1); // 取出低位
			code = (H - 0xD800) * 0x400 + 0x10000 + L - 0xDC00; // 转换算法
			return "&#" + code + ";";
		} else {
			return char;
		}
	});
	return str;
}
/**
 * 获取页面地址传递过来的参数
 * @param  {name} str 地址参数
 * @return {string}   改参数值
 */
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}
/** 
 * 通过constructor 属性来判断某个对象是否为数组
 * @param {string | object} privateArray 将要判断的元素参数
 * @return {boolean} true/false 
 */
function isArray(privateArray) {
	return privateArray.constructor.toString().indexOf("Array") > -1;
}

/** 
 * 通过constructor 属性来判断某个对象是否为日期对象
 * @param {string | object } privateDate 将要判断的元素参数
 * @return {boolean} true/false 
 */
function isDate(privateDate) {
	return privateDate.constructor.toString().indexOf("Date") > -1;
}
/**
 * @param onNetChange 监听网络变化
 * @param 
 */
function onNetChange() {
	var nt = plus.networkinfo.getCurrentType();
	switch (nt) {
		case plus.networkinfo.CONNECTION_ETHERNET:
		case plus.networkinfo.CONNECTION_WIFI:
			mui.toast("当前网络为WiFi");
			break;
		case plus.networkinfo.CONNECTION_CELL2G:
		case plus.networkinfo.CONNECTION_CELL3G:
		case plus.networkinfo.CONNECTION_CELL4G:
			mui.toast("当前网络非WiFi");
			break;
		default:
			// 延迟跳转
			var layTimer = setTimeout(function() {
				clearTimeout(layTimer);
				goNoNet();
			}, 3000);
			return false;
	}
}
/**
 * @param goNoNet 显示无网络页
 * @param 
 */
function goNoNet() {
	mui.openWindow({ 
		id: 'notNet',
		url: '../views/notNet.html',
		styles: {
			statusbar: {
				background: '#fff'
			}
		},
		show: {
			aniShow: 'none'
		},
		waiting: {
			autoShow: false
		}
	});
}
/**
 * @param phone getPhoneNum 获取验证码
 * @param 
 */
function getPhoneNum(phone, callback) {
	// 验证
	if (!(/^1[3456789]\d{9}$/.test(phone))) {
		tipShow("请正确输入手机号");
		return false;
	} else {
		// 验证通过
		callback && callback();
	}
	// 请求
}
/**
 * @param phone getPhoneNum 再次获取验证码
 * @param 
 */
function verPhoneNum(s, phone, currentDom) {
	// 验证
	if (!(/^1[3456789]\d{9}$/.test(phone))) {
		tipShow("请正确输入手机号");
		return false;
	} else {
		// 重新获取
		countdown(s, phone, currentDom);
	}
	// 请求
}
// 验证码倒计时 60
function countdown(s, phone, currentDom) {
	s--;
	// console.log(s);
	if (s == 0) {
		currentDom.text('重新获取验证码');
		currentDom.css("color", "#008BD5");
		currentDom.on("tap", function() {
			onGetCode(60, phone, currentDom);
		});
	} else {
		currentDom.text(s + '秒后可重发');
		currentDom.css("color", "#999999");
		currentDom.off("tap");
		timerTimer = setTimeout(function() {
			countdown(s, phone, currentDom)
		}, 1000)
	}
};

function onGetCode(num, phone, currentDom) {
	// 校验手机号
	verPhoneNum(num, phone, currentDom);
	// 显示键盘
	currentDom.parent(".verifitionRest").siblings("#numKey").css("display", "block");
	// 获取验证码
	getAuthenticationCode(phone);
}
// 数字键盘
function initNumKey(NumDom, showDom, callback) {
	NumDom.on("tap", "li", function() {
		var _this_val = $(this).text();
		var showDomC = showDom.find("div");
		if (isNaN(_this_val) == false) {
			showDomC.each(function() {
				if ($(this).text() == '') {
					$(this).text(_this_val);
					return false;
				}
			});
			if (showDomC.eq(showDomC.length - 1).text() != '') {
				callback && callback();
			}
		} else if (isNaN(_this_val) == true) {
			if ($(this).hasClass("numClear")) {
				showDomC.text("");
			}
			if ($(this).hasClass("numDelete")) {
				showDomC.each(function(index, element) {
					if (showDomC.eq(0).text() == "") {
						return false;
					} else if (showDomC.eq(showDomC.length - 1).text() !== "") {
						showDomC.eq(showDomC.length - 1).text("");
						return false;
					} else {
						if ($(this).text() == '') {
							showDomC.eq(index - 1).text("");
						}
					}

				});
			}
		}
	});
}
// 数字键盘
function initNumKeyPass(NumDom, showDom, callback) {
	NumDom.on("tap", "li", function() {
		var _this_val = $(this).text();
		var showDomC = showDom.find("div");
		if (isNaN(_this_val) == false) {
			showDomC.each(function() {
				if ($(this).attr("data-num") == '' || $(this).attr("data-num") == undefined) {
					$(this).attr("data-num", _this_val)
					$(this).text("*");
					return false;
				}
			});
			if (showDomC.eq(showDomC.length - 1).attr("data-num")) {
				callback && callback();
			}
		} else if (isNaN(_this_val) == true) {
			if ($(this).hasClass("numClear")) {
				showDomC.attr("data-num", "");
				showDomC.text("");
			}
			if ($(this).hasClass("numDelete")) {
				showDomC.each(function(index, element) {
					if (showDomC.eq(0).attr("data-num") == "" || $(this).attr("data-num") == undefined) {
						return false;
					} else if (showDomC.eq(showDomC.length - 1).attr("data-num")) {
						showDomC.eq(showDomC.length - 1).text("");
						showDomC.eq(showDomC.length - 1).attr("data-num", "");
						return false;
					} else {
						if ($(this).attr("data-num") == '' || $(this).attr("data-num") == undefined) {
							showDomC.eq(index - 1).text("");
							showDomC.eq(index - 1).attr("data-num", "");
						}
					}

				});
			}
		}
	});
}

/**
 * 产生随机整数，包含下限值，但不包括上限值
 * @param {Number} lower 下限
 * @param {Number} upper 上限
 * @return {Number} 返回在下限到上限之间的一个随机整数
 */
function random(lower, upper) {
	return Math.floor(Math.random() * (upper - lower)) + lower;
}
/**
 * 上传图片操作列表
 * @param {object} dom 上传节点
 */
function upImgFun(dom) {
	if (mui.os.plus) {
		var a = [{
			title: "拍照"
		}, {
			title: "从手机相册选择"
		}];
		plus.nativeUI.actionSheet({
			title: "插入图片",
			cancel: "取消",
			buttons: a
		}, function(b) {
			switch (b.index) {
				case 0:
					break;
				case 1:
					getImage(dom); /*拍照*/
					break;
				case 2:
					galleryImg(dom); /*打开相册*/
					break;
				default:
					break;
			}
		})
	}
}
/**
 * 拍照
 * @param {object} dom 上传节点
 */
function getImage(dom, cameraIndex, callback) {
	if (cameraIndex) {
		var c = plus.camera.getCamera(cameraIndex);
	} else {
		var c = plus.camera.getCamera();
	}
	c.captureImage(function(e) {
		// 读取本地文件中选取图片
		plus.io.resolveLocalFileSystemURL(e, function(entry) {
			// 执行上传操作
			// console.log(entry.toLocalURL());
			compressImage(entry.toLocalURL(), dom, callback)
		}, function(e) {
			plus.nativeUI.toast("读取拍照文件错误：" + e.message);
			callback && callback(500);
		});
	}, function(s) {
		console.log("error" + s);
		callback && callback(500);
	}, {
		filename: "_doc/head.jpg"
	})
}
/**
 * 手机相册选择
 * @param {object} dom 上传节点
 */
function galleryImg(dom) {
	plus.gallery.pick(function(a) {
		plus.io.resolveLocalFileSystemURL(a, function(entry) {
			//entry为图片原目录（相册）的句柄
			upImg(entry.toLocalURL(), dom);
		}, function(e) {
			console.log("读取图片错误：" + e.message);
		});
	}, function(a) {}, {
		filter: "image"
	})
}

// 压缩图片
function compressImage(imgUrl, dom, callback) {
	console.log("开始压缩图片：")
	plus.nativeUI.showWaiting();
	// console.log(imgUrl);
	plus.zip.compressImage({
			src: imgUrl,
			dst: imgUrl,
			quality: 20,
			overwrite: true,
			width: '80%'
		},
		function(i) {
			plus.nativeUI.closeWaiting();
			console.log("压缩图片成功：" + JSON.stringify(i));
			imgUrlY = i.target
			// console.log(imgUrlY);
			upImg(imgUrlY, dom, callback);
			return
		},
		function(e) {
			plus.nativeUI.closeWaiting();
			console.log("压缩图片失败: " + JSON.stringify(e));

		});
}
/**
 * 图片上传
 * @param {object} dom 上传节点
 */
function upImg(event, dom, callback) {
	var server = 'http://49.232.97.190:8080/mb/verificNegative';
	var wt = plus.nativeUI.showWaiting("上传中...");
	// console.log(event);
	var uploaderDown = plus.uploader.createUpload(server, {
			method: "post"
		},
		function(t, status) {
			console.log(status)
			if (status == 200) {
				// 插入已选择节点
				var resultData = t.responseText;
				// console.log(resultData);
				if (dom) {
					if (dom.parent(".update_img").hasClass("update_img")) {
						var imgDom = '<img class="currentImg" data-imgId=' + t.responseText + ' src=' + requserTempUpImg + resultData +
							'>';
						dom.parent(".update_img").find("img").css("display", "none");
						dom.parent(".update_img").find(".update_img_close").css("display", "block");
						dom.parent(".update_img").append(imgDom);
						wt.close();
					} else {
						if (dom.find("img")) {
							dom.find("img").remove();
						}
						dom.append({
							"data-upImg": "1",
							"src": requserTempUpImg + resultData,
							"data-imgId": t.responseText
						});
						dom.append($("<img data-upImg='1' data-imgId=" + t.responseText + " src=" + requserTempUpImg + resultData + ">"));
						dom.find("img").load(function() {
							dom.css({
								"background": "#F4F8FE"
							});
							wt.close();
						});
						if (callback) {
							callback && callback(t.responseText);
						}
						wt.close();
					}
				} else {
					if ($(".carPic .carPicAdd").find("li").length > 6) {
						mui.toast("车辆照片仅限5张！");
						if (wt) {
							wt.close();
						}
						return;
					} else {
						var carPicImgDom = '<li class="update_img">\
								<img data-imgId=' + t.responseText +
							' src=' + requserTempUpImg + resultData +
							'>\
								<div style="display: block;" class="update_img_close"><i class="fa fa-close"></i>\
								</div>\
								</li>';
						$(".carPic .carPicAdd").before(carPicImgDom);
						if (wt) {
							wt.close();
						}
					}

				}
			} else {
				tipShow("上传失败，请稍后重试");
				wt.close();
			}
		});
	uploaderDown.addFile(event, {
		key: "filedata"
	}); //添加传输文件 event 文件  key 文件夹名
	uploaderDown.addData("string_key", "string_value");
	uploaderDown.start();
}

/**
 * 手指滑动
 * @param {object} dom 上传节点
 */
function touchSlide(parentDom, callback) {
	var startx;
	var parentDomWidth = parentDom.width();
	var slideDom = parentDom.find(".fa-angle-double-right");
	//手指接触屏幕
	slideDom.on("touchstart", function(e) {
		startx = e.originalEvent.targetTouches[0].pageX;
		$(this).css("left", -450);
	});
	slideDom.on("touchmove", function(e) {
		startx = e.originalEvent.targetTouches[0].pageX;
		if (startx <= 0) {
			startx = 0;
		}
		if (startx >= parentDomWidth - 50) {
			startx = parentDomWidth - 50;
		}
		$(this).css("left", startx - 450);
	});
	slideDom.on("touchend", function(e) {
		if (startx == parentDomWidth - 50) {
			if (slideDom.siblings("span").hasClass("startDriver")) {
				parentDom.css({
					"width": "75%"
				});
				parentDom.find(".fa-angle-double-right").css("display", "none");
				parentDom.find("span").text("绘制起始线路");
				$("#home .returnHome").css("display", "block");
				$("#driverInput").animate({
					"left": "4%"
				}, 'fast');
			} else if (slideDom.siblings("span").hasClass("endDriver")) {
				console.log("同城结束");
			}
			slideDom.css("left", -450);
			// parentDom.find("i").css("display", "none");
			callback && callback();
		} else {
			slideDom.css("left", -450);
		}

	});
}

/**
 * 支付策略
 * @param { object } mui 
 * @param { string } requserUrl 获取支付请求地址
 * @param { string } money 订单参数
 * @param { string } userSessionId 用户会话ID
 */
function payFun(mui, url, dataBase, callback) {
	console.log(JSON.stringify(url) + '路径')
	console.log(JSON.stringify(dataBase) + '沧桑')
	var payWaiting = plus.nativeUI.showWaiting("支付中...");
	// 1.获取支付通道  
	var channel = null;
	plus.payment.getChannels(function(channels) {
		for (var i = 0; i < channels.length; i++) {
			if (channels[i].id == 'wxpay') {
				channel = channels[i];
			}
		}
		// mui.toast("使用支付方式：" + channel.id);
	}, function(e) {
		mui.toast("获取支付通道失败！");
	});
	// 2.发起支付参数请求
	var WXPAYSERVER = url + "/wxPay/unifiedOrder"; //微信支付url地址接口
	mui.ajax(WXPAYSERVER, {
		data: dataBase,
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		type: 'post',
		success: function(data) {
			// 获取支付参数成功回调地址
			console.log("支付参数：" + JSON.stringify(data));
			// 	if (data.code == 0 && data.msg == 'success') {
			// 		var moneyDataBase = JSON.stringify(data.obj);
			// 		plus.payment.request(channel, moneyDataBase, function(data) {
			// 			callback && callback(data);
			// 		}, function(error) {
			// 			console.log("支付失败：" + JSON.stringify(error));
			// 			console.log(JSON.stringify(error));
			// 		});
			// 	}

		},
		error: function(e) {
			mui.toast("获取支付参数失败！");
		},
		complete: function() {
			payWaiting.close();
		}
	});
}


/**
 * 动态添加节点
 *  @param {object} str       类数组 创建的节点
 * 	@param {object} dom 	  要插入元素的节点
 * 	@param {string} attr 	  给插入的节点绑定数据的key值
 * 	@param {string} val 	  给插入的节点绑定数据的value值
 * */
function appendHtml(str, dom, attr, val) {
	var fragmentList = document.createDocumentFragment();

	if (!attr) {
		str.appendTo(fragmentList);
		dom.append(fragmentList);
	} else if (typeof attr == 'object') {
		str.appendTo(dom).data(attr);
		dom.append(fragmentList);
	} else {
		str.appendTo(dom).data(attr, val);
		dom.append(fragmentList);
	}
}
/**
 * 分享盒模型
 *  @param {object} share 分享平台
 * 	@param {object} ex 	 平台标识
 * */
function shareMessage(share, ex, shareJson, shareKeyword, lineEndId) {
	var shareTitle = shareJson.title; //分享标题
	var shareContent = shareJson.desc; //分享简介
	var shareImg = shareJson.img //分享图片
	console.log(shareImg)
	// console.log("分享简介："+shareContent);
	if (shareContent.length > 30) {
		var shareContentReg = shareContent.substr(0, 30) + "...";
	} else {
		var shareContentReg = shareContent;
	}
	var msg = {
		extra: {
			scene: ex
		}
	};
	if (lineEndId && lineEndId[0] != 'lineEnd') {
		msg.href = requserUrlShard + "share/index.html?shareId=" + shareKeyword.userId + "&prductId=" + shareKeyword.productId +
			""; //分享地址/
	} else {
		msg.href = requserUrlShard + "share/index.html?shareId=" + shareKeyword.userId + "&prductId=" + shareKeyword.productId +
			""; //分享地址/
	}
	msg.title = shareTitle;
	msg.content = shareContentReg;
	msg.thumbs = [shareImg]; //链接图片1张
	share.send(msg, function() {
		// mui.toast("分享成功");
		// console.log(JSON.stringify(share));
		console.log("分享到\"" + share.description + "\"成功!");
		// $$.toast("分享到\"" + share.description + "\"成功！ ");
	}, function(e) {
		// mui.toast("分享到\"" + share.description + "\"失败: " + e.code + " - " + e.message);
		mui.toast("请查看是否安装微信并且已登录")
	});
}

/**
 * 讯飞文字转语音
 *  @param {string} str 要转化的文字
 * */
function xfSpeech(str) {
	var reg = /\d{4}/g;
	if (reg.test(str)) {
		str = str.split('');
		// console.log(str);
		str = str.join(' ');
	}
	// console.log(str);
	if (window.plus) {
		isAndroid = (/android/gi).test(navigator.appVersion);
		if (isAndroid) {
			console.log("安卓");
			var main = plus.android.runtimeMainActivity();
			var SpeechUtility = plus.android.importClass('com.iflytek.cloud.SpeechUtility');
			SpeechUtility.createUtility(main, "appid=5d5d08b7");
			var SynthesizerPlayer = plus.android.importClass('com.iflytek.cloud.SpeechSynthesizer');
			var play = SynthesizerPlayer.createSynthesizer(main, null);
			play.startSpeaking(str, null);
		} else {
			console.log("IOS" + str);
			var AVSpeechSynthesizer = plus.ios.importClass("AVSpeechSynthesizer");
			var AVSpeechUtterance = plus.ios.importClass("AVSpeechUtterance");
			var AVSpeechSynthesisVoice = plus.ios.import("AVSpeechSynthesisVoice");
			var sppech = new AVSpeechSynthesizer();
			var voice = AVSpeechSynthesisVoice.voiceWithLanguage("zh-CN");
			var utterance = AVSpeechUtterance.speechUtteranceWithString(str);
			utterance.setVoice(voice);
			sppech.speakUtterance(utterance);
			plus.ios.deleteObject(voice);
			plus.ios.deleteObject(utterance);
			plus.ios.deleteObject(sppech);
		}

	} else {
		console.log("系统环境未准备就绪");
	}
}
/**
 * 百度文字转语音 暂定
 *  @param {string} str 要转化的文字
 * */
function bdSpeech() {
	var tokenUrl = "https://openapi.baidu.com/oauth/2.0/token";
	var client_id = "API Key"; //此处为申请的API Key;
	var client_secret = "Secret Key"; //此处为申请的Secret Key;
	var access_token;
	var data = "grant_type=client_credentials&client_id=" + client_id + "&client_secret=" + client_secret;
	var p = document.createElement("audio"); //创建一个潜在的audio播放器
	var text = '这是一段要转成语音播放的文字，请认真翻译，翻译错了，不好意思，打死你。嘿嘿';
	var a = 0,
		b = 0,
		c = 0;
	var contentArray = new Array();
	if (text.length / 500 >= 0) {
		for (var i = 0; i < tex.length / 500; i++) {
			a = a + 500;
			splitTex = tex.slice(b, a);
			b = a;
			contentArray.push(splitTex);
		}
	}
	mui.ajax({
		type: "get",
		url: tokenUrl,
		data: data,
		async: true,
		success: function(resp) {
			if (resp.access_token) {
				access_token = resp.access_token;
				var shibieUrl = "http://tsn.baidu.com/text2audio";
				tex = encodeURI(encodeURI(contentArray[0]));
				var data = "tex=" + tex + "&tok=" + access_token +
					"&cuid=00:00:00:00:00:00&ctp=1&lan=zh&spd=5&pit=5&vol=5&per=0&aue=3";
				p.controls = "controls";
				p.src = shibieUrl + "?" + data;
				p.play();
				c++;
			} else {}
		},
		error: function(error) {

		}
	});
}

/**
 * 从当前页 跳转 目标页面
 * @param { string } targetId 目标页ID
 */
function toTargetPage(targetId) {
	// 获取目标页
	var target = plus.webview.getWebviewById(targetId);
	if (!targetId) {
		console.log("目标页面不存在!");
		return;
	}
	// 获取当前页面
	var current = plus.webview.currentWebview();
	if (current == target) {
		console.log("目标页是当前页面！");
		return;
	}
	// 将要关闭的页面
	var pages = new Array(current);
	// 父级页面
	var opener = current.opener();
	while (opener) {
		if (opener == target) {
			//获取到目标页面
			target.reload();
			pages.map(function(page) {
				page.close();
			});
			return;
		}
		pages.push(opener);
		opener = opener.opener();
	}
	console.log("目标页面不是当前页面的祖先页面！");
}
/**
 * 从当前页 跳转 目标页面
 * @param { string } targetId 目标页ID
 */
function toCurrentPage() {
	// 获取所有Webview窗口
	var home = plus.webview.getLaunchWebview();
	var homeUrl = plus.webview.getLaunchWebview().getURL();
	var wvs = plus.webview.all();
	for (var i = 0, len = wvs.length; i < len; i++) {
		//关闭除主页页面外的其他页面
		if (wvs[i].getURL() == homeUrl)
			continue;
		plus.webview.close(wvs[i]);
	}
	home.reload(true);
}
/**
 * 保存图片到本地
 * @param 
 */
// function save_img(picurl) {
// 	var bitmap = new plus.nativeObj.Bitmap();
// 	bitmap.loadBase64Data(picurl, function() {
// 		// console.log('加载图片成功');
// 		bitmap.save("_doc/mhtcImg.png", {
// 			overwrite: true,
// 			quality: 10
// 		}, function(i) {
// 			console.log('保存图片成功：'+JSON.stringify(i));
// 			mui.toast("保存成功");
// 			plus.gallery.save(i.target, () => {
// 				plus.io.resolveLocalFileSystemURL(i.filename, (entry) => {
// 					entry.remove();
// 				});
// 			});
// 		}, function(e) {
// 			console.log('保存图片失败：' + JSON.stringify(e));
// 		});
// 	}, function(e) {
// 		console.log('加载图片失败：' + JSON.stringify(e));
// 	});
// }

// 判断IOS 还是苹果
function IOSAnd() {
	var u = navigator.userAgent,
		app = navigator.appVersion;
	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
	var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	if (isAndroid) {
		return true;
	}
	if (isIOS) {
		return false;
	}
}
// 设置应用保持唤醒（屏幕常亮）状态
function setWakelock() {
	plus.device.setWakelock(true);
}
// 关闭应用保持唤醒（屏幕常亮）状态
function closeWakelock() {
	plus.device.setWakelock(false);
}

// 到登录页面
function gotoLoginIn() {
	clearStorage();
	mui.openWindow({
		url: "../login.html",
		id: "login",
		show: {
			aniShow: "slide-in-right"
		}
	});
}

/**
 * 跳转到首页
 * 参数默认为0(首页tab bar 的第一个子页面)
 * */
function toIndex(i) {
	//设置默认值为0
	var i = i || 0;
	var idArr = ["homePage", "category", "shopCart", "personalCenter"];

	var main = plus.webview.getLaunchWebview();
	//var main = plus.webview.getWebviewById("main"); //这里可能返回空；详见官方文档说明
	//显示首页
	//console.log("应用首页,并且切换到对应的选项卡=" + i);
	mui.fire(main, 'tabSwith', {
		id: idArr[i]
	});
	main.show();
};

/* 金额格式 */
function moneyFormat(val) {
	if (val == "" || val == null) {
		return "0.00";
	}
	var value = Math.round(parseFloat(val) * 100) / 100;
	var xsd = value.toString().split(".");
	if (xsd.length == 1) {
		value = value.toString() + ".00";
		return value;
	}
	if (xsd.length > 1) {
		if (xsd[1].length < 2) {
			value = value.toString() + "0";
		}
		return value;
	}
}