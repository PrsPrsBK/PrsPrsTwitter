
browser.runtime.onMessage.addListener((message, sender) => {
  console.log('at bs onMessage');
  console.log(sender.tab.id + ' is sender');
  if(message.pageAction === 'on') {
    browser.pageAction.setIcon({
      tabId: sender.tab.id,
      path: 'icons/icon.svg'
    });
    browser.pageAction.show(sender.tab.id);
  }
  else if(message.pageAction === 'off') {
    browser.pageAction.setIcon({
      tabId: sender.tab.id,
      path: 'icons/icon-48.png'
    });
    browser.pageAction.show(sender.tab.id);
  }
});

