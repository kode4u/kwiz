
(function () {
  'use strict';
  function triggerResize() {
    try {
      if (window.H5P && window.H5P.instances) {
        window.H5P.instances.forEach(function (inst) {
          if (inst && typeof inst.trigger === 'function') {
            inst.trigger('resize');
          }
        });
      }
    } catch (e) {}
  }
  
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    triggerResize();
  } else {
    document.addEventListener('DOMContentLoaded', triggerResize);
  }
  setTimeout(triggerResize, 100);
  setTimeout(triggerResize, 400);
  setTimeout(triggerResize, 1000);
})();
