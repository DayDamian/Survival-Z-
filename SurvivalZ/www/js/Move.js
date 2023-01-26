class Move extends GameObject {

    constructor() {
      super(40);
    }
  
    updateState()
    {
        console.log();
        // Divides the map into squares and marks the player's position
        let positionX = parseInt(((gameObjects[MAP].getX()*-1)+200)/64);
        let positionY = parseInt(((gameObjects[MAP].getY()*-1)+200)/64);
        
        //If the player is close to the collision square, it will bounce him off the wall
        if ((collisionMap[positionY][positionX]) === 3064){
            if (gameObjects[PLAYER].getDirection() === UP)
            {
                gameObjects[MAP].setDirection(UP);
                gameObjects[COLISION].setDirection(UP);
                gameObjects[PLAYER].setDirection(DOWN);

            }
            else if (gameObjects[PLAYER].getDirection() === LEFT)
            {
                gameObjects[MAP].setDirection(LEFT);
                gameObjects[COLISION].setDirection(LEFT);
                gameObjects[PLAYER].setDirection(RIGHT);
            }
            else if (gameObjects[PLAYER].getDirection() === RIGHT)
            {
                gameObjects[MAP].setDirection(RIGHT);
                gameObjects[COLISION].setDirection(RIGHT);
                gameObjects[PLAYER].setDirection(LEFT);
            }
            else if (gameObjects[PLAYER].getDirection() === DOWN)
            {
                gameObjects[MAP].setDirection(DOWN);
                gameObjects[COLISION].setDirection(DOWN);
                gameObjects[PLAYER].setDirection(UP);
            }
    }
        //Zombies moves 
        for (let i = 4; i < numberofZombies+4; i++)
        {  
            if(gameObjects[i].getStatus() === 0)
            {
                // Running to center    
                if (gameObjects[i].getCentreX() < 200)
                {
                    gameObjects[i].setDirection(3)
                    if (gameObjects[PLAYER].getDirection() === LEFT)
                    {
                        gameObjects[i].setCentreX(-3.5);
                    } else{
                        gameObjects[i].setCentreX(-3);
                    }
                }
                else if (gameObjects[i].getCentreX() > 200)
                {
                    gameObjects[i].setDirection(1)
                    if (gameObjects[PLAYER].getDirection() === RIGHT)
                    {
                        gameObjects[i].setCentreX(3.5);
                    } else{
                        gameObjects[i].setCentreX(3);
                    }
                }
                else if (gameObjects[i].getCentreX() === 200)
                {
                    var cool = Math.floor(Math.random()*10);
                    cool *= Math.round(Math.random()) ? 1 : -1;
                    gameObjects[i].setCentreX(cool);
                }

                if (gameObjects[i].getCentreY() < 200)
                {
                    gameObjects[i].setDirection(2)
                    if (gameObjects[PLAYER].getDirection() === UP)
                    {
                        gameObjects[i].setCentreY(-3.5);
                    } else{
                        gameObjects[i].setCentreY(-3);
                    }
                }
                else if (gameObjects[i].getCentreY() > 200)
                {
                    gameObjects[i].setDirection(0)
                    if (gameObjects[PLAYER].getDirection() === DOWN)
                    {
                        gameObjects[i].setCentreY(3.5);
                    } else{
                        gameObjects[i].setCentreY(3);
                    }
                }
                else if (gameObjects[i].getCentreY() === 200)
                {
                    var cool = Math.floor(Math.random()*10);
                    cool *= Math.round(Math.random()) ? 1 : -1;
                    gameObjects[i].setCentreY(cool);
                }


                //Player die 
                if (gameObjects[i].getCentreX() <= 220 
                && gameObjects[i].getCentreX() >= 170 
                && gameObjects[i].getCentreY() <= 220 
                && gameObjects[i].getCentreY() >= 170)
                {
                        let scoreGame = gameObjects[SHOT].getKilled();
                        gameObjects[i].setStop();
                        gameObjects[i].setStatus(1);
                        gameObjects[MAP].stopAndHide();
                        gameObjects[PLAYER].stopAndHide();
                        gameObjects[COLISION].stopAndHide();
                        
                        for (let i = 4; i < numberofZombies+4; i++)
                        {
                            gameObjects[i].setStatus(1);
                        }

                        gameObjects[LOST_MESSAGE] = new ScreenMessage(diedImage, 1);
                        gameObjects[LOST_MESSAGE].start();
                        gameObjects[EXIT_BUTTON] = new Button(exitButton, 100, 280, 200, 100);
                        gameObjects[EXIT_BUTTON].start();
                        
                        gameObjects[SAVE_BUTTON] = new Button(saveButton, 100, 180, 200, 100);
                        gameObjects[SAVE_BUTTON].start();
                        
                        if (gameObjects[SHOT].getKilled() === 1){
                            gameObjects[102] = new StaticText(gameObjects[SHOT].getKilled() + " kills", 160, 170, "Arial Black", 20, "red");
                            gameObjects[102].start();
                        }else{
                            gameObjects[102] = new StaticText(gameObjects[SHOT].getKilled() + " kills", 160, 170, "Arial Black", 20, "red");
                            gameObjects[102].start();
                        }

                        document.getElementById("gameCanvas").addEventListener("mousedown", function (e)
                        {
                            if (e.which === 1)  // left mouse button
                            {
                                let canvasBoundingRectangle = document.getElementById("gameCanvas").getBoundingClientRect();
                                let mouseX = e.clientX - canvasBoundingRectangle.left;
                                let mouseY = e.clientY - canvasBoundingRectangle.top;

                                if (gameObjects[EXIT_BUTTON].pointIsInsideBoundingRectangle(mouseX, mouseY))
                                {
                                    gameObjects[SAVE_BUTTON].stopAndHide();
                                    gameObjects[LOST_MESSAGE].stopAndHide();
                                    gameObjects[WIN_MESSAGE].stopAndHide();
                                    gameObjects[EXIT_BUTTON].stopAndHide();
                                    gameObjects[102].stopAndHide();
                                    resetGame();
                                }
                                else if (gameObjects[SAVE_BUTTON].pointIsInsideBoundingRectangle(mouseX, mouseY))
                                {
                                    let name = prompt("Enter your nickname")
                                    if(name != null && name != ""){
                                        firestoreService.saveScore(name, scoreGame);
                                        gameObjects[SAVE_BUTTON].stopAndHide();
                                        gameObjects[LOST_MESSAGE].stopAndHide();
                                        gameObjects[WIN_MESSAGE].stopAndHide();
                                        gameObjects[EXIT_BUTTON].stopAndHide();
                                        gameObjects[102].stopAndHide();
                                        resetGame();
                                    }
                                }
                            }
                        });
                }
                //Player WIN
                if (gameObjects[SHOT].getKilled() === 30)
                {
                    let scoreGame = gameObjects[SHOT].getKilled();
                    gameObjects[i].setStop();
                    gameObjects[i].setStatus(1);
                    gameObjects[MAP].stopAndHide();
                    gameObjects[PLAYER].stopAndHide();
                    gameObjects[COLISION].stopAndHide();
                            
                    for (let i = 4; i < numberofZombies+4; i++)
                    {
                        gameObjects[i].setStatus(1);
                    }

                            gameObjects[WIN_MESSAGE] = new ScreenMessage(winImage, 1);
                            gameObjects[WIN_MESSAGE].start();
                            gameObjects[EXIT_BUTTON] = new Button(exitButton, 100, 280, 200, 100);
                            gameObjects[EXIT_BUTTON].start();
                            gameObjects[102] = new StaticText(gameObjects[SHOT].getKilled() + " kills", 160, 170, "Arial Black", 20, "yellow");
                            gameObjects[102].start();

                            gameObjects[SAVE_BUTTON] = new Button(saveButton, 100, 180, 200, 100);
                            gameObjects[SAVE_BUTTON].start();

                            document.getElementById("gameCanvas").addEventListener("mousedown", function (e)
                            {
                                if (e.which === 1)  // left mouse button
                                {
                                    let canvasBoundingRectangle = document.getElementById("gameCanvas").getBoundingClientRect();
                                    let mouseX = e.clientX - canvasBoundingRectangle.left;
                                    let mouseY = e.clientY - canvasBoundingRectangle.top;

                                    if (gameObjects[EXIT_BUTTON].pointIsInsideBoundingRectangle(mouseX, mouseY))
                                    {
                                        resetGame();
                                    }
                                    else if (gameObjects[SAVE_BUTTON].pointIsInsideBoundingRectangle(mouseX, mouseY))
                                    {
                                    let name = prompt("Enter your nickname")
                                    if(name != null && name != ""){
                                        firestoreService.saveScore(name, scoreGame);
                                        resetGame();
                                    }
                                    }
                                }
                            });
                }
            }
        }
    }
  
}

  