function selector(curSelect, button_descriptions, shapeArray) {
    // Update the on-screen action selection
    document.getElementById("current_action").innerHTML=button_descriptions[curSelect];
    if (curSelect == "clear") {
        eraseCanvas(false, shapeArray);
    }
}

// following functions are used to draw the "preview" shape for when the user has the mouse depressed
// and has selected one of the three draw object options
function drawTemp(ctx, curSelect, lineStartX, lineStartY, lineMidX, lineMidY, curX, curY) {
    console.log("about to draw", lineStartX, lineStartY, curX, curY);
    if(curSelect=='line') {
        // draw temp line
        drawLine(lineStartX, lineStartY, curX, curY);
    } else if (curSelect=='square') {
        // draw temp square
        drawSquare(lineStartX, lineStartY, curX, curY);
    } else {
        // it is a temp triangle to be drawn
        if(lineStartX == lineMidX) {
            drawLine(lineStartX, lineStartY, curX, curY);
        }else{
            drawTriangle(lineStartX, lineStartY, lineMidX, lineMidY, curX, curY);
        }

    }


}

function drawLine(lineStartX, lineStartY, lineFinishX, lineFinishY) {
    var ctx = $('#myCanvas')[0].getContext('2d');
    ctx.beginPath();
    ctx.moveTo(lineStartX, lineStartY);
    ctx.lineTo(lineFinishX, lineFinishY);
    ctx.stroke();
}

function drawTriangle(lineStartX, lineStartY, lineMidX, lineMidY, curX, curY) {
    var ctx = $('#myCanvas')[0].getContext('2d');
    ctx.beginPath();
    ctx.moveTo(lineStartX, lineStartY);
    ctx.lineTo(lineMidX, lineMidY);
    ctx.lineTo(curX, curY);
    ctx.closePath();
    ctx.stroke();
}

function drawSquare(startX, startY, finishX, finishY) {
    var ctx = $('#myCanvas')[0].getContext('2d');
    var height = Math.abs(finishY - startY);
    var width = Math.abs(finishX - startX);
    if(startX < finishX) {
        if(startY < finishY) {
            ctx.strokeRect(startX, startY, width, height);
        }else{
            ctx.strokeRect(startX, finishY, width, height);
        }
    } else{
        if(startY < finishY) {
            ctx.strokeRect(finishX, startY, width, height);
        } else{
            ctx.strokeRect(finishX, finishY, width, height);
        }

    }

}
function CopyInfo() {
    this.moving = false;
    this.squareDelta = [0,0];
    this.lineDelta = [0,0];
    this.triangleDelta = [[0,0],[0,0]];
    this.whichShape = null;
    this.lineWidth = 1;
    this.strokeStyle = '#000000';
    this.fillStlye = '#000000';
    this.moveOffset  = [0,0];
    this.setSquareDelta=function(sArr) {
        this.squareDelta = sArr;
    }
    this.setLineDelta = function(lArr) {
        this.lineDelta = lArr;
    }
    this.setTriangleDelta = function(tArr) {
        this.triangleDelta = tArr;
    }
    this.setSelection=function(shapeType) {
        this.whichShape = shapeType;
    }
    this.setStyle=function(styleArray) {
        this.lineWidth = styleArray[2];
        this.strokeStyle = styleArray[0];
        this.fillStyle = styleArray[1];
    }
    this.createCopy=function(ctx, shapeArray, x, y) {
        if(this.whichShape == 'square') {
            var tSquare = new Square(x - this.moveOffset[0], y - this.moveOffset[1],
                x + this.squareDelta[0] - this.moveOffset[0], y + this.squareDelta[1] - this.moveOffset[1]);
            tSquare.setStyle(this.strokeStyle, this.fillStyle, this.lineWidth);
            shapeArray.push(tSquare);
        }else if(this.whichShape == 'line') {
            var tLine = new Line(x, y, x + this.lineDelta[0], y + this.lineDelta[1]);
            tLine.setStyle(this.strokeStyle, this.fillStyle, this.lineWidth);
            shapeArray.push(tLine);

        }else if(this.whichShape == 'triangle') {
            var tTriangle = new Triangle(x - this.moveOffset[0], y - this.moveOffset[1],
                x + this.triangleDelta[0][0], y + this.triangleDelta[0][1],
                x + this.triangleDelta[1][0], y + this.triangleDelta[1][1]);
            tTriangle.setStyle(this.strokeStyle, this.fillStyle, this.lineWidth);
            shapeArray.push(tTriangle);
        }
    }
    this.drawMove=function(ctx, x1, y1) {
        if(this.whichShape=='line') {
            // draw temp line
            return;
        } else if (this.whichShape=='square') {
            // draw temp square
            //drawSquare(x, y, x + this.squareDelta[0], y + this.squareDelta[1]);
            drawTemp(ctx, 'square', x1, y1, 0, 0, x1 + this.squareDelta[0], y1 + this.squareDelta[1]);
        } else {
            // it is a temp triangle to be drawn

            drawTriangle(x1, y1,
                x1 + this.triangleDelta[0][0], y1 + this.triangleDelta[0][1],
                x1 + this.triangleDelta[1][0], y1 + this.triangleDelta[1][1]);


        }
    }
}

