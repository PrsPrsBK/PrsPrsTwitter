let IS_AUTO_UPDATE = true;
let INTERVAL_ID;
const CHECK_INTERVAL = 15000;

if(typeof browser === 'undefined') {
  window.browser = window.chrome;
}

const pptw = {

  adjustScrollPos : () => {
    //#page-container > div.ProfileCanopy.ProfileCanopy--withNav.ProfileCanopy--large.js-variableHeightTopBar > div > div.ProfileCanopy-header.u-bgUserColor
    console.log('do');
    const header = document.querySelector('#page-container > div.ProfileCanopy.ProfileCanopy--withNav.ProfileCanopy--large.js-variableHeightTopBar > div > div.ProfileCanopy-header.u-bgUserColor');
    header.style.height = '280px';
    const selectedItem = document.getElementsByClassName('selected-stream-item');
    selectedItem[0].scrollIntoView();
  },
  
  clickUpdateButton : () => {
    const wk_elm = document.getElementsByClassName('new-tweets-bar');
    if(wk_elm && wk_elm.length > 0) {
      wk_elm[0].click();
    }
  },
  
  handleKeydown : (evt) => {
    switch(evt.key) {
      case 'a':
        if(IS_AUTO_UPDATE === false) {
          INTERVAL_ID = setInterval(pptw.clickUpdateButton, CHECK_INTERVAL);
          IS_AUTO_UPDATE = true;
          pptw.updatePageAction();
        }
        break;
      case 'b':
        pptw.preventKeydown(evt);
        break;
      case 'k':
        pptw.adjustScrollPos();
        break;
      case 'q':
        if(IS_AUTO_UPDATE) {
          clearInterval(INTERVAL_ID);
          IS_AUTO_UPDATE = false;
          pptw.updatePageAction();
        }
        break;
      case 'u':
        pptw.preventKeydown(evt);
        break;
    }
  },
  
  preventKeydown : (evt) => {
    if(evt.target.isContentEditable
      || evt.target.nodeName.toUpperCase() === 'INPUT'
      || evt.target.nodeName.toUpperCase() === 'TEXTAREA') {
      return;
    }
    evt.preventDefault();
  },

  updatePageAction : () => {
    browser.runtime.sendMessage({task:'setIcon', icon: IS_AUTO_UPDATE});
  },

};

const start = () => {
  console.debug(window.location.href);
  pptw.updatePageAction();
  document.addEventListener('keydown', pptw.handleKeydown);
  INTERVAL_ID = setInterval(pptw.clickUpdateButton, CHECK_INTERVAL);
};

start();

// vim:expandtab ff=dos fenc=utf-8 sw=2
