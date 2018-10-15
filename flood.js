function getPixData(x, y){
  var color = [];

  var d = pixelDensity();

  for (var i = 0; i < d; i++) {
    for (var j = 0; j < d; j++) {
      // loop over
      idx = 4 * ((y * d + j) * width * d + (x * d + i));
      color[0] = pixels[idx];
      color[1] = pixels[idx+1];
      color[2] = pixels[idx+2];
      color[3] = pixels[idx+3];
    }
  }

  return color;
}

function setPixData(x, y, colorNew) {
  var d = pixelDensity();

  for (var i = 0; i < d; i++) {
    for (var j = 0; j < d; j++) {
      idx = 4 * ((y * d + j) * width * d + (x * d + i));
      pixels[idx] = colorNew.levels[0];
      pixels[idx+1] = colorNew.levels[1];
      pixels[idx+2] = colorNew.levels[2];
      pixels[idx+3] = colorNew.levels[3];
    }
  }
}

function checkHistory(x, y, history){
  for (var p in history) {
    if (history[p].x == x && history[p].y == y) {
      return false;
    }
  }

  return true;
}

function checkValue(x, y, colorOld) {
  var colorNew = getPixData(x, y);

  for (var i = 0; i < 4; i++) {
    if (colorNew[i] != colorOld[i]) {
      return false;
    }
  }

  return true;
}

function floodFill (x, y, colorNew){
  var stack = [];
  var historyList = [];

  var pixel;

  var colorOld = getPixData(x, y);

  stack.push({x: x, y: y});
  historyList.push({x: x, y: y});

  var xPos, yPos;

  while(stack.length > 0){
    pixel = stack.pop();

    setPixData(pixel.x, pixel.y, colorNew);

    if (pixel.x + 1 < width && pixel.x + 1 > 0) {
      if( checkValue(pixel.x + 1, pixel.y, colorOld) && checkHistory(pixel.x + 1, pixel.y, historyList)){
        stack.push({x: pixel.x + 1, y: pixel.y});
        historyList.push({x: pixel.x + 1, y: pixel.y});
      }
    }

    if (pixel.x - 1 < width && pixel.x - 1 > 0) {
      if( checkValue(pixel.x - 1, pixel.y, colorOld) && checkHistory(pixel.x - 1, pixel.y, historyList)){
        stack.push({x: pixel.x - 1, y: pixel.y});
        historyList.push({x: pixel.x - 1, y: pixel.y});
      }
    }

    if (pixel.y + 1 < height && pixel.y + 1 > 0) {
      if( checkValue(pixel.x, pixel.y + 1, colorOld) && checkHistory(pixel.x, pixel.y + 1, historyList)){
        stack.push({x: pixel.x, y: pixel.y + 1});
        historyList.push({x: pixel.x, y: pixel.y + 1});
      }
    }

    if (pixel.y - 1 < height && pixel.y - 1 > 0) {
      if( checkValue(pixel.x, pixel.y - 1, colorOld) && checkHistory(pixel.x, pixel.y - 1, historyList)){
        stack.push({x: pixel.x, y: pixel.y - 1});
        historyList.push({x: pixel.x, y: pixel.y - 1});
      }
    }
  }
}
