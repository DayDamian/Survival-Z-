class SurvivalZCanvasGame extends CanvasGame
{

    constructor()
    {
        super();
        let offscreenCanvas = document.createElement('canvas');
        this.survivalCtx = offscreenCanvas.getContext('2d');
        offscreenCanvas.width = canvas.width;
        offscreenCanvas.height = canvas.height;

    }
    collisionDetection()
    {
    }
}