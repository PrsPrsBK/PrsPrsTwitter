# PrsPrsTwitter

* This add-on is utility for twitter, and now available on Firefox and Chrome.
For install, go to [PrsPrsTwitter – Add-ons for Firefox](https://addons.mozilla.org/en-US/firefox/addon/prsprstwitter/), 
or [Chrome Web Store](https://chrome.google.com/webstore/detail/prsprstwitter/gogodhhknklbgpppbjbcilokbonbjeeo).


## What it does

* Princess Princess Twitter. Do little thing. 
* Settings can enable/disable mute by 'u', or block by 'b'. 
* auto update check with interval. 
* Popup menu with head of each tweet list, and jump to 'near' for clicked one.

 	
Excuse me, I can not react to situation such that...

* twitter's web page changed it's design or behavior or so.
* twitter run alpha-beta test on your account.

Also I can not understand and not do anything with ...

* locale or region except Japanese
* not Windows


## Known Issue

* Sometimes icon in location bar is disabled. - fixed at Firefox 64.

I had issued on bugzilla.mozilla.org, and seeing how it goes.
[1493470 - pageAction icon goes hidden respond to a cross-site domain's movie inside iframe](https://bugzilla.mozilla.org/show_bug.cgi?id=1493470)

* I want to do `5 j` as on Vim.

That is impossible, at least by WebExtensions own.
twitter's javascript maybe checks whether each keyevent's `isTrusted` property.
So, if this addon dispatches keydown event for `j` key from content script, 
it results in `isTrusted` as `false` and a event is ignored by twitter's javascript,
and some post processes (to move forward selected tweet, or so) never be fired.
For `true`, I guess that we need to have browser to fire keyevent, 
but WebExtensions API does not have such an ability.

