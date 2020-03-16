'use strict';

(function () {
  var MASK = '+{7}(000)000-00-00';

  function MaskComponent(options) {
    window.BaseComponent.call(this, options);
  }

  MaskComponent.prototype = Object.create(window.BaseComponent.prototype);
  MaskComponent.prototype.constructor = MaskComponent;

  MaskComponent.prototype.init = function () {
    this._mask = window.iMaskJS(this.element, {mask: MASK});
  };

  MaskComponent.prototype.destroy = function () {
    if (this._mask) {
      this._mask.destroy();
    }
  };

  window.MaskComponent = MaskComponent;
})();
