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

	//アタッカー設置座標{x,y}
	var attackerPoint = [];

	//敵現在地座標,敵obj{x,y,enemy}
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

	//アラートウインドウ
	var alertElement = d.getElementById("alert");


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

	//attackerの画像挿入
	var attacker = up;

	//上攻撃
	function upAttack(attacker,x,y){
		for(var i = 0, len = nowPoint.length; i < len; i++ ){
			console.log(i);

			if( x <= nowPoint[i].enemy.x && nowPoint[i].enemy.x <= x + mapSize &&  y - mapSize <= nowPoint[i].enemy.y && nowPoint[i].enemy.y <= y ) {
				console.log("hit");
				nowPoint[i].enemy.life--;

				//hpが0の時
				if(nowPoint[i].enemy.life < 1){
					console.log(nowPoint[i].enemy.life);
					//敵アニメーション削除	
					Tween.removeTweens(nowPoint[i].enemy);

					//敵描画削除
					removeObj(nowPoint[i].enemy);

					nowPoint[i].enemy.life = null;

					//要素削除
					// delete nowPoint[i];
					// nowPoint[i].splice(i,1);
					drawEnemy();
					increaseEnemyCount();
					resource.text += 10;
				}
			}
		}
	}

	function rightAttack(attacker,x,y){
		for(var i = 0, len = nowPoint.length; i < len; i++ ){
			if( x + mapSize <= nowPoint[i].enemy.x && nowPoint[i].enemy.x <= x + mapSize * 2 &&  y <= nowPoint[i].enemy.y && nowPoint[i].enemy.y <= y + mapSize ) {
				console.log("hit");

				nowPoint[i].enemy.life--;

				//hpが0の時
				if(nowPoint[i].enemy.life < 1){
					//敵アニメーション削除	
					Tween.removeTweens(nowPoint[i].enemy);

					//敵描画削除
					removeObj(nowPoint[i].enemy);

					//座標リセット
					nowPoint[i].x = 0;
					nowPoint[i].y = 0;

					drawEnemy();
					increaseEnemyCount();
					resource.text += 10;
				}
			}
		}
	}

	function downAttack(){
		for(var i = 0, len = nowPoint.length; i < len; i++ ){
			if(x === nowPoint[i].x && y + mapSize === nowPoint[i].y){
				console.log("hit");
				nowPoint[i].enemy.life--;

				//hpが0の時
				if(nowPoint[i].enemy.life < 1){
					//敵アニメーション削除	
					Tween.removeTweens(nowPoint[i].enemy);

					//敵描画削除
					removeObj(nowPoint[i].enemy);

					//座標リセット
					nowPoint[i].x = 0;
					nowPoint[i].y = 0;

					drawEnemy();
					increaseEnemyCount();
					resource.text += 10;
				}
			}
		}
	}

	function rightAttack(){
		for(var i = 0, len = nowPoint.length; i < len; i++ ){
			if(x === nowPoint[i].x && y - mapSize === nowPoint[i].y){
				console.log("hit");
				nowPoint[i].enemy.life--;

				//hpが0の時
				if(nowPoint[i].enemy.life < 1){
					//敵アニメーション削除	
					Tween.removeTweens(nowPoint[i].enemy);

					//敵描画削除
					removeObj(nowPoint[i].enemy);

					//座標リセット
					nowPoint[i].x = 0;
					nowPoint[i].y = 0;

					drawEnemy();
					increaseEnemyCount();
					resource.text += 10;
				}
			}
		}
	}






	//右攻撃
	var RightAttacker = function(){
		this.right = "right";
	};
	RightAttacker.prototype = {
		rightAttack: function(obj,x,y){
			for(var i = 0, len = nowPoint.length; i < len; i++ ){
				if(x === nowPoint[i].x - mapSize && y  === nowPoint[i].y){
					console.log("右キタ");
					attackMotion(x,y,this.right);				}
			}
			setTimeout(arguments.callee.bind(this),1000,obj,x,y);
		}
	};

	//下攻撃
	var DownAttacker = function(){
		this.down = "down";
	};
	DownAttacker.prototype = {
		downAttack: function(obj,x,y){
			for(var i = 0, len = nowPoint.length; i < len; i++ ){
				if(x === nowPoint[i].x && y === nowPoint[i].y - mapSize){
					console.log("下キタ");
					attackMotion(x,y,this.down);
				}
			}
			setTimeout(arguments.callee.bind(this),1000,obj,x,y);
		}
	};

	//左攻撃
	var LeftAttacker = function(){
		this.left = "left";
	};
	LeftAttacker.prototype = {
		leftAttack: function(obj,x,y){
			for(var i = 0, len = nowPoint.length; i < len; i++ ){
				if(x === nowPoint[i].x + mapSize && y === nowPoint[i].y){
					console.log("左キタ");
					attackMotion(x,y,this.left);				}
			}
			setTimeout(arguments.callee.bind(this),1000,obj,x,y);
		}
	};

	// //全方向
	// var AllAttacker = function(){};
	// AllAttacker.prototype = {
	// 	upAttack: function(){
	// 		UpAttacker.prototype.upAttack.apply(this);
	// 	}
	// };



	//選択したアタッカーの画像をセット
	d.body.addEventListener("touchstart",function(e){
		var id = e.target.id;
		e.stopPropagation();
		switch(id){
			case "up":
			attacker = up;
			break;
			case "right":
			attacker = right;
			break;
			case "down":
			attacker = down;
			break;
			case "left":
			attacker = left;
			break;
			case "all":
			attacker = all;
			break;
		}
	},false);



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

				//敵ルート上チェック　イベント紐付け
				for(var k = 0, len = rootPoint.length; k < len; k++){
					if(s.x === mapSize*rootPoint[k].x && s.y === mapSize*rootPoint[k].y){
						s.addEventListener('click', function(e){
							alertElement.innerHTML = "敵のルートです";
							alertElement.style.display = "block";
						});
						eventFlag = true;
					}
				}
				if(eventFlag === false){
					s.addEventListener('click', function(e){
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

		//ルート描画
		for(var i=0,len = rootPoint.length; i < len; i++){
			g.drawRect(mapSize*rootPoint[i].x,mapSize*rootPoint[i].y,mapSize,mapSize);
			var s = new Shape(g);
			stage.addChild(s);
		}
	}


	//アタッカー設置リソース表示
	var resource = new Text(60,"44px Myriad Pro","#fff000");
	resource.x = 20;
	resource.y = 40;
	stage.addChild(resource);

	//リソース増加
	(function(){
		resource.text++;
		setTimeout(arguments.callee,500);
	})();

	//アタッカー設置
	function setAttacker(x,y){

		//設置座標チェック	
		for(var i = 0, len = attackerPoint.length; i < len; i++){
			if(x === attackerPoint[i].x && y === attackerPoint[i].y){
				alertElement.innerHTML = "既にアタッカーがいます";
				alertElement.style.display = "block";
				return;
			}
		}

		//リソースチェック
		if(resource.text < 20){
			alertElement.innerHTML = "リソースが足りません";
			alertElement.style.display = "block";
			return;
		}
		else{
			resource.text -= 20;
		}

		//アタッカーインスタンス化
		var bitmap = new Bitmap(attacker);
		bitmap.scaleX = 0.5;
		bitmap.scaleY = 0.5;
		bitmap.x = x;
		bitmap.y = y;

		//設置座標の登録
		attackerPoint.push({x:x,y:y});

		stage.addChild(bitmap);

		animateAttacker(bitmap,x,y);
	}

	//アタッカーアニメーション
	function animateAttacker(bitmap,x,y){
		var attack;
		switch(attacker){
			case up:
				attack = Tween.get(bitmap,{loop:true});
				attack
					.to({x: x , y: y - mapSize},100)
					.to({x: x , y: y },1400)
					.call(upAttack,[bitmap,x,y]);
				break;

			case right:
				attack = Tween.get(bitmap,{loop:true});
				attack
					.to({x: x + mapSize , y: y},200)
					.to({x: x , y: y },1300)
					.call(fuga,[bitmap,x,y]);
				break;

			case down:
				attack = Tween.get(bitmap,{loop:true});
				attack
					.to({x: x , y: y + mapSize},200)
					.to({x: x , y: y },1300)
					.call(fuga,[bitmap,x,y]);
				break;

			case left:
				attack = Tween.get(bitmap,{loop:true});
				attack
					.to({x: x - mapSize , y: y},200)
					.to({x: x , y: y },1300)
					.call(fuga,[bitmap,x,y]);
				break;
		}
	}

	//攻撃アニメーション
	function attackMotion(x,y,course){
		// alert();
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
	}

	//塔の体力
	var last = new Text(10,"44px Myriad Pro","#fff");
	stage.addChild(last);

	//塔の体力減少
	function decreaseTower(){
		last.text--;
		if(last.text < 1){
			// alert("game over");
		}
	}



	//enemyImage
	enemyImg = new Image();
	enemyImg.src = "../public/img/dokuro.png";
	enemyImg.addEventListener("load",drawEnemy);
	
	//敵描画
	function drawEnemy(){
		var enemy = new Bitmap(enemyImg);
		enemy.x = mapSize*1;
		enemy.y = mapSize*0;
		enemy.life = 3;
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
				.call(setPoint,[rootPoint[i],enemy]);
		}
		move
			.call(decreaseTower)
			.call(drawEnemy)
			.call(removeObj,[enemy])
			.call(increaseEnemyCount);
	}

	//敵現在地,敵obj取得
	function setPoint(point,obj){
		nowPoint[enemyCounter] = {x: point.x * mapSize, y: point.y * mapSize, enemy: obj};
		// console.log(nowPoint[enemyCounter]);
	}

	function increaseEnemyCount(){
		enemyCounter++;
	}

	//オブジェクトの削除
	function removeObj(obj) {
		stage.removeChild(obj);
	}

	Ticker.setFPS(30);
	Ticker.addListener(stage);

})();