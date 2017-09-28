console.log('background');

browser.browserAction.onClicked.addListener((tab) => {
  console.log('do nothing at '+ tab.url);
});

