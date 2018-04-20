
/*global browser:true*/

let IS_AUTO_UPDATE = true;
let INTERVAL_ID;
const CHECK_INTERVAL = 15000;

if(typeof browser === 'undefined') {
  window.browser = window.chrome;
}

const updatePageAction = function() {
  browser.runtime.sendMessage({task:'setIcon', icon: IS_AUTO_UPDATE});
};

/*
clickUpdateButton():
* click update button.
*/
const clickUpdateButton = function() {
  const wk_elm = document.getElementsByClassName('new-tweets-bar');
  if(wk_elm && wk_elm.length > 0) {
    wk_elm[0].click();
  }
};

const preventKeydown = function(evt) {
  if(evt.target.isContentEditable
    || evt.target.nodeName.toUpperCase() === 'INPUT'
    || evt.target.nodeName.toUpperCase() === 'TEXTAREA') {
    return;
  }
  evt.preventDefault();
};

const handleKeydown = function(evt) {
  switch(evt.key) {
    case 'a':
      if(IS_AUTO_UPDATE === false) {
        INTERVAL_ID = setInterval(clickUpdateButton, CHECK_INTERVAL);
        IS_AUTO_UPDATE = true;
        updatePageAction();
      }
      break;
    case 'b':
      preventKeydown(evt);
      break;
    case 'q':
      if(IS_AUTO_UPDATE) {
        clearInterval(INTERVAL_ID);
        IS_AUTO_UPDATE = false;
        updatePageAction();
      }
      break;
    case 'u':
      preventKeydown(evt);
      break;
  }
};

const start = function() {
  console.debug(window.location.href);
  updatePageAction();
  //DOMContentLoaded and load Event can be listend on capturing phase. not bubbling phase.
  document.addEventListener('keydown', handleKeydown);
  INTERVAL_ID = setInterval(clickUpdateButton, CHECK_INTERVAL);
};

start();

