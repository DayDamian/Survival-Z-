class Player extends GameObject
{
    constructor(playerImage, centreX, centreY)
    {
        super(40);
        this.centreX = centreX;
        this.centreY = centreY;
        this.NUMBER_OF_COLUMNS_IN_SPRITE_IMAGE = 9;
        this.NUMBER_OF_ROWS_IN_SPRITE_IMAGE = 4; 

        this.column = 0;
        this.animationStartDelay = 0;
        this.playerImage = playerImage;

        this.SPRITE_WIDTH = (this.playerImage.width / this.NUMBER_OF_COLUMNS_IN_SPRITE_IMAGE);
        this.SPRITE_HEIGHT = (this.playerImage.height / this.NUMBER_OF_ROWS_IN_SPRITE_IMAGE);
        this.WIDTH_OF_PLAYER_ON_CANVAS = 70;
        this.HEIGHT_OF_PLAYER_ON_CANVAS = 70;

        this.PLAYER_SPEED = 0;
        this.setDirection(STOPPED);
    }

    updateState()
    {
        if(this.centreY-this.SPRITE_HEIGHT/4<0)
            this.direction = STOPPED;
        if (this.direction === UP)
        {
            this.centreY -= this.PLAYER_SPEED;
        }
        else if (this.direction === LEFT)
        {
            this.centreX -= this.PLAYER_SPEED;
        }
        else if (this.direction === DOWN)
        {
            this.centreY += this.PLAYER_SPEED;
        }
        else if (this.direction === RIGHT)
        {
            this.centreX += this.PLAYER_SPEED;
        }

        if (this.direction !== STOPPED)
        {

            this.column++;
            this.currentSprite++;

            if (this.currentSprite >= this.endSprite)
            {
                this.row = this.direction;
                this.column = 0;
                this.currentSprite = this.startSprite;
            }
            else if (this.column >= this.NUMBER_OF_COLUMNS_IN_SPRITE_IMAGE)
            {
                this.column = 0;
                this.row++;
            }
        }
        else // stopped
        {
            this.column = 0;
            this.row = 2;
            this.currentSprite = 0;
        }
    }

    render()
    {
        ctx.drawImage(this.playerImage, this.column * this.SPRITE_WIDTH, this.row * this.SPRITE_WIDTH, this.SPRITE_WIDTH, this.SPRITE_HEIGHT, this.centreX - (this.SPRITE_WIDTH / 2), this.centreY - (this.SPRITE_HEIGHT / 2), this.WIDTH_OF_PLAYER_ON_CANVAS, this.HEIGHT_OF_PLAYER_ON_CANVAS);
    }

    setDirection(newDirection)
    {
        this.direction = newDirection;
        this.startSprite = this.direction * this.NUMBER_OF_COLUMNS_IN_SPRITE_IMAGE;
        this.endSprite = this.startSprite + this.NUMBER_OF_COLUMNS_IN_SPRITE_IMAGE;
        this.currentSprite = this.startSprite;
        this.row = this.direction;
        this.column = 0;
    }

    getDirection()
    {
        return(this.direction);
    }

    getCentreX()
    {
        return this.centreX;
    }

    getCentreY()
    {
        return this.centreY;
    }
}