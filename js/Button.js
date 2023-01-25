class Button extends GameObject
{
    constructor(imageButton, x, y, xEnd, yEnd,)
    {
        super();
        this.imageButton = imageButton;
        this.x = x;
        this.y = y;
        this.xEnd = xEnd;
        this.yEnd = yEnd;
    }
    render()
    {
        ctx.drawImage(this.backgroundImage, this.x, this.y, this.width, this.height);
    }
}