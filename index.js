let c = document.getElementById("invaderCanvas");
let ctx = c.getContext("2d");
// for canvas width set to device's innerWidth
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;
    


  var game = {
  score: 0,
  lives: 3,
  state: "play",
  level: 1
};

     var gameObjects = [];
    
    gameObjects.push({
        objectType: "player",
        xposition: c.width/2,
        yposition: 960,
        r: 20,
        color: "brown",
        speed: 10
    });
    
    gameObjects.push({
        objectType: "enemy",
        xposition: c.width/2,
        yposition: 960,
        r: 20,
        color: "red",
        speed: 10
    });

    gameObjects.push({
        objectType: "points",
        xposition: 80,
        yposition: 100,
        r: 15,
        color: "green",
        speed: 5
    });

    var player = gameObjects[0];
        // backgroundImg
    let backgroundImg = new Image();
    backgroundImg.src = "pics/background.png";
    ctx.fillStyle = "red";
    
    function draw(){
   ctx.clearRect(0, 0, c.width, c.height);
   ctx.drawImage(backgroundImg, 0, 0, c.width, c.height);
        
   for(i in gameObjects){
       g = gameObjects[i];
       ctx.beginPath();
       ctx.arc(g.x, g.y, 0, 2*Math.PI);
       ctx.strokeStyle = g.color;
       ctx.stroke();

       if(g.type != "player"){
           g.y += g.speed *game.level;

           if(collision(player, g)){
               if(g.type == "enemy"){
                   game.lives = game.lives-1;
               }
               else if(g.type == "points"){
                   game.score = game.score +100;
               }
               if(game.score>=100){
                   game.level++;
               }
               if(game.level>1){
                   gameObjects.push({
                    objectType: "enemy",
                    xposition: c.width/2,
                    yposition: 960,
                    r: 20,
                    color: "red",
                    speed: game.level
                });
               }
               g.state= "collision"
           }
           if ((g.y + g.r < 0) || g.state == "collision") {
        g.y = c.height + g.r;
        g.x = Math.random() * (c.width - 0) + 0;
       g.state = "";
      }
       }
   }
        //   // font for score and number of lives
  ctx.font = "24px Impact, Charcoal, sans-serif";
  ctx.textAlign = "center";
  ctx.fillStyle = "cyan";
  ctx.fillText("Score: " + game.score + " Player Lives: " + game.lives, c.width, 20);

        
     if(game.lives>0){
         window.requestAnimationFrame(draw);
     }
        else{
            ctx.fillText("GAME OVER", c.width/2, c.height/2);
        }
        
        
function gameOver() {
  ctx.clearRect(0, 0, c.width, c.height);
  ctx.drawImage(backgroundImg, 0, 0, c.width, c.height);

  // font for Game Over Screen
  ctx.font = "200px Comic Sans MS";
  ctx.fillStyle = "cyan";
  ctx.textAlign = "center";
  ctx.fillText("Game Over", c.width / 2, c.height / 2);

}

        window.requestAnimationFrame(draw);
        
             function collision(c1, c2){
              let result = false;

      let dx = circle1.x - circle2.x;
      let dy = circle1.y - circle2.y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < circle1.r + circle2.r) {
        result = true;
      }

      return result;
        }  
        document.onkeydown = function(e){
            if(e.keydown == 37){
                //move left
              player.x-=10;
            }
            if(e.keydown == 39){
                //move right
                player.y+=10;
            }
        }
   }
