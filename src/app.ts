class DebugUtil {
    public debugEnabled: boolean = false;
    
    constructor() {
        this.initKeyboardEvents();
    }

    private initKeyboardEvents() {
        window.addEventListener('keydown', (event: KeyboardEvent) => {

            if (event.ctrlKey && event.altKey && event.key === 'd') {
                this.debugEnabled = !this.debugEnabled;
            }
        });
    }    
    
    public logDebug(className: string, message: string) {
        
        if (this.debugEnabled) {
            console.log(`**TIMESTAMP** - ${className} - ${message}`);
        }
    }
    
    public drawDebug(callback: () => void) {
        
        if (this.debugEnabled) {
            callback();
        }
    }
}

class DrawingUtil {
    private readonly context: CanvasRenderingContext2D;
    
    constructor(context: CanvasRenderingContext2D) {
        this.context = context;
    }

    colorRect(x: number, y: number, width: number, height: number, color: string) {
        this.context.save();
        this.context.fillStyle = color;
        this.context.fillRect(x, y, width, height);
        this.context.restore();
    }
}

class Ball {
    private debugUtil: DebugUtil;
    private drawingUtil: DrawingUtil;
    private x: number = 0;
    private y: number = 0;
    private readonly width: number = 0;
    private readonly height: number = 0;
    private speedX: number = 0;
    private speedY: number = 0;
    
    constructor(debugUtil: DebugUtil, drawingUtil: DrawingUtil) {
        this.debugUtil = debugUtil;
        this.drawingUtil = drawingUtil;
        this.x = 200;        
        this.y = 200;
        this.width = 15;
        this.height = 15;
        this.speedX = 5;
        this.speedY = 5;
    }
    
    draw(context: CanvasRenderingContext2D) {
        this.drawingUtil.colorRect(this.x, this.y, this.width, this.height, 'green');

        this.debugUtil.drawDebug(() => {
            context.save();
            context.fillStyle = 'white';
            context.fillRect(this.x, this.y, 1, 1);

            context.fillStyle = 'white';
            context.fillRect(this.x + this.width * 0.5, this.y + this.height * 0.5, 1, 1);
            context.restore();
        });
    }
    
    update(canvasWidth: number, canvasHeight: number) {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x + this.width > canvasWidth) {
            this.x = canvasWidth - this.width;
            this.speedX = (Math.random() * 2.0 + 5.0) * -1;

        } else if (this.x < 0) {
            this.x = 0;
            this.speedX = Math.random() * 2.0 + 5.0;
        }

        if (this.y + this.height > canvasHeight) {
            this.y = canvasHeight - this.height;
            this.speedY = (Math.random() * 2.0 + 5.0) * -1;

        } else if (this.y < 0) {
            this.y = 0;
            this.speedY = Math.random() * 2.0 + 5.0;
        }

        this.debugUtil.logDebug('Ball', `speedX is ${this.speedX}`)
        this.debugUtil.logDebug('Ball', `speedX is ${this.speedY}`)
    }
}

class Game {
    private debugUtil: DebugUtil;
    private drawingUtil: DrawingUtil;
    private canvas: HTMLCanvasElement;
    private readonly context: CanvasRenderingContext2D;
    private ball: Ball;

    private lastTime: number = 0;
    private timer: number = 0;
    private readonly fps: number = 60;
    private readonly interval: number = 1000/this.fps;
    
    constructor(debugUtil: DebugUtil, drawingUtil: DrawingUtil, canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
        this.debugUtil = debugUtil;
        this.drawingUtil = drawingUtil;
        this.canvas = canvas;      
        this.context = context;
        this.ball = new Ball(debugUtil, drawingUtil);
    }
    
    private drawBackground() {
        this.context.fillStyle = 'black';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    private draw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawBackground();
        this.ball.draw(this.context);
    }
    
    private update(deltaTime: number) {
        
        if (this.timer > this.interval) {
            this.timer = 0;
            this.ball.update(this.canvas.width, this.canvas.height);
            
        } else {
            this.timer += deltaTime;
        }
    }
    
    private run(timeStamp: number = 0) {
        const deltaTime = timeStamp - this.lastTime;
        this.lastTime = timeStamp;
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.draw();
        this.update(deltaTime);
        requestAnimationFrame(t => this.run(t));
    }

    public startGame() {
        this.run();
    }
}

window.onload = () => {
    const canvas: HTMLCanvasElement = document.getElementById('GameCanvas') as HTMLCanvasElement;
    const context: CanvasRenderingContext2D = canvas.getContext('2d')!;
    
    const debugUtil = new DebugUtil();
    const drawingUtil = new DrawingUtil(context);
    const game = new Game(debugUtil, drawingUtil, canvas, context);
    game.startGame();
};

