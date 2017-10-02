var IS_AUTO_UPDATE = true;
var INTERVAL_ID;
var CHECK_INTERVAL = 15000;
var TO_CLIPBOARD = '';

/*
clickUpdateButton():
* click update button.
*/
function clickUpdateButton() {
  let wk_elm;
  wk_elm = document.getElementsByClassName('new-tweets-bar');
  if(wk_elm && wk_elm.length > 0) {
    wk_elm[0].click();
  }
}

function copyTweet() {
  let wk_elm;
  wk_elm = document.getElementById('permalink-overlay-dialog');
  if(wk_elm) {
    wk_elm = wk_elm.getElementsByClassName('permalink-tweet-container');
    if(wk_elm && wk_elm.length > 0) {
      copyOverlay(wk_elm[0]);
    }
  }
}

function copyOverlay(tgt_elm) {
  let result = {};
  let wk_elm;
  wk_elm = tgt_elm.getElementsByClassName('tweet-timestamp');
  if(wk_elm && wk_elm.length > 0) {
    result.href = wk_elm[0].href;
    result.time = parseTweetTime(wk_elm[0].title.trim());
  }
  wk_elm = tgt_elm.getElementsByClassName('fullname');
  if(wk_elm && wk_elm.length > 0) {
    result.fullname = wk_elm[0].textContent.trim();
  }
  wk_elm = tgt_elm.getElementsByClassName('tweet-text');
  if(wk_elm && wk_elm.length > 0) {
    result.text = wk_elm[0].textContent.trim();
  }
  //console.log(result);
  let result_text = '<dt><a href="' +
    result.href + '">' +
    result.time['year'] + '-' +
    result.time['month'] + '-' +
    result.time['day'] + ' ' +
    result.time['hour'] + ':' +
    result.time['minute'] + ' ' +
    result.fullname + ':</a>' +
    result.text + '</dt>';
  TO_CLIPBOARD = result_text;
  //console.log(TO_CLIPBOARD);
  //console.log(document.execCommand('copy', false, result_text));
}

function parseTweetTime(jp_str) {
  //1:30 - 2017年9月30日
  //data-time="1506188526" data-time-ms="1506188526000"
  let wk = /([0-9]+):([0-9]+)[^0-9]+([0-9]+)年([0-9]+)月([0-9]+)日/.exec(jp_str);
  let result = {};
  result.year = wk[3];
  result.month = ('00' + wk[4]).slice(-2);
  result.day = ('00' + wk[5]).slice(-2);
  result.hour = ('00' + wk[1]).slice(-2);
  result.minute = ('00' + wk[2]).slice(-2);
  return result;
}

function onCopy(ev) {
  console.log('onCopy start');
  console.log(TO_CLIPBOARD);
  if(window.getSelection().toString() === '') {
    copyTweet();
    console.log(TO_CLIPBOARD);
    if(TO_CLIPBOARD !== '') {
      ev.preventDefault();
      let transfer = ev.clipboardData;
      console.log('onCopy transfer');
      transfer.setData('text/plain', TO_CLIPBOARD);
      TO_CLIPBOARD = '';
    }
  }
}

function handleKeydown(ev) {
  var code = ev.keyCode;
  switch(code) {
    case 65: //0x41 A
      console.log(code + ':' + ev.ctrlKey);
      if(IS_AUTO_UPDATE === false) {
        INTERVAL_ID = setInterval(clickUpdateButton, CHECK_INTERVAL);
        browser.runtime.sendMessage({'badge':'on'});
        IS_AUTO_UPDATE = true;
      }
      break;
    case 67: //0x43 C
      console.log(code + ':' + ev.ctrlKey);
      if(ev.ctrlKey) {
        console.log(window.getSelection().toString());
        //if(window.getSelection().toString() === '') {
        //  copyTweet();
        //}
      }
      break;
    case 81: //0x51 Q
      console.log(code + ':' + ev.ctrlKey);
      if(IS_AUTO_UPDATE) {
        clearInterval(INTERVAL_ID);
        browser.runtime.sendMessage({'badge':'off'});
        IS_AUTO_UPDATE = false;
      }
      break;
  }
};

function start() {
  document.addEventListener('keydown', handleKeydown);
  document.addEventListener('copy', onCopy);
  INTERVAL_ID = setInterval(clickUpdateButton, CHECK_INTERVAL);
};

start();

