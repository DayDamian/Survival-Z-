/* Author: Derek O Reilly, Dundalk Institute of Technology, Ireland.             */
/* There should always be a javaScript file with the same name as the html file. */
/* This file always holds the playGame function().                               */
/* It also holds game specific code, which will be different for each game       */





/******************** Declare game specific global data and functions *****************/
/* images must be declared as global, so that they will load before the game starts  */
let map = new Image();
map.src = "images/map.png";
let playerImage = new Image();
playerImage.src = "images/man.png"
let collisionImage = new Image();
collisionImage.src = "images/colision.png"
let zombieImage = new Image();
zombieImage.src = "images/zombie.png";

let soundtruckZ = new Audio();
soundtruckZ.src = "audio/SurvivalZ_Soundtrack.mp3";
let shotgun = new Audio();
shotgun.src = "audio/shotgun.mp3";

const collisionMap = [];
for (let i=0; i<collision.length; i += 70)
{
  collisionMap.push(collision.slice(i, 70 + i));
}
//console.log(collisionMap);

const UP = 0;
const LEFT = 1;
const DOWN = 2;
const RIGHT = 3;
const STOPPED = 4;

const MAP = 0;
const PLAYER = 1;
const COLISION = 2;
const SHOT = 3;

let numberofZombies = 50;

function playGame()
{
    soundtruckZ.currentTime = 0;
    soundtruckZ.play();
    gameObjects[MAP] = new static_image(map, 100, 100, 4480, 2560);
    gameObjects[PLAYER] = new Player(playerImage, canvas.width / 2, canvas.height / 2);
    gameObjects[COLISION] = new static_image(collisionImage, 100, 100, 4480, 2560);
    gameObjects[SHOT] = new ShotZombie();

      for (let i = 4; i < numberofZombies+4; i++)
      { 
        var x = Math.floor(Math.random()*3000) + 1000;
        x *= Math.round(Math.random()) ? 1 : -1;
        var y = Math.floor(Math.random()*2500) + 1000;
        y *= Math.round(Math.random()) ? 1 : -1;
        gameObjects[i] = new Zombie(zombieImage, x, y, 0); 
        //console.log(i + " " +x + " " + y);     
        //gameObjects[i] = new Zombie(zombieImage, (Math.random() * 1000), (Math.random() * 1000), 0);
      }
  let game = new SurvivalZCanvasGame(collisionImage);

  //let game = new CanvasGame();

  /* Always play the game */
  game.start();

  document.addEventListener("keydown", function (e)
    {
        if (e.keyCode === 37)  // left
        {
            gameObjects[MAP].setDirection(RIGHT);
            gameObjects[COLISION].setDirection(RIGHT);
            gameObjects[PLAYER].setDirection(LEFT);
            for (let i = 4; i < numberofZombies+4; i++)
            {        
            gameObjects[i].setDirection(LEFT);
            }
        }
        else if (e.keyCode === 38) // up
        {
            gameObjects[MAP].setDirection(DOWN);
            gameObjects[COLISION].setDirection(DOWN);
            gameObjects[PLAYER].setDirection(UP);
            for (let i = 4; i < numberofZombies+4; i++)
            {        
                  gameObjects[i].setDirection(DOWN);
            }
        }
        else if (e.keyCode === 39) // right
        {
            gameObjects[MAP].setDirection(LEFT);
            gameObjects[COLISION].setDirection(LEFT);
            gameObjects[PLAYER].setDirection(RIGHT);
            for (let i = 4; i < numberofZombies+4; i++)
            {        
                  gameObjects[i].setDirection(RIGHT);
            }
        }
        else if (e.keyCode === 40) // down
        {
            gameObjects[MAP].setDirection(UP);
            gameObjects[COLISION].setDirection(UP);
            gameObjects[PLAYER].setDirection(DOWN);
            for (let i = 4; i < numberofZombies+4; i++)
            {        
                  gameObjects[i].setDirection(UP);
            }
        }
        else if (e.keyCode === 32) // space
        {
            gameObjects[SHOT].setShot();
            shotgun.currentTime = 0;
            shotgun.play();
        }
    });

}