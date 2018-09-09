if(typeof browser === 'undefined') {
  window.browser = window.chrome;
}

const popup = {
  showDebugMessage : (message) => {
    const tweetListRoot = document.getElementById('tweet_list');
    const wkTextNode = document.createTextNode(message);
    const parElm = document.createElement('p');
    parElm.appendChild(wkTextNode);
    tweetListRoot.appendChild(parElm);
  },

  initPopup : () => {
    const tweetListRoot = document.getElementById('tweet_list');
    while(tweetListRoot.firstChild) {
      tweetListRoot.removeChild(tweetListRoot.firstChild);
    }
    browser.tabs.query({currentWindow: true, active: true}, (tabs) => {
      popup.showDebugMessage('can call query');
      for(const tab of tabs) {
        popup.showDebugMessage(`tab: ${tab.id}`);
        browser.tabs.sendMessage(tab.id, {
          task: 'tweetList',
          from: 'popup',
        });
      }
    });
  },

  loadTweets : (tweetList) => {
    const tweetListRoot = document.getElementById('tweet_list');
    while(tweetListRoot.firstChild) {
      tweetListRoot.removeChild(tweetListRoot.firstChild);
    }
    let divElm, twButton, wkTextNode;
    tweetList.forEach((elm) =>{
      wkTextNode = document.createTextNode(elm);
      twButton = document.createElement('button');
      twButton.classList.add('each_tweet');
      twButton.appendChild(wkTextNode);
      divElm = document.createElement('div');
      divElm.appendChild(twButton);
      tweetListRoot.appendChild(divElm);
    });
  },

};

document.addEventListener('DOMContentLoaded', popup.initPopup);
browser.runtime.onMessage.addListener((message, sender) => {
  console.log(`--- message ${JSON.stringify(message)} sender ${JSON.stringify(sender)}`);
  if(message.task === 'tweetList' && message.replyTo === 'popup') {
    popup.loadTweets(message.tweetList);
  }
});
document.addEventListener('click', (e) => {
  if(e.target.id === 'go_addon_page') {
    browser.runtime.openOptionsPage();
  }
  window.close();
});

// vim:expandtab ff=dos fenc=utf-8 sw=2
