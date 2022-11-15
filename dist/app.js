"use strict";
window.onload = () => {
    const canvas = document.getElementById('GameCanvas');
    const context = canvas.getContext('2d');
    draw(canvas, context);
    // context.fillStyle = 'black';
    // context.fillRect(0, 0, canvas.width, canvas.height);
    //
    // context.fillStyle = 'green';
    // context.fillRect(200, 200, 200, 200);
};
function draw(canvas, context) {
    console.log('running draw');
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = 'green';
    context.fillRect(200, 200, 200, 200);
}
//# sourceMappingURL=app.js.map