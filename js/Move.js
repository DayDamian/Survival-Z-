class Move extends GameObject {

    constructor() {
      super(40);
    }
  
    updateState()
    {
        console.log();
        // Divides the map into squares and marks the player's position
        let positionX = parseInt(((gameObjects[MAP].getX()*-1)+249)/64);
        let positionY = parseInt(((gameObjects[MAP].getY()*-1)+250)/64);
        
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
                if (gameObjects[i].getCentreX() < 250)
                {
                    gameObjects[i].setDirection(3)
                    if (gameObjects[PLAYER].getDirection() === LEFT)
                    {
                        gameObjects[i].setCentreX(-5.5);
                    } else{
                        gameObjects[i].setCentreX(-5);
                    }
                }
                else if (gameObjects[i].getCentreX() > 250)
                {
                    gameObjects[i].setDirection(1)
                    if (gameObjects[PLAYER].getDirection() === RIGHT)
                    {
                        gameObjects[i].setCentreX(5.5);
                    } else{
                        gameObjects[i].setCentreX(5);
                    }
                }
                else if (gameObjects[i].getCentreX() === 250)
                {
                    var cool = Math.floor(Math.random()*10);
                    cool *= Math.round(Math.random()) ? 1 : -1;
                    //gameObjects[i].setCentreX(cool);
                }

                if (gameObjects[i].getCentreY() < 250)
                {
                    gameObjects[i].setDirection(2)
                    if (gameObjects[PLAYER].getDirection() === UP)
                    {
                        gameObjects[i].setCentreY(-5.5);
                    } else{
                        gameObjects[i].setCentreY(-5);
                    }
                }
                else if (gameObjects[i].getCentreY() > 250)
                {
                    gameObjects[i].setDirection(0)
                    if (gameObjects[PLAYER].getDirection() === DOWN)
                    {
                        gameObjects[i].setCentreY(5.5);
                    } else{
                        gameObjects[i].setCentreY(5);
                    }
                }
                else if (gameObjects[i].getCentreY() === 250)
                {
                    var cool = Math.floor(Math.random()*10);
                    cool *= Math.round(Math.random()) ? 1 : -1;
                    //gameObjects[i].setCentreY(cool);
                }


                //Player die 
                if (gameObjects[i].getCentreX() <= 270 
                && gameObjects[i].getCentreX() >= 220 
                && gameObjects[i].getCentreY() <= 270 
                && gameObjects[i].getCentreY() >= 220)
                {
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
                        gameObjects[EXIT_BUTTON] = new Button(playButton, 150, 350, 200, 100);
                        gameObjects[EXIT_BUTTON].start();
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
                            }
                        });
                }
                //Player WIN
                if (gameObjects[SHOT].getKilled() === 1)
                {
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
                            gameObjects[EXIT_BUTTON] = new Button(playButton, 150, 350, 200, 100);
                            gameObjects[EXIT_BUTTON].start();
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
                                }
                            });
                }
            }
        }
    }
  
}

  