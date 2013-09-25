function draw(){
	var ctx = $('#myCanvas')[0].getContext('2d');
	
}
function selector(cur_select){
	console.log("current action is " + cur_select);
}

function draw_line(lineStartX, lineFinishX, lineStartY, lineFinishY){
	    var ctx = $('#myCanvas')[0].getContext('2d');
		ctx.beginPath();
		ctx.moveTo(lineStartX, lineStartY);
		ctx.lineTo(lineFinishX, lineFinishY);
		ctx.stroke();
}

$(document).ready(function() {
	var yoffset = document.getElementById('shape_selector').offsetHeight + document.getElementById('shape_action').offsetHeight;
	var lineFinishX, lineFinishY, lineStartX, lineStartY;
	var cur_select = null;

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

	$("button").click(function(){ cur_select = $(this).attr('id'); selector(cur_select)});

});