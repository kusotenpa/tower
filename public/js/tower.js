(function(){
	var d = document;

	//canvas設定、satageのインスタンス生成
	var canvas = d.getElementById("canvas");
	canvas.width = d.getElementById("wrap").offsetWidth;
	canvas.height = d.getElementById("wrap").offsetHeight;
	var stage = new Stage(canvas);
	createjs.Touch.enable(stage);

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
			{x:7,y:7},
			{x:7,y:8}
		];



	//マップの描画
	function createMap(){
		//マスの描画
		for(var i = 0, w = canvas.width/mapSize; i < w; i++){
			for(var j = 0, h = canvas.height/mapSize; j < h; j++){
				var eventFlag = false;
				var s = new Shape();
				var g = s.graphics;

				//マスのデザイン
				g.setStrokeStyle(5);
				g.beginStroke(Graphics.getHSL(180,50,50,1.0));
				g.beginFill("#888");
				g.drawRect(0,0,mapSize,mapSize);

				//座標セット
				s.x = i*mapSize;
				s.y = j*mapSize;

				//描画
				g.endFill();

				//敵ルート上かチェック
				for(var k=0,len = rootPoint.length; k < len; k++){
					if(s.x === mapSize*rootPoint[k].x && s.y === mapSize*rootPoint[k].y){
						s.addEventListener('click', function(e){
							alert("置けないいいいいい");
						});
						eventFlag = true;
					}
				}
				//敵ルート以外	
				if(eventFlag === false){
					s.addEventListener('click', function(e){
						console.log(e.target.id);
						var g = e.target.graphics;
						// g.clear();
						g.beginFill("#FFffff");
						g.drawRect(0,0,mapSize,mapSize);
						g.endFill();
						setFriend(e.target.x,e.target.y);
					});
				}
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

	//塔の体力
	var last = new Text(10,"44px Myriad Pro","#fff");
	stage.addChild(last);
	stage.update();

	//塔の体力減少
	function decreaseTower(){
		removeObj(last);
		last = new Text(last.text -1,"44px Myriad Pro","#fff");
		stage.addChild(last);
		stage.update();
		if(last.text === 0){
			alert("game over");
		}
	}
	


	//friendImage
	friend = new Image();
	friend.src = "../public/img/friend.png";

	//味方設置
	function setFriend(x,y){
		var bitmap = new Bitmap(friend);
		bitmap.x = x;
		bitmap.y = y;
		stage.addChild(bitmap);
		stage.update();
	}



	




	//towerImage
	tower = new Image();
	tower.src="../public/img/tower.png";
	tower.addEventListener("load",drawTower);

	//塔描画
	function drawTower(){
		var bitmap = new Bitmap(tower);
		var hp = new Text("HP","44px Myriad Pro","#fff");
		hp.x = 100;
		hp.y = 100;
		
		bitmap.x = mapSize*6;
		bitmap.y = mapSize*8;
		stage.addChild(bitmap,hp);
		stage.update();
	}



	//enemyImage
	enemyImg = new Image();
	enemyImg.src ="../public/img/dokuro.png";
	enemyImg.addEventListener("load",drawEnemy);

	//敵描画
	function drawEnemy(){
		var enemy = new Bitmap(enemyImg);
		enemy.x = mapSize*1;
		enemy.y = mapSize*0;
		// enemy.cache(0, 0, 40, 40);　キャッシュ？
		stage.addChild(enemy);
		stage.update();
		Ticker.setFPS(30);
		Ticker.addListener(stage);
		moveEnemy(enemy);
		enemy.onClick = function(e) {
			alert("star object is clicked.");
		};

	}

	//敵移動アニメーション		
	function moveEnemy(enemy){
		enemy.id = "enemy";
		var move = Tween.get(enemy,{loop:false});
		for(var i =0,len = rootPoint.length; i < len; i++){
			move.to({x:rootPoint[i].x*mapSize,y:rootPoint[i].y*mapSize},100,Ease.quartIn);
		}
		move
			.call(decreaseTower)
			.call(drawEnemy)
			.call(removeObj,[enemy]);
	}



	//オブジェクトの削除
	function removeObj(obj) {
		stage.removeChild(obj);
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