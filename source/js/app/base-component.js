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
