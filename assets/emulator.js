(function() {

  var TIME_STEP = 1;
  var TRANSFER_CONSTANT = 1e-3;

  function Emulator(grid) {
    this._temperatures = [];
    this._neighbors = [];
    for (var i = 0, len = grid.cellCount(); i < len; ++i) {
      this._temperatures[i] = 0;
      this._neighbors[i] = grid.cellNeighbors(i);
    }
  }

  Emulator.prototype.emulate = function(time) {
    var count = Math.round(time / TIME_STEP);
    for (var i = 0; i < count; ++i) {
      this._step(TIME_STEP);
    }
    this._step(time - count*TIME_STEP);
  };

  Emulator.prototype.getTemp = function(cell) {
    return this._temperatures[cell];
  };

  Emulator.prototype.setTemp = function(cell, temp) {
    this._temperatures[cell] = temp;
  };

  Emulator.prototype._step = function(step) {
    var derivative = [];
    for (var i = 0, len = this._temperatures.length; i < len; ++i) {
      var neighbors = this._neighbors[i];
      var temp = this._temperatures[i];
      var velocity = 0;
      for (var j = 0, len1 = neighbors.length; j < len1; ++j) {
        var neighbor = neighbors[j];
        var neighborTemp = this._temperatures[neighbor];
        velocity += TRANSFER_CONSTANT * (neighborTemp - temp);
      }
      derivative[i] = velocity;
    }
    for (var i = 0, len = this._temperatures.length; i < len; ++i) {
      this._temperatures[i] += derivative[i] * step;
    }
  };

  window.app.Emulator = Emulator;

})();
