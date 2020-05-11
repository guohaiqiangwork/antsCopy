/**
 * @author jerry_sld
 * @params mui/data/callback
 * @version 1.0.0
 * @return {object}
 */
// 全局变量定义  
window.requserUrl = 'http://39.106.180.221:8080'; //测试环境
// window.requserUrl = 'http://192.168.1.101'; //
window.requserUrlShard = 'http://www.bjxrkj.com/';
// 郭海强 start
/**
 * 正常登录获取验证码
 */
function getCode(mui, dataBase, callback) {
	mui.ajax(requserUrl + "/wx/send/messages", {
		timeout: 20000,
		type: 'post',
		data: dataBase,
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				tipShow(data.message);
				callback && callback(data);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};

/**
 * 去登录
 */
function gotoLogin(mui, dataBase, callback) {
	mui.ajax(requserUrl + "/wx/send/login", {
		timeout: 20000,
		type: 'post',
		data: dataBase,
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};
// 获取轮播图
function getLB(mui, dataBase, callback) {
	mui.ajax(requserUrl + "/act/list", {
		timeout: 20000,
		type: 'get',
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			//console.log("11="+JSON.stringify(data));
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function(err) {
			console.log("服务异常，请稍后重试！");
		}
	});
};

//获取活动页图片
function getFind(mui, dataBase, callback) {
	mui.ajax(requserUrl + "/act/find/" + dataBase, {
		timeout: 20000,
		type: 'get',
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};

/* 首页是否有未读信息 */
function hasMessage(mui, userId, callback) {
	mui.ajax(requserUrl + "/message/hasMessage/" + userId, {
		timeout: 20000,
		type: 'get',
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};


/* 获取当前登陆人所有消息 */
function messageList(mui, userId, callback) {
	mui.ajax(requserUrl + "/message/messageList/" + userId, {
		timeout: 20000,
		type: 'get',
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};


/* 获取消息详情 */
function MessageDetail(mui, Id, callback) {
	mui.ajax(requserUrl + "/message/MessageDetail/" + Id, {
		timeout: 20000,
		type: 'get',
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};
/* 广告轮播 */
function getNewsApi(mui, callback) {
	mui.ajax(requserUrl + "/newsApi/index", {
		timeout: 20000,
		type: 'get',
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};
/**
 *获取绑定银行列表
 */
function getBankFindAll(mui, dataBase, callback) {
	mui.ajax(requserUrl + "/bank/findAll/" + dataBase, {
		timeout: 20000,
		type: 'get',
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试获取绑定银行列表");
		}
	});
};

/**
 *绑定银行卡
 */
function getBankSave(mui, dataBase, code, callback) {
	console.log("dataBase: " + JSON.stringify(dataBase));
	console.log("code="+code);
	mui.ajax(requserUrl + "/bank/addBank/" + code, {
		timeout: 20000,
		type: 'post',
		data: JSON.stringify(dataBase),
		contentType: 'application/json',
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};

// 解绑银行卡
function getDeleteBank(mui, dataBase, callback) {
	mui.ajax(requserUrl + "/bank/deleteBank/" + dataBase, {
		timeout: 20000,
		type: 'post',
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};

// 查询是否设置密码
function judgePassword(mui, dataBase, callback) {
	mui.ajax(requserUrl + "/account/isSetPassword/" + dataBase, {
		timeout: 20000,
		type: 'get',
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试获取绑定银行列表");
		}
	});
};

/* 支付密码设置*/
function setPassword(mui, dataBase, callback) {
	console.log("支付密码设置32=" + dataBase.password)
	mui.ajax(requserUrl + "/account/setPassword/" + dataBase.memberId, {
		timeout: 20000,
		type: 'get',
		data: {
			"password": dataBase.password
		},
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};

/**
 * 获取地址列表
 */
function getUserAddress(mui, dataBase, callback) {
	mui.ajax(requserUrl + "/address/findAll/" + dataBase, {
		timeout: 20000,
		type: 'get',
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试!");
		}
	});
};

/**
 * 获取地址详情
 */
function getAddressD(mui, dataBase, callback) {
	mui.ajax(requserUrl + "/address/findById/" + dataBase, {
		timeout: 20000,
		type: 'get',
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试");
		}
	});
};
/**
 * 修改地址保存
 */
function getUpdateAddress(mui, dataBase, callback) {
	mui.ajax(requserUrl + "/address/updateAddress", {
		timeout: 20000,
		type: 'post',
		data: JSON.stringify(dataBase),
		contentType: 'application/json',
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};

/**
 * 新增地址保存
 */
function getAddressSave(mui, dataBase, callback) {
	mui.ajax(requserUrl + "/address/save", {
		timeout: 20000,
		type: 'post',
		data: JSON.stringify(dataBase),
		contentType: 'application/json',
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};

/**
 * 删除地址
 */
function deleteAddress(mui, dataBase, callback) {
	mui.ajax(requserUrl + "/address/deleteAddress/" + dataBase, {
		timeout: 20000,
		type: 'post',
		contentType: 'application/json',
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};

// 退出登录
function getLogOut(mui, callback) {
	mui.ajax(requserUrl + "/wx/logout", {
		timeout: 20000,
		type: 'get',
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};



/**
 * 获取会员昵称等
 */
function getUserDetail(mui, dataBase, callback) {
	//console.log("昵称=="+ dataBase);
	mui.ajax(requserUrl + "/mb/find/" + dataBase, {
		timeout: 20000,
		type: 'get',
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			//console.log("昵称返回参数=="+ JSON.stringify(data))
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("222服务异常，请稍后重试！");
		}
	});
};

/* 判断是否设置 提现密码 */
function isSetPassword(mui, dataBase, callback) {
	mui.ajax(requserUrl + "/account/isSetPassword/" + dataBase, {
		timeout: 20000,
		type: 'get',
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};
/* 获取商品列表（分类中点击二级分类跳转页面后的商品列表，在这个页搜索页调用这个接口） */
function getGoodsList(mui, dataBase, callback) {
	mui.ajax(requserUrl + "/goods/list", {
		timeout: 20000,
		type: 'post',
		data: JSON.stringify(dataBase),
		contentType: 'application/json',
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};
// 获取商品详情
function getPrductDetail(mui, dataBase, callback) {
	mui.ajax(requserUrl + "/goods/find/" + dataBase, {
		timeout: 20000,
		type: 'get',
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};
// 查询我的机具
function getMyItem(mui, dataBase, callback) {
	//console.log("333=="+JSON.stringify(dataBase));
	mui.ajax(requserUrl + "/itme/getMyItem", {
		timeout: 20000,
		type: 'post',
		data: JSON.stringify(dataBase),
		contentType: 'application/json',
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};
// 获取机具名称数据
function getGoodsName(mui, dataBase, callback) {
	mui.ajax(requserUrl + "/itme/getGoodsName/" + dataBase, {
		timeout: 20000,
		type: 'get',
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};
// 机具调拨 查询我的公司  
function getCom(mui, dataBase, callback) {
	mui.ajax(requserUrl + "/mb/getCom/" + dataBase, {
		timeout: 20000,
		type: 'get',
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};

// 机具调拨 我的同事查询
function getMyAllot(mui, dataBase, callback) {
	mui.ajax(requserUrl + "/mb/allot/" + plus.storage.getItem('memberId'), {
		timeout: 20000,
		type: 'get',
		data:dataBase,
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};
// 机具调拨 接收调拨列表查询
function getAllotRece(mui, dataBase, callback) {
	mui.ajax(requserUrl + "/goodsItmeAllot/receiveList/" + dataBase, {
		timeout: 20000,
		type: 'get',
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};

// 机具调拨
function getGoodsItmeAllot(mui, dataBase, callback) {
	mui.ajax(requserUrl + "/goodsItmeAllot/receiveList/" + dataBase, {
		timeout: 20000,
		type: 'get',
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};
// 机具调拨详情
function getAllotList(mui, dataId, callback) {
	console.log("11==" + dataId);
	mui.ajax(requserUrl + "/goodsItmeAllot/list/" + dataId, {
		timeout: 20000,
		type: 'get',
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};

// 立即调拨
function getAddItem(mui, keywords, callback) {
	mui.ajax(requserUrl + "/goodsItmeAllot/addItem", {
		timeout: 20000,
		type: 'post',
		data: JSON.stringify(keywords),
		contentType: "application/json;charsetset=UTF-8",
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};

// 接收调拨详情
function getItemAllById(mui, dataId, callback) {
	mui.ajax(requserUrl + "/goodsItmeAllot/getItemAllById/" + dataId, {
		timeout: 20000,
		type: 'get',
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};

// 接收拒绝调拨
function goAllotResult(mui, keywords, callback) {
	console.log(JSON.stringify(keywords));
	mui.ajax(requserUrl + "/goodsItmeAllot/allotResult", {
		timeout: 20000,
		type: 'post',
		data: JSON.stringify(keywords),
		contentType: "application/json;charsetset=UTF-8",
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};
//提交订单
function saveOrder(mui, keywords, callback) {
	console.log("555==" + JSON.stringify(keywords))
	mui.ajax(requserUrl + "/order/saveOrder", {
		timeout: 20000,
		type: 'post',
		data: JSON.stringify(keywords),
		contentType: "application/json;charsetset=UTF-8",
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			console.log(JSON.stringify(data));
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};

//查询支付参数
function getQueryPayParam(mui, keywords, callback) {
	mui.ajax(requserUrl + "/order/queryPayParam", {
		timeout: 20000,
		type: 'get',
		data: keywords,
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};


//我的订单
function getMyOrderList(mui, keywords, callback) {
	console.log(JSON.stringify(keywords))
	mui.ajax(requserUrl + "/order/queryOrderPage", {
		timeout: 20000,
		type: 'post',
		data: JSON.stringify(keywords),
		contentType: "application/json;charsetset=UTF-8",
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};
// 取消支付
function getCancelPayN(mui, keywords, callback) {
	console.log(keywords);
	mui.ajax(requserUrl + "/order/cancelPay/" + keywords, {
		timeout: 20000,
		type: 'get',
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};

// 订单详情
function goOrderDetail(mui, keywords, callback) {
	mui.ajax(requserUrl + "/order/findOrder/" + keywords, {
		timeout: 20000,
		type: 'get',
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});

}

// 确认收货
function goConfirmReceipt(mui, keywords, callback) {
	console.log("33333=3====" + keywords)
	mui.ajax(requserUrl + "/order/confirmReceipt/" + keywords, {
		timeout: 20000,
		type: 'get',
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});

}
// 余额支付
function un_webPay(mui, dataBase, callback) {
	console.log("余额支付11=" + JSON.stringify(dataBase));
	mui.ajax(requserUrl + "/order/balancePay", {
		timeout: 20000,
		type: 'get',
		data: dataBase,
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};
// 支付密码校验
function passwordCheck(mui, dataBase, callback) {
	console.log("33333333=="+JSON.stringify(dataBase));
	mui.ajax(requserUrl + "/account/passwordCheck/" + dataBase.memberId, {
		timeout: 20000,
		type: 'post',
		data: {
			password: dataBase.password
		},
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				//tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};

//查询物流信息
function getViewLogistics(mui, dataBase, callback) {
	mui.ajax(requserUrl + "/order/viewLogistics", {
		timeout: 20000,
		type: 'post',
		data: dataBase,
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			console.log(JSON.stringify(data))
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};
//查询用户信息
function myMassage(mui, memberId, callback) {
	mui.ajax(requserUrl + "/mb/find/" + memberId, {
		timeout: 20000,
		type: 'get',
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			callback && callback(data);
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};

//查询收益
function getMyEarnings(mui, keywords, callback) {
	mui.ajax(requserUrl + "/mb/getMyEarnings", {
		timeout: 20000,
		type: 'post',
		data: keywords,
		contentType: "application/json;charsetset=UTF-8",
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			//console.log(JSON.stringify(data));
			callback && callback(data);
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};
//查询收益详情 5555555
function getMyEarningsDay(mui, keywords, callback) {
	mui.ajax(requserUrl + "/mb/getMyEarningsDay", {
		timeout: 20000,
		type: 'post',
		data: keywords,
		contentType: "application/json;charsetset=UTF-8",
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			//console.log(JSON.stringify(data));
			callback && callback(data);
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};
//查询收益具体详情 
function getMyEarningsDayDetails(mui, keywords, callback) {
	mui.ajax(requserUrl + "/mb/getMyEarningsDayDetails", {
		timeout: 20000,
		type: 'post',
		data: keywords,
		contentType: "application/json;charsetset=UTF-8",
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			//console.log(JSON.stringify(data));
			callback && callback(data);
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};
// 我的代理   
function getAgency(mui, keywords, callback) {
	mui.ajax(requserUrl + "/mb/getAgency/" + keywords, {
		timeout: 20000,
		type: 'get',
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			//console.log(JSON.stringify(data));
			callback && callback(data);
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};
// 我的代理团队人员列表
function getTeam(mui, keywords, callback) {
	mui.ajax(requserUrl + "/mb/getTeam/" + keywords, {
		timeout: 20000,
		type: 'get',
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			//console.log(JSON.stringify(data));
			callback && callback(data);
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};
// 我的代理团队人员列表
function getTeamDetails(mui, keywords, callback) {
	mui.ajax(requserUrl + "/mb/getTeamDetails/" + keywords, {
		timeout: 20000,
		type: 'get',
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			callback && callback(data);
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};
// 查询调拨记录  
function getAllotHistory(mui, keywords, callback) {
	mui.ajax(requserUrl + "/goodsItmeAllot/history", {
		timeout: 20000,
		type: 'post',
		data: JSON.stringify(keywords),
		contentType: "application/json;charsetset=UTF-8",
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			//console.log(JSON.stringify(data));
			callback && callback(data);
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};
//查询版本号  {version}
function getVersion(mui, dataBase, callback) {
	mui.ajax(requserUrl + "/appVersionNumber/getVersion/" + dataBase, {
		timeout: 20000,
		type: 'get',
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};

// 获取首页顶部数据
function getIndexAmountCount(mui, dataBase, callback) {
	mui.ajax(requserUrl + "/indexAmountCount/" + dataBase, {
		timeout: 20000,
		type: 'get',
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};

// 获取首页分类数据
function getIndexBrandCount(mui, dataBase, callback) {
	mui.ajax(requserUrl + "/indexBrandCount/" + dataBase, {
		timeout: 20000,
		type: 'get',
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};
// 获取我的流水
function getAccountOneYear(mui, keywords, callback) {
	mui.ajax(requserUrl + "/account/getAccountOneYear", {
		timeout: 20000,
		type: 'post',
		data: JSON.stringify(keywords),
		contentType: "application/json;charsetset=UTF-8",
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			//console.log(JSON.stringify(data));
			callback && callback(data);
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};

// 获取收益详情
function getCountDetailView(mui, dataBase, callback) {
	mui.ajax(requserUrl + "/countDetailView", {
		timeout: 20000,
		type: 'get',
		data: dataBase,
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};

// 获取支付累计总收益页面数据
function getPayTotalAmountView(mui, dataBase, callback) {
	mui.ajax(requserUrl + "/payTotalAmountView", {
		timeout: 20000,
		type: 'get',
		data:dataBase,
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};

// 获取品牌getQueryAgentTeam
function getQueryBrand(mui,callback) {
	mui.ajax(requserUrl + "/queryBrand/" + plus.storage.getItem('memberId'), {
		timeout: 20000,
		type: 'get',
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};
// 获取代理
function getQueryAgentTeam(mui,callback) {
	mui.ajax(requserUrl + "/mb/queryAgentParam", {
		timeout: 20000,
		type: 'get',
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};

//总收益详情数据  
function getTotalAmountDetailView(mui, keywords, callback) {
	mui.ajax(requserUrl + "/totalAmountDetailView", {
		timeout: 20000,
		type: 'post',
		data: JSON.stringify(keywords),
		contentType: "application/json;charsetset=UTF-8",
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			//console.log(JSON.stringify(data));
			callback && callback(data);
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};

// 获取代理
function getMyAgentTeamDataCount(mui,callback) {
	mui.ajax(requserUrl + "/myAgentTeamDataCount/" + plus.storage.getItem('memberId'), {
		timeout: 20000,
		type: 'get',
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};

// 获取我的页面数据
function getPersonCenter(mui,callback) {
	mui.ajax(requserUrl + "/personCenter/" + plus.storage.getItem('memberId'), {
		timeout: 20000,
		type: 'get',
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};

//我的收益数据
function getPersonCenterTotalAmountView(mui,data,callback) {
	mui.ajax(requserUrl + "/personCenterTotalAmountView", {
		timeout: 20000,
		type: 'get',
		data:data,
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};
// 我的总收益详情
function getPsersonCenterTotalAmountDetail(mui, keywords, callback) {
	mui.ajax(requserUrl + "/psersonCenterTotalAmountDetail", {
		timeout: 20000,
		type: 'post',
		data: JSON.stringify(keywords),
		contentType: "application/json;charsetset=UTF-8",
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			callback && callback(data);
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};


// 获取品牌列表 /
function getQuyerBrandList(mui,callback) {
	mui.ajax(requserUrl + "/quyerBrandList", {
		timeout: 20000,
		type: 'get',
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};

// 删除机具订单
function getDeleteOrder(mui,data,callback) {
	mui.ajax(requserUrl + "/order/delete/" + data, {
		timeout: 20000,
		type: 'get',
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};

// 删除商城订单
function getDeleteOrderInte(mui,data,callback) {
	mui.ajax(requserUrl + "/integralOrder/deleteOrder", {
		timeout: 20000,
		type: 'get',
		data:data,
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};
// 删除消息单个
function getDeleteMessage(mui,data,callback) {
	console.log(JSON.stringify(data))
	mui.ajax(requserUrl + "/message/deleteMessage", {
		timeout: 20000,
		type: 'get',
		data:data,
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};
// 获取协议内容
function getQueryProtocol(mui,data,callback) {
	mui.ajax(requserUrl + "/goods/queryProtocol", {
		timeout: 20000,
		type: 'get',
		data:data,
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};

// 获取入网图片
function getQueryNetworkAccess(mui,data,callback) {
	mui.ajax(requserUrl + "/queryNetworkAccess", {
		timeout: 20000,
		type: 'get',
		data:data,
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};


// 郭海强 end


/**
 * 获取会员余额
 */
function getUserMoney(mui, dataBase, callback) {
	mui.ajax(requserUrl + "/account/find/" + dataBase, {
		timeout: 20000,
		type: 'get',
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};


/* 获取主分类列表 */
function getCategoryList(mui, dataBase, callback) {
	mui.ajax(requserUrl + "/sort/selectSortF", {
		timeout: 20000,
		type: 'get',
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};


/* 获取子分类列表 */
function getSonCategoryList(mui, dataBase, callback) {
	mui.ajax(requserUrl + "/sort/selectSortC/" + dataBase, {
		timeout: 20000,
		type: 'get',
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};

/**
 * 实名认证   判断是否实名认证
 */
function getHasVerific(mui, memberId, callback) {
	mui.ajax(requserUrl + "/mb/hasVerific/" + memberId, {
		timeout: 20000,
		type: 'get',
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};


/* 获取用户信息 */
function getUserList(mui, dataBase, callback) {
	mui.ajax(requserUrl + "/mb/find/" + dataBase, {
		timeout: 20000,
		type: 'get',
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				if (data.message == "当前用户未登录") {
					mui.openWindow({
						url: '../login.html',
						id: 'login',
						show: {
							aniShow: "slide-in-right"
						}
					});
					return;
				}
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！ 获取用户信息");
		}
	});
};

/* 修改用户信息 */
function updateName(mui, dataBase, callback) {
	//alert("22="+ JSON.stringify(dataBase));
	//console.log("11="+ JSON.stringify(dataBase));
	mui.ajax(requserUrl + "/mb/updateMember", {
		timeout: 20000,
		type: 'post',
		data: JSON.stringify(dataBase),
		contentType: 'application/json',
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};

/* 修改手机号 */
function updateMobile(mui, dataBase, callback) {
	mui.ajax(requserUrl + "/mb/updateMobile/" + dataBase.memberId, {
		timeout: 20000,
		type: 'post',
		data: dataBase,
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};

/* 修改支付密码 */
function updatePassword(mui, dataBase, callback) {
	mui.ajax(requserUrl + "/account/updatePassword/" + plus.storage.getItem('memberId'), {
		timeout: 20000,
		type: 'post',
		data: dataBase,
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};

/* 查询会员账户流水 */
function fallBankMassage(mui, dataBase, callback) {
	mui.ajax(requserUrl + "/acc/flow/findAll", {
		timeout: 20000,
		type: 'post',
		data: JSON.stringify(dataBase),
		contentType: 'application/json',
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};


/* 判断会员是否绑定银行卡 */
function slectCheckBank(mui, dataBase, callback) {
	mui.ajax(requserUrl + "/bank/checkBank/" + dataBase, {
		timeout: 20000,
		type: 'get',
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};


/* 获取首页轮播图片 */


/* 查询首页banner图 */
function getBanner(mui, dataBase, callback) {
	mui.ajax(requserUrl + "/banner/find", {
		timeout: 20000,
		type: 'post',
		data: JSON.stringify(dataBase),
		contentType: 'application/json',
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("1111服务异常，请稍后重试！");
		}
	});
};
/* 首页标题栏分类*/
function getHot(mui, dataBase, callback) {
	mui.ajax(requserUrl + "/sort/getHot", {
		timeout: 20000,
		type: 'get',
		success: function(data) {
			//console.log("首页标题栏分类="+ JSON.stringify(data))
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("1111服务异常，请稍后重试！");
		}
	});
};


/* 新品发现 */
function getNewGoods(mui, dataBase, callback) {
	mui.ajax(requserUrl + "/goods/getNewGoods", {
		timeout: 20000,
		type: 'get',
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("1111服务异常，请稍后重试！");
		}
	});
};

/* 首页下方商品展示 */
/* function getHomeGoodsBySort(mui, code_id, callback) {
	mui.ajax(requserUrl + "/goods/getHomeGoodsBySort/" + code_id, {
		timeout: 20000,
		type: 'get',
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
}; */


/* 获取子分类 */
function selectSortC(mui, code_id, callback) {
	mui.ajax(requserUrl + "/sort/selectSortC/" + code_id, {
		timeout: 20000,
		type: 'get',
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};
/* 获取商品列表（分类中点击二级分类跳转页面后的商品列表，在这个页搜索页调用这个接口） */
function getGoodsCondition(mui, dataBase, callback) {
	//console.log("11="+JSON.stringify(dataBase))
	mui.ajax(requserUrl + "/goods/getGoodsCondition", {
		timeout: 20000,
		type: 'post',
		data: JSON.stringify(dataBase),
		contentType: 'application/json',
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};

// 获取详情购物车数量
function getShoppingCart(mui, dataBase, callback) {
	mui.ajax(requserUrl + "/shoppingCart/getNum/" + dataBase, {
		timeout: 20000,
		type: 'get',
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};
// 添加购物车
function addShoppingCart(mui, dataBase, callback) {
	//console.log("添加购物车="+ JSON.stringify(dataBase));
	mui.ajax(requserUrl + "/shoppingCart/addCart", {
		timeout: 20000,
		type: 'post',
		data: JSON.stringify(dataBase),
		contentType: 'application/json',
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};


// 查询购物车列表 有效
function cartList(mui, userId, callback) {
	//console.log("555="+userId);
	mui.ajax(requserUrl + "/shoppingCart/cartList/" + userId, {
		timeout: 20000,
		type: 'get',
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function(data1) {
			console.log("333=" + JSON.stringify(data1));
			console.log("服务异常，请稍后重试！");
		}
	});
};


// 查询购物车列表 已失效列表
function cartListNo(mui, userId, callback) {
	mui.ajax(requserUrl + "/shoppingCart/cartListNo/" + userId, {
		timeout: 20000,
		type: 'get',
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				//tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};

// 获取我的订单
function getMyOrder(mui, dataBase, callback) {
	//console.log("11="+ JSON.stringify(dataBase));
	mui.ajax(requserUrl + "/order/mb/list", {
		timeout: 20000,
		type: 'post',
		data: JSON.stringify(dataBase),
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		contentType: 'application/json',
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};


//购物车数量加减接口
function setCarttNum(mui, dataBase, callback) {
	//console.log("减数量=" + JSON.stringify(dataBase));
	mui.ajax(requserUrl + "/shoppingCart/setCarttNum", {
		timeout: 20000,
		type: 'post',
		data: JSON.stringify(dataBase),
		contentType: 'application/json',
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			//console.log(JSON.stringify(data));
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};


/* 删除/批量删除 */
function delCarts(mui, dataBase, callback) {
	console.log("dataBase-----==" + JSON.stringify(dataBase))
	mui.ajax(requserUrl + "/shoppingCart/delCarts", {
		timeout: 20000,
		type: 'post',
		data: JSON.stringify(dataBase),
		contentType: 'application/json',
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			console.log(JSON.stringify(data));
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};


/* 提现到银行卡 */
function reflectBank(mui, dataBase, callback) {
	mui.ajax(requserUrl + "/account/reflectBank", {
		timeout: 20000,
		type: 'post',
		data: dataBase,
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};


/* 去结算 */
function settle(mui, dataBase, callback) {
	mui.ajax(requserUrl + "/order/mb/settle", {
		timeout: 20000,
		type: 'post',
		data: dataBase,
		contentType: 'application/json',
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};



/* 获取订单详情 */
function getOrderDetail(mui, dataBase, callback) {
	mui.ajax(requserUrl + "/order/mb/detail", {
		timeout: 20000,
		type: 'get',
		data: dataBase,
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};

/* 提交订单 */
function placeAnOrder(mui, dataBase, callback) {
	//console.log("提交订单 = " + JSON.stringify(dataBase));
	mui.ajax(requserUrl + "/order/mb/placeAnOrder", {
		timeout: 20000,
		type: 'post',
		data: JSON.stringify(dataBase),
		contentType: 'application/json',
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			//console.log("返回参数="+ JSON.stringify(data));
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};




// 取消支付
function getCancelPay(mui, dataBase, callback) {
	mui.ajax(requserUrl + "/order/mb/cancelPay", {
		timeout: 20000,
		type: 'post',
		data: dataBase,
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};
// 删除订单
function getDelete(mui, dataBase, callback) {
	mui.ajax(requserUrl + "/order/mb/delete", {
		timeout: 20000,
		type: 'post',
		data: dataBase,
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};
// 确认收货
function getConfirmReceipt(mui, dataBase, callback) {
	mui.ajax(requserUrl + "/order/mb/confirmReceipt", {
		timeout: 20000,
		type: 'post',
		data: dataBase,
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};

// 再次购买
function getBuyAgain(mui, dataBase, callback) {
	mui.ajax(requserUrl + "/order/mb/buyAgain", {
		timeout: 20000,
		type: 'post',
		data: dataBase,
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};

// 获取历史搜索
function getSearchList(mui, dataBase, callback) {
	mui.ajax(requserUrl + "/searchHistory/getList/" + dataBase, {
		timeout: 20000,
		type: 'get',
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				// tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};
// 清空历史信息
function getSearchDelete(mui, dataBase, callback) {
	mui.ajax(requserUrl + "/searchHistory/delete/" + dataBase, {
		timeout: 20000,
		type: 'get',
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				// tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};
// 查询热门搜索
function getTopList(mui, dataBase, callback) {
	mui.ajax(requserUrl + "/hotSearch/getTop", {
		timeout: 20000,
		type: 'get',
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				// tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};




// 获取可申请订单
function getMyReturn(mui, dataBase, callback) {
	mui.ajax(requserUrl + "/return/mb/apply", {
		timeout: 20000,
		type: 'post',
		data: JSON.stringify(dataBase),
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		contentType: 'application/json',
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};
// 获取申请订单记录
function getApplyRecord(mui, dataBase, callback) {
	mui.ajax(requserUrl + "/return/mb/applyRecord", {
		timeout: 20000,
		type: 'post',
		data: JSON.stringify(dataBase),
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		contentType: 'application/json',
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};
// 退款接口
function getRefund(mui, dataBase, callback) {
	mui.ajax(requserUrl + "/return/mb/refund", {
		timeout: 20000,
		type: 'post',
		data: JSON.stringify(dataBase),
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		contentType: 'application/json',
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};
//判断是否可退换货/return/mb/addLogistics
function getIsLapse(mui, dataBase, callback) {
	mui.ajax(requserUrl + "/order/mb/isLapse/" + dataBase, {
		timeout: 20000,
		type: 'post',
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		contentType: 'application/json',
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};
//填写物流单号
function getAddLogistics(mui, dataBase, callback) {
	mui.ajax(requserUrl + "/return/mb/addLogistics", {
		timeout: 20000,
		type: 'post',
		data: dataBase,
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};

//获取好友列表
function getMyFirend(mui, dataBase, callback) {
	mui.ajax(requserUrl + "/mb/myFirend", {
		timeout: 20000,
		type: 'post',
		data: JSON.stringify(dataBase),
		contentType: 'application/json',
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};
//精彩活动详情
function getContentI(mui, dataBase, callback) {
	console.log("dataBase=" + dataBase);
	mui.ajax(requserUrl + "/banner/content/" + dataBase, {
		timeout: 20000,
		type: 'get',
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};

//查询冻结金额
function getFreezeAmount(mui, dataBase, callback) {
	mui.ajax(requserUrl + "/account/freezeAmount/" + dataBase, {
		timeout: 20000,
		type: 'get',
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};
//查询提现结果 
function getAccountDe(mui, dataBase, callback) {
	mui.ajax(requserUrl + "/account/accountDe/" + dataBase, {
		timeout: 20000,
		type: 'get',
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};

//查询绑定人关系
function getShareId(mui, dataBase, callback) {
	mui.ajax(requserUrl + "/share/getShareId", {
		timeout: 20000,
		type: 'get',
		data: dataBase,
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				//tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};

//修改当前铃声
function setPhoneRingtone(mui, dataBase, callback) {
	mui.ajax(requserUrl + "/mb/setPhoneRingtone", {
		timeout: 20000,
		type: 'post',
		data: dataBase,
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				//tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};


//查询当前铃声状态
function getPhoneRingtone(mui, dataBase, callback) {
	mui.ajax(requserUrl + "/mb/getPhoneRingtone/" + dataBase, {
		timeout: 20000,
		type: 'get',
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};


//验证是否登录
function isLogin(mui, dataBase, callback) {
	mui.ajax(requserUrl + "/wx/isLogin", {
		timeout: 20000,
		type: 'get',
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			console.log("111=" + JSON.stringify(data))
			callback && callback(data);
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};



//查询余额
function findBalance(mui, memberId, callback) {
	mui.ajax(requserUrl + "/account/find/" + memberId, {
		timeout: 20000,
		type: 'get',
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			callback && callback(data);
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};





/**
 * 实名认证
 */
function getSaveVerific(mui, dataBase, callback) {
	console.log("dataBase111111111==" + JSON.stringify(dataBase))
	mui.ajax(requserUrl + "/mb/saveVerific", {
		timeout: 20000,
		type: 'post',
		data: JSON.stringify(dataBase),
		contentType: 'application/json',
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			tipShow("信息错误,认证不通过");
			console.log("服务异常，请稍后重试！");
		}
	});
};

/* 修改头像 */
function uploadAvatar(mui, dataBase, callback) {
	//console.log("123="+ JSON.stringify(dataBase));
	var memberId = plus.storage.getItem('memberId');
	//console.log("memberId=" + memberId);
	mui.ajax(requserUrl + "/mb/uploadAvatar/" + memberId, {
		timeout: 20000,
		type: 'post',
		data: dataBase,
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};

//推广二维码
function get_qrCode(mui, memberId, callback) {
	mui.ajax(requserUrl + "/mb/qrCode/" + memberId, {
		timeout: 20000,
		type: 'get',
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			//console.log("11="+JSON.stringify(data));
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("111服务异常，请稍后重试！");
		}
	});
};


//新闻List
function getNewList(mui, callback) {
	mui.ajax(requserUrl + "/news/getTitle", {
		timeout: 20000,
		type: 'get',
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			//console.log("11="+JSON.stringify(data));
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("111服务异常，请稍后重试！");
		}
	});
};

//新闻详情
function getNewContent(mui, id, callback) {
	mui.ajax(requserUrl + "/news/getContent/" + id, {
		timeout: 20000,
		type: 'get',
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("111服务异常，请稍后重试！");
		}
	});
};





function getLimitSix(mui, callback) {
	mui.ajax(requserUrl + "/goodsInfo/limitSix", {
		timeout: 20000,
		type: 'get',
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("111服务异常，请稍后重试！");
		}
	});
};
//积分商城分类
function getjfClassify(mui, baasDate, callback) {
	mui.ajax(requserUrl + "/sort/queryPageList", {
		timeout: 20000,
		type: 'post',
		data: JSON.stringify(baasDate),
		contentType: "application/json;charsetset=UTF-8",
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			//console.log("333=" + JSON.stringify(data));
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};
//商品列表 商品列表搜索 
function getselectPageList(mui, bassDate, callback) {
	mui.ajax(requserUrl + "/goodsInfo/selectPageList", {
		timeout: 20000,
		type: 'post',
		contentType: "application/json;charsetset=UTF-8",
		data: JSON.stringify(bassDate),
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};
//获取我的订单
function getqueryPageList(mui, keywords, callback) {
	mui.ajax(requserUrl + "/integralOrder/queryPageList", {
		timeout: 20000,
		type: 'post',
		data: JSON.stringify(keywords),
		contentType: "application/json;charsetset=UTF-8",
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			//console.log("111="+JSON.stringify(data));
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};

// 获取商品详情
function getgoodsDetails(mui, goodsId, callback) {
	//console.log("获取商品详情="+ goodsId);
	mui.ajax(requserUrl + "/goodsInfo/goodsDetails", {
		timeout: 20000,
		type: 'get',
		data: {
			goodsId: goodsId
		},
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			//console.log("获取商品详情="+ JSON.stringify(data));
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};

//提交订单
function get_jfsaveOrder(mui, keywords, callback) {
	//console.log("333="+JSON.stringify(keywords))
	mui.ajax(requserUrl + "/integralOrder/saveOrder", {
		timeout: 20000,
		type: 'post',
		data: JSON.stringify(keywords),
		contentType: "application/json;charsetset=UTF-8",
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};

// 积分订单详情
function goJFOrderDetail(mui, keywords, callback) {
	mui.ajax(requserUrl + "/integralOrder/orderDetail", {
		timeout: 20000,
		type: 'get',
		data: {
			orderId: keywords
		},
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
}
//支付页面参数查询
function getqueryPayParam(mui, keywords, callback) {
	mui.ajax(requserUrl + "/integralOrder/queryPayParam", {
		timeout: 20000,
		type: 'get',
		data: keywords,
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};
//设置支付密码

// 余额支付  积分支付
function un_orderPay(mui, dataBase, callback) {
	mui.ajax(requserUrl + "/integralOrder/orderPay", {
		timeout: 20000,
		type: 'get',
		data: dataBase,
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};

//积分商城 取消支付
function getcancelPay(mui, keywords, callback) {
	mui.ajax(requserUrl + "/integralOrder/cancelPay", {
		timeout: 20000,
		type: 'get',
		data: {
			orderId: keywords
		},
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};


// 积分商城轮播图
function getJf_LB(mui, dataBase, callback) {
	mui.ajax(requserUrl + "/integralAct/list", {
		timeout: 20000,
		type: 'get',
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function(err) {
			console.log("服务异常，请稍后重试！");
		}
	});
};

//商城获取轮播详情
function getIntegralAct(mui, dataBase, callback) {
	console.log("7711=" + dataBase);
	mui.ajax(requserUrl + "/integralAct/find/" + dataBase, {
		timeout: 20000,
		type: 'get',
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			console.log("77=" + JSON.stringify(data));
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};

//商城查询物流信息
function getsc_ViewLogistics(mui, dataBase, callback) {
	mui.ajax(requserUrl + "/order/viewLogistics", {
		timeout: 20000,
		type: 'post',
		data: dataBase,
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			console.log("商城查询物流信息=" + JSON.stringify(data))
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};

// 商城订单确认收货
function gojf_confirmReceipt(mui, dataBase, callback) {
	console.log("11==" + JSON.stringify(dataBase));
	mui.ajax(requserUrl + "/integralOrder/confirmReceipt", {
		timeout: 20000,
		type: 'get',
		data: dataBase,
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
}

//公告详情
function getNotice(mui, dataBase, callback) {
	mui.ajax(requserUrl + "/newsApi/find/" + dataBase, {
		timeout: 20000,
		type: 'get',
		data: dataBase,
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
}



/* 杜志强 2020年2月24日 开始 ==================================================== */

//余额 （分润 激活 ）l查询流水
function getAccount(mui, dataBase, callback) {
	//console.log("请求后端参数==" + JSON.stringify(dataBase))
	mui.ajax(requserUrl + "/account/getAccount", {
		timeout: 20000,
		type: 'post',
		contentType: "application/json;charsetset=UTF-8",
		data: JSON.stringify(dataBase),
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
}
//余额 （分润 激活 回收金额）
function getfindAll(mui, memberId, callback) {
	mui.ajax(requserUrl + "/account/findAll/" + memberId, {
		timeout: 20000,
		type: 'get',
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			//console.log("1212=" + JSON.stringify(data))
			callback && callback(data);
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};

/* 杜志强 2020年2月24日 结束 ==================================================== */
function settleApi(mui, callback) {
	mui.ajax(requserUrl + "/settleApi/topFive", {
		timeout: 20000,
		type: 'get',
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};

//精彩活动列表
function get_findALl(mui, callback) {
	mui.ajax(requserUrl + "/banner/findAll", {
		timeout: 20000,
		type: 'get',
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
}

//商城首页分类
function get_limitSeven(mui, callback) {
	mui.ajax(requserUrl + "/sort/limitSeven", {
		timeout: 20000,
		type: 'get',
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			if (data.code == 200) {
				callback && callback(data);
			} else {
				callback && callback(data);
				tipShow(data.message);
			}
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
}

//分润
function getfrtx(mui, memberId, callback) {
	mui.ajax(requserUrl + "/account/frtx/" + memberId, {
		timeout: 20000,
		type: 'get',
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			callback && callback(data);
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};

//激活
function getjhtx(mui, memberId, callback) {
	mui.ajax(requserUrl + "/account/jhtx/" + memberId, {
		timeout: 20000,
		type: 'get',
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			callback && callback(data);
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};

//银行卡提现
function getreflectBank(mui, dataBase, callback) {
	mui.ajax(requserUrl + "/mb/reflectBank", {
		timeout: 20000,
		type: 'post',
		data: dataBase,
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			callback && callback(data);
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};

/* 查询提现记录 */
function getWithdrawalsRecord(mui, dataBase, callback) {
	mui.ajax(requserUrl + "/account/withdrawalsRecord", {
		timeout: 20000,
		type: 'post',
		data: JSON.stringify(dataBase),
		contentType: "application/json;charsetset=UTF-8",
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			callback && callback(data);
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};

/* 商城 取消支付 */
function get_cancelPay(mui, dataBase, callback) {
	mui.ajax(requserUrl + "/integralOrder/cancelPay", {
		timeout: 20000,
		type: 'get',
		data: dataBase,
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			callback && callback(data);
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};


/* 机具 取消支付 */ 
function jf_cancelPay(mui, orderId, callback) {
	mui.ajax(requserUrl + "/order/cancelPay/"+orderId, {
		timeout: 20000,
		type: 'get',
		headers: {
			'Authorization': "Bearer" + " " + plus.storage.getItem('Token'),
			'client': 'APP',
		},
		success: function(data) {
			callback && callback(data);
		},
		error: function() {
			console.log("服务异常，请稍后重试！");
		}
	});
};
