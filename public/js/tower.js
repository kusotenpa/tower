(function(){
	var d = document;
	
	//canvas設定、satageのインスタンス生成
	var canvas = d.getElementById("canvas");
	canvas.width = d.getElementById("wrap").offsetWidth;
	canvas.height = d.getElementById("wrap").offsetHeight;
	var stage = new Stage(canvas);

	//1マスのサイズ
	var mapSize = 40;

	// //読み込む画像
	// var imgList = [
	// 	{src: "../public/img/tower.png"},
	// 	{src: "../public/img/tower.png"}
	// ];




	//敵移動ルート
	var rootPoint = [
			{x:1,y:0},
			{x:1,y:1},
			{x:1,y:2},
			{x:2,y:2},
			{x:3,y:2},
			{x:4,y:2},
			{x:5,y:2},
			{x:6,y:2},
			{x:6,y:3},
			{x:6,y:4},
			{x:5,y:4},
			{x:4,y:4},
			{x:3,y:4},
			{x:2,y:4},
			{x:1,y:4},
			{x:0,y:4},
			{x:0,y:5},
			{x:0,y:6},
			{x:0,y:7},
			{x:0,y:8},
			{x:0,y:9},
			{x:1,y:9},
			{x:2,y:9},
			{x:2,y:8},
			{x:2,y:7},
			{x:2,y:6},
			{x:3,y:6},
			{x:4,y:6},
			{x:5,y:6},
			{x:6,y:6},
			{x:7,y:6},
			{x:7,y:7}
		];



	//マップの描画
	function createMap(){
		//マスのデザイン
		var g = new Graphics();
		g.setStrokeStyle(5);
		g.beginStroke(Graphics.getHSL(180,50,50,1.0));
		g.beginFill("#888");

		//マスの描画
		for(var i = 0, w = canvas.width/mapSize; i < w; i++){
			for(var j = 0, h = canvas.height/mapSize; j < h; j++){

				//座標セット
				g.drawRect(i*mapSize,j*mapSize,mapSize,mapSize);

				//描画
				var s = new Shape(g);
				stage.addChild(s);
			}
		}
		stage.update();
	}
	createMap();


	//敵移動ルート描画
	enemyRoot();
	function enemyRoot(){
		//マスのデザイン
		var g = new Graphics();
		g.beginFill("#ff0000");

		for(var i=0,len = rootPoint.length; i < len; i++){
			g.drawRect(mapSize*rootPoint[i].x,mapSize*rootPoint[i].y,mapSize,mapSize);
			var s = new Shape(g);
			stage.addChild(s);
		}
		stage.update();

	}

	
	//towerImage
	tower = new Image();
	tower.src="../public/img/tower.png";
	tower.addEventListener("load",drawTower);

	//塔描画
	function drawTower(){
		var bitmap = new Bitmap(tower);
		bitmap.x = mapSize*6;
		bitmap.y = mapSize*8;
		stage.addChild(bitmap);
		stage.update();
	}

	//enemyImage
	enemyImg = new Image();
	enemyImg.src ="../public/img/dokuro.png";
	enemyImg.addEventListener("load",drawEnemy);

	//敵描画
	function drawEnemy(){
		enemy = new Bitmap(enemyImg);
		enemy.x = mapSize*1;
		enemy.y = mapSize*0;
		// enemy.cache(0, 0, 40, 40);　キャッシュ？
		stage.addChild(enemy);
		stage.update();
		Ticker.setFPS(30);
		Ticker.addListener(stage);
		moveEnemy();
		enemy.onClick = function(e) {
			alert("star object is clicked.");
		};

	}



	//敵移動アニメーション		
	function moveEnemy(){
		enemy.id = "enemy";
		var move = Tween.get(enemy,{loop:false});
		for(var i =0,len = rootPoint.length; i < len; i++){
			move.to({x:rootPoint[i].x*mapSize,y:rootPoint[i].y*mapSize},100,Ease.quartIn);
		}
		move.call(drawEnemy);


	}






	// var _rect = new Shape();
	// var g = _rect.graphics;
	// g.beginFill("#0066cc");
	// g.drawRect(-25, -25, 50, 50);
	// g.endFill();
	// _rect.x = 100;
	// _rect.y = 100;
	// stage.addChild(_rect);
	// stage.update();
	// Ticker.setFPS(30);
	// Ticker.addListener(stage);
	// tween();

	

	


// function tween() {
// 	_rect.id = "rect";
// 	var tween = Tween.get(_rect, {loop:true});
// 	console.log(tween._target.id); // 出力：rect
// 	tween.to({rotation:360}, 2000, Ease.linear);
// 	}






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