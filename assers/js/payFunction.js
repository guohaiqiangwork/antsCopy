
//商城详情支付
function shoPagePasswordFunc(mui, dataBase,orderNo,payment) {
	passwordCheck(mui, dataBase, function(data) {
		if (data.code == 200) {
			mui('#pay').popover('hide');
			var dataBase = {
				memberId: plus.storage.getItem('memberId'),
				orderNo: orderNo,
			};
			un_orderPay(mui, dataBase, function(data) {
				if (data.code == 200) {
					mui.openWindow({
						url: "../payResult.html",
						id: 'payResult',
						extras: {
							payParams: "success",
							orderNo: orderNo,
							type: "余额支付",
							money: payment,
						},
						createNew: true,
						show: {
							aniShow: "slide-in-right"
						}
					});
					/* setTimeout(function() {
						mui.currentWebview.close();
					}, 500); */
				} else {
					$('.zfinput').val("");
				}
			});
			// getOrderIntegralPay(mui,dataBase,function(data){
			// 	console.log(JSON.stringify(data))
			// })
		} else {
			tipShow(data.message);
			$('.zfinput').val("");
		}
	});
};


// 积分兑换 
function shoPagePasswordFuncJF(mui, dataBase,orderNo,payment) {
	passwordCheck(mui, dataBase, function(data) {
		if (data.code == 200) {
			mui('#pay').popover('hide');
			var dataBase = {
				memberId: plus.storage.getItem('memberId'),
				orderNo: orderNo,
			};
			getOrderIntegralPay(mui,dataBase,function(data){
				console.log(JSON.stringify(data))
				$('.bj_model_logisticsx').css('display','block');
				$('.moudelFalg').css('display','none')
				if(data.code == 200){
					$('.chnegong').css('display','block');
					$('.font_size50').text(payment)
				}else{
					$('.shibai').css('display','block');
					$('.shibaiT').text(data.message)
				}
				
			})
		} else {
			tipShow(data.message);
			$('.zfinput').val("");
		}
	});
};

//机具详情支付
function jijvgePasswordFunc(mui, dataBase,orderNo,payment) {
	passwordCheck(mui, dataBase, function(data) {
		if (data.code == 200) {
			mui('#pay').popover('hide');
			var dataBase = {
				memberId: plus.storage.getItem('memberId'),
				orderNo: orderNo,
			};
			un_webPay(mui, dataBase, function(data) {
				if (data.code == 200) {
					mui.openWindow({
						url: 'payResult.html',
						id: 'payResult',
						extras: {
							payParams: "success",
							orderNo: orderNo,
							type: "余额支付",
							money: payment,
						},
						createNew: true,
						show: {
							aniShow: "slide-in-right"
						}
					});
					/* setTimeout(function() {
						mui.currentWebview.close();
					}, 500); */
				} else {
					$('.zfinput').val("");
					//tipShow(data.message);
				}
			});
		} else {
			tipShow(data.message);
			$('.zfinput').val("");
		}
	});
};

//设置页
function setPagePasswordFunc(mui, dataBase) {
	setPassword(mui, dataBase, function(data) {
		if (data.code == 200) {
			tipShow("密码设置成功");
			mui('#pay').popover('hide');
		} else {
			tipShow(data.message);
		}
	});
}

//设置支付密码
function shoPage_SetPasswordFunc(mui, dataBase){
	setPassword(mui, dataBase, function(data) {
		mui('#pay').popover('hide');
		if (data.code == 200) {
			$('.zfinput').val("");
			tipShow("密码设置成功");
			windows.location.href="../../assers/js/lib/keyboard.js";
		}else{
			tipShow(data.message);
		}
	});
}

//提现
function tixPage_Func(mui, dataBase,balbnce_money,bankCard_Id){
	passwordCheck(mui, dataBase, function(data) {
		console.log("支付密码效验=="+ JSON.stringify(data));
		if (data.code == 200) {
			//密码正确 提现接口
			//alert(balbnce_money);
			var bassdata={
				amount:balbnce_money,
				memberId: plus.storage.getItem('memberId'),
				bankId: bankCard_Id,
			}
			getreflectBank(mui,bassdata,function(data){
				console.log("提现fan回值=="+JSON.stringify(data));
				if(data.code == 200){
					var bankCIDD = data.data;
					mui.openWindow({
						url: 'carryResult.html',
						id: 'carryResult',
						extras: {
							"bankCId": bankCIDD
						},
						show: {
							aniShow: "slide-in-right"
						}
					});
				} else {
					tipShow(data.message);
				}
				//Keyboard.hideKeyBoard();
				mui('#pay').popover('hide');
				$('.table>div>.blackpwd').css('opacity', '0');
				$('.zfinput').val("");
			})
		} else {
			tipShow(data.message);
			$('.zfinput').val("");
		}
	});
}