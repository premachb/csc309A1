function selector(cur_select, button_descriptions, shapeArray){
	console.log("current action is " + cur_select);
	document.getElementById("current_action").innerHTML=button_descriptions[cur_select];
	if (cur_select == "clear"){
		erase_canvas(false, shapeArray);
	}
}

function draw_line(lineStartX, lineStartY, lineFinishX, lineFinishY){
	    var ctx = $('#myCanvas')[0].getContext('2d');
		ctx.beginPath();
		ctx.moveTo(lineStartX, lineStartY);
		ctx.lineTo(lineFinishX, lineFinishY);
		ctx.stroke();
}

function draw_triangle(lineStartX, lineStartY, lineMidX, lineMidY, curX, curY){
		var ctx = $('#myCanvas')[0].getContext('2d');
		ctx.beginPath();
		ctx.moveTo(lineStartX, lineStartY);
		ctx.lineTo(lineMidX, lineMidY);
		ctx.lineTo(curX, curY);
		ctx.closePath();
		ctx.stroke();
}

function draw_square(startX, startY, finishX, finishY){
	var ctx = $('#myCanvas')[0].getContext('2d');
	var height = Math.abs(finishY - startY);
	var width = Math.abs(finishX - startX);
	if(startX < finishX){
		if(startY < finishY){
			ctx.strokeRect(startX, startY, width, height);
		}else{
			ctx.strokeRect(startX, finishY, width, height);
		}
	} else{
		if(startY < finishY){
			ctx.strokeRect(finishX, startY, width, height);
		} else{
			ctx.strokeRect(finishX, finishY, width, height);
		}
		
	}
	//ctx.strokeRect(startX, startY, width, height);

}
function Square(startX, startY, finishX, finishY){
	if(startX < finishX){
		if(startY < finishY){
			this.x = startX;
			this.y = startY;
		} else{
			this.x = startX;
			this.y = finishY;
		}
	} else{
		if(startY < finishY){
			this.x = finishX;
			this.y = startY;
		} else{
			this.x = finishX;
			this.y = finishY;
		}
		
	}
	this.height = Math.abs(finishY - startY);
	this.width = Math.abs(finishX - startX);
	this.strokeStyle = "#00B2EE";
	this.fillStyle = "#E31230";
	this.lineWidth = 1;
	this.setStyle=function(strokeStyle, fillStyle, lineWidth){
		this.lineWidth = lineWidth;
		this.strokeStyle = strokeStyle;
		this.fillStyle = fillStyle;
	}
	this.draw=function(ctx){
		ctx.lineWidth = this.lineWidth;
		ctx.strokeStyle = this.strokeStyle;
		ctx.fillStyle = this.fillStyle;
		ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.strokeRect(this.x, this.y, this.width, this.height);
		resetCtx(ctx)
	}
}
function Triangle(lineStartX, lineStartY, lineMidX, lineMidY, lineFinishX, lineFinishY){
	this.lineStartX = lineStartX;
	this.lineStartY =  lineStartY;
	this.lineMidX = lineMidX;
	this.lineMidY = lineMidY;
	this.lineFinishX = lineFinishX;
	this.lineFinishY = lineFinishY;
	this.lineWidth = 1;
	this.fillStyle = "#00B2EE";
	this.strokeStyle = "#E31230";
	this.setStyle=function(strokeStyle, fillStyle, lineWidth){
		this.lineWidth = lineWidth;
		this.strokeStyle = strokeStyle;
		this.fillStyle = fillStyle;
	}
	this.updateMid=function(newX, newY){
		this.lineMidX = newX;
		this.lineMidY = newY;
	}
	this.draw=function(ctx){
		ctx.lineWidth = this.lineWidth;
		ctx.strokeStyle = this.strokeStyle;
		ctx.fillStyle = this.fillStyle;
		ctx.beginPath();
		ctx.moveTo(this.lineStartX, this.lineStartY);
		ctx.lineTo(this.lineMidX, this.lineMidY);
		ctx.lineTo(this.lineFinishX, this.lineFinishY);
		ctx.closePath();
		ctx.fill();
		ctx.stroke();
		resetCtx(ctx)
	}


}

