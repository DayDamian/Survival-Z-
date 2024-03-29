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
let winImage = new Image();
winImage.src = "images/WIN.png"
let diedImage = new Image();
diedImage.src = "images/DIED.png"
let menuImage = new Image();
menuImage.src = "images/MENU.png"
let playButton = new Image();
playButton.src = "images/playButton.png"
let saveButton = new Image();
saveButton.src = "images/saveButton.png"
let tableButton = new Image();
tableButton.src = "images/tableButton.png"
let exitButton = new Image();
exitButton.src = "images/exitButton.png"

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
const START_MESSAGE = 93;
const WIN_MESSAGE = 94;
const LOST_MESSAGE = 95;
const EXIT_BUTTON = 96;
const TABLE_BUTTON = 97;
const SAVE_BUTTON = 98;
const PLAY_BUTTON = 99;

let numberofZombies = 30;

let i = 0;
let startX;
let startY;

function playGame()
{
    soundtruckZ.currentTime = 0;
    soundtruckZ.play();
    gameObjects[START_MESSAGE] = new ScreenMessage(menuImage, 1);
    gameObjects[START_MESSAGE].start();
    gameObjects[PLAY_BUTTON] = new Button(playButton, 100, 180, 200, 100);
    gameObjects[PLAY_BUTTON].start();
    gameObjects[TABLE_BUTTON] = new Button(tableButton, 100, 280, 200, 100);
    gameObjects[TABLE_BUTTON].start();

    let game = new SurvivalZCanvasGame();
    game.start();

    document.getElementById("gameCanvas").addEventListener("mousedown", function (e)
    {
        if (e.which === 1)  // left mouse button
        {
            let canvasBoundingRectangle = document.getElementById("gameCanvas").getBoundingClientRect();
            let mouseX = e.clientX - canvasBoundingRectangle.left;
            let mouseY = e.clientY - canvasBoundingRectangle.top;

            if (gameObjects[PLAY_BUTTON].pointIsInsideBoundingRectangle(mouseX, mouseY))
            {
                gameObjects[START_MESSAGE].stopAndHide();
                gameObjects[PLAY_BUTTON].stopAndHide();
                gameObjects[TABLE_BUTTON].stopAndHide();
                survival();

            }
            else if (gameObjects[TABLE_BUTTON].pointIsInsideBoundingRectangle(mouseX, mouseY))
            {
                firestoreService.fetchScores()
                .then(elements => {
                    alert(
                        elements.sort((a, b) => a.score > b.score ? -1 : 1)
                            .slice(0, 9)
                            .map((entry, index) => `${index + 1} Name: ${entry.name} Score: ${entry.score} \n`)
                    )})
            }
        }
    });
}
function survival()
{
    window.addEventListener("deviceorientation", this.handleOrientation);

    gameObjects[MAP] = new static_image(map, 100, 100, 4480, 2560);
    gameObjects[MAP].start();
    gameObjects[PLAYER] = new Player(playerImage, canvas.width / 2, canvas.height / 2);
    gameObjects[PLAYER].start();
    gameObjects[COLISION] = new static_image(collisionImage, 100, 100, 4480, 2560);
    gameObjects[COLISION].start();
    gameObjects[SHOT] = new ShotZombie();

      for (let i = 4; i < numberofZombies+4; i++)
      { 
        var x = Math.floor(Math.random()*6000) + 600;
        x *= Math.round(Math.random()) ? 1 : -1;
        var y = Math.floor(Math.random()*5500) + 600;
        y *= Math.round(Math.random()) ? 1 : -1;
        gameObjects[i] = new Zombie(zombieImage, x, y, 0); 
        gameObjects[i].start();
        //console.log(i + " " +x + " " + y);     
        //gameObjects[i] = new Zombie(zombieImage, (Math.random() * 1000), (Math.random() * 1000), 0);
      }

      gameObjects[93] = new Move();
      gameObjects[93].start();

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
    document.getElementById("gameCanvas").addEventListener("mousedown", function (e)
    {
        if (e.which === 1)  // left mouse button
        {
            gameObjects[SHOT].setShot();
            shotgun.currentTime = 0;
            shotgun.play();
        }
    });
    
}
function test(){
    console.log("Test")
    test()
}

