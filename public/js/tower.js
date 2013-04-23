function init(){
	var canvas = document.getElementById("canvas");

	var stage = new createjs.Stage(canvas);

	var myShape = new createjs.Shape();

	stage.addChild(myShape);
	myShape.x = 50;
	myShape.y = 50;


	var myGraphics = myShape.graphics;

	myGraphics.beginStroke("#0000FF");
	myGraphics.beginFill("#00ffff");
	myGraphics.drawCircle(0,0,40);
	stage.update();
}


(function(){











	// var canvas = document.getElementById("canvas");
	// canvas.width  = window.innerWidth;
	// canvas.height = window.innerHeight;
	// var ctx = canvas.getContext('2d');
	// ctx.fillStyle = 'rgb(155, 187, 89)';
	// ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
	// var size = 50;
	// for(var i = 0, x = canvas.width; i < x/size; i++){
	// 	for(var j = 0, y = canvas.height; j < y/size; j++){
	// 		ctx.fillStyle = "rgb("+parseInt(Math.random()*255)+","+parseInt(Math.random()*255)+","+parseInt(Math.random()*255)+")";
	// 		ctx.fillRect(i*size,j*size,size,size);
	// 	}
	// }

	// //options
 //    var point = {x:0,y:0};//座標
 //    var timer;
 //    var delay = 50;
 //    var par = {x:4,y:6};

 //    //draw()
 //    function draw(x,y){
 //        ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
 //        ctx.fillRect(x,y,50,50);
 //    }

	// var move = function(){
	// 	if(point.y <= 100){
	// 		point.y += par.y;
	// 	}
	// 	if(point.y > 100){
	// 		point.x += par.x;
	// 	}

	// 	draw(point.x,point.y);
	// 	clearTimeout(timer);
	// 	timer = setTimeout(move,delay);
	// };

 //    move();

})();