function selector(cur_select, button_descriptions){
	console.log("current action is " + cur_select);
	document.getElementById("current_action").innerHTML=button_descriptions[cur_select];
	if (cur_select == "clear"){
		erase_canvas(false);
	}
}

function draw_line(lineStartX, lineFinishX, lineStartY, lineFinishY){
	    var ctx = $('#myCanvas')[0].getContext('2d');
		ctx.beginPath();
		ctx.moveTo(lineStartX, lineStartY);
		ctx.lineTo(lineFinishX, lineFinishY);
		ctx.stroke();
}

function draw_triangle(){
		var ctx = $('#myCanvas')[0].getContext('2d');
		ctx.beginPath();
		// This is harder then I thought :S
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
		//ctx.strokeRect(startX, startY, width, height);
	} else{
		if(startY < finishY){
			ctx.strokeRect(finishX, startY, width, height);
		} else{
			ctx.strokeRect(finishX, finishY, width, height);
		}
		
	}
	//ctx.strokeRect(startX, startY, width, height);

}
function Line(lineStartX, lineFinishX, lineStartY, lineFinishY){
	//var ctx = $('#myCanvas')[0].getContext('2d');
	console.log(lineStartX, lineFinishX, lineStartY, lineFinishY);
	this.lineStartX = lineStartX;
	this.lineStartY = lineStartY;
	this.lineFinishX = lineFinishX;
	this.lineFinishY = lineFinishY;
	this.color;
	this.fill="#FF0000";
	this.outline_width;
	this.draw=function(ctx){
		ctx.beginPath();
		ctx.moveTo(this.lineStartX, this.lineStartY);
		ctx.lineTo(this.lineFinishX, this.lineFinishY);
		ctx.stroke();
	}
}
function draw_objects(ctx, shapeArray){
	var arrLength = shapeArray.length;
	for(var index = 0; index < arrLength; index++){
		shapeArray[index].draw(ctx);
	}
}

function erase_canvas(internal){
	if(internal){
		$('#myCanvas')[0].width = $('#myCanvas')[0].width;
	}
	else{
		if (confirm ('Are you sure you want to erase all objects on the canvas?')){
			$('#myCanvas')[0].width = $('#myCanvas')[0].width;
			$('#current_action').text('Erased Canvas!');
		}
	}
}

// TODO create a Shape object in which 

$(document).ready(function() {

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

	var yoffset = document.getElementById('shape_selector').offsetHeight + document.getElementById('shape_action').offsetHeight;
	var lineFinishX, lineFinishY, lineStartX, lineStartY;
	var cur_select = "none";
	var shapes = []; // keep track of the objects currently on the canvas. 
	var mDown = false;
	// User clicks mouse down to denote where to star their shape
	$('#myCanvas').mousedown(function(e) {

		if(cur_select == 'line'){
			lineStartX = e.clientX;
			lineStartY = e.clientY - yoffset;
		}

		else if(cur_select == 'square'){
			lineStartX = e.clientX;
			lineStartY = e.clientY - yoffset;
		}
	});

	//this is where the drawing occurs
	$(document).mousemove(function(event){
		if(mDown=true){
			// object is being drawn
			// update the screen
			//draw_objects();
			//drawTemp();
		}
		// used for debugging purposes only - remove this line (eventually)
		$('#current_action').text(event.pageX + " " + event.pageY);
  	});
	// User lifts mouse up to denote where to finish their shape
	$('#myCanvas').mouseup(function(e){
		//var ctx = $('#myCanvas')[0].getContext('2d');
		lineFinishX = e.clientX;
		lineFinishY = e.clientY - yoffset;
		if(cur_select == 'line'){
			draw_line(lineStartX, lineFinishX, lineStartY, lineFinishY);
			var tempLine = new Line(lineStartX, lineFinishX, lineStartY, lineFinishY);
		}
		else if(cur_select == 'square'){
			draw_square(lineStartX, lineStartY, lineFinishX, lineFinishY);
		}
		else { 
			console.log("not line action");
		}
	});



	$("button").click(function(){ cur_select = $(this).attr('id'); selector(cur_select, button_descriptions)});

});