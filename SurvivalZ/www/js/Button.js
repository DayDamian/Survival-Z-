class Button extends GameObject
{
    constructor(imageButton, x, y, width, height)
    {
        super();
        this.imageButton = imageButton;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.isHovering = false;
    }
    render()
    {
        ctx.drawImage(this.imageButton, this.x, this.y, this.width, this.height);
    }
    pointIsInsideBoundingRectangle(pointX, pointY)
    {
        if (!this.gameObjectIsDisplayed)
        {
            this.isHovering = false;
            return false;
        }

        if ((pointX > this.x) && (pointY > this.y))
        {
            if (pointX > this.x)
            {
                if ((pointX - this.x) > this.width)
                {
                    this.isHovering = false;
                    return false; // to the right of this gameObject
                }
            }

            if ((pointY - this.y) > this.height)
            {
                if (pointY > this.height)
                {
                    this.isHovering = false;
                    return false; // below this gameObject
                }
            }
        }
        else // above or to the left of this gameObject
        {
            this.isHovering = false;
            return false;
        }
        this.isHovering = true;
        return true; // inside this gameObject
    }
}