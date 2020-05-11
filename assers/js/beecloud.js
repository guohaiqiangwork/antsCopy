var beecloud = {};
var channels = null;
var w = null;

beecloud.payReq = function(data, cbsuccess, cberror) {
	doPay(data, cbsuccess, cberror);
};

beecloud.genBillNo = function() {
	// var d = new Date();
	// var vYear = d.getFullYear();
	// var vMon = d.getMonth() + 1;
	// var vDay = d.getDate();
	// var h = d.getHours();
	// var m = d.getMinutes();
	// var se = d.getSeconds();
	// var ms = d.getMilliseconds();
	// billno = "" + vYear + (vMon < 10 ? "0" + vMon : vMon) + (vDay < 10 ? "0" + vDay : vDay) + (h < 10 ? "0" + h : h) + (m < 10 ? "0" + m : m) + (se < 10 ? "0" + se : se) + ms;
	// return billno;
};

mui.plusReady(function() {
	//配置业务支持的支付通道，支付需要服务端支持，在BeeCloud上支持支付宝支付和微信支付；
	var support_channel = ['alipay'];
	if (!mui.os.stream) { //流应用下暂不支持微信SDK支付
		support_channel.push('wxpay');
	}
	// 1.获取支付通道	
	plus.payment.getChannels(function(s) {
		var oauthArea = document.querySelector('.oauth-area');
		for (var i = 0; i < s.length; i++) {
			if (s[i].serviceReady) {
				if (~support_channel.indexOf(s[i].id)) {

				}
			}
		}
		channels = s;
	}, function(e) {
		console.log("获取支付渠道信权限失败:" + e.message);
	});
});

// function getRandomHost() {
// 	var hosts = ['https://apibj.beecloud.cn',
// 		'http://192.168.1.17/aliPay/orderinfo', //支付宝
// 		'http://192.168.1.17/aliPay/orderinfo9',
// 		'https://apiqd.beecloud.cn'
// 	];
// 	// return "" + hosts[parseInt(3 * Math.random())] + "/2/rest/app/bill";
// 	return "" + hosts[parseInt(3 * Math.random())];
// }

/**
 * 获取支付通道
 * 
 */
function getPayChannel(bc_channel) {
	var dc_channel_id = '';
	switch (bc_channel) {
		case 'ALI_APP':
			dc_channel_id = 'alipay';
			break;
		case 'WX_APP':
			dc_channel_id = 'wxpay';
			break;
		default:
			break;
	}
	for (var i in channels) {
		if (channels[i].id == dc_channel_id) {
			return channels[i];
		}
	}
	return null;
}

function doPay(payData, cbsuccess, cberror) {
	// if (payData.source == 'WX') {
	// 			var payUrl = window.requserUrl + '/order/wxPay/' + payData.orderNo ;//pos
	// 	// var payUrl = window.requserUrl + '/integralOrder/integralUnifiedOrder/'+ payData.orderNo;
	// } else if (payData.source == 'ZFB') {
	// 			var payUrl = window.requserUrl + '/order/aliPay/'+ payData.orderNo;//pos
	// 	// var payUrl = window.requserUrl + '/integralOrder/aliPay/'+ payData.orderNo;
	// }
	if (payData.type == 'pos') {
		if (payData.source == 'WX') {
			var payUrl = window.requserUrl + '/order/wxPay/' + payData.orderNo;
		} else if (payData.source == 'ZFB') {
			var payUrl = window.requserUrl + '/order/aliPay/' + payData.orderNo;
		}
	} else {
		if (payData.source == 'WX') {
			var payUrl = window.requserUrl + '/integralOrder/integralUnifiedOrder/' + payData.orderNo;
		} else if (payData.source == 'ZFB') {
			var payUrl = window.requserUrl + '/integralOrder/aliPay/' + payData.orderNo
		}
	}
	if (w) return;
	w = plus.nativeUI.showWaiting();
	mui.ajax(payUrl, {
		type: 'get',
		data: {
			"orderNo": payData.orderNo
		}, //改成这样是因为微信支付id不在地址后面带的
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			console.log('接口返回数据' + JSON.stringify(data))
			// alert("成功");
			w.close();
			w = null;
			var paySrc = '';
			if (data.code == 200) {
				var payChannel = getPayChannel(payData.channel);
				if (payChannel) {
					if (payChannel.id === 'alipay') {
						paySrc = data.data.orderInfo;
					} else if (payChannel.id === 'wxpay') {
						// alert("333");
						// paySrc = data.data;
						var data = data.data;
						console.log("1111==" + JSON.stringify(data));
						var statement = {};
						statement.appid = data.appId;
						statement.noncestr = data.nonceStr;
						statement.package = data.packageValue;
						statement.partnerid = data.partnerId;
						statement.prepayid = data.prepayId;
						statement.timestamp = parseInt(data.timeStamp);
						statement.sign = data.sign;
						paySrc = statement;
					}
					plus.payment.request(payChannel, paySrc, cbsuccess, cberror);
				} else if (payData.channel == 'UN_WEB') {
					//银联在线支付
					var web = plus.webview.create('', "beecloudPay", {
						statusbar: {
							background: "#f7f7f7"
						}
					});
					//注入JS，解决银联界面返回的问题
					web.setJsFile('_www/js/95516.js');
					web.addEventListener('loaded', function() {
						if (!web.isVisible()) {
							web.show();
						}
					});
					web.loadData(data.html);
				}
			} else {
				var bcError = {};
				bcError.code = data.result_code;
				bcError.message = data.result_msg + ":" + data.err_detail;
				cberror(bcError);
			}
		},
		error: function(xhr, errorType, error) {
			console.log("失败");
			w.close();
			w = null;
			cberror(error);
		}
	});
}
