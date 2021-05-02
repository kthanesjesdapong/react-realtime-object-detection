export const drawRectangle = (detections, ctx) => {
  //loop through the detections being passed and for each prediction that you're passing draw the rectangle
  detections.forEach((prediction) => {
    //the prediction's bounding box is where you're pulling data from
    const [x, y, width, height] = prediction['bbox'];
    //the prediction obj has a class which stores the text for what the prediction thinks the object is
    const text = prediction['class'];

    //make some styling for the box
    const color = 'red';
    ctx.strokeSylt = color;
    ctx.font = '22px Consolas';
    ctx.fillStyle = color;

    //draw the rectangle
    ctx.beginPath();
    ctx.fillText(text, x, y);
    ctx.rect(x, y, width, height);
    ctx.stroke();
  });
};
