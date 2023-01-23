class SurvivalZCanvasGame extends CanvasGame
{

    constructor(collisionImage)
    {
        super();
        let offscreenCanvas = document.createElement('canvas');
        this.survivalCtx = offscreenCanvas.getContext('2d');
        offscreenCanvas.width = canvas.width;
        offscreenCanvas.height = canvas.height;
        this.survivalCtx.drawImage(collisionImage, 100, 100, canvas.width+3000, canvas.height+3000)
    }
    collisionDetection()
    {
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
                console.log(i + " " +gameObjects[i].getCentreX() + " " + gameObjects[i].getCentreY());
                // Running to center    
                if (gameObjects[i].getCentreX() < 250)
                {
                    if (gameObjects[PLAYER].getDirection() === LEFT)
                    {
                        gameObjects[i].setCentreX(-1.5);
                    } else{
                        gameObjects[i].setCentreX(-0.1);
                    }
                }
                else if (gameObjects[i].getCentreX() > 250)
                {
                    if (gameObjects[PLAYER].getDirection() === RIGHT)
                    {
                        gameObjects[i].setCentreX(1.5);
                    } else{
                        gameObjects[i].setCentreX(0.1);
                    }
                }

                if (gameObjects[i].getCentreY() < 250)
                {
                    if (gameObjects[PLAYER].getDirection() === UP)
                    {
                        gameObjects[i].setCentreY(-1.5);
                    } else{
                        gameObjects[i].setCentreY(-0.1);
                    }
                }
                else if (gameObjects[i].getCentreY() > 250)
                {
                    if (gameObjects[PLAYER].getDirection() === DOWN)
                    {
                        gameObjects[i].setCentreY(1.5);
                    } else{
                        gameObjects[i].setCentreY(0.1);
                    }
                }


                //Player die 
                if (gameObjects[i].getCentreX() <= 270 && gameObjects[i].getCentreX() >= 220 )
                {
                    if (gameObjects[i].getCentreY() <= 270 && gameObjects[i].getCentreY() >= 220 )
                    {
                        gameObjects[i].setStop();
                        gameObjects[i].setStatus(1);
                        //console.log("Zjedzony")
                    }
                }
                //Killing zombies
                if (gameObjects[PLAYER].getDirection() === UP)
                {
                    //if(gameObjects[SHOT].getShot() === 1)
                    //{
                        console.log("Strzał")
                        if (gameObjects[i].getCentreX() < 300 
                        && gameObjects[i].getCentreX() > 200 
                        && gameObjects[i].getCentreY() < 250 
                        && gameObjects[i].getCentreY() > 0 )
                        {
                            gameObjects[i].setStatus(1);
                            console.log("Trafienie")
                        } 
                    //}
                    //gameObjects[SHOT].resetShot()
                }
                else if (gameObjects[PLAYER].getDirection() === LEFT)
                {
                    //if(gameObjects[SHOT].getShot() === 1)
                    //{
                        console.log("Strzał")
                        if (gameObjects[i].getCentreX() < 250 
                        && gameObjects[i].getCentreX() > 0 
                        && gameObjects[i].getCentreY() < 300 
                        && gameObjects[i].getCentreY() > 200 )
                        {
                            gameObjects[i].setStatus(1);
                            console.log("Trafienie")
                        } 
                    //}
                    //gameObjects[SHOT].resetShot()
                }
                else if (gameObjects[PLAYER].getDirection() === RIGHT)
                {
                    //if(gameObjects[SHOT].getShot() === 1)
                    //{
                        console.log("Strzał")
                        if (gameObjects[i].getCentreX() < 500 
                        && gameObjects[i].getCentreX() > 250 
                        && gameObjects[i].getCentreY() < 300 
                        && gameObjects[i].getCentreY() > 200 )
                        {
                            gameObjects[i].setStatus(1);
                            console.log("Trafienie")
                        }
                    //}
                    //gameObjects[SHOT].resetShot()
                }
                else if (gameObjects[PLAYER].getDirection() === DOWN)
                {
                    //if(gameObjects[SHOT].getShot() === 1)
                    //{
                        console.log("Strzał")
                        if (gameObjects[i].getCentreX() < 300 
                        && gameObjects[i].getCentreX() > 200
                        && gameObjects[i].getCentreY() < 500 
                        && gameObjects[i].getCentreY() > 250  )
                        {
                            gameObjects[i].setStatus(1);
                            console.log("Trafienie")
                        }
                    //}
                    //gameObjects[SHOT].resetShot()
                }
            }
        }
    }
}