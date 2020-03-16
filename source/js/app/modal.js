'use strict';

(function () {
  var WRAPPER_CLASS = '.modal';
  var TOGGLE_CLASS = 'modal--hide';
  var BUTTON_CLASS = '.modal-call__close, .header__button';

  function ModalComponent() {}
  ModalComponent.prototype = Object.create(window.BaseComponent.prototype);
  ModalComponent.prototype.constructor = ModalComponent;

  ModalComponent.prototype._setButtonOnClickListeners = function (wrapper) {
    var self = this;
    var buttons = this._getRefs(document.querySelectorAll(BUTTON_CLASS));

    if (buttons) {
      buttons.forEach(function (button) {
        var onClick = function (evt) {
          evt.preventDefault();
          wrapper.classList.toggle(TOGGLE_CLASS);
        };

        self._addListener(button, 'click', onClick);
      });
    }
  };

  ModalComponent.prototype.init = function () {
    var menuWrappers = this._getRefs(document.querySelectorAll(WRAPPER_CLASS));

    if (menuWrappers) {
      menuWrappers.forEach(this._setButtonOnClickListeners.bind(this));
    }
  };

  window.ModalComponent = ModalComponent;
})();