function resetGame()
{
    gameObjects[MAP].stopAndHide();
    gameObjects[PLAYER].stopAndHide();
    gameObjects[COLISION].stopAndHide();
                    
    for (let i = 4; i < numberofZombies+4; i++)
        {
        gameObjects[i].stopAndHide();
        }

    gameObjects[SAVE_BUTTON].stopAndHide();
    gameObjects[LOST_MESSAGE].stopAndHide();
    gameObjects[WIN_MESSAGE].stopAndHide();
    gameObjects[EXIT_BUTTON].stopAndHide();
    gameObjects[102].stopAndHide();

    gameObjects[START_MESSAGE] = new ScreenMessage(menuImage, 1);
    gameObjects[START_MESSAGE].start();
    gameObjects[PLAY_BUTTON].start();
    gameObjects[TABLE_BUTTON].start();

    document.getElementById("gameCanvas").addEventListener("mousedown", function (e)
    {
        if (e.which === 1)  // left mouse button
        {
            let canvasBoundingRectangle = document.getElementById("gameCanvas").getBoundingClientRect();
            let mouseX = e.clientX - canvasBoundingRectangle.left;
            let mouseY = e.clientY - canvasBoundingRectangle.top;

            if (gameObjects[PLAY_BUTTON].pointIsInsideBoundingRectangle(mouseX, mouseY))
            {
                gameObjects[START_MESSAGE].stopAndHide();
                gameObjects[PLAY_BUTTON].stopAndHide();
                gameObjects[TABLE_BUTTON].stopAndHide();
                survival();

            }
            else if (gameObjects[TABLE_BUTTON].pointIsInsideBoundingRectangle(mouseX, mouseY))
            {
                firestoreService.fetchScores()
                .then(elements => {
                    alert(
                        elements.sort((a, b) => a.score > b.score ? -1 : 1)
                            .slice(0, 9)
                            .map((entry, index) => `${index + 1} Name: ${entry.name} Score: ${entry.score} \n`)
                    )})
            }
        }
    });
}
function resetGame2()
{
    gameObjects[START_MESSAGE] = new ScreenMessage(menuImage, 1);
    gameObjects[START_MESSAGE].start();
    gameObjects[PLAY_BUTTON].start();
    gameObjects[TABLE_BUTTON].start();

    document.getElementById("gameCanvas").addEventListener("mousedown", function (e)
    {
        if (e.which === 1)  // left mouse button
        {
            let canvasBoundingRectangle = document.getElementById("gameCanvas").getBoundingClientRect();
            let mouseX = e.clientX - canvasBoundingRectangle.left;
            let mouseY = e.clientY - canvasBoundingRectangle.top;

            if (gameObjects[PLAY_BUTTON].pointIsInsideBoundingRectangle(mouseX, mouseY))
            {
                gameObjects[START_MESSAGE].stopAndHide();
                gameObjects[PLAY_BUTTON].stopAndHide();
                gameObjects[TABLE_BUTTON].stopAndHide();
                survival();

            }
            else if (gameObjects[TABLE_BUTTON].pointIsInsideBoundingRectangle(mouseX, mouseY))
            {
                firestoreService.fetchScores()
                .then(elements => {
                    alert(
                        elements.sort((a, b) => a.score > b.score ? -1 : 1)
                            .slice(0, 9)
                            .map((entry, index) => `${index + 1} Name: ${entry.name} Score: ${entry.score} \n`)
                    )})
            }
        }
    });
}

function handleOrientation(event){
    if(i === 0){
        startX = event.gamma;
        startY = event.beta;
        i++
    }
    //console.log(event.gamma + " " + event.beta);
    if (event.gamma>startX+10.0){
        gameObjects[MAP].setDirection(LEFT);
        gameObjects[COLISION].setDirection(LEFT);
        gameObjects[PLAYER].setDirection(RIGHT);
    }else if (event.gamma<startX-10.0){
        gameObjects[MAP].setDirection(RIGHT);
        gameObjects[COLISION].setDirection(RIGHT);
        gameObjects[PLAYER].setDirection(LEFT);
    }
    else if (event.beta>startY +10.0){
        gameObjects[MAP].setDirection(UP);
        gameObjects[COLISION].setDirection(UP);
        gameObjects[PLAYER].setDirection(DOWN);
    }
    else if(event.beta<startY-10.0){
        gameObjects[MAP].setDirection(DOWN);
        gameObjects[COLISION].setDirection(DOWN);
        gameObjects[PLAYER].setDirection(UP);
    }
}

