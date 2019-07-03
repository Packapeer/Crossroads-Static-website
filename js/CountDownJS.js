/*   Resizable Multicolor Countdown.(v1.6)                                */
/*   http://codecanyon.net/item/resizable-multicolor-countdown/14633953   */

function CountDownObject() {
	this.TIME_ZONE = +1; // your time zone (-12 ... +14)

	// Your date and time
	this.SET_YOUR_SEC = 0;
	this.SET_YOUR_MIN = 0;
	this.SET_YOUR_HOUR = 0;
	this.SET_YOUR_DAY = 25;
	this.SET_YOUR_MONTH = 02;
	this.SET_YOUR_YEAR = 2019;
	
	this.NUM_OF_ELEMENTS = 9; // number of flip-elements(from 1 to 9)
	this.TIME_ANIMATION = 1000; // time of flip animation in milliseconds(from 50 to 950)
	this.BACK_COLOR = "#f07000"; // flip-element back color
	this.DIGITS_COLOR = "#f0d070"; // digits color on flip-elements
	this.TEXT_COLOR = "#e0e0e0"; // text color under flip elements(seconds, minutes and etc.)
	this.IS_DYNAMIC_COLOR = true; // back color will vary(true or false)

	this.CANVAS_NAME = "CountDownCanvas"; //canvas name in html-code
	
	var
		timeAndDateLast,
		param,
		img,
		timeZoneEdit,
		timerId,

		sec,
		min,
		hour,
		day,
		month,
		year,
		num,
		timeAnim,
		backC,
		digitsC,
		textC,
		isDynamicColor,
		findWidth,
		width,
		height,
		
		Canvas,
		CanvasContext;

	//when timer less then 0
	function TimerEnd(){
		CanvasContext.clearRect(0, 0, Canvas.width, Canvas.height);
		
		CanvasContext.fillStyle = textC;
		CanvasContext.font = 60*param.elementSize + "px Open Sans";
		CanvasContext.textAlign = "center";
		CanvasContext.fillText("The End!", Canvas.width/2, 84.5*param.elementSize);
	}
	// object with count down parametres
	function ParametresType(){
		var
			size = num;
			
		if (num > 1){
			size += 0.1;
			if (num > 2){
				size += 0.5;
				if (num > 3){
					size += 0.1;
					if (num > 4){
						size += 0.5;
						if (num > 5){
							size += 0.1;
							if (num > 6){
								size += 0.5;
								if (num >7){
									size += 0.1;
									if (num >8){
										size += 0.1;
									}
								}
							}
						}
					}
				}
			}
		}
		
		this.elementSize = Canvas.width/(size*80); // count down magnification
		
		
		
		// elements positions
		this.sec1Position = Canvas.width - Canvas.width/size;
		this.sec2Position = Canvas.width - 2.1*Canvas.width/size;
		this.min1Position = Canvas.width - 3.6*Canvas.width/size;
		this.min2Position = Canvas.width - 4.7*Canvas.width/size;
		this.hour1Position = Canvas.width - 6.2*Canvas.width/size;
		this.hour2Position = Canvas.width - 7.3*Canvas.width/size;
		this.day1Position = Canvas.width - 8.8*Canvas.width/size;
		this.day2Position = Canvas.width - 9.9*Canvas.width/size;
		this.day3Position = Canvas.width - 11*Canvas.width/size;
		
		// correcting time animation
		this.timeAnimation = timeAnim > 950 ? 950 :  timeAnim < 50 ? 50 : timeAnim;
		
		// init back colors and steps
		this.maxRed = parseInt(backC.slice(1, 3), 16);
		this.maxGreen = parseInt(backC.slice(3, 5), 16);
		this.maxBlue = parseInt(backC.slice(5, 7), 16);
		this.red = this.maxRed;
		this.green = this.maxGreen;
		this.blue = this.maxBlue;
		this.stepRed = 0;
		this.stepGreen = 0;
		this.stepBlue = 0;
		this.dynamicColor = backC;
		
		// change color
		this.updateColor = function(){
			this.red += this.stepRed;
			this.green += this.stepGreen;
			this.blue += this.stepBlue;
			
			if( (this.red*this.stepRed >= this.maxRed*this.stepRed)&&
				(this.green*this.stepGreen >= this.maxGreen*this.stepGreen)&&
				(this.blue*this.stepBlue >= this.maxBlue*this.stepBlue) ){
				var k;
				
				this.red = this.maxRed;
				this.green = this.maxGreen;
				this.blue = this.maxBlue
				k = this.maxRed;
				this.maxRed = this.maxGreen;
				this.maxGreen = this.maxBlue;
				this.maxBlue = k;
				
				this.stepRed = (this.maxRed - this.red)/1000;
				this.stepGreen = (this.maxGreen - this.green)/1000;
				this.stepBlue = (this.maxBlue - this.blue)/1000;
			}
			this.dynamicColor = "rgba(" + Math.floor(this.red) + ", " + Math.floor(this.green) + ", " + Math.floor(this.blue) + ", 1)";
		}
	}

	// all used images in vector
	function AllImages(){
		var shadow = new Image();
			shadow.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAAUCAYAAAAa2LrXAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjlCNURGN0Q3QzFGNTExRTU5MENERTU3QTRERjIxQUJEIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjlCNURGN0Q4QzFGNTExRTU5MENERTU3QTRERjIxQUJEIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OUI1REY3RDVDMUY1MTFFNTkwQ0RFNTdBNERGMjFBQkQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OUI1REY3RDZDMUY1MTFFNTkwQ0RFNTdBNERGMjFBQkQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6dLFwjAAABrklEQVR42uSYUU7DMAyG47YCJAQ8cwkOwuE4DMdAHATxxli3rmtrHPFXMqZZ27zNi/QrVSJn2hfHsUMhhDvRrehBdC96ZObXoBoRPUv3IfoSbUQ7USvqRRxbOMMm/4tiJypFNzkcinFOqUz8HkOe22oOhTGihNHgHB7lcigmFpojzxfgjYs5FGYgxrQqYTRg/s8unGv8mwGzmENljCP5VoLli/RPolr0JnpPxEGOcdgBQ87lUIHkSDXAdbe4bY64bWPrjAd6O8JZHCrlsp1y0W/RJ4xqjAVl6OVSGb2NczloDxxg3MKwAvkafTcVA51ADLkctAeO9PdIFAcYxO+DMuwdHl/O5WBjYIsqY6MqjS0W6xQ8b6kM53LQHhgpN3DVGBeuMb43pZvHI0y5HCpDvVHB8gp9A2NtGBwe4SwOOg8c6e8wecBcg++jSWHYKchVHPQRJpXr9MiD9K7YGOgV3ioO1gM7LDCgTtY70ge/9a+Ng4s5kOlLpWCSxqT3nWsp9/sc+O8RYRUHmnjSKcw4z5VvjgCu5kAJ45OPiM4BruJAJxawpU64IICLOfwIMADqOXJsW3KAxQAAAABJRU5ErkJggg==",
			shadowOpacity = (16777215 - parseInt(param.dynamicColor.slice(1, 7), 16)/10)/16777215;
		
		this.DrawShadow = function(x, y, xs, ys){
			CanvasContext.save();
			CanvasContext.globalAlpha = shadowOpacity;
			CanvasContext.drawImage(shadow, x, y, shadow.width*xs, shadow.height*ys);
			CanvasContext.restore();
		}
		
		// colons between elements
		this.colons = function(){
			CanvasContext.fillStyle = param.dynamicColor;
			CanvasContext.font = 64*param.elementSize + "px Open Sans";
			CanvasContext.textAlign = "center";
			CanvasContext.save();
			if(num > 2){
				CanvasContext.clearRect(param.sec2Position - 40*param.elementSize, 0,
					40*param.elementSize, 116.5*param.elementSize);
				CanvasContext.fillText(":", param.sec2Position - 20*param.elementSize, 76*param.elementSize);
				
			}
			if (num > 4){
				CanvasContext.clearRect(param.min2Position - 40*param.elementSize, 0,
					40*param.elementSize, 116.5*param.elementSize);
				CanvasContext.fillText(":", param.min2Position - 20*param.elementSize, 76*param.elementSize);
			}
			if (num > 6){
				CanvasContext.clearRect(param.hour2Position - 40*param.elementSize, 0,
					40*param.elementSize, 116.5*param.elementSize);
				CanvasContext.fillText(":", param.hour2Position - 20*param.elementSize, 76*param.elementSize);
			}
			CanvasContext.restore();
		}
		//background Botoom
		this.bottomBack = function(x, y, xs, ys){
			CanvasContext.save();
			CanvasContext.fillStyle = param.dynamicColor;
			CanvasContext.beginPath();
			CanvasContext.moveTo(75*xs + x, 58*ys + y);
			CanvasContext.lineTo(75*xs + x, 64*ys + y);
			CanvasContext.lineTo(71*xs + x, 64*ys + y);
			CanvasContext.lineTo(71*xs + x, 58*ys + y);
			CanvasContext.lineTo(9*xs + x, 58*ys + y);
			CanvasContext.lineTo(9*xs + x, 64*ys + y);
			CanvasContext.lineTo(5*xs + x, 64*ys + y);
			CanvasContext.lineTo(5*xs + x, 58*ys + y);
			CanvasContext.lineTo(x, 58*ys + y);
			CanvasContext.lineTo(x, 109.5*ys + y);
			CanvasContext.bezierCurveTo(x, 112.3*ys + y, 2.3*xs + x, 114.5*ys + y, 5*xs + x, 114.5*ys + y);
			CanvasContext.lineTo(75*xs + x, 114.5*ys + y);
			CanvasContext.bezierCurveTo(77.8*xs + x, 114.5*ys + y, 80*xs + x, 112.2*ys + y, 80*xs + x, 109.5*ys + y);
			CanvasContext.lineTo(80*xs + x, 58*ys + y);
			CanvasContext.lineTo(75*xs + x, 58*ys + y);
			CanvasContext.closePath();
			CanvasContext.fill();	
			CanvasContext.restore();
		}
		//background Top
		this.topBack = function(x, y, xs, ys){
			CanvasContext.fillStyle = param.dynamicColor;
			CanvasContext.save();
			CanvasContext.beginPath();
			CanvasContext.moveTo(75*xs + x, y);
			CanvasContext.lineTo(5*xs + x, y);
			CanvasContext.bezierCurveTo(2.3*xs + x, y, x, 2.3*ys + y, x, 5*ys + y);
			CanvasContext.lineTo(x, 56.5*ys + y);
			CanvasContext.lineTo(5*xs + x, 56.5*ys + y);
			CanvasContext.lineTo(5*xs + x, 52.1*ys + y);
			CanvasContext.lineTo(9*xs + x, 52.1*ys + y);
			CanvasContext.lineTo(9*xs + x, 56.5*ys + y);
			CanvasContext.lineTo(71*xs + x, 56.5*ys + y);
			CanvasContext.lineTo(71*xs + x, 52.1*ys + y);
			CanvasContext.lineTo(75*xs + x, 52.1*ys + y);
			CanvasContext.lineTo(75*xs + x, 56.5*ys + y);
			CanvasContext.lineTo(80*xs + x, 56.5*ys + y);
			CanvasContext.lineTo(80*xs + x, 5*ys + y);
			CanvasContext.bezierCurveTo(80*xs + x, 2.3*ys + y, 77.8*xs + x, y, 75*xs + x, y);
			CanvasContext.closePath();
			CanvasContext.fill();	
			CanvasContext.restore();
		
		}
		//foreground Top
		this.topForeground = function(x, y, xs, ys, time){
			CanvasContext.save();
			CanvasContext.fillStyle = "rgba(255, 255, 255, 0.3)";
			CanvasContext.beginPath();
			CanvasContext.moveTo(75*xs + x, y);
			CanvasContext.lineTo(5*xs + x, y);
			CanvasContext.bezierCurveTo(2.3*xs + x, y, x, 2.3*ys + y, x, 5*ys + y);
			CanvasContext.lineTo(x, 7*ys + y);
			CanvasContext.bezierCurveTo(x, 4.2*ys + y, 2.3*xs + x, ys + y, 5*xs + x, ys + y);
			CanvasContext.lineTo(75*xs + x, 1*ys + y);
			CanvasContext.bezierCurveTo(77.8*xs + x, ys + y, 80*xs + x, 4.3*ys + y, 80*xs + x, 7*ys + y);
			CanvasContext.lineTo(80*xs + x, 5*ys + y);
			CanvasContext.bezierCurveTo(80*xs + x, 2.3*ys + y, 77.8*xs + x, y, 75*xs + x, y);
			CanvasContext.closePath();
			CanvasContext.fill();
			
			g = CanvasContext.createLinearGradient(40*xs + x, 57.237*ys + y, 40*xs + x, y);
			g.addColorStop(0,"rgba(0, 0, 0, 0.2)");
			g.addColorStop(0.3,"rgba(0, 0, 0, 0)");

			g.addColorStop(0.3,"rgba(255, 255, 255, 0)");
			g.addColorStop(1,"rgba(255, 255, 255, 0.3)");
			CanvasContext.fillStyle = g;
			
			CanvasContext.beginPath();
			CanvasContext.moveTo(75*xs + x, y);
			CanvasContext.lineTo(5*xs + x, y);
			CanvasContext.bezierCurveTo(2.3*xs + x, y, x, 2.3*ys + y, x, 5*ys + y);
			CanvasContext.lineTo(x, 56.5*ys + y);
			CanvasContext.lineTo(5*xs + x, 56.5*ys + y);
			CanvasContext.lineTo(5*xs + x, 52.1*ys + y);
			CanvasContext.lineTo(9*xs + x, 52.1*ys + y);
			CanvasContext.lineTo(9*xs + x, 56.5*ys + y);
			CanvasContext.lineTo(71*xs + x, 56.5*ys + y);
			CanvasContext.lineTo(71*xs + x, 52.1*ys + y);
			CanvasContext.lineTo(75*xs + x, 52.1*ys + y);
			CanvasContext.lineTo(75*xs + x, 56.5*ys + y);
			CanvasContext.lineTo(80*xs + x, 56.5*ys + y);
			CanvasContext.lineTo(80*xs + x, 5*ys + y);
			CanvasContext.bezierCurveTo(80*xs + x, 2.3*ys + y, 77.8*xs + x, y, 75*xs + x, y);
			CanvasContext.closePath();
			CanvasContext.fill();
			CanvasContext.restore();
			
			if (time >  0){
				time /= param.timeAnimation;
				CanvasContext.save();
				g = CanvasContext.createLinearGradient(40*xs + x, 114.5*ys + y, 40*xs + x, 58*ys + y);
					
				g.addColorStop(1,"rgba(0, 0, 0, " + time*1.5 + ")");
				g.addColorStop(0.5,"rgba(0, 0, 0, " + time + ")");
				g.addColorStop(0,"rgba(0, 0, 0, " + time/2 + ")");

				CanvasContext.fillStyle = g;

				CanvasContext.beginPath();
				CanvasContext.moveTo(75*xs + x, y);
				CanvasContext.lineTo(5*xs + x, y);
				CanvasContext.bezierCurveTo(2.3*xs + x, y, x, 2.3*ys + y, x, 5*ys + y);
				CanvasContext.lineTo(x, 56.5*ys + y);
				CanvasContext.lineTo(5*xs + x, 56.5*ys + y);
				CanvasContext.lineTo(5*xs + x, 52.1*ys + y);
				CanvasContext.lineTo(9*xs + x, 52.1*ys + y);
				CanvasContext.lineTo(9*xs + x, 56.5*ys + y);
				CanvasContext.lineTo(71*xs + x, 56.5*ys + y);
				CanvasContext.lineTo(71*xs + x, 52.1*ys + y);
				CanvasContext.lineTo(75*xs + x, 52.1*ys + y);
				CanvasContext.lineTo(75*xs + x, 56.5*ys + y);
				CanvasContext.lineTo(80*xs + x, 56.5*ys + y);
				CanvasContext.lineTo(80*xs + x, 5*ys + y);
				CanvasContext.bezierCurveTo(80*xs + x, 2.3*ys + y, 77.8*xs + x, y, 75*xs + x, y);
				CanvasContext.closePath();
				CanvasContext.fill();
			}

		}
		//foreground Bottom
		this.bottomForeground = function(x, y, xs, ys, time){
			CanvasContext.save();
			CanvasContext.fillStyle = "rgba(255, 255, 255, 0.2)";
			CanvasContext.fillRect(x, 58*ys + y, 5*xs, 1*ys);
			CanvasContext.fillRect(9*xs + x, 58*ys + y, 62*xs, 1*ys);
			CanvasContext.fillRect(75*xs + x, 58*ys + y, 5*xs, 1*ys);
			CanvasContext.restore();

			CanvasContext.save();
			g = CanvasContext.createLinearGradient(40*xs + x, 114.5*ys + y, 40*xs + x, 58*ys + y);
			g.addColorStop(0,"rgba(0, 0, 0, 0.2)");
			g.addColorStop(0.7,"rgba(0, 0, 0, 0)");

			g.addColorStop(0.7,"rgba(255, 255, 255, 0)");
			g.addColorStop(1,"rgba(255, 255, 255, 0.1)");
			CanvasContext.fillStyle = g;
			
			CanvasContext.beginPath();
			CanvasContext.moveTo(75*xs + x, 58*ys + y);
			CanvasContext.lineTo(75*xs + x, 64*ys + y);
			CanvasContext.lineTo(71*xs + x, 64*ys + y);
			CanvasContext.lineTo(71*xs + x, 58*ys + y);
			CanvasContext.lineTo(9*xs + x, 58*ys + y);
			CanvasContext.lineTo(9*xs + x, 64*ys + y);
			CanvasContext.lineTo(5*xs + x, 64*ys + y);
			CanvasContext.lineTo(5*xs + x, 58*ys + y);
			CanvasContext.lineTo(x, 58*ys + y);
			CanvasContext.lineTo(x, 109.5*ys + y);
			CanvasContext.bezierCurveTo(x, 112.3*ys + y, 2.3*xs + x, 114.5*ys + y, 5*xs + x, 114.5*ys + y);
			CanvasContext.lineTo(75*xs + x, 114.5*ys + y);
			CanvasContext.bezierCurveTo(77.8*xs + x, 114.5*ys + y, 80*xs + x, 112.2*ys + y, 80*xs + x, 109.5*ys + y);
			CanvasContext.lineTo(80*xs + x, 58*ys + y);
			CanvasContext.lineTo(75*xs + x, 58*ys + y);
			CanvasContext.closePath();
			CanvasContext.fill();
			CanvasContext.restore();

			if (time >  0){
				time /= param.timeAnimation;
				CanvasContext.save();
				g = CanvasContext.createLinearGradient(40*xs + x, 114.5*ys + y, 40*xs + x, 58*ys + y);
					
				g.addColorStop(1,"rgba(0, 0, 0, " + time*1.5 + ")");
				g.addColorStop(0.5,"rgba(0, 0, 0, " + time + ")");
				g.addColorStop(0,"rgba(0, 0, 0, " + time/2 + ")");

				CanvasContext.fillStyle = g;

				CanvasContext.beginPath();
				CanvasContext.moveTo(75*xs + x, 58*ys + y);
				CanvasContext.lineTo(75*xs + x, 64*ys + y);
				CanvasContext.lineTo(71*xs + x, 64*ys + y);
				CanvasContext.lineTo(71*xs + x, 58*ys + y);
				CanvasContext.lineTo(9*xs + x, 58*ys + y);
				CanvasContext.lineTo(9*xs + x, 64*ys + y);
				CanvasContext.lineTo(5*xs + x, 64*ys + y);
				CanvasContext.lineTo(5*xs + x, 58*ys + y);
				CanvasContext.lineTo(x, 58*ys + y);
				CanvasContext.lineTo(x, 109.5*ys + y);
				CanvasContext.bezierCurveTo(x, 112.3*ys + y, 2.3*xs + x, 114.5*ys + y, 5*xs + x, 114.5*ys + y);
				CanvasContext.lineTo(75*xs + x, 114.5*ys + y);
				CanvasContext.bezierCurveTo(77.8*xs + x, 114.5*ys + y, 80*xs + x, 112.2*ys + y, 80*xs + x, 109.5*ys + y);
				CanvasContext.lineTo(80*xs + x, 58*ys + y);
				CanvasContext.lineTo(75*xs + x, 58*ys + y);
				CanvasContext.closePath();
				CanvasContext.fill();
				CanvasContext.restore();
			}

		}
		// edge
		this.edgeRounded = function(x, y, xs, ys, lightOrShadow){
			CanvasContext.save();
			CanvasContext.fillStyle = param.dynamicColor;
			CanvasContext.beginPath();
			CanvasContext.moveTo(75*xs + x, y);
			CanvasContext.lineTo(5*xs + x, y);
			CanvasContext.bezierCurveTo(2.3*xs + x, y, x, 2.2*ys + y, x,5*ys + y);
			CanvasContext.lineTo(80*xs + x, 5*ys + y);
			CanvasContext.bezierCurveTo(80*xs + x, 2.2*ys + y, 77.7*xs + x, y, 75*xs + x, y);
			CanvasContext.closePath();
			CanvasContext.fill();

			CanvasContext.fillStyle =
				(lightOrShadow > 0) ? "rgba(255, 255, 255, " + (lightOrShadow) + ")" :
				"rgba(0, 0, 0, " + (- lightOrShadow) + ")";
			CanvasContext.beginPath();
			CanvasContext.moveTo(75*xs + x, y);
			CanvasContext.lineTo(5*xs + x, y);
			CanvasContext.bezierCurveTo(2.3*xs + x, y, x, 2.2*ys + y, x,5*ys + y);
			CanvasContext.lineTo(80*xs + x, 5*ys + y);
			CanvasContext.bezierCurveTo(80*xs + x, 2.2*ys + y, 77.7*xs + x, y, 75*xs + x, y);
			CanvasContext.closePath();
			CanvasContext.fill();

			CanvasContext.restore();
		}
		this.edgeRectangle = function(x, y, xs, ys, lightOrShadow){
			CanvasContext.save();
			CanvasContext.fillStyle = param.dynamicColor;
			CanvasContext.fillRect(x, y, 80*xs, 3.5*ys);
			CanvasContext.fillStyle =
				(lightOrShadow > 0) ? "rgba(255, 255, 255, " + (lightOrShadow) + ")" :
				"rgba(0, 0, 0, " + (- lightOrShadow) + ")";
			CanvasContext.fillRect(x, y, 80*xs, 3.5*ys);
			CanvasContext.restore();
		}
		//the gap between the upper and lower elements
		this.blackRectangle = function(x, y, xs, ys){
			CanvasContext.save();
			CanvasContext.fillStyle = "black";
			CanvasContext.fillRect(x, 56.5*ys + y, 80*xs, 1.5*ys);
			CanvasContext.restore();
		}
		//wheels
		this.wheels = function(x, y, xs, ys){
			CanvasContext.save();
			g = CanvasContext.createLinearGradient(40*xs + x, 52*ys + y, 40*xs + x, 64*ys + y);
			
			g.addColorStop(0, "rgba(0, 0, 0, 1)");
			g.addColorStop(0.2, "rgba(100, 100, 100, 1)");
			g.addColorStop(0.201, "rgba(150, 150, 150, 1)");
			g.addColorStop(0.300, "rgba(255, 255, 255, 1)");
			g.addColorStop(0.400, "rgba(110, 110, 110, 1)");
			g.addColorStop(0.401, "rgba(90, 90, 90, 1)");
			g.addColorStop(1, "rgba(0, 0, 0, 1)");
			CanvasContext.fillStyle = g;
			CanvasContext.fillRect(5*xs + x, 52*ys + y, 4*xs, 12*ys);
			CanvasContext.fillRect(71*xs + x, 52*ys + y, 4*xs, 12*ys);
			CanvasContext.restore(); 
			CanvasContext.save();
			CanvasContext.fillStyle = "black";
			CanvasContext.strokeRect(5*xs + x, 52*ys + y, 4*xs, 12*ys);
			CanvasContext.strokeRect(71*xs + x, 52*ys + y, 4*xs, 12*ys);
			CanvasContext.restore(); 
		}
		//bottom part of digits
		this.bottom0 = function(x, y, xs, ys){
			CanvasContext.save();
			CanvasContext.fillStyle = digitsC;
			CanvasContext.beginPath();
			CanvasContext.moveTo(39.1*xs + x, 92.1*ys + y);
			CanvasContext.bezierCurveTo(55.5*xs + x, 92.1*ys + y, 63.6*xs + x, 78.7*ys + y, 63.8*xs + x, 59*ys + y);
			CanvasContext.lineTo(48.6*xs + x, 59*ys + y);
			CanvasContext.bezierCurveTo(48.5*xs + x, 73.4*ys + y, 45.3*xs + x, 80.6*ys + y, 39.5*xs + x, 80.6*ys + y);
			CanvasContext.bezierCurveTo(33.7*xs + x, 80.6*ys + y, 30.1*xs + x, 73.6*ys + y, 30.1*xs + x, 59*ys + y);
			CanvasContext.lineTo(14.8*xs + x, 59*ys + y);
			CanvasContext.bezierCurveTo(15.1*xs + x, 77.2*ys + y, 22.5*xs + x, 92.1*ys + y, 39.1*xs + x, 92.1*ys + y);
			CanvasContext.closePath();
			CanvasContext.fill();
			CanvasContext.restore();
		}
		this.bottom1 = function(x, y, xs, ys){
			CanvasContext.save();
			CanvasContext.fillStyle = digitsC;
			CanvasContext.fillRect(35.2*xs + x, 59*ys + y, 14.7*xs, 32*ys);
			CanvasContext.restore();
		}
		this.bottom2 = function(x, y, xs, ys){
			CanvasContext.save();
			CanvasContext.fillStyle = digitsC;
			CanvasContext.beginPath();
			CanvasContext.moveTo(24.2*xs + x, 74.2*ys + y);
			CanvasContext.lineTo(15.8*xs + x, 81.8*ys + y);
			CanvasContext.lineTo(15.8*xs + x, 91*ys + y);
			CanvasContext.lineTo(61.9*xs + x, 91*ys + y);
			CanvasContext.lineTo(61.9*xs + x, 78.5*ys + y);
			CanvasContext.lineTo(37.4*xs + x, 78.5*ys + y);
			CanvasContext.lineTo(37.4*xs + x, 78.3*ys + y);
			CanvasContext.lineTo(43.4*xs + x, 73.3*ys + y);
			CanvasContext.bezierCurveTo(48.5*xs + x, 68.7*ys + y, 53.2*xs + x, 64.1*ys + y, 56.3*xs + x, 59*ys + y);
			CanvasContext.lineTo(39.7*xs + x, 59*ys + y);
			CanvasContext.bezierCurveTo(36.1*xs + x, 63.2*ys + y, 31*xs + x, 68.1*ys + y, 24.2*xs + x, 74.2*ys + y);
			CanvasContext.closePath();
			CanvasContext.fill();
			CanvasContext.restore();
		}
		this.bottom3 = function(x, y, xs, ys){
			CanvasContext.save();
			CanvasContext.fillStyle = digitsC;
			CanvasContext.beginPath();
			CanvasContext.moveTo(32.4*xs + x, 62.1*ys + y);
			CanvasContext.bezierCurveTo(39.1*xs + x, 62.1*ys + y, 45.5*xs + x, 65*ys + y, 45.5*xs + x, 71.4*ys + y);
			CanvasContext.bezierCurveTo(45.5*xs + x, 76.3*ys + y, 41.5*xs + x, 80.1*ys + y, 33.6*xs + x, 80.1*ys + y);
			CanvasContext.bezierCurveTo(27.4*xs + x, 80.1*ys + y, 21.2*xs + x, 77.5*ys + y, 18.5*xs + x, 76.1*ys + y);
			CanvasContext.lineTo(15.4*xs + x, 87.5*ys + y);
			CanvasContext.bezierCurveTo(19.2*xs + x, 89.9*ys + y, 26.3*xs + x, 92.1*ys + y, 34.7*xs + x, 92.1*ys + y);
			CanvasContext.bezierCurveTo(51.2*xs + x, 92.1*ys + y, 61.3*xs + x, 83.7*ys + y, 61.3*xs + x, 72.2*ys + y);
			CanvasContext.bezierCurveTo(61.3*xs + x, 66.4*ys + y, 58.4*xs + x, 61.8*ys + y, 54*xs + x, 59*ys + y);
			CanvasContext.lineTo(26.2*xs + x, 59*ys + y);
			CanvasContext.lineTo(26.2*xs + x, 62.1*ys + y);
			CanvasContext.lineTo(32.4*xs + x, 62.1*ys + y);
			CanvasContext.closePath();
			CanvasContext.fill();
			CanvasContext.restore();
		}
		this.bottom4 = function(x, y, xs, ys){
			CanvasContext.save();
			CanvasContext.fillStyle = digitsC;
			CanvasContext.beginPath();
			CanvasContext.moveTo(13.9*xs + x, 75.5*ys + y);
			CanvasContext.lineTo(42.7*xs + x, 75.5*ys + y);
			CanvasContext.lineTo(42.7*xs + x, 91*ys + y);
			CanvasContext.lineTo(57.1*xs + x, 91*ys + y);
			CanvasContext.lineTo(57.1*xs + x, 75.5*ys + y);
			CanvasContext.lineTo(64.9*xs + x, 75.5*ys + y);
			CanvasContext.lineTo(64.9*xs + x, 64.1*ys + y);
			CanvasContext.lineTo(57.1*xs + x, 64.1*ys + y);
			CanvasContext.lineTo(57.1*xs + x, 59*ys + y);
			CanvasContext.lineTo(42.7*xs + x, 59*ys + y);
			CanvasContext.lineTo(42.7*xs + x, 64.1*ys + y);
			CanvasContext.lineTo(28.1*xs + x, 64.1*ys + y);
			CanvasContext.lineTo(28.1*xs + x, 63.9*ys + y);
			CanvasContext.lineTo(31.1*xs + x, 59*ys + y);
			CanvasContext.lineTo(18*xs + x, 59*ys + y);
			CanvasContext.lineTo(13.9*xs + x, 65.6*ys + y);
			CanvasContext.lineTo(13.9*xs + x, 75*xs, 75.5*ys + y);
			CanvasContext.closePath();
			CanvasContext.fill();
			CanvasContext.restore();
		}
		this.bottom5 = function(x, y, xs, ys){
			CanvasContext.save();
			CanvasContext.fillStyle = digitsC;
			CanvasContext.beginPath();
			CanvasContext.moveTo(27.9*xs + x, 59.5*ys + y);
			CanvasContext.bezierCurveTo(40.9*xs + x, 59.5*ys + y, 46.2*xs + x, 63.6*ys + y, 46.2*xs + x, 70.3*ys + y);
			CanvasContext.bezierCurveTo(46.2*xs + x, 77.2*ys + y, 39.5*xs + x, 80.2*ys + y, 33.2*xs + x, 80.2*ys + y);
			CanvasContext.bezierCurveTo(27.3*xs + x, 80.2*ys + y, 21.4*xs + x, 78.4*ys + y, 19.3*xs + x, 77*ys + y);
			CanvasContext.lineTo(15.8*xs + x, 88.4*ys + y);
			CanvasContext.bezierCurveTo(19.4*xs + x, 90.3*ys + y, 26*xs + x, 92.1*ys + y, 33.9*xs + x, 92.1*ys + y);
			CanvasContext.bezierCurveTo(51.4*xs + x, 92.1*ys + y, 61.8*xs + x, 81.4*ys + y, 61.8*xs + x, 69.3*ys + y);
			CanvasContext.bezierCurveTo(61.8*xs + x, 65.3*ys + y, 60.9*xs + x, 61.9*ys + y, 59.4*xs + x, 59*ys + y);
			CanvasContext.lineTo(19.3*xs + x, 59*ys + y);
			CanvasContext.lineTo(19.2*xs + x, 60.1*ys + y);
			CanvasContext.bezierCurveTo(21.8*xs + x, 59.7*ys + y, 24.3*xs + x, 59.5*ys + y, 27.9*xs + x, 59.5*ys + y);
			CanvasContext.closePath();
			CanvasContext.fill();
			CanvasContext.restore();
		}
		this.bottom6 = function(x, y, xs, ys){
			CanvasContext.save();
			CanvasContext.fillStyle = digitsC;
			CanvasContext.beginPath();
			CanvasContext.moveTo(40.4*xs + x, 92.1*ys + y);
			CanvasContext.bezierCurveTo(54.5*xs + x, 92.1*ys + y, 64.4*xs + x, 81.5*ys + y, 64.4*xs + x, 68.6*ys + y);
			CanvasContext.bezierCurveTo(64.4*xs + x, 65*ys + y, 63.7*xs + x, 61.8*ys + y, 62.5*xs + x, 59*ys + y);
			CanvasContext.lineTo(43.4*xs + x, 59*ys + y);
			CanvasContext.bezierCurveTo(47.1*xs + x, 60.7*ys + y, 49*xs + x, 64.8*ys + y, 49*xs + x, 69.4*ys + y);
			CanvasContext.bezierCurveTo(49*xs + x, 76*ys + y, 45.6*xs + x, 80.9*ys + y, 40.2*xs + x, 80.9*ys + y);
			CanvasContext.bezierCurveTo(33.3*xs + x, 80.9*ys + y, 30*xs + x, 74.7*ys + y, 29.7*xs + x, 67.8*ys + y);
			CanvasContext.bezierCurveTo(29.7*xs + x, 66*ys + y, 29.9*xs + x, 64.8*ys + y, 30.3*xs + x, 64*ys + y);
			CanvasContext.bezierCurveTo(31.3*xs + x, 61.9*ys + y, 33.1*xs + x, 60*ys + y, 35.3*xs + x, 59*ys + y);
			CanvasContext.lineTo(14.9*xs + x, 59*ys + y);
			CanvasContext.bezierCurveTo(14.8*xs + x, 60.5*ys + y, 14.7*xs + x, 62.1*ys + y, 14.7*xs + x, 63.7*ys + y);
			CanvasContext.bezierCurveTo(14.6*xs + x, 79.2*ys + y, 23.1*xs + x, 92.1*ys + y, 40.4*xs + x, 92.1*ys + y);
			CanvasContext.closePath();
			CanvasContext.fill();
			CanvasContext.restore();
		}
		this.bottom7 = function(x, y, xs, ys){
			CanvasContext.save();
			CanvasContext.fillStyle = digitsC;
			CanvasContext.beginPath();
			CanvasContext.moveTo(35.6*xs + x, 91*ys + y);
			CanvasContext.lineTo(51.1*xs + x, 59*ys + y);
			CanvasContext.lineTo(35.9*xs + x, 59*ys + y);
			CanvasContext.lineTo(19.5*xs + x, 91*ys + y);
			CanvasContext.lineTo(35.6*xs + x, 91*ys + y);
			CanvasContext.closePath();
			CanvasContext.fill();
			CanvasContext.restore();
		}
		this.bottom8 = function(x, y, xs, ys){
			CanvasContext.save();
			CanvasContext.fillStyle = digitsC;
			CanvasContext.beginPath();
			CanvasContext.moveTo(14.8*xs + x, 74*ys + y);
			CanvasContext.bezierCurveTo(14.8*xs + x, 82.8*ys + y, 22.4*xs + x, 92.1*ys + y, 38.9*xs + x, 92.1*ys + y);
			CanvasContext.bezierCurveTo(54*xs + x, 92.1*ys + y, 63.9*xs + x, 84.2*ys + y, 63.9*xs + x, 72.4*ys + y);
			CanvasContext.bezierCurveTo(63.9*xs + x, 66.4*ys + y, 61.1*xs + x, 62*ys + y, 57.2*xs + x, 59*ys + y);
			CanvasContext.lineTo(23.8*xs + x, 59*ys + y);
			CanvasContext.bezierCurveTo(18.2*xs + x, 62.2*ys + y, 14.8*xs + x, 67.2*ys + y, 14.8*xs + x, 74*ys + y);
			CanvasContext.closePath();
			CanvasContext.moveTo(38.2*xs + x, 62.8*ys + y);
			CanvasContext.bezierCurveTo(44.2*xs + x, 64.4*ys + y, 48.4*xs + x, 67.8*ys + y, 48.4*xs + x, 73.5*ys + y);
			CanvasContext.bezierCurveTo(48.4*xs + x, 78.1*ys + y, 44.9*xs + x, 81.6*ys + y, 39.5*xs + x, 81.6*ys + y);
			CanvasContext.bezierCurveTo(33.8*xs + x, 81.6*ys + y, 30.2*xs + x, 77.2*ys + y, 30.3*xs + x, 72.5*ys + y);
			CanvasContext.bezierCurveTo(30.3*xs + x, 67.8*ys + y, 33.2*xs + x, 64.2*ys + y, 38.2*xs + x, 62.8*ys + y);
			CanvasContext.closePath();
			CanvasContext.fill();
			CanvasContext.restore();
		}
		this.bottom9 = function(x, y, xs, ys){
			CanvasContext.save();
			CanvasContext.fillStyle = digitsC;
			CanvasContext.beginPath();
			CanvasContext.moveTo(34.9*xs + x, 68.6*ys + y);
			CanvasContext.bezierCurveTo(40.8*xs + x, 68.6*ys + y, 45*xs + x, 66.9*ys + y, 47.9*xs + x, 63.9*ys + y);
			CanvasContext.lineTo(48.2*xs + x, 64*ys + y);
			CanvasContext.bezierCurveTo(47*xs + x, 68.9*ys + y, 44.2*xs + x, 73.1*ys + y, 40*xs + x, 76*ys + y);
			CanvasContext.bezierCurveTo(36.5*xs + x, 78.4*ys + y, 31.8*xs + x, 79.7*ys + y, 27.2*xs + x, 80*ys + y);
			CanvasContext.bezierCurveTo(24.2*xs + x, 80.2*ys + y, 22.5*xs + x, 80.2*ys + y, 20.6*xs + x, 80*ys + y);
			CanvasContext.lineTo(20.6*xs + x, 91.9*ys + y);
			CanvasContext.bezierCurveTo(22.3*xs + x, 92*ys + y, 24.9*xs + x, 92.1*ys + y, 27.5*xs + x, 91.9*ys + y);
			CanvasContext.bezierCurveTo(37.6*xs + x, 91.5*ys + y, 46.1*xs + x, 88.4*ys + y, 52.3*xs + x, 82.8*ys + y);
			CanvasContext.bezierCurveTo(58.3*xs + x, 77.3*ys + y, 62.3*xs + x, 69.4*ys + y, 63.4*xs + x, 59*ys + y);
			CanvasContext.lineTo(17.4*xs + x, 59*ys + y);
			CanvasContext.bezierCurveTo(21*xs + x, 65.1*ys + y, 27.6*xs + x, 68.6*ys + y, 34.9*xs + x, 68.6*ys + y);
			CanvasContext.closePath();
			CanvasContext.fill();
			CanvasContext.restore();
		}
		//top part of digits
		this.top0 = function(x, y, xs, ys){
			CanvasContext.save();
			CanvasContext.fillStyle = digitsC;
			CanvasContext.beginPath();
			CanvasContext.moveTo(39.6*xs + x, 23.9*ys + y);
			CanvasContext.bezierCurveTo(23.1*xs + x, 23.9*ys + y, 15.1*xs + x, 38.2*ys + y, 14.8*xs + x, 56.5*ys + y);
			CanvasContext.lineTo(30.1*xs + x, 56.5*ys + y);
			CanvasContext.bezierCurveTo(30.2*xs + x, 42.2*ys + y, 33.9*xs + x, 35.4*ys + y, 39.4*xs + x, 35.4*ys + y);
			CanvasContext.bezierCurveTo(45.4*xs + x, 35.4*ys + y, 48.5*xs + x, 42.7*ys + y, 48.6*xs + x, 56.5*ys + y);
			CanvasContext.lineTo(63.8*xs + x, 56.5*ys + y);
			CanvasContext.bezierCurveTo(63.6*xs + x, 39*ys + y, 56.8*xs + x, 23.9*ys + y, 39.6*xs + x, 23.9*ys + y);
			CanvasContext.closePath();
			CanvasContext.fill();
			CanvasContext.restore();
		}
		this.top1 = function(x, y, xs, ys){
			CanvasContext.save();
			CanvasContext.fillStyle = digitsC;
			CanvasContext.beginPath();
			CanvasContext.moveTo(37.3*xs + x, 25*ys + y);
			CanvasContext.lineTo(20.1*xs + x, 33*ys + y);
			CanvasContext.lineTo(22.6*xs + x, 44.4*ys + y);
			CanvasContext.lineTo(35*xs + x, 38.5*ys + y);
			CanvasContext.lineTo(35.2*xs + x, 38.5*ys + y);
			CanvasContext.lineTo(35.2*xs + x, 56.5*ys + y);
			CanvasContext.lineTo(49.9*xs + x, 56.5*ys + y);
			CanvasContext.lineTo(49.9*xs + x, 25*ys + y);
			CanvasContext.lineTo(37.3*xs + x, 25*ys + y);
			CanvasContext.closePath();
			CanvasContext.fill();
			CanvasContext.restore();
		}
		this.top2 = function(x, y, xs, ys){
			CanvasContext.save();
			CanvasContext.fillStyle = digitsC;
			CanvasContext.beginPath();
			CanvasContext.moveTo(37.9*xs + x, 23.9*ys + y);
			CanvasContext.bezierCurveTo(29.1*xs + x, 23.9*ys + y, 21.5*xs + x, 26.9*ys + y, 16.6*xs + x, 30.6*ys + y);
			CanvasContext.lineTo(20.9*xs + x, 41.5*ys + y);
			CanvasContext.bezierCurveTo(24.3*xs + x, 38.9*ys + y, 29.2*xs + x, 36.1*ys + y, 34.8*xs + x, 36.1*ys + y);
			CanvasContext.bezierCurveTo(42.3*xs + x, 36.1*ys + y, 45.5*xs + x, 40.3*ys + y, 45.5*xs + x, 45.6*ys + y);
			CanvasContext.bezierCurveTo(45.4*xs + x, 49.1*ys + y, 43.9*xs + x, 52.6*ys + y, 40.8*xs + x, 56.5*ys + y);
			CanvasContext.lineTo(57.2*xs + x, 56.5*ys + y);
			CanvasContext.bezierCurveTo(59.3*xs + x, 52.7*ys + y, 60.6*xs + x, 48.7*ys + y, 60.6*xs + x, 44.3*ys + y);
			CanvasContext.bezierCurveTo(60.7*xs + x, 32.5*ys + y, 52.6*xs + x, 23.9*ys + y, 37.9*xs + x, 23.9*ys + y);
			CanvasContext.closePath();
			CanvasContext.fill();
			CanvasContext.restore();
		}
		this.top3 = function(x, y, xs, ys){
			CanvasContext.save();
			CanvasContext.fillStyle = digitsC;
			CanvasContext.beginPath();
			CanvasContext.moveTo(47.2*xs + x, 55.2*ys + y);
			CanvasContext.bezierCurveTo(55.2*xs + x, 52.4*ys + y, 59.1*xs + x, 47*ys + y, 59.1*xs + x, 40.1*ys + y);
			CanvasContext.bezierCurveTo(59.1*xs + x, 31.2*ys + y, 51.4*xs + x, 23.9*ys + y, 37.5*xs + x, 23.9*ys + y);
			CanvasContext.bezierCurveTo(29.1*xs + x, 23.9*ys + y, 21.3*xs + x, 26.3*ys + y, 17.4*xs + x, 28.8*ys + y);
			CanvasContext.lineTo(20.5*xs + x, 39.8*ys + y);
			CanvasContext.bezierCurveTo(23.2*xs + x, 38.2*ys + y, 28.8*xs + x, 35.9*ys + y, 34.1*xs + x, 35.6*ys + y);
			CanvasContext.bezierCurveTo(40.5*xs + x, 35.9*ys + y, 43.7*xs + x, 38.8*ys + y, 43.7*xs + x, 42.7*ys + y);
			CanvasContext.bezierCurveTo(43.7*xs + x, 48.2*ys + y, 37.2*xs + x, 50.1*ys + y, 32.1*xs + x, 50.2*ys + y);
			CanvasContext.lineTo(26.2*xs + x, 50.2*ys + y);
			CanvasContext.lineTo(26.2*xs + x, 56.5*ys + y);
			CanvasContext.lineTo(51.1*xs + x, 56.5*ys + y);
			CanvasContext.bezierCurveTo(49.9*xs + x, 56*ys + y, 48.6*xs + x, 55.6*ys + y, 47.2*xs + x, 55.4*ys + y);
			CanvasContext.lineTo(47.2*xs + x, 55.2*ys + y);
			CanvasContext.closePath();
			CanvasContext.fill();
			CanvasContext.restore();
		}
		this.top4 = function(x, y, xs, ys){
			CanvasContext.save();
			CanvasContext.fillStyle = digitsC;
			CanvasContext.beginPath();
			CanvasContext.moveTo(38.5*xs + x, 25*ys + y);
			CanvasContext.lineTo(18.9*xs + x, 56.5*ys + y);
			CanvasContext.lineTo(32*xs + x, 56.5*ys + y);
			CanvasContext.lineTo(36.8*xs + x, 48.7*ys + y);
			CanvasContext.bezierCurveTo(39*xs + x, 44.6*ys + y, 40.7*xs + x, 40.8*ys + y, 42.8*xs + x, 36.6*ys + y);
			CanvasContext.lineTo(43.2*xs + x, 36.6*ys + y);
			CanvasContext.bezierCurveTo(42.9*xs + x, 40.8*ys + y, 42.7*xs + x, 44.8*ys + y, 42.7*xs + x, 48.7*ys + y);
			CanvasContext.lineTo(42.7*xs + x, 56.5*ys + y);
			CanvasContext.lineTo(57.1*xs + x, 56.5*ys + y);
			CanvasContext.lineTo(57.1*xs + x, 25*ys + y);
			CanvasContext.lineTo(38.5*xs + x, 25*ys + y);
			CanvasContext.closePath();
			CanvasContext.fill();
			CanvasContext.restore();
		}
		this.top5 = function(x, y, xs, ys){
			CanvasContext.save();
			CanvasContext.fillStyle = digitsC;
			CanvasContext.beginPath();
			CanvasContext.moveTo(53.9*xs + x, 52*ys + y);
			CanvasContext.bezierCurveTo(49.3*xs + x, 48.7*ys + y, 43*xs + x, 47.3*ys + y, 36.8*xs + x, 47.3*ys + y);
			CanvasContext.bezierCurveTo(35.2*xs + x, 47.3*ys + y, 34*xs + x, 47.3*ys + y, 32.6*xs + x, 47.5*ys + y);
			CanvasContext.lineTo(34*xs + x, 37.5*ys + y);
			CanvasContext.lineTo(59.2*xs + x, 37.5*ys + y);
			CanvasContext.lineTo(59.2*xs + x, 25*ys + y);
			CanvasContext.lineTo(23.4*xs + x, 25*ys + y);
			CanvasContext.lineTo(19.4*xs + x, 56.5*ys + y);
			CanvasContext.lineTo(58.5*xs + x, 56.5*ys + y);
			CanvasContext.bezierCurveTo(57.3*xs + x, 54.7*ys + y, 55.7*xs + x, 53.2*ys + y, 53.9*xs + x, 52*ys + y);
			CanvasContext.closePath();
			CanvasContext.fill();
			CanvasContext.restore();
		}
		this.top6 = function(x, y, xs, ys){
			CanvasContext.save();
			CanvasContext.fillStyle = digitsC;
			CanvasContext.beginPath();
			CanvasContext.moveTo(44.3*xs + x, 46.4*ys + y);
			CanvasContext.bezierCurveTo(38.2*xs + x, 46.4*ys + y, 33.7*xs + x, 48.3*ys + y, 30.5*xs + x, 51.6*ys + y);
			CanvasContext.lineTo(30.2*xs + x, 51.6*ys + y);
			CanvasContext.bezierCurveTo(31.9*xs + x, 44*ys + y, 37.9*xs + x, 37.1*ys + y, 51.4*xs + x, 36*ys + y);
			CanvasContext.bezierCurveTo(53.8*xs + x, 35.8*ys + y, 55.6*xs + x, 35.7*ys + y, 57.3*xs + x, 35.8*ys + y);
			CanvasContext.lineTo(57.3*xs + x, 24.1*ys + y);
			CanvasContext.bezierCurveTo(55.8*xs + x, 24*ys + y, 54*xs + x, 24*ys + y, 51.2*xs + x, 24.2*ys + y);
			CanvasContext.bezierCurveTo(41*xs + x, 24.7*ys + y, 32.6*xs + x, 27.9*ys + y, 26.1*xs + x, 33.8*ys + y);
			CanvasContext.bezierCurveTo(20.3*xs + x, 39.1*ys + y, 16.3*xs + x, 47*ys + y, 15*xs + x, 56.5*ys + y);
			CanvasContext.lineTo(61.8*xs + x, 56.5*ys + y);
			CanvasContext.bezierCurveTo(58.4*xs + x, 50*ys + y, 51.7*xs + x, 46.4*ys + y, 44.3*xs + x, 46.4*ys + y);
			CanvasContext.closePath();
			CanvasContext.fill();
			CanvasContext.restore();
		}
		this.top7 = function(x, y, xs, ys){
			CanvasContext.save();
			CanvasContext.fillStyle = digitsC;
			CanvasContext.beginPath();
			CanvasContext.moveTo(62.4*xs + x, 25*ys + y);
			CanvasContext.lineTo(16.5*xs + x, 25*ys + y);
			CanvasContext.lineTo(16.5*xs + x, 37.5*ys + y);
			CanvasContext.lineTo(46.3*xs + x, 37.5*ys + y);
			CanvasContext.lineTo(46.3*xs + x, 37.7*ys + y);
			CanvasContext.lineTo(36.7*xs + x, 56.5*ys + y);
			CanvasContext.lineTo(51.8*xs + x, 56.5*ys + y);
			CanvasContext.lineTo(62.4*xs + x, 34.6*ys + y);
			CanvasContext.lineTo(62.4*xs + x, 25*ys + y);
			CanvasContext.closePath();
			CanvasContext.fill();
			CanvasContext.restore();
		}
		this.top8 = function(x, y, xs, ys){
			CanvasContext.save();
			CanvasContext.fillStyle = digitsC;
			CanvasContext.beginPath();
			CanvasContext.moveTo(52*xs + x, 54.9*ys + y);
			CanvasContext.bezierCurveTo(58.4*xs + x, 51.7*ys + y, 61.4*xs + x, 46.2*ys + y, 61.4*xs + x, 40.7*ys + y);
			CanvasContext.bezierCurveTo(61.4*xs + x, 32.7*ys + y, 55.1*xs + x, 23.9*ys + y, 39.9*xs + x, 23.9*ys + y);
			CanvasContext.bezierCurveTo(26.9*xs + x, 23.9*ys + y, 17*xs + x, 31.2*ys + y, 17*xs + x, 42.2*ys + y);
			CanvasContext.bezierCurveTo(17*xs + x, 47.9*ys + y, 20.1*xs + x, 53.2*ys + y, 26.4*xs + x, 56.4*ys + y);
			CanvasContext.lineTo(26.4*xs + x, 56.5*ys + y);
			CanvasContext.lineTo(54.8*xs + x, 56.5*ys + y);
			CanvasContext.bezierCurveTo(53.9*xs + x, 56*ys + y, 52.9*xs + x, 55.5*ys + y, 52*xs + x, 55.2*ys + y);
			CanvasContext.lineTo(52*xs + x, 54.9*ys + y);
			CanvasContext.closePath();
			CanvasContext.moveTo(40.5*xs + x, 50.5*ys + y);
			CanvasContext.bezierCurveTo(35.3*xs + x, 48.9*ys + y, 31.3*xs + x, 46.1*ys + y, 31.3*xs + x, 41.7*ys + y);
			CanvasContext.bezierCurveTo(31.3*xs + x, 37.6*ys + y, 34*xs + x, 34.2*ys + y, 39.2*xs + x, 34.2*ys + y);
			CanvasContext.bezierCurveTo(44.8*xs + x, 34.2*ys + y, 47.1*xs + x, 38.2*ys + y, 47.1*xs + x, 42.2*ys + y);
			CanvasContext.bezierCurveTo(47.1*xs + x, 46.3*ys + y, 44*xs + x, 49.5*ys + y, 40.5*xs + x, 50.5*ys + y);
			CanvasContext.closePath();
			CanvasContext.fill();
			CanvasContext.restore();
		}
		this.top9 = function(x, y, xs, ys){
			CanvasContext.save();
			CanvasContext.fillStyle = digitsC;
			CanvasContext.beginPath();
			CanvasContext.moveTo(39.1*xs + x, 23.9*ys + y);
			CanvasContext.bezierCurveTo(24.8*xs + x, 23.9*ys + y, 14.6*xs + x, 34.6*ys + y, 14.6*xs + x, 47.3*ys + y);
			CanvasContext.bezierCurveTo(14.6*xs + x, 50.8*ys + y, 15.3*xs + x, 53.9*ys + y, 16.6*xs + x, 56.5*ys + y);
			CanvasContext.lineTo(36.6*xs + x, 56.5*ys + y);
			CanvasContext.bezierCurveTo(32*xs + x, 55.4*ys + y, 29.8*xs + x, 51.2*ys + y, 29.8*xs + x, 46.4*ys + y);
			CanvasContext.bezierCurveTo(29.7*xs + x, 39.6*ys + y, 33.5*xs + x, 35*ys + y, 38.7*xs + x, 35*ys + y);
			CanvasContext.bezierCurveTo(45.6*xs + x, 35*ys + y, 48.2*xs + x, 41.8*ys + y, 48.2*xs + x, 48.7*ys + y);
			CanvasContext.bezierCurveTo(48.2*xs + x, 50.6*ys + y, 47.9*xs + x, 51.6*ys + y, 47.4*xs + x, 52.5*ys + y);
			CanvasContext.bezierCurveTo(46.3*xs + x, 54.3*ys + y, 44.3*xs + x, 55.9*ys + y, 41.5*xs + x, 56.5*ys + y);
			CanvasContext.lineTo(63.5*xs + x, 56.5*ys + y);
			CanvasContext.bezierCurveTo(63.6*xs + x, 55*ys + y, 63.7*xs + x, 53.5*ys + y, 63.7*xs + x, 51.9*ys + y);
			CanvasContext.bezierCurveTo(63.7*xs + x, 36.7*ys + y, 55.8*xs + x, 23.9*ys + y, 39.1*xs + x, 23.9*ys + y);
			CanvasContext.closePath();
			CanvasContext.fill();
			CanvasContext.restore();
		}
	}

	// time object type
	function TimeInfo(timeAndDate){
		this.secs = 0;
		this.mins = 0;
		this.hours = 0;
		this.days = 0;

		this.flagSecs1 = true;
		this.flagSecs2 = true;
		this.flagMins1 = true;
		this.flagMins2 = true;
		this.flagHours1 = true;
		this.flagHours2 = true;
		this.flagDays1 = true;
		this.flagDays2 = true;
		this.flagDays3 = true;
		
		// It calculates how much time is left before the scheduled date
		this.updateTime = function(){

			var 
				dateNow = new Date(timeAndDate);
				
				dateFinish =
					new Date(year, month-1, day, hour, min, sec);
			
			var 
				time = dateFinish.getTime() - dateNow.getTime() - timeZoneEdit;

			// init date seconds, minetes, ...
			this.secs = Math.floor( (time/1000)%60 );
			this.mins = Math.floor( (time/(60000))%60 );
			this.hours = Math.floor( (time/(3600000))%24 );
			this.days = Math.floor( time/(86400000) );

		}
	}

	// draw texts under flip-elements
	function DrawText(){
		CanvasContext.fillStyle = textC;
		CanvasContext.font = 18*param.elementSize + "px Sans-Serif";
		CanvasContext.textAlign = "center";
		
		if(num == 1){
			CanvasContext.fillText("SECONDS", param.sec1Position + 80*0.5*param.elementSize, 150*param.elementSize);
		}else{
			CanvasContext.fillText("SECONDS", param.sec1Position - 80*0.05*param.elementSize, 150*param.elementSize);
		}
		if(num == 3){
			CanvasContext.fillText("MINUTES", param.min1Position + 80*0.5*param.elementSize, 150*param.elementSize);
		}else if(num > 3){
			CanvasContext.fillText("MINUTES", param.min1Position - 80*0.05*param.elementSize, 150*param.elementSize);
		}
		if(num == 5){
			CanvasContext.fillText("HOURS", param.hour1Position + 80*0.5*param.elementSize, 150*param.elementSize);
		}else if(num > 5){
			CanvasContext.fillText("HOURS", param.hour1Position - 80*0.05*param.elementSize, 150*param.elementSize);
		}
		if(num == 7){
			CanvasContext.fillText("DAYS", param.day1Position + 80*0.5*param.elementSize, 150*param.elementSize);
		}else if(num == 8){
			CanvasContext.fillText("DAYS", param.day1Position - 80*0.05*param.elementSize, 150*param.elementSize);
		}else{
			CanvasContext.fillText("DAYS", param.day1Position - 80*0.6*param.elementSize, 150*param.elementSize);
		}
	}

	// draw top and bottom parts of digits on flip-elements
	function DrawDigit(isTop, x, y, xs, ys, digit){
		if(isTop){
		//digit Top
		switch (digit){
				case 0:
					img.top0(x, y, xs, ys);
					break;
				case 1:
					img.top1(x, y, xs, ys);
					break;
				case 2:
					img.top2(x, y, xs, ys);
					break;
				case 3:
					img.top3(x, y, xs, ys);
					break;
				case 4:
					img.top4(x, y, xs, ys);
					break;
				case 5:
					img.top5(x, y, xs, ys);
					break;
				case 6:
					img.top6(x, y, xs, ys);
					break;
				case 7:
					img.top7(x, y, xs, ys);
					break;
				case 8:
					img.top8(x, y, xs, ys);
					break;
				case 9:
					img.top9(x, y, xs, ys);
					break;
			}
		}else{
			switch (digit){
				case 0:
					img.bottom0(x, y, xs, ys);
					break;
				case 1:
					img.bottom1(x, y, xs, ys);
					break;
				case 2:
					img.bottom2(x, y, xs, ys);
					break;
				case 3:
					img.bottom3(x, y, xs, ys);
					break;
				case 4:
					img.bottom4(x, y, xs, ys);
					break;
				case 5:
					img.bottom5(x, y, xs, ys);
					break;
				case 6:
					img.bottom6(x, y, xs, ys);
					break;
				case 7:
					img.bottom7(x, y, xs, ys);
					break;
				case 8:
					img.bottom8(x, y, xs, ys);
					break;
				case 9:
					img.bottom9(x, y, xs, ys);
			}
		}
	}

	// draw one of flip-element
	function DrawElement(x, y, xs, ys, digit, time, maxDigit, isFlip){
		// it is not flip animation
		if ( (time >= param.timeAnimation)||(isFlip == false) ){
			CanvasContext.clearRect(x, y, 80*xs, 114.5*ys);
			img.blackRectangle(x, y, xs, ys);
			img.wheels(x, y, xs, ys);
			img.bottomBack(x, y, xs, ys);
			img.topBack(x, y, xs, ys);
		
			DrawDigit(true, x, y, xs, ys, digit);
			DrawDigit(false, x, y, xs, ys,  digit);
			
			img.topForeground(x, y, xs, ys, 0);
			img.bottomForeground(x, y, xs, ys, 0);
			img.DrawShadow(x, y + 58*ys, xs, ys);

			return false;
		}
		
		// it is fliping time
		CanvasContext.clearRect(x - 1, y - 1, 82*xs, 116.5*y);
		img.blackRectangle(x, y, xs, ys);
		img.wheels(x, y, xs, ys);
		img.bottomBack(x, y, xs, ys);
		img.topBack(x, y, xs, ys);
		
		DrawDigit(true, x, y, xs, ys,  digit);
		DrawDigit(false, x, y, xs, ys, digit < maxDigit ? digit + 1 : 0);

		
		img.topForeground(x, y, xs, ys, 0);
		img.bottomForeground(x, y, xs, ys, time);
		img.DrawShadow(x, y + 58*ys, xs, ys);
		
		// moving parts of flip-elements
		var 
			heightOfElement;
		if ( time < param.timeAnimation/2 ){
			// top part animation
			heightOfElement = Math.cos( time*Math.PI/(param.timeAnimation/2)/2 );
			img.edgeRounded(x, y - 3.5*ys*(1 - heightOfElement) + 60*ys*(1 - heightOfElement), xs, ys*heightOfElement, heightOfElement);
			img.edgeRectangle(x,
				y - 3.5*ys*(1 - heightOfElement) + 60*ys*(1 - heightOfElement) + ys*heightOfElement*5,
				xs, ys*(1 - heightOfElement), heightOfElement);
			
			img.topBack(x, y + 60*ys*(1 - heightOfElement), xs, ys*heightOfElement);
			DrawDigit(true, x,  y + 60*ys*(1 - heightOfElement), xs, ys*heightOfElement, digit < maxDigit ? digit + 1 : 0);
			img.topForeground(x, y + 60*ys*(1 - heightOfElement), xs, ys*heightOfElement, time); 
			}else{
			// bottom part animation
			heightOfElement = -Math.cos( (time)*Math.PI/(param.timeAnimation/2)/2 );
			img.edgeRounded(x, y + 60*ys + 54*ys*heightOfElement, xs, -ys*heightOfElement, -heightOfElement);
			img.edgeRectangle(x,
				y + 60*ys + 54*ys*heightOfElement - 5*ys*heightOfElement - 3.5*ys*(1 - heightOfElement),
				xs, ys*(1 - heightOfElement), -heightOfElement); 

			img.bottomBack(x, y + 56.5*ys*(1 - heightOfElement), xs, ys*heightOfElement);
			DrawDigit(false, x,  y + 56.5*ys*(1 - heightOfElement), xs, ys*heightOfElement, digit);
			img.bottomForeground(x, y + 56.5*ys*(1 - heightOfElement), xs, ys*heightOfElement, 0); 
			img.DrawShadow(x, y + 1.5*ys*(heightOfElement)+56.5*ys, xs, ys*heightOfElement);
		}
		return true;
	}

	// Is it time to flip?
	function CheckTime(time){
		
		//correcting seconds
		if ( timeAndDateLast.secs%10 != time.secs%10 ){
			timeAndDateLast.flagSecs1 = true;
			
			if ( Math.floor(timeAndDateLast.secs/10) != Math.floor(time.secs/10) ){
				timeAndDateLast.flagSecs2 = true;}
			timeAndDateLast.secs = time.secs;

			//correcting minutes
			if( timeAndDateLast.mins%10 != time.mins%10 ){
				timeAndDateLast.flagMins1 = true;
				if ( Math.floor(timeAndDateLast.mins/10) != Math.floor(time.mins/10) ){
					timeAndDateLast.flagMins2 = true;}
				timeAndDateLast.mins = time.mins;		
			}

			//correcting hours
			if( timeAndDateLast.hours%10 != time.hours%10 ){
				timeAndDateLast.flagHours1 = true;
				if ( Math.floor(timeAndDateLast.hours/10) != Math.floor(time.hours/10) ){
					timeAndDateLast.flagHours2 = true;}
				timeAndDateLast.hours = time.hours;		
			}

			//correcting days
			if( timeAndDateLast.days%10 != time.days%10 ){
				timeAndDateLast.flagDays1 = true;
				if ( Math.floor(timeAndDateLast.days/10) != Math.floor(time.days/10) ){
					timeAndDateLast.flagDays2 = true;
					if ( Math.floor(timeAndDateLast.days/100) != Math.floor(time.days/100) ){
						timeAndDateLast.flagDays3 = true;
					}
				}
				timeAndDateLast.days = time.days;		
			}
		}
	}

	function Main(){
		var
			timeMillisecond = Date.now(),
			timeAndDateNow = new TimeInfo(timeMillisecond);
		
		timeAndDateNow.updateTime();
		timeMillisecond = (timeMillisecond)%1000
		if(isDynamicColor) {param.updateColor();} // change color
		CheckTime(timeAndDateNow);
		
		img.colons();

		// draw flip-elements
		if (timeMillisecond != 0){
			timeAndDateLast.flagSecs1 =
				DrawElement(param.sec1Position, 0, param.elementSize, param.elementSize,
				timeAndDateNow.secs%10, timeMillisecond, 9);
			if (timeAndDateLast.flagSecs2){
				timeAndDateLast.flagSecs2 = 
					DrawElement(param.sec2Position, 0, param.elementSize, param.elementSize,
					Math.floor(timeAndDateNow.secs/10), timeMillisecond, 5);
			}else{
				timeAndDateLast.flagSecs2 = 
					DrawElement(param.sec2Position, 0, param.elementSize, param.elementSize,
					Math.floor(timeAndDateNow.secs/10), timeMillisecond, 5, false);
			}
			if(timeAndDateLast.flagMins1){
				timeAndDateLast.flagMins1 = 
				DrawElement(param.min1Position, 0, param.elementSize, param.elementSize,
					Math.floor(timeAndDateNow.mins%10), timeMillisecond, 9);
			}else{
				timeAndDateLast.flagMins1 = 
				DrawElement(param.min1Position, 0, param.elementSize, param.elementSize,
					Math.floor(timeAndDateNow.mins%10), timeMillisecond, 9, false);
			}
			if(timeAndDateLast.flagMins2){
				timeAndDateLast.flagMins2 = 
				DrawElement(param.min2Position, 0, param.elementSize, param.elementSize,
					Math.floor(timeAndDateNow.mins/10), timeMillisecond, 5);
			}else{
				timeAndDateLast.flagMins2 = 
				DrawElement(param.min2Position, 0, param.elementSize, param.elementSize,
					Math.floor(timeAndDateNow.mins/10), timeMillisecond, 5, false);
				
			}
			if(timeAndDateLast.flagHours1){
				timeAndDateLast.flagHours1 = 
				DrawElement(param.hour1Position, 0, param.elementSize, param.elementSize,
					Math.floor(timeAndDateNow.hours%10), timeMillisecond, 9);
			}else{
				timeAndDateLast.flagHours1 = 
				DrawElement(param.hour1Position, 0, param.elementSize, param.elementSize,
					Math.floor(timeAndDateNow.hours%10), timeMillisecond, 9, false);
			}
			if(timeAndDateLast.flagHours2){
				timeAndDateLast.flagHours2 = 
				DrawElement(param.hour2Position, 0, param.elementSize, param.elementSize,
					Math.floor(timeAndDateNow.hours/10), timeMillisecond, 2);
			}else{
				timeAndDateLast.flagHours2 = 
				DrawElement(param.hour2Position, 0, param.elementSize, param.elementSize,
					Math.floor(timeAndDateNow.hours/10), timeMillisecond, 2, false);
			}
			if(timeAndDateLast.flagDays1){
				timeAndDateLast.flagDays1 = 
				DrawElement(param.day1Position, 0, param.elementSize, param.elementSize,
					Math.floor(timeAndDateNow.days%10), timeMillisecond, 9);
			}else{
				timeAndDateLast.flagDays1 = 
				DrawElement(param.day1Position, 0, param.elementSize, param.elementSize,
					Math.floor(timeAndDateNow.days%10), timeMillisecond, 9, false);
			}
			if(timeAndDateLast.flagDays2){
				timeAndDateLast.flagDays2 = 
				DrawElement(param.day2Position, 0, param.elementSize, param.elementSize,
					Math.floor(timeAndDateNow.days/10)%10, timeMillisecond, 9);
			}else{
				timeAndDateLast.flagDays2 = 
				DrawElement(param.day2Position, 0, param.elementSize, param.elementSize,
					Math.floor(timeAndDateNow.days/10)%10, timeMillisecond, 9,false);
			}
			if(timeAndDateLast.flagDays3){
				timeAndDateLast.flagDays3 = 
				DrawElement(param.day3Position, 0, param.elementSize, param.elementSize,
					Math.floor(timeAndDateNow.days/100), timeMillisecond, 9);
			}else{
				timeAndDateLast.flagDays3 = 
				DrawElement(param.day3Position, 0, param.elementSize, param.elementSize,
					Math.floor(timeAndDateNow.days/100), timeMillisecond, 9,false);
			}
		}
		
		// if timer<0 start function
		if( (timeAndDateNow.days <= 0)&&
			(timeAndDateNow.hours <= 0)&&
			(timeAndDateNow.mins <= 0)&&
			(timeAndDateNow.secs < 0) ){
			clearTimeout(timerId);
			TimerEnd();
		}
	}

	function numFromStr(a){
		var 
			i = 0,
			n = "";
		while ( (isNaN(a[i]) == false)||(a[i] == ".")||(a[i] == ",") ){
			n += a[i];
			i++;
		}
		return parseFloat(n, 10);
	}


	function resizeCanvas(){
		Canvas.setAttribute("width", 0);

		width = findWidth.width;

		Canvas.setAttribute("width", width); 
		param = new ParametresType();
		height = 150.1*param.elementSize + 1;
		Canvas.setAttribute("height", height);

		CanvasContext.clearRect(0, 0, width, height);
		DrawText();
	}
	
	this.Start = function(){
		sec = this.SET_YOUR_SEC;
		min = this.SET_YOUR_MIN;
		hour = this.SET_YOUR_HOUR;
		day = this.SET_YOUR_DAY;
		month = this.SET_YOUR_MONTH;
		year = this.SET_YOUR_YEAR;
		num = this.NUM_OF_ELEMENTS;
		timeAnim = this.TIME_ANIMATION;
		backC = this.BACK_COLOR;
		digitsC = this.DIGITS_COLOR;
		textC = this.TEXT_COLOR;
		isDynamicColor = this.IS_DYNAMIC_COLOR;
		
		// add canvases to Html
		document.write('<div style="top: 0px;">');
		document.write('<img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" id="ResizingImage' + this.CANVAS_NAME + '" width="100%" height="1"></img>');
		document.write('<canvas id="' + this.CANVAS_NAME + '"></canvas>');
		document.write('</div>');
		
		findWidth = document.getElementById('ResizingImage' + this.CANVAS_NAME);
		width = findWidth.width;

		Canvas = document.getElementById(this.CANVAS_NAME);
		CanvasContext = Canvas.getContext("2d");

		Canvas.setAttribute("width", width); 
		param = new ParametresType();
		height = 150.1*param.elementSize + 1;
		Canvas.setAttribute("height", height);
		console.log(height);
        
		timeZoneEdit = (new Date().getTimezoneOffset() + this.TIME_ZONE*60)*60000;

		timeAndDateLast = new TimeInfo();
		img = new AllImages();

		DrawText();
		window.addEventListener('resize', resizeCanvas, true);
		window.onload = function(){resizeCanvas();}; // for safari
        timerId = setInterval(Main, 16);
	}
}
