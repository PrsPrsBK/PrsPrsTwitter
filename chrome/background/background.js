if(typeof browser === 'undefined') {
  window.browser = window.chrome;
}

/**
 * Google Chrome's "default_popup" in manifest.json is truely meaningless suck,
 * and requires such a ugly work around sucks.
 */
browser.tabs.onUpdated.addListener((tabId, _chgInfo, tab) => {
  if(tab.url.startsWith('https://twitter.com')) {
    browser.pageAction.show(tabId);
  }
});

browser.runtime.onMessage.addListener((message, sender) => {
  if(message.task === 'setIcon') {
    browser.pageAction.setIcon({
      tabId: sender.tab.id,
      path: message.icon ? 'icons/icon-run-48.png' : 'icons/icon-on.png',
    });
  }
});

// vim:expandtab ff=dos fenc=utf-8 sw=2
