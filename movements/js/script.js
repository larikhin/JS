/** @type {HTMLCanvasElement}*/

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 500;
const CANVAS_HEIGHT = canvas.height = 1000;
const numberOfEnemies = 10;
const enemiesArray = [];

const enemyImage = new Image();
enemyImage.src = "./images/1.png";

class Enemy {
	constructor(){
		// стартовые координаты врага
		this.x = Math.random() * canvas.width;
		this.y = Math.random() * canvas.height;
		// размеры врага
		this.width = 100;
		this.height = 100;
		// скорость врага
		this.speed = Math.random() * 4 -2;
	}
	update(){	// обновление координат
		this.x += this.speed;
		this.y += this.speed;
	}
	draw(){		//отрисовка фигуры
		// ctx.strokeRect(this.x, this.y, this.width, this.height);
		ctx.drawImage(enemyImage, this.x, this.y);
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
	requestAnimationFrame(animate);
}
animate()