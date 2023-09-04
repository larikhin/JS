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
		this.image.src = "./images/enemy3.png";
		// скорость врага
		this.speed = Math.random() * 4 + 1;
		// указание размера одного спрайта
		this.spriteWidth = 218;
		this.spriteHeight = 177;
		// размеры врага
		this.width = this.spriteWidth/3;
		this.height = this.spriteHeight/3;
		// стартовые координаты врага, (...) для ограничения размерами экрана
		this.x = Math.random() * (canvas.width - this.width);
		this.y = Math.random() * (canvas.height - this.height);
		this.frame = 0;
		// случайная смена спрайтов, рассинхрон одинаковых
		this.flapSpeed = Math.floor(Math.random() * 3 + 1);
		this.angle = 0;
		this.angleSpeed = Math.random() * 2 + 0.5;
		//this.curve = Math.random() * 200 + 50;
	}
	update(){	// обновление координат
		this.x = /*this.curve*/ canvas.width/2 * Math.sin(this.angle * Math.PI/70) +
		(canvas.width/2 - this.width/2); 
		// изменение вертикальной позиции синус угла
		this.y = /*this.curve*/canvas.height/2* Math.cos(this.angle * Math.PI/210) +
		(canvas.height/2 - this.height/2); 
		this.angle += this.angleSpeed;
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