const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const canvasLeft = canvas.offsetLeft + canvas.clientLeft,
      canvasTop = canvas.offsetTop + canvas.clientTop;
/* if (canvas.getContext) {
* 
* } */

const RECT_WIDTH = 75;
const RECT_HEIGHT = 75;
function drawRect(x, y) {
    ctx.fillRect(x, y, RECT_WIDTH, RECT_HEIGHT);
}

canvas.addEventListener('click', function(event) {
  const x = event.pageX - canvasLeft,
        y = event.pageY - canvasTop;

  console.log(x, y);
    if (x >= rect.x &&
        x < rect.x + RECT_WIDTH &&
        y >= rect.y &&
        y < rect.y + RECT_HEIGHT) {
        console.log('hit!')
    }

    /* /* var x = event.pageX - elemLeft,
*  y = event.pageY - elemTop; */

 // Collision detection between clicked offset and element.
    /* elements.forEach(function(element) {
   *     if (y > element.top && y < element.top + element.height 
   *         && x > element.left && x < element.left + element.width) {
   *         alert('clicked an element');
   *     } */
// });

}, false);

let rect = {
  x: 25,
  y: 25,
}
drawRect(25, 25)
