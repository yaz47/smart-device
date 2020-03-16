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
