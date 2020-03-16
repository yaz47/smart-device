'use strict';

(function () {
  function BaseComponent(options) {
    this.element = options.element;
  }

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
  var TOGGLE_CLASS = 'modal--hide';
  var CLOSE_BUTTON_CLASS = '.modal-call__close, .modal';
  var OPEN_BUTTON_CLASS = '.header__button';
  var NAME_INPUT_ID = '#modal-name';
  var INPUTS_SELECTOR = 'input[type="text"], textarea';
  var LOCK_CLASS = 'body-lock';
  var ESC_KEYCODE = 27;

  function ModalComponent(options) {
    window.BaseComponent.call(this, options);
  }

  ModalComponent.prototype = Object.create(window.BaseComponent.prototype);
  ModalComponent.prototype.constructor = ModalComponent;

  ModalComponent.prototype.init = function () {
    this._setOpenListeners();
    this._setCloseListeners();
    this._setOnEscListener();
    this._setChangeListeners();
  };

  ModalComponent.prototype.destroy = function () {
    if (this._focusTrap) {
      this._focusTrap.deactivate();
      this._focusTrap = null;
    }
    this._removeListeners();
  };

  ModalComponent.prototype._close = function () {
    this._unlockPage();

    if (this._focusTrap) {
      this._focusTrap.deactivate();
    }

    if (this.element) {
      this.element.classList.add(TOGGLE_CLASS);
    }
  };

  ModalComponent.prototype._open = function () {
    this._activateFocusTrap();
    this._setFocusOnName();
    this._lockPage();
    this._setLocalValuesForInputs();

    if (this.element) {
      this.element.classList.remove(TOGGLE_CLASS);
    }
  };

  ModalComponent.prototype._lockPage = function () {
    document.body.classList.add(LOCK_CLASS);
    document.body.dataset.scrollY = this._getBodyScrollTop() + '';

    if (this._existVerticalScroll()) {
      document.body.style.top = '-' + document.body.dataset.scrollY + 'px';
    }
  };

  ModalComponent.prototype._unlockPage = function () {
    document.body.classList.remove(LOCK_CLASS);

    if (this._existVerticalScroll()) {
      window.scrollTo(0, +document.body.dataset.scrollY);
    }
  };

  ModalComponent.prototype._activateFocusTrap = function () {
    var self = this;
    var activateFocusTrap = function () {
      if (!self._focusTrap) {
        self._focusTrap = window.focusTrap(self.element);
      }
      self._focusTrap.activate();
    };

    setTimeout(activateFocusTrap);
  };

  ModalComponent.prototype._existVerticalScroll = function () {
    return document.body.offsetHeight > window.innerHeight;
  };

  ModalComponent.prototype._getBodyScrollTop = function () {
    return (
      window.pageYOffset ||
      (document.documentElement && document.documentElement.ScrollTop) ||
      (document.body && document.body.scrollTop)
    );
  };

  ModalComponent.prototype._setFocusOnName = function () {
    var nameInput = this.element.querySelector(NAME_INPUT_ID);
    var setFocusOnName = function () {
      nameInput.focus();
    };

    if (nameInput) {
      setTimeout(setFocusOnName);
    }
  };

  ModalComponent.prototype._setOnEscListener = function () {
    var self = this;

    function onEscUp(evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        self._close();
      }
    }

    this._addListener(document, 'keyup', onEscUp);
  };

  ModalComponent.prototype._setOpenListeners = function () {
    var self = this;
    var buttons = this._getRefs(document.querySelectorAll(OPEN_BUTTON_CLASS));

    if (buttons) {
      buttons.forEach(function (button) {
        var onClick = function (evt) {
          if (evt.target === button) {
            evt.preventDefault();
            self._open();
          }
        };

        self._addListener(button, 'click', onClick);
      });
    }
  };

  ModalComponent.prototype._setCloseListeners = function () {
    var self = this;
    var buttons = this._getRefs(document.querySelectorAll(CLOSE_BUTTON_CLASS));

    if (buttons) {
      buttons.forEach(function (button) {
        var onClick = function (evt) {
          if (evt.target === button) {
            evt.preventDefault();
            self._close();
          }
        };

        self._addListener(button, 'click', onClick);
      });
    }
  };

  ModalComponent.prototype._setChangeListeners = function () {
    var self = this;
    this.inputs = this._getRefs(document.querySelectorAll(INPUTS_SELECTOR));

    if (this.inputs) {
      this.inputs.forEach(function (input) {
        var onChange = function () {
          if (input.value !== '' && input.id) {
            localStorage.setItem(input.id, input.value);
          }
        };

        self._addListener(input, 'change', onChange);
      });
    }
  };

  ModalComponent.prototype._setLocalValuesForInputs = function () {
    if (this.inputs) {
      this.inputs.forEach(function (input) {
        if (input.id) {
          var val = localStorage.getItem(input.id);
          if (val && val !== '') {
            input.value = val;
          }
        }
      });
    }
  };

  window.ModalComponent = ModalComponent;
})();

'use strict';

var MASK = '+{7}(000)000-00-00';

var phone = document.querySelector('#phone');
var modalPhone = document.querySelector('#modal-phone');
var modal = document.querySelector('.modal');

if (phone) {
  window.iMaskJS(phone, {mask: MASK});
}

if (modalPhone) {
  window.iMaskJS(modalPhone, {mask: MASK});
}

if (modal) {
  var modalComponent = new window.ModalComponent({element: modal});
  modalComponent.init();
}

var footer = new window.FooterComponent();

footer.init();
