if(typeof browser === 'undefined') {
  window.browser = window.chrome;
}

browser.runtime.onMessage.addListener((message, sender) => {
  if(message.task === 'setIcon') {
    if(message.icon) {
      browser.pageAction.setIcon({
        tabId: sender.tab.id,
        path: 'icons/icon-on.png'
      });
      browser.pageAction.show(sender.tab.id);
    }
    else {
      browser.pageAction.setIcon({
        tabId: sender.tab.id,
        path: 'icons/icon-off.png'
      });
      browser.pageAction.show(sender.tab.id);
    }
  }
});

// vim:expandtab ff=dos fenc=utf-8 sw=2
