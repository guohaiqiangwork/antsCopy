
			// 点击上传图片
			$('.img_left').on('tap', function() {
				var _this = $(this);
				_self.imgId = $(this).attr('data-id')
				setTimeout(function() {
					_self.dom = _this;
					mask.show();
					$("#imagChoice").css("display", "block");
				}, 50);
			});

			/* 图片途径选择事件 */
			$("#imagChoice").on("tap", "div", function() {
				var but_count = $(this).context.innerText;
				if (but_count == "拍照") {
					getImage(_self.dom);
					$("#imagChoice").css("display", "none");
					mask.close();
				} else if (but_count == "从相册中选取") {
					galleryImg(_self.dom);
					$("#imagChoice").css("display", "none");
					mask.close();
				} else if (but_count == "取消") {
					$("#imagChoice").css("display", "none");
					mask.close();
				}
			});
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
						insertPhoto(entry.toLocalURL())

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
						upImg(imgUrlY, dom, callback);
						return
					},
					function(e) {
						plus.nativeUI.closeWaiting();
						console.log("压缩图片失败: " + JSON.stringify(e));

					});
			}
			//图片转base64
			function insertPhoto(data) {
				var imgClass; //img的class名
				//创建image对象并转换base64码
				var img = new Image();
				img.src = data;
				img.onload = function() {
					//创建canvas画布
					var canvas = document.createElement("canvas");
					//在css中不要直接给img设置宽高,否则此处会获取到css设置的值
					var width = img.width;
					var height = img.height;
					//比较图片宽高设置图片显示和canvas画布尺寸
					if (width > height) {
						imgClass = 'height';
						if (width > 500) {
							height = Math.round(height *= 500 / width);
							width = 500;
						}
					} else {
						imgClass = 'width';
						if (height > 500) {
							width = Math.round(width *= 500 / height);
							height = 500;
						}
					}
					canvas.width = width; //设置新的图片的宽度
					canvas.height = height; //设置新的图片的长度
					var ctx = canvas.getContext("2d");
					ctx.drawImage(img, 0, 0, width, height); //绘图
					var dataURL = canvas.toDataURL("image/png", 0.8); //供img标签使用的src路径
					// console.log(dataURL) //转后
					// $("#uploadImg1").attr("src", dataURL);
					console.log(_self.imgId);
					if (_self.imgId == 'z') {
						keywordOne.cardPositivePhoto = dataURL //	身份证正面图片base64
					} else if (_self.imgId == 'f') {
						keywordOne.cardNegativePhoto = dataURL //身份证反面图片base64
					} else if (_self.imgId == 's') {
						keywordOne.cardHandHoldPhoto = dataURL //手持身份证照片图片base64
					}
				}
			}
			/**
			 * 图片上传
			 * @param {object} dom 上传节点
			 */
			function upImg(event, dom, callback) {
				console.log(_self.imgId);
				if (_self.imgId == 's') {
					$("#uploadCardP").attr("src", event);
					return;
				} else if (_self.imgId == 'z') {
					$("#uploadCardz").attr("src", event);
					var server = requserUrl + '/mb/verificPositive';
				} else if (_self.imgId == 'f') {
					$("#uploadCardf").attr("src", event);
					var server = requserUrl + '/mb/verificNegative';
				}else if (_self.imgId == 'y') {
					$("#uploadCardy").attr("src", event);
					var server = requserUrl + '/mb/verificNegative';
				}
				var wt = plus.nativeUI.showWaiting("上传中...");
				var uploaderDown = plus.uploader.createUpload(server, {
						method: "post"
					},
					function(t, status) {
						wt.close();
						if (status == 200) {
							console.log(JSON.stringify(t.responseText))
							console.log(eval("(" + t.responseText + ")"))
							var dataCode = eval("(" + t.responseText + ")");
							console.log("111" + JSON.stringify(dataCode));
							if (_self.imgId == 'z') {
								// $("#uploadCardz").attr("src", dataCode.data.url);
							} else if (_self.imgId == 'f') {
								// $("#uploadCardf").attr("src", event);
							} else if (_self.imgId == 's') {
								$("#uploadCardP").attr("src", event);
							} else if (_self.imgId == 'y') {
								$("#uploadCardy").attr("src", event);
							} else if (_self.imgId == 'x') {
								$("#uploadCardx").attr("src", event);
							}
							if (dataCode.code == '200') {
								if (_self.imgId == 'z') {
									$('#cardName').val(dataCode.data.name)
									$('#idCard').val(dataCode.data.idcard)
								} else {
									$('#cardTime').val("123456")
								}
							} else {
								tipShow(dataCode.message)
								if (_self.imgId == 'z') {
									$("#uploadImg1").attr("src", '../assers/image/card@2x.png');
								} else {
									$("#uploadImg2").attr("src", '../assers/image/cardF@2x.png');
								}
							}

						} else {
							tipShow('请检查照片，重新上传')
						}


					});
				uploaderDown.addFile(event, {
					key: "file"
				}); //添加传输文件 event 文件  key 文件夹名
				uploaderDown.setRequestHeader('Authorization', "Bearer" + " " + plus.storage.getItem('Token'));
				uploaderDown.setRequestHeader('client', 'APP');
				uploaderDown.addData("string_key", "string_value");
				uploaderDown.start()
			}
