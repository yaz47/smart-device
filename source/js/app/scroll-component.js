'use strict';

(function () {

  function ScrollComponent(options) {
    window.BaseComponent.call(this, options);
  }

  ScrollComponent.prototype = Object.create(window.BaseComponent.prototype);
  ScrollComponent.prototype.constructor = ScrollComponent;

  ScrollComponent.prototype.init = function () {
    this._scrollId = this.element.dataset.scrollId;
    this._scrollToElement = document.querySelector('#' + this._scrollId);

    if (this._scrollId && this._scrollToElement) {
      this._setListeners();
    }
  };

  ScrollComponent.prototype.destroy = function () {
    this._removeListeners();
  };

  ScrollComponent.prototype._setListeners = function () {
    var self = this;
    var onClick = function (evt) {
      evt.preventDefault();
      self._scrollToElement.scrollIntoView({behavior: 'smooth'});
    };
    self._addListener(this.element, 'click', onClick);
  };

  window.ScrollComponent = ScrollComponent;
})();
