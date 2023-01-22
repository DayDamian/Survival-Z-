/* Author: Derek O Reilly, Dundalk Institute of Technology, Ireland. */

class static_image extends GameObject {
  /* Each gameObject MUST have a constructor() and a render() method.        */
  /* If the object animates, then it must also have an updateState() method. */

  constructor(image, x, y, width, height) {
    super(40);
    this.image = image;
    this.width = width ;
    this.height = height ;
    this.x = x;
    this.y = y;
    /* These variables depend on the object */
    this.MAP_SPEED = 10;
    this.setDirection(STOPPED);
  }

  updateState()
  {
        if (this.direction === UP)
        {
            this.y -= this.MAP_SPEED;
        }
        else if (this.direction === LEFT)
        {
            this.x -= this.MAP_SPEED;
        }
        else if (this.direction === DOWN)
        {
            this.y += this.MAP_SPEED;
        }
        else if (this.direction === RIGHT)
        {
            this.x += this.MAP_SPEED;
        }
        if 
        (this.x >= canvas.width/2)
        {
            this.x = -3249;
        }
        if 
        (this.y >= canvas.height/2)
        {
          this.y = -3249;
        }
        if (this.x <= ((-canvas.width/2)-3000))
        {
            this.x = 249;
        }
        if (this.y <= ((-canvas.width/2)-3000))
        {
            this.y = 249;
        }

  }


  render() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    
    ctx.drawImage(this.image, this.x+this.width, this.y, this.width, this.height);
    ctx.drawImage(this.image, this.x-this.width, this.y, this.width, this.height);
    ctx.drawImage(this.image, this.x, this.y+this.height, this.width, this.height);
    ctx.drawImage(this.image, this.x, this.y-this.height, this.width, this.height);
    
    ctx.drawImage(this.image, this.x+this.width, this.y-this.height, this.width, this.height);
    ctx.drawImage(this.image, this.x+this.width, this.y+this.height, this.width, this.height);
    ctx.drawImage(this.image, this.x-this.width, this.y+this.height, this.width, this.height);
    ctx.drawImage(this.image, this.x-this.width, this.y-this.height, this.width, this.height);
    
    
  }

  setDirection(newDirection)
    {
        this.direction = newDirection;
    }
    
  getDirection()
    {
        return(this.direction);
    }

}
