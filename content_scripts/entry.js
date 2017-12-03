
/*global browser:true*/

let IS_AUTO_UPDATE = true;
let INTERVAL_ID;
const CHECK_INTERVAL = 15000;

if(typeof browser === 'undefined') {
  window.browser = window.chrome;
}

const updatePageAction = function() {
  browser.runtime.sendMessage({task:'setIcon', icon: IS_AUTO_UPDATE});
};

/*
clickUpdateButton():
* click update button.
*/
const clickUpdateButton = function() {
  const wk_elm = document.getElementsByClassName('new-tweets-bar');
  if(wk_elm && wk_elm.length > 0) {
    wk_elm[0].click();
  }
};

/**
 * make and return Object contains each datetime infos as string, made from mill seconds string.
 * @param {string} milsec_txt - string
 * @returns {?result} - Object
 */
const parseTweetTime = function(milsec_txt) {
  const wk = new Date(parseInt(milsec_txt));
  const result = {};
  result.year = wk.getFullYear();
  result.month = ('00' + (wk.getMonth() + 1)).slice(-2);
  result.day = ('00' + wk.getDate()).slice(-2);
  result.hour = ('00' + wk.getHours()).slice(-2);
  result.minute = ('00' + wk.getMinutes()).slice(-2);
  return result;
};

const getQuoteTweetText = function(tgt_elm) {
  let ret = '';
  let wk_elm;
  wk_elm = tgt_elm.getElementsByClassName('QuoteTweet-link');
  if(wk_elm && wk_elm.length > 0) {
    console.log('scrape1');
    let wk = ` <div class="quotedTweet"><a href="${wk_elm[0].href}">`;
    wk_elm = tgt_elm.getElementsByClassName('QuoteTweet-fullname');
    if(wk_elm && wk_elm.length > 0) {
      wk += wk_elm[0].textContent.trim() + ':</a> ';
    }
    wk_elm = tgt_elm.getElementsByClassName('QuoteTweet-text');
    if(wk_elm && wk_elm.length > 0) {
      wk += wk_elm[0].textContent.trim() + '</div>';
    }
    ret += wk;
  }
  return ret;
};

const copyFromOverlay= function(tgt_elm) {
  const result = {};
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
    const quoteTweetText = getQuoteTweetText(tgt_elm);
    if(quoteTweetText !== '') {
      console.log('add quote');
      //result.text = result.text.replace(/(.+)(https:\/\/twitter\.com\/ … )$/, '$1');
      result.text = result.text.replace(/(.+)(https:\/\/twitter\.com\/.+)$/, '$1');
      result.text += quoteTweetText;
    }
    //ignore CR only
    result.text = result.text.replace(/\r?\n/g, ' ');
  }
  //console.log(result);
  const result_text = '<dt><a href="' +
    result.href + '">' +
    result.time['year'] + '-' +
    result.time['month'] + '-' +
    result.time['day'] + ' ' +
    result.time['hour'] + ':' +
    result.time['minute'] + ' ' +
    result.fullname + ':</a> ' +
    result.text + '</dt>';
  return result_text;
};

const setTextForCopy = function() {
  console.log('setTextForCopy');
  let ret = '';
  let wk_elm;
  wk_elm = document.getElementById('permalink-overlay');
  console.log('setTextForCopy1');
  if(wk_elm &&
    (wk_elm.style === undefined
      || (wk_elm.style !== undefined && wk_elm.style.display === undefined)
      || wk_elm.style.display === 'block'
      || wk_elm.style.opacity === 1)) {
    console.log('go permalink0');
    wk_elm = wk_elm.getElementsByClassName('permalink-tweet-container');
    if(wk_elm && wk_elm.length > 0) {
      console.log('go permalink1');
      ret = copyFromOverlay(wk_elm[0]);
    }
    return ret;
  }
  console.log('setTextForCopy2');
  wk_elm = document.getElementsByClassName('selected-stream-item');
  console.log('setTextForCopy3');
  if(wk_elm && wk_elm.length > 0) {
    console.log('go stream-item');
    ret = copyFromOverlay(wk_elm[0]);
    return ret;
  }
  return ret;
};

const onCopy = function(ev) {
  console.log('onCopy start');
  if(window.getSelection().toString() === '') {
    const outputText = setTextForCopy();
    console.log(outputText);
    if(outputText !== '') {
      ev.preventDefault();
      const transfer = ev.clipboardData;
      console.log('onCopy transfer');
      transfer.setData('text/plain', outputText);
    }
  }
};

const preventKeydown = function(evt) {
  if(evt.target.isContentEditable
    || evt.target.nodeName.toUpperCase() === 'INPUT'
    || evt.target.nodeName.toUpperCase() === 'TEXTAREA') {
    return;
  }
  evt.preventDefault();
};

const handleKeydown = function(evt) {
  switch(evt.key) {
    case 'a':
      if(IS_AUTO_UPDATE === false) {
        INTERVAL_ID = setInterval(clickUpdateButton, CHECK_INTERVAL);
        IS_AUTO_UPDATE = true;
        updatePageAction();
      }
      break;
    case 'b':
      preventKeydown(evt);
      break;
    case 'q':
      if(IS_AUTO_UPDATE) {
        clearInterval(INTERVAL_ID);
        IS_AUTO_UPDATE = false;
        updatePageAction();
      }
      break;
    case 'u':
      preventKeydown(evt);
      break;
  }
};

const start = function() {
  console.debug(window.location.href);
  updatePageAction();
  //DOMContentLoaded and load Event can be listend on capturing phase. not bubbling phase.
  document.addEventListener('keydown', handleKeydown);
  document.addEventListener('copy', onCopy);
  INTERVAL_ID = setInterval(clickUpdateButton, CHECK_INTERVAL);
};

start();

