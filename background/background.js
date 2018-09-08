if(typeof browser === 'undefined') {
  window.browser = window.chrome;
}

browser.runtime.onMessage.addListener((message, sender) => {
  if(message.task === 'setIcon') {
    browser.pageAction.setIcon({
      tabId: sender.tab.id,
      path: message.icon ? 'icons/icon-on.png' : 'icons/icon-off.png',
    });
    browser.pageAction.show(sender.tab.id);
  }
});

// vim:expandtab ff=dos fenc=utf-8 sw=2
