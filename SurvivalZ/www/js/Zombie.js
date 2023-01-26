class Zombie extends Player
{
    constructor(zombieImage, centreX, centreY, status)
    {
        super(zombieImage, centreX, centreY);
        this.status=status;
    }
    getStatus(){
        return this.status;
    }
    setStatus(number){
        this.status = number;
        this.centreX = 1000;
        this.centreY = 1000;
    }
    updateState(){
        //console.log("zombie!")
    }
}