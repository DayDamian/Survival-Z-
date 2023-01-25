class ScreenMessage extends GameObject
{
    constructor(image, status)
    {
        super();
        this.image = image;
        this.status = status;
        this.x = 0;
        this.y = 0;
        this.width = canvas.width;
        this.height = canvas.height;
        console.log("died")
    }

    render()
    {
        ctx.drawImage(this.image, 0, 0, 500, 500);
    }
}