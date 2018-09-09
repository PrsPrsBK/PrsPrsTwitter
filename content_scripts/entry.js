
if(typeof browser === 'undefined') {
  window.browser = window.chrome;
}

let INTERVAL_ID;
// the same members as storage.local's
const SETTINGS = {
  update_check : true,
  update_check_interval : 14000,
  mute_by_key : false,
  block_by_key : false,
};
const STORE_NAME = 'pptw_settings';

const pptw = {

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
    const tweetTextArr = [];
    const tweetContainerList = root.querySelectorAll('.js-stream-item');
    if(tweetContainerList && tweetContainerList.length > 0) {
      tweetContainerList.forEach((elm) => {
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
      console.log(`block ${SETTINGS.block_by_key}`);
      pptw.preventKeydown(evt);
    }
    else if(SETTINGS.mute_by_key === false && evt.key === 'u') {
      console.log(`mute ${SETTINGS.mute_by_key}`);
      pptw.preventKeydown(evt);
    }
    // else if(evt.key === 'a') {
    //   pptw.setUpdateCheck(true);
    // }
    // else if(evt.key === 'q') {
    //   pptw.setUpdateCheck(false);
    // }
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

  setUpdateCheck :(goEnable) => {
    if(goEnable && SETTINGS.update_check === false) {
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
      Object.keys(newSettings).forEach((key) => {
        if(SETTINGS.hasOwnProperty(key)) {
          SETTINGS[key] = newSettings[key];
        }
      });
      console.log(`${JSON.stringify(SETTINGS, null, 2)}`);
    }
    pptw.setUpdateCheck(SETTINGS.update_check);
    pptw.updatePageAction();
  },

  updatePageAction : () => {
    browser.runtime.sendMessage({ task:'setIcon', icon: SETTINGS.update_check, });
  },

};

const start = () => {
  browser.storage.local.get(STORE_NAME, (store_obj) => {
    const result = store_obj[STORE_NAME];
    pptw.updateSettings(result);
    document.addEventListener('keydown', pptw.handleKeydown);
  });
};

browser.runtime.onMessage.addListener((message, sender) => {
  console.log(`message ${JSON.stringify(message)} sender ${JSON.stringify(sender)}`);
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
