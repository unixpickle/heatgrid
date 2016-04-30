(function() {

  var emulator = null;
  var grid = null;
  var lastAnimationTime = null;
  var hotClickCheckbox = null;

  function main() {
    hotClickCheckbox = document.getElementById('hot-click');
    grid = new window.app.Grid();
    emulator = new window.app.Emulator(grid);

    grid.onClick = function(idx) {
      if (hotClickCheckbox.checked) {
        emulator.setTemp(idx, 2);
      } else {
        emulator.setTemp(idx, -2);
      }
      updateGridColors();
    };

    window.requestAnimationFrame(animationFrame);
  }

  function animationFrame(time) {
    window.requestAnimationFrame(animationFrame);
    if (lastAnimationTime === null) {
      lastAnimationTime = time;
      return;
    }
    var elapsed = Math.abs(time - lastAnimationTime);
    lastAnimationTime = time;
    emulator.emulate(elapsed);

    updateGridColors();
  }

  function updateGridColors() {
    for (var i = 0, len = grid.cellCount(); i < len; ++i) {
      temp = emulator.getTemp(i);
      var rgba;
      if (temp > 0) {
        var otherColors = Math.round(Math.min(1, Math.max(1-temp, 0)) * 255);
        rgba = 'rgba(255,' + otherColors + ',' + otherColors + ',1)';
      } else {
        var otherColors = Math.round(Math.min(1, Math.max(temp+1, 0)) * 255);
        rgba = 'rgba(' + otherColors + ',' + otherColors + ',255,1)';
      }
      grid.colorCell(i, rgba);
    }
  }

  window.addEventListener('load', main);

})();
