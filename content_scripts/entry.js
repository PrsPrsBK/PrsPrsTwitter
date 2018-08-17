let IS_AUTO_UPDATE = true;
let INTERVAL_ID;
const CHECK_INTERVAL = 15000;

if(typeof browser === 'undefined') {
  window.browser = window.chrome;
}

const updatePageAction = () => {
  browser.runtime.sendMessage({task:'setIcon', icon: IS_AUTO_UPDATE});
};

/*
clickUpdateButton():
* click update button.
*/
const clickUpdateButton = () => {
  const wk_elm = document.getElementsByClassName('new-tweets-bar');
  if(wk_elm && wk_elm.length > 0) {
    wk_elm[0].click();
  }
};

const preventKeydown = (evt) => {
  if(evt.target.isContentEditable
    || evt.target.nodeName.toUpperCase() === 'INPUT'
    || evt.target.nodeName.toUpperCase() === 'TEXTAREA') {
    return;
  }
  evt.preventDefault();
};

const adjustScrollPos = () => {
  //#page-container > div.ProfileCanopy.ProfileCanopy--withNav.ProfileCanopy--large.js-variableHeightTopBar > div > div.ProfileCanopy-header.u-bgUserColor
  console.log('do');
  const header = document.querySelector('#page-container > div.ProfileCanopy.ProfileCanopy--withNav.ProfileCanopy--large.js-variableHeightTopBar > div > div.ProfileCanopy-header.u-bgUserColor');
  header.style.height = '280px';
  const selectedItem = document.getElementsByClassName('selected-stream-item');
  selectedItem[0].scrollIntoView();
};

const handleKeydown = (evt) => {
  switch(evt.key) {
    case 'a':
      if(IS_AUTO_UPDATE === false) {
        INTERVAL_ID = setInterval(clickUpdateButton, CHECK_INTERVAL);
        IS_AUTO_UPDATE = true;
        updatePageAction();
      }
      break;
    //case 'b':
    //  preventKeydown(evt);
    //  break;
    case 'k':
      adjustScrollPos();
      break;
    case 'q':
      if(IS_AUTO_UPDATE) {
        clearInterval(INTERVAL_ID);
        IS_AUTO_UPDATE = false;
        updatePageAction();
      }
      break;
    //case 'u':
    //  preventKeydown(evt);
    //  break;
  }
};

const start = () => {
  console.debug(window.location.href);
  updatePageAction();
  //DOMContentLoaded and load Event can be listend on capturing phase. not bubbling phase.
  document.addEventListener('keydown', handleKeydown);
  INTERVAL_ID = setInterval(clickUpdateButton, CHECK_INTERVAL);
};

start();

