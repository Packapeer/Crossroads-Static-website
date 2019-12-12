!(function($){

	$.extend({
		toast: function(msg, time){
			var $toast = $('<div class="modal-mask"></div><div class="modal m-toast">' + msg + '</div>').appendTo(document.body);
			var w = $(".m-toast").outerWidth();
			$(".m-toast").css({marginLeft:-w/2}).addClass("modal-in");

	        setTimeout(function(){
	        	$.closeModal()
	        },time || 2000)
		},
		modal: function(params){
			params = params || {};
			var title = params.title ? '<div class="modal-title">'+params.title+'</div>' : '';
			var textHtml = params.text ? '<div class="modal-text">'+params.text+'</div>' : '';
			var btns = '';
			params.buttons.forEach(function(el){
				btns += '<span class="modal-button">'+el.text+'</span>'
			})

			var tpl = '<div class="modal-overlay modal-overlay-visible"></div>'+
					'<div class="modal m-alert">'+
						'<div class="modal-inner">'+title+textHtml+'</div>'+
						'<div class="modal-buttons ">'+
							btns+
						'</div>'+
					'</div>'

			$("body").append(tpl);

			var h = $(".modal").outerHeight();

			$(".modal").css({marginTop:-h/2+'px'}).addClass("modal-in");

			$(".modal-button").each(function(i, el){
				$(el).click(function(){
					$.closeModal(params.buttons[i].onClick)
				})
			})
		},
		closeModal: function(fn){
			$(".modal").addClass("modal-out");
			$(".modal-overlay").removeClass("modal-overlay-visible");

			$(".modal").on("transitionend",function(){
				$(".modal,.modal-overlay,.modal-mask").remove();
				if(fn && typeof fn == "function"){
					fn();
				}
			})
		},
		alert: function(msg, title, callback){
			if(typeof title == "function"){
				callback = arguments[1];
				title = undefined;
			}

			$.modal({
				title: title,
				text: msg,
				buttons: [
					{onClick: callback, text: 'Okey'}
				]
			})
		},
		confirm: function(msg, title, onOk, onCancle){
			if(typeof title == "function"){
				onCancle = arguments[2] || function(){};
				onOk = arguments[1];
				title = undefined;
			}

			$.modal({
				title: title,
				text: msg,
				buttons: [
					{onClick: onCancle, text: 'Cancel'},
					{onClick: onOk, text: 'Okey'}
				]
			})
		},
		actions: function(params) {
			params = params || {};

			var actions = params.actions;
			var actionsList = '';
			var title = params.title ? '<div class="actions-title">'+params.title+'</div>' : ''

			$.each(actions, function(index, el) {
				actionsList += '<div class="actions-cell">'+el.text+'</div>'
			});

			var tpl = '<div class="modal-overlay modal-overlay-visible"></div>'+
					'<div class="m-actionsheet">'+title+
						'<div class="actions-menu">'+actionsList+'</div>'+
						'<div class="actions-cancel actions-cell">Cancel</div>'
					'</div>'

			$("body").append(tpl);

			var h = $(".m-actionsheet").outerHeight();

			$(".m-actionsheet").addClass("active");

			$.actionsEvents(params);
		},
		actionsEvents: function(params) {
			$(".modal-overlay,.actions-cancel").on("click",function(){$.closeActions(params)});

			var actions = params.actions;
			$(".m-actionsheet .actions-cell").each(function(index, el){
				$(el).click(function(){
					$.closeActions(params);
					if(actions[index] && typeof actions[index].onClick == "function"){
						actions[index].onClick()
					}
				})
			})
		},
		closeActions: function(opt){
			$(".modal-overlay").removeClass("modal-overlay-visible");
			$(".m-actionsheet").removeClass("active");

			$(".m-actionsheet").on("transitionend",function(){
				if(opt.onClose && typeof opt.onClose == "function"){
					opt.onClose()
				}
				$(this,".modal-overlay").remove();
			})
		},
		loading: function(msg,time) {
			var tpl = '<div class="m-loading">'+
							'<div class="modal-mask"></div>'+
							'<div class="toast"><i class="icon"></i><p class="toast-content">'+msg+'</p></div>'+
						'</div>'
			$("body").append(tpl)

			if(typeof(time) == 'number' && time > 0) {
				setTimeout(function(){
					$(".m-loading").remove();
				}, time)
			}
		},
		hideLoading: function() {
			$(".m-loading").remove();
		},
		toptip: function(msg, time, type){
			if(typeof time == 'string'){
				type = arguments[1];
			}

			if(!time && !type){
				type = ''
			}

			if(typeof time != 'number' || time < 0){
				time = undefined
			}

			$('<div class="modal-mask"></div><div class="m-toptip '+type+'">' + msg + '</div>').appendTo(document.body);

			var h = $(".m-toptip").height();
			$(".m-toptip").addClass("active");

			setTimeout(function(){
				$(".m-toptip").removeClass("active");

				$(".m-toptip").on("transitionend",function(){
					$(".m-toptip,.modal-mask").remove();
				})
			},time || 2000)

		}
	});

	//picker
	$.fn.picker = function(options){
		var p = new Picker(options,this);

		return this;
	}

	function Picker (options, _this) {
		var _default_ = {
			title:'请选择picker',
			cols: [
				{
					textAlign:'center',
					values: []
				}
			]
		}

		this.opt = $.extend({}, _default_, options);
		this.el = _this;

		this.wheels = []; //picker 滚动条
		this.pickerSelect = []; //picker选中的值
		this.init()
	}

	Picker.prototype = {
		//初始化
		init:function(){
			var _this = this;
			this.el.click(function(){

				var value = _this.el.val();
				var tpl = _this.template(_this.createWrapper());

				$("body").append(tpl);

				$(".picker").show();
				var w = $(".picker").width();

				$(".picker").addClass("active");

				_this.createdPicker();
				_this.close();

				if(value !== ""){
					_this.setValue(value);
				}
			})
		},
		//创建滚动的部分
		createWrapper: function(){
			var wheelWrapper = '';

			this.opt.cols.forEach(function(el, index){

				var item = '';
				el.values.forEach(function(element, i){
					item += '<li class="wheel-item" data-index="'+i+'" style="text-align:'+el.textAlign+'">'+element+'</li>'
				})
				item = '<ul class="wheel-scroll">'+item+'</ul>'
				wheelWrapper += '<div class="wheel">'+item+'</div>';
			})

			return wheelWrapper;
		},
		//生成picker模板
		template: function(wheelWrapper){
			var tpl = '<div class="picker">'+
					'<div class="picker-panel">'+
						'<div class="picker-title"><span class="cancel"></span><h2 class="title">'+this.opt.title+'</h2><span class="confirm pickerClose">Okey</span></div>'+
						'<div class="picker-content">'+
							'<div class="mask-top border-1px"></div>'+
							'<div class="wheel-wrapper">'+wheelWrapper+'</div>'+
							'<div class="mask-bottom border-top-1px"></div>'+
						'</div>'+
					'</div>'+
				'</div>'
			return tpl;
		},
		//使picker滚动起来，并记录选择的值
		createdPicker: function(){
			var wrapper = document.getElementsByClassName("wheel");
			var _this = this;
			var wheels = this.wheels;

			for(var i=0; i<wrapper.length; i++){
				wheels[i] = new BScroll(wrapper[i],{
					wheel:{selectedIndex: 0},
					probeType: 3
				})

				!(function(i){
					wheels[i].on("scrollEnd",function(pos){
						var index = wheels[i].getSelectedIndex();
						var id = $(wheels[i].items[index]).data("index");
						var value = _this.opt.cols[i].values[id];

						_this.pickerSelect[i] = value;
						_this.getValue();
					})
				})(i)
			}
		},
		//关闭picker
		close: function(){
			$(".pickerClose").click(function(){
				$(".picker").removeClass("active");
				setTimeout(function(){
					$(".picker").remove();
				},300)
			})
		},
		//将选择的值赋值到input框
		getValue: function(){
			var v = this.pickerSelect.join(' ');
			this.el.val(v);
		},
		//将input的值赋值到picker
		setValue: function(val){
			var arr = val.split(" ");
			var selectIndex = []; //记录input中的值在picker中的位置

			this.pickerSelect = arr;

			this.opt.cols.forEach(function(el, index){
				var v = el.values;
				var len = v.length;

				for(var i=0; i<len; i++){
					if(v[i] == $.trim(arr[index])){
						selectIndex.push(i);
						return false;
					}
				}
			})

			var _this = this;
			this.wheels.forEach(function(el, index){
				_this.wheels[index].wheelTo(selectIndex[index]);
			})
		}
	}


	//city-picker
	$.fn.cityPicker = function(){
		var p = new CityPicker(this);

		p.init();

		return this;
	}

	function CityPicker (obj) {

		this.el = obj;

		this.wheels = []; //picker 滚动条
		this.pickerSelect = [0,0,0]; //picker选中的值
		this.province = []; //省
		this.cities = []; //市
		this.areas = []; //区

		this.areaFn = [this.setProvince,this.setCity,this.setArea];
		this.areaArray = []; //省市区集合
	}

	CityPicker.prototype = {
		//初始化
		init:function(){
			var _this = this;
			this.el.click(function(){

				var value = _this.el.val();
				var tpl = _this.template();

				$("body").append(tpl);

				$(".picker").show();
				var w = $(".picker").width();

				$(".picker").addClass("active");
				_this.close();

				_this.createdPicker();
				if(value !== ""){
					_this.setValue(value);
				}
			})
		},
		//创建滚动的部分
		createWrapper: function(data){

			var item = '';
			data.forEach(function(element, index){
				item += '<li class="wheel-item" data-index="'+index+'" data-id="'+element.value+'">'+element.name+'</li>'
			})

			return item;
		},
		setProvince: function(p){ //p 指定滚动的位置
			var len = addressJsonData.length;
			var pos = p || 0;
			this.province = [];

			for(var i=0; i<len; i++){
				if(addressJsonData[i].parent){
					break;
				}
				this.province.push(addressJsonData[i])
			}

			var wheel = this.createWrapper(this.province);
			$(".cityPicker .wheel").eq(0).find(".wheel-scroll").html(wheel);

			if(this.wheels.length > 0){
				this.wheels[0].refresh();
				this.wheels[0].wheelTo(p);
			}
			this.pickerSelect[0] = this.province[0];

			var id = this.province[pos].value;
			this.setCity(id)
		},
		/**
		 * @param {pid} String 省id，根据pid寻找市
		 * @param {p} number 当前选中的市的位置，根据p可以定位input框中的值在插件中的具体位置
		 * @param {this} 调整当前的this指向，支持this指向CityPicker示例
		 * */
		setCity: function(pid, p, target){
			var len = addressJsonData.length;
			var pos = p || 0;
			var _this = this;
			if(!(this instanceof CityPicker)){
				_this = target;
			}
			_this.cities = []

			for(var i=0; i<len; i++){
				if(addressJsonData[i].parent == pid){
					_this.cities.push(addressJsonData[i])
				}
			}

			var wheel = _this.createWrapper(_this.cities);
			$(".cityPicker .wheel").eq(1).find(".wheel-scroll").html(wheel);

			if(_this.wheels.length > 0){
				_this.wheels[1].refresh();
				_this.wheels[1].wheelTo(pos);
			}

			_this.pickerSelect[1] = _this.cities[0];

			var cid = _this.cities[pos].value;
			_this.setArea(cid);

		},
		/**
		 * @param {pid} String 省id，根据pid寻找市
		 * @param {p} number 当前选中的市的位置，根据p可以定位input框中的值在插件中的具体位置
		 * @param {this} 调整当前的this指向，支持this指向CityPicker示例
		 * */
		setArea: function(cid, p, target){
			var len = addressJsonData.length;
			var pos = p || 0;
			var _this = this;
			if(!(this instanceof CityPicker)){
				_this = target;
			}
			_this.areas = [];

			for(var i=0; i<len; i++){
				if(addressJsonData[i].parent == cid){
					_this.areas.push(addressJsonData[i])
				}
			}

			var wheel = _this.createWrapper(_this.areas);
			$(".cityPicker .wheel").eq(2).find(".wheel-scroll").html(wheel);

			if(_this.wheels.length > 0){
				_this.wheels[2].refresh();
				_this.wheels[2].wheelTo(pos);
			}
			_this.pickerSelect[2] = _this.areas[pos];

			_this.areaArray = [_this.province,_this.cities,_this.areas]
		},
		/**
		 * @param {val} String input框中的值
		 *
		 * */
		setValue: function(val){
			var len = addressJsonData.length;
			var values = val.split(" "); //从input框取值
			var index = []; //input框的值在省市区数组中的位置
			var ids = []; //input框的值在省市区的id
			var _this = this;

			this.province.forEach(function(el, i, arr){
				if(el.name == values[0]){
					_this.pickerSelect[0] = arr[i];
					index[0] = i;
					ids.push(el.value);
				}
			})

			this.setProvince(index[0]); //设置省的位置

			this.cities.forEach(function(el, i, arr){
				if(el.name == values[1]){
					_this.pickerSelect[1] = arr[i];
					index[1] = i;
					ids.push(el.value);
				}
			})

			this.setCity(ids[0],index[1]); //设置市的位置

			this.areas.forEach(function(el, i, arr){
				if(el.name == values[2]){
					_this.pickerSelect[2] = arr[i];
					index[2] = i;
					ids.push(el.value);
				}
			})

			this.setArea(ids[1],index[2]); //设置区县的位置

		},
		getValue: function(){
			var values = [],ids = [];

			this.pickerSelect.forEach(function(el){
				values.push(el.name);
				ids.push(el.value);
			})

			this.el.val(values.join(" "))
			this.el.data("ids",ids)
		},
		//生成picker模板
		template: function(){
			var tpl = '<div class="picker cityPicker">'+
					'<div class="picker-panel">'+
						'<div class="picker-title"><span class="cancel"></span><h2 class="title">Select...</h2><span class="confirm pickerClose">Okey</span></div>'+
						'<div class="picker-content">'+
							'<div class="mask-top border-1px"></div>'+
							'<div class="wheel-wrapper">'+
								'<div class="wheel"><ul class="wheel-scroll"></ul></div>'+
								'<div class="wheel"><ul class="wheel-scroll"></ul></div>'+
								'<div class="wheel"><ul class="wheel-scroll"></ul></div>'+
							'</div>'+
							'<div class="mask-bottom border-top-1px"></div>'+
						'</div>'+
					'</div>'+
				'</div>'
			return tpl;
		},
		//使picker滚动起来，并记录选择的值
		createdPicker: function(){
			var wrapper = document.getElementsByClassName("wheel");
			var _this = this;

			for(var i=0; i<wrapper.length; i++){
				_this.wheels[i] = new BScroll(wrapper[i],{
					wheel:{selectedIndex: 0},
					probeType: 3
				})

				!(function(i){
					_this.wheels[i].on("scrollEnd",function(pos){
						var index = _this.wheels[i].getSelectedIndex();
						var id = $(_this.wheels[i].items[index]).data("id");

						_this.pickerSelect[i] = _this.areaArray[i][index];

						if(_this.wheels[i+1]){
							var fn = _this.areaFn[i+1];
							fn(id,0,_this);
						}

						_this.getValue();
					})
				})(i)
			}

			this.setProvince()

		},
		//关闭picker
		close: function(){
			$(".pickerClose").click(function(){
				$(".picker").removeClass("active");
				setTimeout(function(){
					$(".picker").remove();
				},300)
			})
		}
	}
})(jQuery)
