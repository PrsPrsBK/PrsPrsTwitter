if(typeof browser === 'undefined') {
  window.browser = window.chrome;
}

const popup = {
  showDebugMessage : (message) => {
    const tweetList = document.getElementById('tweet_list');
    const wkTextNode = document.createTextNode(message);
    const parElm = document.createElement('p');
    parElm.appendChild(wkTextNode);
    tweetList.appendChild(parElm);
  },

  loadTweets : () => {
    const tweetList = document.getElementById('tweet_list');
    while(tweetList.firstChild) {
      tweetList.removeChild(tweetList.firstChild);
    }
    browser.tabs.query({currentWindow: true, active: true}, (tabs) => {
      popup.showDebugMessage('can call query');
      for(const tab of tabs) {
        popup.showDebugMessage(`tab: ${tab.id}`);
      }
    });
  },
};

document.addEventListener('DOMContentLoaded', popup.loadTweets);

document.addEventListener('click', (e) => {
  if(e.target.id === 'go_addon_page') {
    browser.runtime.openOptionsPage();
  }
  window.close();
});

// vim:expandtab ff=dos fenc=utf-8 sw=2
