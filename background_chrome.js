/**
 * Google Chrome's "default_popup" in manifest.json is truely meaningless suck,
 * and requires such a ugly work around sucks.
 */
browser.tabs.onUpdated.addListener((tabId, _chgInfo, tab) => {
  if(tab.url.startsWith('https://twitter.com')) {
    browser.pageAction.show(tabId);
  }
});

