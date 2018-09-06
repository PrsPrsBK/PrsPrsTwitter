if(typeof browser === 'undefined') {
  window.browser = window.chrome;
}

document.addEventListener('click', (e) => {
  if(e.target.id === 'go_addon_page') {
    browser.runtime.openOptionsPage();
  }
  window.close();
});

// vim:expandtab ff=dos fenc=utf-8 sw=2
