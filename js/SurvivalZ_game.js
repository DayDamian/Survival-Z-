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
collisionImage = "images/Game_colision.png"

let soundtruckZ = new Audio();
soundtruckZ.src = "audio/SurvivalZ_Soundtrack.mp3";

const UP = 0;
const LEFT = 1;
const DOWN = 2;
const RIGHT = 3;
const STOPPED = 4;

const MAP = 0;
const PLAYER = 1;

function playGame()
{
    soundtruckZ.currentTime = 0;
    soundtruckZ.play();
    gameObjects[MAP] = new static_image(map, 100, 100, canvas.width+3000, canvas.height+3000);
    gameObjects[PLAYER] = new Player(playerImage, canvas.width / 2, canvas.height / 2);

      /* END OF game specific code. */

  /* Always create a game that uses the gameObject array */
  //let game = new SurvivalZCanvasGame(collisionImage);

  let game = new CanvasGame();

  /* Always play the game */
  game.start();

  document.addEventListener("keydown", function (e)
    {
        if (e.keyCode === 37)  // left
        {
            gameObjects[MAP].setDirection(RIGHT);
            gameObjects[PLAYER].setDirection(LEFT);
        }
        else if (e.keyCode === 38) // up
        {
            gameObjects[MAP].setDirection(DOWN);
            gameObjects[PLAYER].setDirection(UP);
        }
        else if (e.keyCode === 39) // right
        {
            gameObjects[MAP].setDirection(LEFT);
            gameObjects[PLAYER].setDirection(RIGHT);
        }
        else if (e.keyCode === 40) // down
        {
            gameObjects[MAP].setDirection(UP);
            gameObjects[PLAYER].setDirection(DOWN);
        }
    });

}