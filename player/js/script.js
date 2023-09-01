let playerState = 'ko';
const dropdown = document.getElementById('animations');
dropdown.addEventListener('change', function(e){
	playerState = e.target.value;
})


const canvas = document.getElementById('canvas1');
//getContext для получения контекста визуализации и её функции рисования
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

// спрайт героя
const playerImage = new Image();
// путь к картинке с группами спрайтов
playerImage.src = './js/shadow_dog.png';
// ширина картинки / количество рядов
const spriteWidth = 575; 
const spriteHeight = 523;

// колебание картинок каждые stagerFrames раз
gameFrame = 0;
const staggerFrames = 5;
// пустой массив групп спрайтов
const spriteAnimations = [];
// имя и количество картинок для каждой группы спрайтов
const animationStates = [
	{
		name: 'idle', //имя спрайта
		frames: 7, // сколько кадров в спрайте
	},
	{
		name: 'jump',
		frames: 7,
	},
	{
		name: 'fall',
		frames: 7,
	},
	{
		name: 'run',
		frames: 9,
	},
	{
		name: 'dizzy',
		frames: 11,
	},
	{
		name: 'sit',
		frames: 5,
	},
	{
		name: 'roll',
		frames: 7,
	},
	{
		name: 'bite',
		frames: 7,
	},
	{
		name: 'ko',
		frames: 12,
	},
	{
		name: 'getHit',
		frames: 4,
	}
];
// формирование массива координат для каждой группы спрайтов
animationStates.forEach((state, index) => {
	// массив координат спрайтов
	let frames = {
		loc: [],
	}
	// для каждой группы спрайтов количеством = 'state.frames'
	// массив заполняется координатами спрайта
	for (let j = 0; j < state.frames; j++){
		// ряд спрайта горизонтально
		let positionX = j * spriteWidth;
		// строка спрайта вертикально
		let positionY = index * spriteHeight;
		frames.loc.push({x: positionX, y: positionY});
	}
	// для каждой группы спрайтов свой массив ('frames') координат конкретных спрайтов
	spriteAnimations[state.name] = frames;
});

console.log(animationStates);

function animate(){
	ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
	// каждые 6 раз position увеличивается на 1
	// флор округляет до меньшего целого и при 1,2,3,4,5%6=0, 6%6=1, 7,8,9..%6=...
	// остаток от деления в диапазоне от 0 до 5 
	let position = Math.floor(gameFrame/staggerFrames) % spriteAnimations[playerState].loc.length;
	// ряд спрайта горизонтально
	let frameX = spriteWidth * position;
	// строка спрайта вертикально
	let frameY = spriteAnimations[playerState].loc[position].y;
	//ctx.fillRect(x,50,100,100);
	//ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
	// sx,sy координата левого верхнего угла на исходной картинке спрайта
	// sw,sh размеры прямоугольника ширина и высота на исходной картинке
	// dx,dy координата левого верхнего угла картинки уже в канвасе
	// dw,dh размеры прямоугольника ширина и высота в канвасе
	// если sw=dw и sh=dh то спрайт не масштабируется
	//на картинке много разных рисунков, выделяем нужный первыми 4мя аргументами
	ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, 0.2*spriteWidth, 0.2*spriteHeight);
	// замедлитель заменен на position 
	//if (gameFrame % staggerFrames ==0 ){
	//	смена картинки
	//	if (frameX < 9) frameX++;
	//	else frameX = 0;}
	gameFrame++;
	// рендеринг
	requestAnimationFrame(animate);
}

animate();