function resetCtx(ctx){
	// set to a default black/black/1 px line
	ctx.lineWidth = 1;
	ctx.strokeStyle = "000000"
	ctx.fillStyle = "000000"
}

function Line(lineStartX, lineFinishX, lineStartY, lineFinishY){
	//var ctx = $('#myCanvas')[0].getContext('2d');
	//console.log(lineStartX, lineFinishX, lineStartY, lineFinishY);
	this.lineStartX = lineStartX;
	this.lineStartY = lineStartY;
	this.lineFinishX = lineFinishX;
	this.lineFinishY = lineFinishY;
	this.lineWidth = 1;
	this.strokeStyle = "#FF0000";
	this.fillStyle = "#FF0000"
	this.outline_width;
	this.setStyle=function(strokeStyle, fillStyle, lineWidth){
		this.lineWidth = lineWidth;
		this.strokeStyle = strokeStyle;
		this.fillStyle = fillStyle;
	}
	this.draw=function(ctx){
		ctx.lineWidth = this.lineWidth;
		ctx.fillStyle = this.fillStyle;
		ctx.strokeStyle = this.strokeStyle;
		ctx.beginPath();
		ctx.moveTo(this.lineStartX, this.lineStartY);
		ctx.lineTo(this.lineFinishX, this.lineFinishY);
		ctx.fill();
		ctx.stroke();
		resetCtx(ctx)
	}
}

function draw_objects(ctx, shapeArray){
	erase_canvas(true, shapeArray);
	if(shapeArray !== 'undefined'){
		var arrLength = shapeArray.length;
		for(var index = 0; index < arrLength; index++){
			shapeArray[index].draw(ctx);
		}
	}
}

function draw_temp(ctx, cur_select, lineStartX, lineStartY, lineMidX, lineMidY, curX, curY){
	if(cur_select=='line'){
		// draw temp line
		draw_line(lineStartX, lineStartY, curX, curY);
	} else if (cur_select=='square'){
		// draw temp square
		draw_square(lineStartX, lineStartY, curX, curY);
	} else {
		// it is a temp triangle to be drawn
		if(lineStartX == lineMidX){
			draw_line(lineStartX, lineStartY, curX, curY);
		}else{
			draw_triangle(lineStartX, lineStartY, lineMidX, lineMidY, curX, curY);
		}
		
	}


}

function erase_canvas(internal, shapeArray){

	if(internal){
		$('#myCanvas')[0].width = $('#myCanvas')[0].width;
	}
	else{
		if (confirm ('Are you sure you want to erase all objects on the canvas?')){
			shapeArray.length = 0;
			$('#myCanvas')[0].width = $('#myCanvas')[0].width;
			$('#current_action').text('Erased Canvas!');
		}
	}
}

// TODO create a Shape object in which 

