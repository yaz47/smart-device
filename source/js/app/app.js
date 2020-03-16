'use strict';

var COMPONENTS_LIST = {
  'scroll': window.ScrollComponent,
  'mask': window.MaskComponent,
  'menu': window.MenuComponent,
  'modal': window.ModalComponent
};

var INIT_SELECTOR = '[data-init]';

var elements = window.BaseComponent.getRefs(document.querySelectorAll(INIT_SELECTOR));

if (elements) {
  var components = [];

  elements.forEach(function (element) {
    var component = new COMPONENTS_LIST[element.dataset.init]({element: element});
    component.init();
    components.push(component);
  });
}