function Square(startX, startY, finishX, finishY) {
    if(startX < finishX) {
        if(startY < finishY) {
            this.x = startX;
            this.y = startY;
        } else{
            this.x = startX;
            this.y = finishY;
        }
    } else{
        if(startY < finishY) {
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

    this.setStyle=function(strokeStyle, fillStyle, lineWidth) {
        this.lineWidth = lineWidth;
        this.strokeStyle = strokeStyle;
        this.fillStyle = fillStyle;
    }
    this.getStyle=function() {
        return [this.strokeStyle, this.fillStyle, this.lineWidth];
    }
    this.draw=function(ctx) {

        ctx.lineWidth = this.lineWidth;
        ctx.strokeStyle = this.strokeStyle;
        ctx.fillStyle = this.fillStyle;
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        resetCtx(ctx)
    }
    this.getDelta=function() {
        return [this.width, this.height];
    }
    this.shapeType=function() {
        return 'square';
    }
    this.resize=function(scalingFactor) {
        this.height = this.height * scalingFactor;
        this.width = this.width * scalingFactor;
    }
}
function Triangle(lineStartX, lineStartY, lineMidX, lineMidY, lineFinishX, lineFinishY) {
    this.lineStartX = lineStartX;
    this.lineStartY =  lineStartY;
    this.lineMidX = lineMidX;
    this.lineMidY = lineMidY;
    this.lineFinishX = lineFinishX;
    this.lineFinishY = lineFinishY;
    this.lineWidth = 1;
    this.fillStyle = "#00B2EE";
    this.strokeStyle = "#E31230";
    this.setStyle=function(strokeStyle, fillStyle, lineWidth) {
        this.lineWidth = lineWidth;
        this.strokeStyle = strokeStyle;
        this.fillStyle = fillStyle;
    }
    this.getStyle=function() {
        return [this.strokeStyle, this.fillStyle, this.lineWidth];
    }
    this.updateMid=function(newX, newY) {
        this.lineMidX = newX;
        this.lineMidY = newY;
    }
    this.draw=function(ctx) {
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
    this.getDelta=function() {
        return[
            [this.lineMidX - this.lineStartX, this.lineMidY - this.lineStartY],
            [this.lineFinishX - this.lineStartX, this.lineFinishY - this.lineStartY]
        ];
    }
    this.shapeType=function() {
        return 'triangle';
    }
    this.resize=function(scalingFactor) {
        curDelta = this.getDelta();
        this.lineMidX = this.lineStartX + (scalingFactor * (curDelta[0][0]));
        this.lineMidY = this.lineStartY + (scalingFactor * (curDelta[0][1]));
        this.lineFinishX = this.lineStartX + (scalingFactor * (curDelta[1][0]));
        this.lineFinishY = this.lineStartY + (scalingFactor * (curDelta[1][1]));

    }


}
function erase(shapeArray, i, curX, curY) {
    shapeArray.splice(i,1);
}

function resetCtx(ctx) {
    // set to a default black/black/1 px line
    ctx.lineWidth = 3;
    ctx.strokeStyle = "000000"
    ctx.fillStyle = "000000"
}

function Line(lineStartX, lineFinishX, lineStartY, lineFinishY) {
    //var ctx = $('#myCanvas')[0].getContext('2d');
    this.lineStartX = lineStartX;
    this.lineStartY = lineStartY;
    this.lineFinishX = lineFinishX;
    this.lineFinishY = lineFinishY;
    this.lineWidth = 1;
    this.strokeStyle = "#FF0000";
    this.fillStyle = "#FF0000"
    this.outline_width;
    this.setStyle=function(strokeStyle, fillStyle, lineWidth) {
        this.lineWidth = lineWidth;
        this.strokeStyle = strokeStyle;
        this.fillStyle = fillStyle;
    }
    this.draw=function(ctx) {
        ctx.lineWidth = this.lineWidth;
        ctx.fillStyle = this.fillStyle;
        ctx.strokeStyle = this.strokeStyle;
        ctx.beginPath();
        ctx.moveTo(this.lineStartX, this.lineStartY);
        ctx.lineTo(this.lineFinishX, this.lineFinishY);
        ctx.stroke();
        resetCtx(ctx)
    }
    this.getDelta=function() {
        return [this.lineFinishX - this.lineStartX, this.lineFinishY - this.lineStartY];
    }
    this.shapeType=function() {
        return 'line';
    }
}
function mDownDrawObjects(ctx, curSelect, copyObject, moveObject, shapeArray, curX, curY, fillStyle, strokeStyle, lineWidth, scalingFactor) {
    eraseCanvas(true, shapeArray);
    topZ = -1;
    if(shapeArray !== 'undefined') {
        var arrLength = shapeArray.length;
        for(var index = 0; index < arrLength; index++) {
            shapeArray[index].draw(ctx);
            if(ctx.isPointInPath(curX, curY)) {
                // keeping track of the object with greatest Z index will have largest i index
                topZ = index;
            }
        }
        if(topZ > -1) {
            document.getElementById('myCanvas').style.cursor='pointer';
            if(curSelect == 'erase') {
                shapeArray.splice(topZ,1);
                mMoveDrawObjects(ctx, shapeArray);
            }
            // move
            else if(curSelect == 'move') {
                shapeType = shapeArray[topZ].shapeType();
                moveObject.setSelection(shapeType);
                moveObject.setStyle(shapeArray[topZ].getStyle());

                moveObject.moving = true;
                if(shapeType == 'square') {
                    console.log(curX - shapeArray[topZ].x, curY - shapeArray[topZ].y);
                    moveObject.moveOffset = [curX - shapeArray[topZ].x, curY - shapeArray[topZ].y];
                    moveObject.setSquareDelta(shapeArray[topZ].getDelta());
                    shapeArray.splice(topZ,1);
                    return;
                }else if(shapeType == 'line') {
                    return;
                }else{
                    //triangle
                    console.log(shapeArray[topZ].lineStartX);
                    moveObject.setTriangleDelta(shapeArray[topZ].getDelta());
                    shapeArray.splice(topZ,1);
                    return;
                }
            }
            // resize
            else if(curSelect == 'resize') {
                shapeArray[topZ].resize(scalingFactor);
            }

            //change attributes
            else if(curSelect == 'change') {
                shapeArray[topZ].setStyle(strokeStyle, fillStyle, lineWidth);
                mMoveDrawObjects(ctx, shapeArray);
            }

            //copy
            else if(curSelect == 'copy') {
                shapeType = shapeArray[topZ].shapeType();
                copyObject.setSelection(shapeType);
                copyObject.setStyle(shapeArray[topZ].getStyle());
                if(shapeType == 'square') {
                    copyObject.setSquareDelta(shapeArray[topZ].getDelta());
                    return;
                }else if(shapeType == 'line') {
                    return;
                }else{
                    //triangle
                    copyObject.setTriangleDelta(shapeArray[topZ].getDelta());
                    return;
                }
            }

        }
        if(curSelect == 'paste') {
            copyObject.createCopy(ctx, shapeArray, curX, curY);
            mMoveDrawObjects(ctx, shapeArray);
        }
    }

}

function mMoveDrawObjects(ctx, shapeArray, curX, curY) {
    eraseCanvas(true, shapeArray);
    hover = false;
    if(shapeArray !== 'undefined') {
        var arrLength = shapeArray.length;
        for(var index = 0; index < arrLength; index++) {
            shapeArray[index].draw(ctx);
            if(ctx.isPointInPath(curX, curY)) {
                // change cursor icon
                hover = true;
            }
        }
    }
    if(hover) {
        document.getElementById('myCanvas').style.cursor='pointer';
    }else{
        document.getElementById('myCanvas').style.cursor='crosshair';
    }
}

function drawTemp(ctx, curSelect, lineStartX, lineStartY, lineMidX, lineMidY, curX, curY) {
    if(curSelect=='line') {
        // draw temp line
        drawLine(lineStartX, lineStartY, curX, curY);
    } else if (curSelect=='square') {
        // draw temp square
        drawSquare(lineStartX, lineStartY, curX, curY);
    } else {
        // it is a temp triangle to be drawn
        if(lineStartX == lineMidX) {
            drawLine(lineStartX, lineStartY, curX, curY);
        }else{
            drawTriangle(lineStartX, lineStartY, lineMidX, lineMidY, curX, curY);
        }

    }


}

function eraseCanvas(internal, shapeArray) {

    if(internal) {
        $('#myCanvas')[0].width = $('#myCanvas')[0].width;
    }
    else{
        if (confirm ('Are you sure you want to erase all objects on the canvas?')) {
            shapeArray.length = 0;
            $('#myCanvas')[0].width = $('#myCanvas')[0].width;
            $('#current_action').text('Erased Canvas!');
        }
    }
}

// TODO create a Shape object in which 

$(document).ready(function() {
    document.getElementById('myCanvas').style.cursor='crosshair';
    var ctx = $('#myCanvas')[0].getContext('2d');
    var shapeArray = new Array(); // keep track of the objects currently on the canvas.
    var copyArray = new Array();
    var button_descriptions = { // Could maybe move this to CSS and then call that ways
        "line" : "Line tool: Click on a starting point and drag to ending point",
        "triangle" : "Triangle Tool: Click on a starting point and drag to create the base, click again and drag to complete the triangle",
        "square" : "Click on top left corner of your desired square and then drag to bottom right corner",
        "erase" : "Click on the object you wish to erase. This action cannot be undone",
        "move" : "Click on an object you would like to move and drag it to its new position",
        "resize" : "CLick on an object and drag the bottom right corner until your desired demensions are met",
        "change" : "Click on an object to modify its fill color, line color, or line width",
        "copy" : "Click on an object to store it for a paste action",
        "paste" : "Click within the canvas to add another object that is the same as the one stored by the copy feature",
        "clear" : "Remove all objects off the canvas. THIS ACTION CANNOT BE UNDONE"
    };

    var yoffset = document.getElementById('title').offsetHeight + document.getElementById('shape_selector').offsetHeight + document.getElementById('shape_action').offsetHeight + 60;
    var xoffset = 10;
    var lineFinishX, lineFinishY, lineStartX, lineStartY, lineMidX, lineMidY;
    var curSelect = "none";
    var fillStyle = document.getElementById('fill-color').value;
    var strokeStyle = document.getElementById('stroke-color').value;
    var lineWidth = document.getElementById('line-width').value;
    var scalingFactor = document.getElementById('rescale-factor').value;
    var triangleValidMid=false;
    var drawingObject = false;
    var copyThisObject = null;
    var copyObject = new CopyInfo;
    var moveObject = new CopyInfo;

    // User clicks mouse down to denote where to star their shape
    $('#myCanvas').mousedown(function(e) {
        fillStyle = document.getElementById('fill-color').value;
        strokeStyle = document.getElementById('stroke-color').value;
        lineWidth = document.getElementById('line-width').value;
        scalingFactor = document.getElementById('rescale-factor').value;
        curX = e.clientX - xoffset;
        curY = e.clientY - yoffset + $(window).scrollTop();
        if((curSelect == 'line') | (curSelect == 'square') | (curSelect == 'triangle')){
            drawingObject = true;
            if(triangleValidMid){
                lineMidX = curX;
                lineMidY = curY;
            } else{
                lineStartX = curX;
                lineStartY = curY;
            }
            mMoveDrawObjects(ctx, shapeArray, curX, curY);
        } else {
            mDownDrawObjects(ctx, curSelect, copyObject, moveObject, shapeArray,curX, curY, fillStyle, strokeStyle, lineWidth, scalingFactor);
        }3
    });

    $(document).mousemove(function(event) {
        curX = event.clientX - xoffset;
        curY = event.clientY - yoffset + $(window).scrollTop();

        if(moveObject.moving == true) {
            moveObject.drawMove(drawTemp, ctx, curX, curY);
        } else {
            mMoveDrawObjects(ctx, shapeArray, curX, curY);
            if(drawingObject) {
                // drawing the outline after all other objects will give it the highest z-index
                if(triangleValidMid) {
                    drawTemp(ctx, curSelect, lineStartX, lineStartY, lineMidX, lineMidY, curX, curY)
                } else{
                    drawTemp(ctx, curSelect, lineStartX, lineStartY, lineStartX, lineStartY, curX, curY);
                }
            }
        }
    });

    // User lifts mouse up to denote where to finish their shape
    $('#myCanvas').mouseup(function(e) {
        if(moveObject.moving) {
            moveObject.createCopy(ctx, shapeArray, curX, curY);
        }
        moveObject.moving = false;
        fillStyle = document.getElementById('fill-color').value;
        strokeStyle = document.getElementById('stroke-color').value;
        lineWidth = document.getElementById('line-width').value;
        //var ctx = $('#myCanvas')[0].getContext('2d');
        lineFinishX = e.clientX - xoffset;
        lineFinishY = e.clientY - yoffset + $(window).scrollTop();

        if(curSelect == 'line') {
            var tempLine = new Line(lineStartX, lineFinishX, lineStartY, lineFinishY);
            tempLine.setStyle(strokeStyle, fillStyle, lineWidth);
            shapeArray.push(tempLine);
            drawingObject = false;
        }
        else if(curSelect == 'square') {
            var tempSquare = new Square(lineStartX, lineStartY, lineFinishX, lineFinishY);
            tempSquare.setStyle(strokeStyle, fillStyle, lineWidth);
            shapeArray.push(tempSquare);
            drawingObject = false;
        }
        else if (curSelect == 'triangle') {
            if(triangleValidMid) {
                var tempTriangle = new Triangle(lineStartX, lineStartY, lineMidX, lineMidY, lineFinishX, lineFinishY);
                tempTriangle.setStyle(strokeStyle, fillStyle, lineWidth);
                shapeArray.push(tempTriangle);
                triangleValidMid = false;
                drawingObject = false;
            }else{
                triangleValidMid = true;
                lineMidX = lineFinishX;
                lineMidY = lineFinishY;
            }
        }
        mMoveDrawObjects(ctx, shapeArray);
    });

    $("button").click(function() { curSelect = $(this).attr('id'); selector(curSelect, button_descriptions, shapeArray)});

});