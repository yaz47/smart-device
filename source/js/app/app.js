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
