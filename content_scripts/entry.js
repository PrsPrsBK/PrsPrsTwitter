
if(typeof browser === 'undefined') {
  window.browser = window.chrome;
}

let INTERVAL_ID;
// the same members as storage.local's
let SETTINGS = {
  update_check : true,
  update_check_interval : 14000,
  mute_by_key : false,
  block_by_key : false,
};
const STORE_NAME = 'pptw_settings';

const pptw = {

  adjustScrollPos : () => {
    //#page-container > div.ProfileCanopy.ProfileCanopy--withNav.ProfileCanopy--large.js-variableHeightTopBar > div > div.ProfileCanopy-header.u-bgUserColor
    console.log('do');
    const header = document.querySelector('#page-container > div.ProfileCanopy.ProfileCanopy--withNav.ProfileCanopy--large.js-variableHeightTopBar > div > div.ProfileCanopy-header.u-bgUserColor');
    header.style.height = '280px';
    const selectedItem = document.getElementsByClassName('selected-stream-item');
    //selectedItem[0].scrollIntoView();
  },
  
  clickUpdateButton : () => {
    const wk_elm = document.getElementsByClassName('new-tweets-bar');
    if(wk_elm && wk_elm.length > 0) {
      wk_elm[0].click();
    }
  },

  getTweetList : () => {
    const root = document.getElementById('stream-items-id');
    if(!root) {
      return;
    }
    const tweetContainerList = root.getElementsByClassName('js-stream-item');
    if(tweetContainerList && tweetContainerList.length > 0) {
      console.log(tweetContainerList.length);
    }
  },

  handleKeydown : (evt) => {
    if(evt.key === 'k') {
      console.log(`key ${evt.key}`);
      pptw.adjustScrollPos();
    }
    else if(SETTINGS.block_by_key === false && evt.key === 'b') {
      console.log(`block ${SETTINGS.block_by_key}`);
      pptw.preventKeydown(evt);
    }
    else if(SETTINGS.mute_by_key === false && evt.key === 'u') {
      console.log(`mute ${SETTINGS.mute_by_key}`);
      pptw.preventKeydown(evt);
    }
    else if(SETTINGS.update_check === false && evt.key === 'a') {
      INTERVAL_ID = setInterval(pptw.clickUpdateButton, SETTINGS.update_check_interval);
      SETTINGS.update_check = true;
      pptw.updatePageAction();
    }
    else if(SETTINGS.update_check && evt.key === 'q') {
      clearInterval(INTERVAL_ID);
      SETTINGS.update_check = false;
      pptw.updatePageAction();
    }
    else if(evt.key === 'l') {
      console.log(`key ${evt.key}`);
      pptw.getTweetList();
    }
  },

  preventKeydown : (evt) => {
    if(evt.target.isContentEditable
      || evt.target.nodeName.toUpperCase() === 'INPUT'
      || evt.target.nodeName.toUpperCase() === 'TEXTAREA') {
      return;
    }
    console.log('preventkeydown');
    evt.preventDefault();
  },

  updatePageAction : () => {
    browser.runtime.sendMessage({ task:'setIcon', icon: SETTINGS.update_check, });
  },

};

const start = () => {
  browser.storage.local.get(STORE_NAME, (store_obj) => {
    const result = store_obj[STORE_NAME];
    if(result) {
      SETTINGS = result;
    }
    console.log(`${JSON.stringify(SETTINGS, null, 2)}`);
    pptw.updatePageAction();
    document.addEventListener('keydown', pptw.handleKeydown);
    if(SETTINGS.update_check) {
      INTERVAL_ID = setInterval(pptw.clickUpdateButton, SETTINGS.update_check_interval);
    }
  });
};

start();

// vim:expandtab ff=dos fenc=utf-8 sw=2
