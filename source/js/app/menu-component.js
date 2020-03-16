'use strict';

(function () {
  var TOGGLE_CLASS = 'footer__menu-wrapper--closed';
  var BUTTON_SELECTOR = '.footer__toggle';

  function MenuComponent(options) {
    window.BaseComponent.call(this, options);
  }

  MenuComponent.prototype = Object.create(window.BaseComponent.prototype);
  MenuComponent.prototype.constructor = MenuComponent;

  MenuComponent.prototype.init = function () {
    this._setListeners();
  };

  MenuComponent.prototype.destroy = function () {
    this._removeListeners();
  };

  MenuComponent.prototype._setListeners = function () {
    var self = this;
    var buttons = this._getRefs(document.querySelectorAll(BUTTON_SELECTOR));

    if (buttons) {
      buttons.forEach(function (button) {
        var onClick = function (evt) {
          if (evt.target === button) {
            evt.preventDefault();
            self.element.classList.toggle(TOGGLE_CLASS);
          }
        };

        self._addListener(button, 'click', onClick);
      });
    }
  };

  window.MenuComponent = MenuComponent;
})();
