'use strict';

(function () {
  function BaseComponent() {}

  BaseComponent.prototype._addListener = function (elem, eventName, cb, options) {
    if (typeof options === 'undefined') {
      options = false;
    }

    if (typeof elem.addEventListener !== 'function') {
      return;
    }

    elem.addEventListener(eventName, cb, options);

    if (typeof this._listeners === 'undefined') {
      this._listeners = [];
    }

    this._listeners.push({
      elem: elem,
      eventName: eventName,
      cb: cb,
      options: options
    });
  };

  BaseComponent.prototype._removeListeners = function () {
    if (Array.isArray(this._listeners)) {
      this._listeners.forEach(function (listener) {
        listener.elem.removeEventListener(listener.eventName, listener.cb, listener.options);
      });

      this._listeners = null;
    }
  };

  BaseComponent.prototype.destroy = function () {
    this._removeListeners();
  };

  BaseComponent.prototype._getRefs = function (collection) {
    if (collection.length >= 1) {
      var result = [];

      for (var i = 0; i < collection.length; i++) {
        result.push(collection[i]);
      }

      return result;
    }

    return null;
  };

  window.BaseComponent = BaseComponent;
})();

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

'use strict';

var MASK = '+{7}(000)000-00-00';

var phone = document.getElementById('phone');
var modalPhone = document.getElementById('modal-phone');

if (phone) {
  window.iMaskJS(phone, {mask: MASK});
}

if (modalPhone) {
  window.iMaskJS(modalPhone, {mask: MASK});
}

var footer = new FooterComponent();
var modal = new ModalComponent();
footer.init();
modal.init();
