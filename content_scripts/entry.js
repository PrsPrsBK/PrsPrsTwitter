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

function setTextForCopy() {
  console.log('setTextForCopy');
  let wk_elm;
  wk_elm = document.getElementById('permalink-overlay');
  console.log('setTextForCopy1');
  if(wk_elm &&
    (wk_elm.style === undefined
      || (wk_elm.style !== undefined && wk_elm.style.display === undefined)
      || wk_elm.style.display === 'block')) {
    console.log('go permalink0');
    wk_elm = wk_elm.getElementsByClassName('permalink-tweet-container');
    if(wk_elm && wk_elm.length > 0) {
      console.log('go permalink1');
      copyFromOverlay(wk_elm[0]);
    }
    return;
  }
  console.log('setTextForCopy2');
  wk_elm = document.getElementsByClassName('selected-stream-item');
  console.log('setTextForCopy3');
  if(wk_elm && wk_elm.length > 0) {
    console.log('go stream-item');
    copyFromOverlay(wk_elm[0]);
    return;
  }
}

function getQuoteTweetText(tgt_elm) {
  let ret = '';
  let wk_elm;
  wk_elm = tgt_elm.getElementsByClassName('QuoteTweet-link');
  if(wk_elm && wk_elm.length > 0) {
    console.log('scrape1');
    let wk = ' <a href="' +
      wk_elm[0].href +
      '">';
    wk_elm = tgt_elm.getElementsByClassName('QuoteTweet-fullname');
    if(wk_elm && wk_elm.length > 0) {
      wk += wk_elm[0].textContent.trim() + ': ';
    }
    wk_elm = tgt_elm.getElementsByClassName('QuoteTweet-text');
    if(wk_elm && wk_elm.length > 0) {
      wk += wk_elm[0].textContent.trim() + '</a>';
    }
    ret += wk;
  }
  return ret;
}

function copyFromOverlay(tgt_elm) {
  let result = {};
  let wk_elm;
  wk_elm = tgt_elm.getElementsByClassName('tweet-timestamp');
  if(wk_elm && wk_elm.length > 0) {
    console.log(1);
    result.href = wk_elm[0].href.trim();
  }
  wk_elm = tgt_elm.getElementsByClassName('_timestamp');
  if(wk_elm && wk_elm.length > 0) {
    console.log(2);
    result.time = parseTweetTime(wk_elm[0].getAttribute('data-time-ms').trim());
  }
  wk_elm = tgt_elm.getElementsByClassName('fullname');
  if(wk_elm && wk_elm.length > 0) {
    console.log(3);
    result.fullname = wk_elm[0].textContent.trim();
  }
  wk_elm = tgt_elm.getElementsByClassName('tweet-text');
  if(wk_elm && wk_elm.length > 0) {
    console.log(4);
    result.text = wk_elm[0].textContent.trim();
    let quoteTweetText = getQuoteTweetText(tgt_elm);
    if(quoteTweetText !== '') {
      console.log('add quote');
      //result.text = result.text.replace(/(.+)(https:\/\/twitter\.com\/ … )$/, '$1');
      result.text = result.text.replace(/(.+)(https:\/\/twitter\.com\/.+)$/, '$1');
      result.text += quoteTweetText;
    }
  }
  //console.log(result);
  let result_text = '<dt><a href="' +
    result.href + '">' +
    result.time['year'] + '-' +
    result.time['month'] + '-' +
    result.time['day'] + ' ' +
    result.time['hour'] + ':' +
    result.time['minute'] + ' ' +
    result.fullname + ':</a> ' +
    result.text + '</dt>';
  TO_CLIPBOARD = result_text;
}

function parseTweetTime(milsec_txt) {
  let wk = new Date(parseInt(milsec_txt));
  let result = {};
  result.year = wk.getFullYear();
  result.month = ('00' + (wk.getMonth() + 1)).slice(-2);
  result.day = ('00' + wk.getDate()).slice(-2);
  result.hour = ('00' + wk.getHours()).slice(-2);
  result.minute = ('00' + wk.getMinutes()).slice(-2);
  return result;
}

function onCopy(ev) {
  console.log('onCopy start');
  console.log(TO_CLIPBOARD);
  if(window.getSelection().toString() === '') {
    setTextForCopy();
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
  console.log(window.location.href);
  document.addEventListener('keydown', handleKeydown);
  document.addEventListener('copy', onCopy);
  INTERVAL_ID = setInterval(clickUpdateButton, CHECK_INTERVAL);
};

start();

