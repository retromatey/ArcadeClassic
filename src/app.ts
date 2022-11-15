
window.onload = () => {
    const canvas: HTMLCanvasElement = document.getElementById('GameCanvas') as HTMLCanvasElement;
    const context: CanvasRenderingContext2D = canvas.getContext('2d')!;

    draw(canvas, context);
};

function draw(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D): void {
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = 'green';
    context.fillRect(200, 200, 200, 200);
}