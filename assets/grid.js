(function() {

  var SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
  var XLINK_NAMESPACE = "http://www.w3.org/1999/xlink";

  var GRID_SIZE = 290;
  var RADIUS = 10;
  var SQRT_3 = Math.sqrt(3);
  var COLUMN_COUNT = Math.round((GRID_SIZE-RADIUS*2)/(RADIUS*3)+1);
  var ROW_COUNT = Math.ceil(GRID_SIZE / (SQRT_3 * RADIUS))-1;

  function Grid() {
    this._cells = [];
    this._element = document.getElementById('grid');

    var yValue = SQRT_3*RADIUS/2 + 1;
    for (var row = 0; row < ROW_COUNT; ++row) {
      var xValue = RADIUS;
      for (var col = 0; col < COLUMN_COUNT; ++col) {
        this._addCell(xValue, yValue);
        if (col+1 < COLUMN_COUNT) {
          this._addCell(xValue+RADIUS*1.5, yValue+SQRT_3*RADIUS/2);
        }
        xValue += RADIUS*3;
      }
      yValue += SQRT_3*RADIUS;
    }

    this.onClick = null;
  }

  Grid.prototype.cellCount = function() {
    return this._cells.length;
  };

  Grid.prototype.colorCell = function(idx, color) {
    this._cells[idx].setAttribute('fill', color);
  };

  Grid.prototype.cellNeighbors = function(idx) {
    var columnCount = COLUMN_COUNT*2 - 1;
    var row = Math.floor(idx / columnCount);
    var col = idx % columnCount;
    var res = [];
    if (col > 0) {
      res.push(row*columnCount + col - 1);
    }
    if (col+1 < columnCount) {
      res.push(row*columnCount + col + 1);
    }
    if (row > 0) {
      res.push((row-1)*columnCount + col);
      if (col%2 === 0) {
        if (col > 0) {
          res.push((row-1)*columnCount + col-1);
        }
        if (col+1 < columnCount) {
          res.push((row-1)*columnCount + col+1);
        }
      }
    }
    if (row+1 < ROW_COUNT) {
      res.push((row+1)*columnCount + col);
      if (col%2 === 1) {
        if (col > 0) {
          res.push((row+1)*columnCount + col-1);
        }
        if (col+1 < columnCount) {
          res.push((row+1)*columnCount + col+1);
        }
      }
    }
    return res;
  };

  Grid.prototype._addCell = function(x, y) {
    var element = document.createElementNS(SVG_NAMESPACE, 'use');
    element.setAttributeNS(XLINK_NAMESPACE, 'href', '#hexagon');
    var xStr = x.toFixed(3);
    var yStr = y.toFixed(3);
    element.setAttribute('transform', 'translate(' + xStr + ' ' + yStr + ')');
    this._cells.push(element);
    this._element.appendChild(element);

    var idx = this._cells.length - 1;
    this.colorCell(idx, 'white');
    element.addEventListener('click', function() {
      this.onClick(idx);
    }.bind(this));
  };

  window.app.Grid = Grid;

})();
