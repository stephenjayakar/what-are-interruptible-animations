const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const canvasLeft = canvas.offsetLeft + canvas.clientLeft,
  canvasTop = canvas.offsetTop + canvas.clientTop;
/* if (canvas.getContext) {
 *
 * } */

const Y_VELOCITY = 1;

const RECT_WIDTH = 75;
const RECT_HEIGHT = 75;
function drawRect(x, y) {
  ctx.fillRect(x, y, RECT_WIDTH, RECT_HEIGHT);
}
function clearRect(x, y) {
  ctx.clearRect(x, y, RECT_WIDTH, RECT_HEIGHT);
}

canvas.addEventListener(
  'click',
  (event) => {
    const x = event.pageX - canvasLeft,
      y = event.pageY - canvasTop;

    console.log(x, y);
    if (
      x >= rect.x &&
      x < rect.x + RECT_WIDTH &&
      y >= rect.y &&
      y < rect.y + RECT_HEIGHT
    ) {
      // hit!
      setInterval(() => {
        clearRect(rect.x, rect.y);
        rect.y += Y_VELOCITY;
        drawRect(rect.x, rect.y);
      }, 1000 / 120);
    }

  },
  false
);

let rect = {
  x: 25,
  y: 25,
};
drawRect(25, 25);

// WEB GL
const webGLCanvas = document.getElementById('myCanvasWebGL');
const gl = webGLCanvas.getContext('webgl');
gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.clear();
