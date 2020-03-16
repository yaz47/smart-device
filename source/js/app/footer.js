'use strict';

(function () {
  var WRAPPER_CLASS = '.footer__menu-wrapper';
  var TOGGLE_CLASS = 'footer__menu-wrapper--closed';
  var BUTTON_CLASS = '.footer__toggle';

  function FooterComponent() {}
  FooterComponent.prototype = Object.create(window.BaseComponent.prototype);
  FooterComponent.prototype.constructor = FooterComponent;

  FooterComponent.prototype._setToggleListeners = function (wrapper) {
    var self = this;
    var toggleButtons = this._getRefs(wrapper.querySelectorAll(BUTTON_CLASS));

    if (toggleButtons) {
      toggleButtons.forEach(function (toggleButton) {
        var onClick = function () {
          wrapper.classList.toggle(TOGGLE_CLASS);
        };

        self._addListener(toggleButton, 'click', onClick);
      });
    }
  };

  FooterComponent.prototype.init = function () {
    var menuWrappers = this._getRefs(document.querySelectorAll(WRAPPER_CLASS));

    if (menuWrappers) {
      menuWrappers.forEach(this._setToggleListeners.bind(this));
    }
  };

  window.FooterComponent = FooterComponent;
})();
