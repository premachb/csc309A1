function draw(){
	var ctx = $('#myCanvas')[0].getContext('2d');
	
}
function selector(cur_select, button_descriptions){
	console.log("current action is " + cur_select);
	document.getElementById("current_action").innerHTML=button_descriptions[cur_select];
}

function draw_line(lineStartX, lineFinishX, lineStartY, lineFinishY){
	    var ctx = $('#myCanvas')[0].getContext('2d');
		ctx.beginPath();
		ctx.moveTo(lineStartX, lineStartY);
		ctx.lineTo(lineFinishX, lineFinishY);
		ctx.stroke();
}

$(document).ready(function() {

	var button_descriptions = {
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

	// User clicks mouse down to denote where to star their shape
	$('#myCanvas').mousedown(function(e) {
		lineStartX = e.clientX;
		lineStartY = e.clientY - yoffset;

		console.log("This is the start x: " + lineStartX);
		console.log("This is the start y: " + lineStartY);
	});

	// User lifts mouse up to denote where to finish their shape
	$('#myCanvas').mouseup(function(e){
		//var ctx = $('#myCanvas')[0].getContext('2d');
		lineFinishX = e.clientX;
		lineFinishY = e.clientY - yoffset;
		if(cur_select == 'line'){
			draw_line(lineStartX, lineFinishX, lineStartY, lineFinishY);
		}
		else {
			console.log("not line action");
		}
		//ctx.beginPath();
		//ctx.moveTo(lineStartX, lineStartY);
		//ctx.lineTo(lineFinishX, lineFinishY);
		//ctx.stroke();
	});

	$("button").click(function(){ cur_select = $(this).attr('id'); selector(cur_select, button_descriptions)});

});