$(document).ready(function() {
	var ctx = $('#myCanvas')[0].getContext('2d');
	var shapeArray = new Array(); // keep track of the objects currently on the canvas.
	var button_descriptions = { // Could maybe move this to CSS and then call that ways
		"line" : "Line tool: Click on a starting point and drag to ending point",
		"triangle" : "insert instructions",
		"square" : "Click on top left corner of your desired square and then drag to bottom right corner",
		"erase" : "Click on the object you wish to erase. This action cannot be undone",
		"move" : "Click on an object you would like to move and drag it to its new position",
		"resize" : "CLick on an object and drag the bottom right corner until your desired demensions are met",
		"change" : "Click on an object to modify its color, line color, or ???",
		"copy" : "Click on an object to store it for a paste action",
		"paste" : "Click within the canvas to add another object that is the same as the one stored by the copy feature",
		"clear" : "Remove all objects off the canvas. THIS ACTION CANNOT BE UNDONE"
	};

	var yoffset = document.getElementById('shape_selector').offsetHeight + document.getElementById('shape_action').offsetHeight
																		 + document.getElementById('line-width').offsetHeight
																		 + document.getElementById('stroke-color').offsetHeight
																		 + document.getElementById('fill-color').offsetHeight;
	var lineFinishX, lineFinishY, lineStartX, lineStartY, lineMidX, lineMidY;
	var cur_select = "none";
	var mDown = false;
	var fillStyle = document.getElementById('fill-color').value;
	var strokeStyle = document.getElementById('stroke-color').value;
	var lineWidth = document.getElementById('line-width').value;
	var triangleValidMid=false;
	// User clicks mouse down to denote where to star their shape
	$('#myCanvas').mousedown(function(e) {
		mDown = true;
		if(cur_select == 'line'){
			lineStartX = e.clientX;
			lineStartY = e.clientY - yoffset;
		}
		else if(cur_select == 'square'){
			lineStartX = e.clientX;
			lineStartY = e.clientY - yoffset;
		} 
		else if (cur_select == 'triangle'){
			if (triangleValidMid){
				//tempTriangle.updateMid(e.clientX, e.clientY - yoffset);
				lineMidX = e.clientX;
				lineMidY = e.clientY - yoffset;
				triangleValidMid = true;
			} else{
				console.log("started triangle");
				lineStartX = e.clientX;
				lineStartY = e.clientY - yoffset;
			}
		}
	});

	//this is where the drawing occurs
	$(document).mousemove(function(event){
		if(mDown==true){
			// object is being drawn
			// update the screen
			curX = event.clientX;
			curY = event.clientY - yoffset;
			draw_objects(ctx, shapeArray);
			if(triangleValidMid){
				draw_temp(ctx, cur_select, lineStartX, lineStartY, lineMidX, lineMidY, curX, curY)
			} else{
				draw_temp(ctx, cur_select, lineStartX, lineStartY, lineStartX, lineStartY, curX, curY);
			}
			//draw_temp(ctx, cur_select, lineStartX, lineStartY, event.pageX, event.pageY - yoffset);
		}
  	});

	// User lifts mouse up to denote where to finish their shape
	$('#myCanvas').mouseup(function(e){
		fillStyle = document.getElementById('fill-color').value;
		strokeStyle = document.getElementById('stroke-color').value;
		lineWidth = document.getElementById('line-width').value;
		mDown=false;
		var ctx = $('#myCanvas')[0].getContext('2d');
		lineFinishX = e.clientX;
		lineFinishY = e.clientY - yoffset;

		if(cur_select == 'line'){
			var tempLine = new Line(lineStartX, lineFinishX, lineStartY, lineFinishY);
			tempLine.setStyle(strokeStyle, fillStyle, lineWidth);
			shapeArray.push(tempLine);
		}
		else if(cur_select == 'square'){
			var tempSquare = new Square(lineStartX, lineStartY, lineFinishX, lineFinishY);
			tempSquare.setStyle(strokeStyle, fillStyle, lineWidth);
			shapeArray.push(tempSquare);
		}
		else if (cur_select == 'triangle'){
			if(triangleValidMid){
				var tempTriangle = new Triangle(lineStartX, lineStartY, lineMidX, lineMidY, lineFinishX, lineFinishY);
				tempTriangle.setStyle(strokeStyle, fillStyle, lineWidth);
				tempTriangleLine = null;
				shapeArray.push(tempTriangle);
				triangleValidMid = false;
			}else{
				triangleValidMid = true;
				//tempTriangle.updateMid(lineFinishX, lineFinishY);
				lineMidX = lineFinishX;
				lineMidY = lineFinishY;
			}
		}

		else { 
			console.log("not line action");
		}
		draw_objects(ctx, shapeArray);
	});

	$("button").click(function(){ cur_select = $(this).attr('id'); selector(cur_select, button_descriptions, shapeArray)});

});