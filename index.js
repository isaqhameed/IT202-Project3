var background = new Image();
background.src = "pics/stars.jpeg"
let c = document.getElementById("invaderCanvas");
let ctx = c.getContext("2d");

// for canvas width set to device's innerWidth
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

