if(typeof browser === 'undefined') {
  window.browser = window.chrome;
}

browser.runtime.onMessage.addListener((message, sender) => {
  if(message.task === 'setIcon') {
    browser.pageAction.setIcon({
      tabId: sender.tab.id,
      path: message.icon ? 'icons/icon-run-48.png' : 'icons/icon-on.png',
    });
  }
});

// vim:expandtab ff=dos fenc=utf-8 sw=2
