function draw(){
	var ctx = $('#myCanvas')[0].getContext('2d');
	
}



$(document).ready(function() {
	var yoffset = document.getElementById('Shape Selector').offsetHeight + document.getElementById('Shape Action').offsetHeight;
	var lineFinishX, lineFinishY, lineStartX, lineStartY;


	// User clicks mouse down to denote where to star their shape
	$('#myCanvas').mousedown(function(e) {
		lineStartX = e.clientX;
		lineStartY = e.clientY - yoffset;

		console.log("This is the start x: " + lineStartX);
		console.log("This is the start y: " + lineStartY);
	});

	// User lifts mouse up to denote where to finish their shape
	$('#myCanvas').mouseup(function(e){
		var ctx = $('#myCanvas')[0].getContext('2d');
		lineFinishX = e.clientX;
		lineFinishY = e.clientY - yoffset;

		ctx.beginPath();
		ctx.moveTo(lineStartX, lineStartY);
		ctx.lineTo(lineFinishX, lineFinishY);
		ctx.stroke();
	});

	
});