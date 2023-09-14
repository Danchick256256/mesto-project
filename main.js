(()=>{"use strict";var e=function(e){console.log("{close.popup{".concat(e,"}")),e.classList.remove("popup_opened"),document.removeEventListener("keydown",t,!1)};function t(n){"Escape"===n.code&&(document.removeEventListener("keydown",t,!1),console.log("{escape.pressed}"),e(document.querySelector(".popup_opened")))}function n(e){document.addEventListener("keydown",t,!1),console.log("{open.popup{".concat(e,"}")),e.classList.add("popup_opened")}function r(e){return r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r(e)}function o(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,(void 0,i=function(e,t){if("object"!==r(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var o=n.call(e,"string");if("object"!==r(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(o.key),"symbol"===r(i)?i:String(i)),o)}var i}var i=function(){function e(t,n,r){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.image=t,this.name=n,this.template=r}var t,r;return t=e,(r=[{key:"createCard",value:function(){var e=this,t=document.querySelector("#imagePopup"),r=document.querySelector(".popup__image"),o=document.querySelector(".popup__image-caption"),i=document.querySelector(this.template).content.querySelector(".card").cloneNode(!0);return this.cardImage=i.querySelector(".card__image"),this.cardImage.src=this.image,this.cardImage.alt=this.name,this.cardTitle=i.querySelector(".card__title"),this.cardTitle.textContent=this.name,this.likeButton=i.querySelector(".card__button-like"),this.likeButton.addEventListener("click",(function(){console.log("{handled.like.click}"),e.likeButton.classList.toggle("card__button-like_active_true")})),this.deleteButton=i.querySelector(".card__button-delete"),this.deleteButton.addEventListener("click",(function(){console.log("{handled.delete.click}"),e.deleteButton.parentNode.classList.add("card__remove"),setTimeout((function(){return i.remove()}),350)})),this.cardImage.addEventListener("click",(function(){console.log("{click.on.image{caption: ".concat(e.cardTitle.textContent,"}")),r.style.backgroundImage="url(".concat(e.cardImage.src,")"),a(e.cardImage.src,(function(e,t){r.style.width=e+"px",r.style.height=t+"px"})),o.textContent=e.cardTitle.textContent,n(t)})),i}}])&&o(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),e}(),a=function(e,t){var n=new Image;n.src=e,n.onload=function(){t(this.width,this.height)}};const l=i;function c(e){return c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},c(e)}function u(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,(void 0,o=function(e,t){if("object"!==c(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!==c(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(r.key),"symbol"===c(o)?o:String(o)),r)}var o}const s=function(){function e(t){var n=t.formSelector,r=t.inputSelector,o=t.submitButtonSelector,i=t.inactiveButtonClass,a=t.inputErrorClass,l=t.errorClass;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e);try{this.inactiveButtonClass=i,this.inputErrorClass=a,this.errorClass=l;for(var c=0,u=Array.from(document.querySelectorAll(n));c<u.length;c++){var s=u[c],d=Array.from(s.querySelectorAll(r));if(d.length>0){var p=s.querySelector(o);this.checkValidity(d)?this.disableButton(p):this.enableButton(p),this.setEventListeners(s,d,p)}}}catch(e){}}var t,n;return t=e,(n=[{key:"setEventListeners",value:function(e,t,n){var r=this;t.forEach((function(o){o.addEventListener("input",(function(){r.checkValidity(t)?r.disableButton(n):r.enableButton(n);var i=e.querySelector("#".concat(o.id,"-error"));o.validity.valid?(o.classList.remove(r.inputErrorClass),i.classList.remove(r.errorClass),i.textContent=""):(o.classList.add(r.inputErrorClass),i.classList.add(r.errorClass),o.validity.isCustom?i.textContent="Может содержать латинские буквы, кириллические буквы, знаки дефиса и пробелы.":o.validity.valueMissing?i.textContent="Вы пропустили это поле.":o.validity.tooShort?i.textContent="Минимальное количество символов: 2. Длина текста сейчас: ".concat(o.value.length," символ"):o.validity.typeMismatch?i.textContent="Введите адрес сайта.":i.textContent=o.validationMessage)}))}))}},{key:"disableButton",value:function(e){e.disabled=!0,e.classList.add(this.inactiveButtonClass)}},{key:"enableButton",value:function(e){e.disabled=!1,e.classList.remove(this.inactiveButtonClass)}},{key:"checkValidity",value:function(e){return e.some((function(e){if("text"===e.type){if(null===e.value.match(/^[A-Za-zА-Яа-яЁё\s-]+$/))return e.validity.isCustom=!0,!0;e.validity.isCustom=!1}return!e.validity.valid}))}}])&&u(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();var d=[{title:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{title:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{title:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{title:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{title:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{title:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"},{title:"Нургуш",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/khrebet-nurgush.jpg"},{title:"Тулиновка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/tulinovka.jpg"},{title:"Остров Желтухина",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/zheltukhin-island.jpg"},{title:"Владивосток",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/vladivostok.jpg"}];function p(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var m=document.querySelector(".profile__edit-button"),v=document.querySelector(".profile__add-button"),f=document.querySelector(".elements"),y=(document.querySelectorAll(".popup__button-close"),document.querySelectorAll(".popup")),h=document.querySelector("#editPopup"),b=document.querySelector("#avatarPopup"),g=document.querySelector("#newPlacePopup"),S=document.querySelector(".profile__title"),_=document.querySelector(".profile__avatar"),k=document.querySelector(".profile__subtitle"),C=document.querySelector("#editAvatarForm").querySelector('input[name="avatar"]'),q=document.querySelector("#editForm"),x=q.querySelector('input[name="username"]'),w=q.querySelector('input[name="job"]'),E=document.querySelector(".profile__title"),L=document.querySelector(".profile__subtitle"),j=document.querySelector("#newPlaceForm"),B=j.querySelector('input[name="name"]'),A=j.querySelector('input[name="link"]');y.forEach((function(t){t.addEventListener("mousedown",(function(n){n.target.classList.contains("popup_opened")&&e(t),n.target.classList.contains("popup__button-close")&&e(t)}))})),m.addEventListener("click",(function(){console.log("{click.edit.button}"),x.value=0===x.value.length?E.textContent:x.value,w.value=0===w.value.length?L.textContent:w.value,n(h)})),v.addEventListener("click",(function(){console.log("{click.add.button}"),n(g)})),_.addEventListener("click",(function(){n(b)}));var P=function(e,t,n){return new l(e,t,n).createCard()};!function(){var e,t=function(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,t){if(e){if("string"==typeof e)return p(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?p(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0,o=function(){};return{s:o,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,a=!0,l=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return a=e.done,e},e:function(e){l=!0,i=e},f:function(){try{a||null==n.return||n.return()}finally{if(l)throw i}}}}(d);try{for(t.s();!(e=t.n()).done;){var n=e.value,r=P(n.link,n.title,".card__template");console.log("{adding.initial.cards{".concat(n.link,", ").concat(n.name,"}")),f.prepend(r)}}catch(e){t.e(e)}finally{t.f()}S.textContent="Жак Ив Кусто",k.textContent="Исследователь океана"}(),q.addEventListener("submit",(function(t){console.log("{submit.edit.form}"),t.preventDefault(),x.textContent=x.value,w.textContent=w.value,S.innerText=x.value,k.innerText=w.value,e(h)})),j.addEventListener("submit",(function(t){console.log("{submit.newPlace.form}"),t.preventDefault();var n=P(A.value,B.value,".card__template");A.value="",B.value="",f.prepend(n),e(g)})),b.addEventListener("submit",(function(t){console.log("{submit.updateAvatar.form}"),t.preventDefault(),_.style.backgroundImage="url(".concat(C.value,")"),e(b)})),new s({formSelector:".form",inputSelector:".form__input",submitButtonSelector:".popup__button-submit",inactiveButtonClass:"popup__button-submit_disabled",inputErrorClass:"popup__item_error",errorClass:"popup__input-error_active"})})();