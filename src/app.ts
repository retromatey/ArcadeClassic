class Ball {
    private x: number = 0;
    private y: number = 0;
    private readonly width: number = 0;
    private readonly height: number = 0;
    private speedX: number = 0;
    private speedY: number = 0;
    
    constructor() {
        this.x = 200;        
        this.y = 200;
        this.width = 15;
        this.height = 15;
        this.speedX = 5;
        this.speedY = 5;
    }
    
    draw(context: CanvasRenderingContext2D) {
        context.fillStyle = 'green';
        context.fillRect(this.x, this.y, this.width, this.height);

        context.fillStyle = 'white';
        context.fillRect(this.x, this.y, 1, 1);

        context.fillStyle = 'white';
        context.fillRect(this.x + this.width * 0.5, this.y + this.height * 0.5, 1, 1);
    }
    
    update(canvasWidth: number, canvasHeight: number) {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x + this.width > canvasWidth) {
            this.x = canvasWidth - this.width;
            this.speedX = (Math.random() * 2.0 + 5.0) * -1;
            console.log(`speedX is ${this.speedX}`);

        } else if (this.x < 0) {
            this.x = 0;
            this.speedX = Math.random() * 2.0 + 5.0;
            console.log(`speedX is ${this.speedX}`);
        }

        if (this.y + this.height > canvasHeight) {
            this.y = canvasHeight - this.height;
            this.speedY = (Math.random() * 2.0 + 5.0) * -1;
            console.log(`speedY is ${this.speedY}`);

        } else if (this.y < 0) {
            this.y = 0;
            this.speedY = Math.random() * 2.0 + 5.0;
            console.log(`speedY is ${this.speedY}`);
        }
    }
}

class Game {
    private canvas: HTMLCanvasElement;
    private readonly context: CanvasRenderingContext2D;
    private ball: Ball;

    private lastTime: number = 0;
    private timer: number = 0;
    private readonly fps: number = 60;
    private readonly interval: number = 1000/this.fps;
    
    constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
        this.canvas = canvas;      
        this.context = context;
        this.ball = new Ball();
    }
    
    drawBackground() {
        this.context.fillStyle = 'black';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    draw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawBackground();
        this.ball.draw(this.context);
    }
    
    update(deltaTime: number) {
        
        if (this.timer > this.interval) {
            this.timer = 0;
            this.ball.update(this.canvas.width, this.canvas.height);
            
        } else {
            this.timer += deltaTime;
        }
    }
    
    run(timeStamp: number = 0) {
        const deltaTime = timeStamp - this.lastTime;
        this.lastTime = timeStamp;
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.draw();
        this.update(deltaTime);
        requestAnimationFrame(t => this.run(t));
    }
}

window.onload = () => {
    const canvas: HTMLCanvasElement = document.getElementById('GameCanvas') as HTMLCanvasElement;
    const context: CanvasRenderingContext2D = canvas.getContext('2d')!;
    
    const game = new Game(canvas, context);
    game.run();
};

