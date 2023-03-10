const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
/* if (canvas.getContext) {
* 
* } */

const RECT_WIDTH = 75;
const RECT_HEIGHT = 75;
function drawRect(x, y) {
    ctx.fillRect(x, y, x + RECT_WIDTH, y + RECT_HEIGHT);
}

canvas.addEventListener('click', function(event) {
    console.log(event);
    /* var x = event.pageX - elemLeft,
*     y = event.pageY - elemTop;

* // Collision detection between clicked offset and element.
* elements.forEach(function(element) {
*     if (y > element.top && y < element.top + element.height 
*         && x > element.left && x < element.left + element.width) {
*         alert('clicked an element');
*     }
* }); */

}, false);


drawRect(25, 25)
