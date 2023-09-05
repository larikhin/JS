/** @type {HTMLCanvasElement}*/

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 500;
const CANVAS_HEIGHT = canvas.height = 1000;
const numberOfEnemies = 30;
const enemiesArray = [];


let gameFrame = 0;

class Enemy {
	constructor(){
		this.image = new Image();
		this.image.src = "./images/enemy4.png";
		// скорость врага
		this.speed = Math.random() * 4 + 1;
		// указание размера одного спрайта
		this.spriteWidth = 213;
		this.spriteHeight = 213;
		// размеры врага
		this.width = this.spriteWidth/2;
		this.height = this.spriteHeight/2;
		// стартовые координаты врага, (...) для ограничения размерами экрана
		this.x = Math.random() * (canvas.width - this.width);
		this.y = Math.random() * (canvas.height - this.height);
		this.newX = Math.random() * (canvas.width - this.width);
		this.newY = Math.random() * (canvas.height - this.height);
		this.frame = 0;
		// случайная смена спрайтов, рассинхрон одинаковых
		this.flapSpeed = Math.floor(Math.random() * 3 + 1);
		this.interval = Math.floor(Math.random() * 200 + 50);
		
	}
	update(){	// обновление координат
		if (gameFrame % this.interval === 0) {
			this.newX = Math.random() * (canvas.width - this.width);
			this.newY = Math.random() * (canvas.height - this.height);
		}
		let dx = this.x - this.newX;
		let dy = this.y - this.newY;
		this.x -= dx/70;
		this.y -= dy/70;
		// при уменьшении x меньше размерна экрана, х обновляется 
		// и элемент появляется с противоположной стороны 
		if (this.x + this.width < 0) this.x = canvas.width; 
		if (gameFrame % this.flapSpeed===0){
		// анимация спрайтов
		// если this.frame > 4 ? то  this.frame = 0 : иначе this.frame++;
		this.frame > 4 ? this.frame = 0 : this.frame++;}
	}
	draw(){		//отрисовка фигуры
		// ctx.strokeRect(this.x, this.y, this.width, this.height);
		// (название картинки, 2 откуда, 2 размер, 2 куда, 2 масшатб)
		ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight,
									 this.x, this.y, this.width, this.height);
	}
};

for (var i = 0; i < numberOfEnemies; i++) {
	enemiesArray.push(new Enemy());
}

function animate(){
	ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	enemiesArray.forEach( enemy => {
		enemy.update();
		enemy.draw();
		});
	gameFrame++;
	requestAnimationFrame(animate);
}
animate()