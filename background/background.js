const BADGETXT_ON = 'on';
const BADGETXT_OFF = 'off';
console.log('background');
browser.browserAction.setBadgeText({'text': BADGETXT_ON});
browser.browserAction.setBadgeBackgroundColor({'color':'#00AAAA'});

browser.browserAction.onClicked.addListener((tab) => {
  console.log('do nothing at '+ tab.url);
});

browser.runtime.onMessage.addListener((message, sender) => {
  console.log('at bs onMessage');
  if(message.console !== undefined) {
    console.log(message.console);
  }
  if(message.badge === 'on') {
    browser.browserAction.setBadgeText({'text': BADGETXT_ON});
  }
  else if(message.badge === 'off') {
    browser.browserAction.setBadgeText({'text': BADGETXT_OFF});
  }
  else if(message.pageAction === 'on') {
    console.log(sender.tab.id + ' is sender');
    browser.pageAction.show(sender.tab.id);
  }
});

