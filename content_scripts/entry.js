let INTERVAL_ID = 'not_touched';
// the same members as storage.local's
const SETTINGS = {
  update_check : true,
  update_check_interval : 14000,
  mute_by_key : false,
  block_by_key : false,
};
const STORE_NAME = 'pptw_settings';

const pptw = {

  /**
   * click 'update' button, unless overlay appear in the topmost.
   */
  clickUpdateButton : () => {
    let wk_elm = document.getElementById('permalink-overlay');
    let goClick = true;
    if(wk_elm) {
      const computedStyle = window.getComputedStyle(wk_elm);
      if(computedStyle === undefined
        || computedStyle.display === undefined
        || computedStyle.display === 'block'
        || computedStyle.opacity === 1) {
        goClick = false;
      }
    }
    if(goClick) {
      wk_elm = document.getElementsByClassName('new-tweets-bar');
      if(wk_elm && wk_elm.length > 0) {
        wk_elm[0].click();
      }
    }
  },

  getTweetList : () => {
    const root = document.getElementById('stream-items-id');
    if(!root) {
      return;
    }
    const tweetTextArr = [];
    const tweetContainerList = root.querySelectorAll('.js-stream-item');
    if(tweetContainerList && tweetContainerList.length > 0) {
      tweetContainerList.forEach(elm => {
        const textContainer = elm.querySelector('.tweet-text');
        if(textContainer) {
          tweetTextArr.push(textContainer.textContent.trim());
        }
      });
    }
    return tweetTextArr;
  },

  handleKeydown : (evt) => {
    if(SETTINGS.block_by_key === false && evt.key === 'b') {
      pptw.preventKeydown(evt);
    }
    else if(SETTINGS.mute_by_key === false && evt.key === 'u') {
      pptw.preventKeydown(evt);
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

  scrollToTweet : (ord) => {
    const tweetContainerList = document.querySelectorAll('#stream-items-id .js-stream-item');
    if(tweetContainerList && tweetContainerList.length > 0 && ord < tweetContainerList.length) {
      tweetContainerList[ord].scrollIntoView();
    }
  },

  setUpdateCheck : (goEnable) => {
    if(INTERVAL_ID === 'not_touched') {
      if(goEnable) {
        INTERVAL_ID = setInterval(pptw.clickUpdateButton, SETTINGS.update_check_interval);
      }
      pptw.updatePageAction();
    }
    else if(goEnable && SETTINGS.update_check === false) {
      INTERVAL_ID = setInterval(pptw.clickUpdateButton, SETTINGS.update_check_interval);
      SETTINGS.update_check = true;
      pptw.updatePageAction();
    }
    else if(goEnable === false && SETTINGS.update_check) {
      clearInterval(INTERVAL_ID);
      SETTINGS.update_check = false;
      pptw.updatePageAction();
    }
  },

  updateSettings : (newSettings) => {
    if(newSettings) {
      Object.keys(newSettings).forEach(key => {
        if(SETTINGS.hasOwnProperty(key)) {
          SETTINGS[key] = newSettings[key];
        }
      });
      // console.log(`${JSON.stringify(SETTINGS, null, 2)}`);
    }
    pptw.setUpdateCheck(SETTINGS.update_check);
  },

  updatePageAction : () => {
    browser.runtime.sendMessage({ task:'setIcon', icon: SETTINGS.update_check, });
  },

};

const start = () => {
  browser.storage.local.get(STORE_NAME).then(store_obj => {
    const result = store_obj[STORE_NAME];
    pptw.updateSettings(result);
    document.addEventListener('keydown', pptw.handleKeydown);
  }).catch(err => {
    console.log(`Error: start: ${err}`);
  });
};

browser.runtime.onMessage.addListener((message, _sender) => {
  if(message.task === 'tweetList' && message.from === 'popup') {
    browser.runtime.sendMessage({
      task: message.task,
      replyTo: message.from,
      tweetList: pptw.getTweetList(),
    });
  }
  else if(message.task === 'scrollToTweet' && message.from === 'popup') {
    pptw.scrollToTweet(message.ord);
  }
  else if(message.task === 'toggleUpdateCheck' && message.from === 'popup') {
    pptw.setUpdateCheck(!SETTINGS.update_check);
  }
});

start();

// vim:expandtab ff=dos fenc=utf-8 sw=2
