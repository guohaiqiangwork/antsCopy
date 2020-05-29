// 获取所在省地址
var cityPicker3 = new mui.PopPicker(); //省下拉框
var cityPicker3Code //省编码
var cityPicker2 = new mui.PopPicker(); //市下拉框
var cityPicker2Code //市编码
var cityPicker1 = new mui.PopPicker(); //区下拉框
var cityPicker1Code //区编码
var rwMccPicker = new mui.PopPicker(); //行业类别下拉框
var rwMccPickerCode //行业编码
var scopePicker = new mui.PopPicker(); //经营范围下拉框
var scopePickerCode //经营编码
var showProvinceBank = new mui.PopPicker(); //银行卡省下拉
var ProvinceBankCode //银行卡省编码
var showCityBank = new mui.PopPicker(); //银行卡省下拉
var showCityBankCode //银行卡市编码






function init() {
	funRwRegion() //获取省数据
	funRwMcc(); //获取行业类别数据
}



// 获取省数据
function funRwRegion() {
	getRwRegion(mui, function(data) {
		if (data.code == 200) {
			cityPicker3.setData(data.data); //省数据
			showProvinceBank.setData(data.data) //银行卡省数据
		} else {
			tipShow(data.message);
		}
	})
}
var showCityPickerButton = document.getElementById('showCityPicker3');
showCityPickerButton.addEventListener('tap', function(event) {
	cityPicker3.show(function(items) {
		cityPicker3Code = items[0].value;
		$('#addressProvince').text(items[0].text);
		funRwRegionNext(); //获取市区信息
		$('.addressCity').css('display', 'flex');
		//返回 false 可以阻止选择框的关闭
		// return false;
	});
}, false);

// 获取市数据
function funRwRegionNext() {
	getRwRegionNext(mui, cityPicker3Code, function(data) {
		if (data.code == 200) {
			cityPicker2.setData(data.data);
		} else {
			tipShow(data.message);
		}
	})
};
var showCityPickerButton = document.getElementById('showCityPicker2');
showCityPickerButton.addEventListener('tap', function(event) {
	cityPicker2.show(function(items) {
		cityPicker2Code = items[0].value;
		$('#addressCity').text(items[0].text);
		funRwRegionNextB(); //获取区数据
		//返回 false 可以阻止选择框的关闭
		// return false;
	});
}, false);

// 获取区数据
function funRwRegionNextB() {
	getRwRegionNextB(mui, cityPicker2Code, function(data) {
		if (data.code == 200) {
			if (data.data.length > 0) {
				$('.addressArea').css('display', 'flex');
				cityPicker1.setData(data.data);
			}
		} else {
			tipShow(data.message);
		}
	})
};
var showCityPickerButton = document.getElementById('showCityPicker1');
showCityPickerButton.addEventListener('tap', function(event) {
	cityPicker1.show(function(items) {
		cityPicker1Code = items[0].value;
		$('#addressArea').text(items[0].text);
		// $('.addressArea').css('display', 'flex');
		//返回 false 可以阻止选择框的关闭
		// return false;
	});
}, false);

// 获取行业类别
function funRwMcc() {
	getRwMcc(mui, function(data) {
		if (data.code == 200) {
			rwMccPicker.setData(data.data);
		} else {
			tipShow(data.message);
		}
	})
};
var showCityPickerButton = document.getElementById('rwMccPickerShow');
showCityPickerButton.addEventListener('tap', function(event) {
	rwMccPicker.show(function(items) {
		console.log(JSON.stringify(items))
		$('#industryType').text(items[0].text)
		rwMccPickerCode = items[0].value;
		$('.businessScope').css('display', 'flex');
		funRwMccNext(); //获取macc
		// $('#addressArea').text(items[0].text);
		// // $('.addressArea').css('display', 'flex');
		//返回 false 可以阻止选择框的关闭
		// return false;
	});
}, false);


// 获取mcc
function funRwMccNext() {
	console.log('99')
	getRwMccNext(mui, rwMccPickerCode, function(data) {
		console.log(JSON.stringify(data.data))
		if (data.code == 200) {
			scopePicker.setData(data.data);
		} else {
			tipShow(data.message);
		}
	})
};
var showCityPickerButton = document.getElementById('scopePickerShow');
showCityPickerButton.addEventListener('tap', function(event) {
	scopePicker.show(function(items) {
		console.log(JSON.stringify(items))
		$('#businessScope').text(items[0].text)
		scopePickerCode = items[0].value;
		funRwMccNextDetails(); //获取营业范围
		// $('#addressArea').text(items[0].text);
		// // $('.addressArea').css('display', 'flex');
		//返回 false 可以阻止选择框的关闭
		// return false;
	});
}, false);
// 获取营业范围
function funRwMccNextDetails() {
	console.log('99')
	getRwMccNextDetails(mui, scopePickerCode, function(data) {
		console.log(JSON.stringify(data.data))
		if (data.code == 200) {
			keywordOne.bizScope = data.data.mccName;
			keywordOne.mccType = data.data.mccType
		} else {
			tipShow(data.message);
		}
	})
};



// 银行卡省数据
var showCityPickerButton = document.getElementById('showProvinceBank');
showCityPickerButton.addEventListener('tap', function(event) {
	showProvinceBank.show(function(items) {
		ProvinceBankCode = items[0].value;
		$('#bankProvince').text(items[0].text);
		// 获取市数据
		getRwRegionNext(mui, ProvinceBankCode, function(data) {
			if (data.code == 200) {
				showCityBank.setData(data.data);
			} else {
				tipShow(data.message);
			}
		})

		$('.bankCity').css('display', 'flex');
		//返回 false 可以阻止选择框的关闭
		// return false;
	});
}, false);
// 银行卡市数据
var showCityPickerButton = document.getElementById('showCityBank');
showCityPickerButton.addEventListener('tap', function(event) {
	showCityBank.show(function(items) {
		showCityBankCode = items[0].value;
		$('#bankCity').text(items[0].text);
		funRwRegionNextB(); //获取区数据
		//返回 false 可以阻止选择框的关闭
		// return false;
	});
}, false);

setTimeout(function() {
	init(); //初始化加载
}, 500)
