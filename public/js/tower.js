(function(){
	var d = document;
//attackerImage
	var up = new Image();
	up.src = "../public/img/up.png";

	var right = new Image();
	right.src = "../public/img/right.png";

	var down = new Image();
	down.src = "../public/img/down.png";

	var left = new Image();
	left.src = "../public/img/left.png";

	var all = new Image();
	all.src = "../public/img/all.png";
	//attackerの種類
	var type = "up";
	var attacker = up;

	d.body.addEventListener("touchstart",function(e){
		var id = e.target.id;
		e.stopPropagation();
		if(id !== "canvas"){
			type = id;
			attacker = id;
		}
	},false);


	//canvas設定、satageのインスタンス生成
	var canvas = d.getElementById("canvas");
	canvas.width = d.getElementById("wrap").offsetWidth;
	canvas.height = d.getElementById("wrap").offsetHeight;
	var stage = new Stage(canvas);
	createjs.Touch.enable(stage);

	//1マスのサイズ
	var mapSize = 40;


	



	//味方設置座標
	var attackerPoint = [];

	//敵現在地座標
	var nowPoint = [];

	//敵カウンター
	var enemyCounter = 0;

	//敵移動座標
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
						setAttacker(e.target.x,e.target.y);
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
			// alert("game over");
		}
	}

	//味方設置
	function setAttacker(x,y){
		// console.log(attacker.src);
		var bitmap = new Bitmap(attacker);
		bitmap.x = x;
		bitmap.y = y;

		//設置座標の登録
		attackerPoint.push({x:x,y:y});

		stage.addChild(bitmap);

		attackCourse(bitmap,x,y);
	}

	//攻撃範囲判定
	function attackCourse(obj,x,y){
		var course = null;
		for(var i = 0, len = nowPoint.length; i < len; i++ ){
			//上
			if(x === nowPoint[i].x && y === nowPoint[i].y + mapSize){
				console.log("上キタ");
				course = "up";
			}
			//右
			if(x === nowPoint[i].x - mapSize && y  === nowPoint[i].y){
				console.log("右キタ");
				course = "right";
			}
			//下
			if(x === nowPoint[i].x && y === nowPoint[i].y - mapSize){
				console.log("下キタ");
				course = "down";
			}
			//左
			if(x === nowPoint[i].x + mapSize && y === nowPoint[i].y){
				console.log("左キタ");
				course = "left";
			}
			attackMotion(x,y,course);
		}
		setTimeout(arguments.callee,1000,obj,x,y);
	}

	//攻撃アニメーション
	function attackMotion(x,y,course){
		var center = mapSize / 2;
		var s = new Shape();
		var g = s.graphics;
		g.beginFill("#6045b8");
		g.drawEllipse(x,y,5,10);
		stage.addChild(s);
		var attack = Tween.get(s,{loop:false});
		switch(course){
			case "up":
				attack.to({x: center , y: -center},100);
				break;

			case "right":
				attack.to({x: mapSize + center , y: center},100);
				break;

			case "down":
				attack.to({x: center , y: mapSize + center},100);
				break;

			case "left":
				attack.to({x: -center , y: center},100);
				break;
		}
		attack.call(removeObj,[s]);

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
		moveEnemy(enemy);
		enemy.onClick = function(e) {
			alert("star object is clicked.");
		};

	}

	//敵移動アニメーション		
	function moveEnemy(enemy){
		var move = Tween.get(enemy,{loop:false});
		for(var i =0,len = rootPoint.length; i < len; i++){
			move
				.to({x:rootPoint[i].x*mapSize,y:rootPoint[i].y*mapSize},1000)
				.call(setPoint,[rootPoint[i]]);
		}
		move
			.call(decreaseTower)
			.call(drawEnemy)
			.call(removeObj,[enemy])
			.call(increaseEnemy);
	}

	//敵現在地取得
	function setPoint(point){
		nowPoint[enemyCounter] = {x: point.x * mapSize, y: point.y * mapSize};

	}

	function increaseEnemy(){
		enemyCounter++;
	}



	//オブジェクトの削除
	function removeObj(obj) {
		stage.removeChild(obj);
	}

	Ticker.setFPS(30);
	Ticker.addListener(stage);

})();