
if(browser === null || browser === undefined) {
  var browser = chrome;
}

browser.runtime.onMessage.addListener((message, sender) => {
  console.log('at bs onMessage');
  console.log(sender.tab.id + ' is sender');
  if(message.pageAction === 'on') {
    browser.pageAction.setIcon({
      tabId: sender.tab.id,
      //path: 'icons/icon.svg'
      path: 'icons/icon-on.png'
    });
    browser.pageAction.show(sender.tab.id);
  }
  else if(message.pageAction === 'off') {
    browser.pageAction.setIcon({
      tabId: sender.tab.id,
      path: 'icons/icon-off.png'
    });
    browser.pageAction.show(sender.tab.id);
  }
});

