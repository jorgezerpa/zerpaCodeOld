const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

canvas.width= window.innerWidth;
canvas.height= window.innerHeight;

window.addEventListener('resize', ()=>{
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;	
	effect.resize(canvas.width, canvas.height)
})

let gradient = ctx.createLinearGradient(0,0,canvas.width, canvas.height);
gradient.addColorStop(0, 'red');
gradient.addColorStop(.2, 'yellow');
gradient.addColorStop(.4, 'green');
gradient.addColorStop(.6, 'cyan');
gradient.addColorStop(.8, 'blue');
gradient.addColorStop(1, 'magenta');

	//create and draw each symbol
class symbol {
	constructor(x,y,fontSize,canvasWidth, canvasHeight){
		this.characters='アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		this.x = x;
		this.y = y;
		this.fontSize = fontSize;
		this.text = '';
		this.canvasHeight = canvasHeight;
		this.canvasWidth = canvasWidth;
	}

	draw(context){
						//random number beetween 0-chacarters length;
		this.text = this.characters.charAt(Math.floor(Math.random()*this.characters.length));
						//move fillstyle to animate function for reduce number of calls
		// context.fillStyle = '#0aff0a';
		context.fillText(this.text, this.x*this.fontSize, this.y*this.fontSize);
		if(this.y* this.fontSize > this.canvasHeight && Math.random()>.98){
			this.y = 0;

		} else{
			this.y+=1;
		}
	}
}


	// functionalities to manage all symbols
class Effect {
			//on constructor set all global settings
	constructor(canvasWidth, canvasHeight){
		this.canvasWidth = canvasWidth;
		this.canvasHeight = canvasHeight;
		this.fontSize = 25;
		this.colums = this.canvasWidth/this.fontSize;
		this.symbols = [];
			//call private method on the instance
		this.#initialize();
	}

		// the # means/make a "private method" (encapsulation principal)
	#initialize(){
			//run one for each column
		for(let i = 0; i<this.colums; i++){
			this.symbols[i] = new symbol(i, 0, this.fontSize, this.canvasWidth, this.canvasHeight);
		}
	}

	resize(width, height){
		this.canvasWidth = width;
		this.canvasHeight = height;
		this.colums = this.canvasWidth/this.fontSize;
		this.symbols = [];
		this.#initialize();
	}

}


const effect = new Effect(canvas.width, canvas.height);

let lastTime = 0;
const fps = 160;
const nextFrame = 1000/fps;
let timer = 0;


		//animation loop
			// timeStamp is autogenerated by request animaation frame
function animate(timeStamp){
	const deltaTime= timeStamp - lastTime;
	lastTime = timeStamp;
	if(timer>nextFrame){
		ctx.fillStyle='rgba(0,0,0,.05)';
		ctx.fillRect(0,0,canvas.width, canvas.height);
		// ctx.fillStyle = '#0aff0a';  no gradient
		ctx.fillStyle = gradient;
					//fontsize characteristics (monospace==same amount of x spaces)
		ctx.font = effect.fontSize + 'px monospace';
		ctx.textAlign= 'center';
		effect.symbols.forEach(symbol=> symbol.draw(ctx));
		
		timer=0;		
	}else{
		timer+=deltaTime;
	}

	requestAnimationFrame(animate)
}

		// time stamp exist after 2nd loop, so, pass 0 as a first value
animate(0);
