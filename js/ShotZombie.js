class ShotZombie extends GameObject
{
    constructor(){
        super();
        this.shot=0;
    }
    setShot(){
        this.shot=1;
    }
    getShot()
    {
        return this.shot;
    }
    resetShot()
    {
        this.shot=0;
    }
}
