class ShotZombie extends GameObject
{
    constructor(){
        super();
        this.shot=0;
        this.killed = 0;
    }
    //Killing zombies
    setShot(){
    for (let i = 4; i < numberofZombies+4; i++)
    {  
        if (gameObjects[PLAYER].getDirection() === UP)
        {
            if (gameObjects[i].getCentreX() < 300 
            && gameObjects[i].getCentreX() > 200 
            && gameObjects[i].getCentreY() < 240 
            && gameObjects[i].getCentreY() > 100 )
            {
            gameObjects[i].setStatus(1);
            this.killed++;
            } 
        }
        else if (gameObjects[PLAYER].getDirection() === LEFT)
        {
            if (gameObjects[i].getCentreX() < 240 
            && gameObjects[i].getCentreX() > 100 
            && gameObjects[i].getCentreY() < 300 
            && gameObjects[i].getCentreY() > 200 )
            {
            gameObjects[i].setStatus(1);
            this.killed++;
            } 
        }
        else if (gameObjects[PLAYER].getDirection() === RIGHT)
        {
            if (gameObjects[i].getCentreX() < 400 
            && gameObjects[i].getCentreX() > 240 
            && gameObjects[i].getCentreY() < 300 
            && gameObjects[i].getCentreY() > 200 )
            {
            gameObjects[i].setStatus(1);
            this.killed++;
            }
        }
        else if (gameObjects[PLAYER].getDirection() === DOWN)
        {
            if (gameObjects[i].getCentreX() < 300 
            && gameObjects[i].getCentreX() > 200
            && gameObjects[i].getCentreY() < 400 
            && gameObjects[i].getCentreY() > 240  )
            {
            gameObjects[i].setStatus(1);
            this.killed++;
            }
        }
    }
    }
    getShot()
    {
        return this.shot;
    }
    resetShot()
    {
        this.shot=0;
    }
    updateState()
    {
        
    }
    getKilled()
    {
        return this.killed;
    }
}
