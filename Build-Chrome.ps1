New-Item ./chrome -ItemType "directory" -Force | Out-Null
New-Item ./chrome/background -ItemType "directory" -Force | Out-Null
New-Item ./chrome/content_scripts -ItemType "directory" -Force | Out-Null
New-Item ./chrome/icons -ItemType "directory" -Force | Out-Null
New-Item ./chrome/lib -ItemType "directory" -Force | Out-Null
New-Item ./chrome/options_ui -ItemType "directory" -Force | Out-Null
New-Item ./chrome/popup -ItemType "directory" -Force | Out-Null

Remove-Item ./chrome/background/*
Remove-Item ./chrome/content_scripts/*
Remove-Item ./chrome/icons/*
Remove-Item ./chrome/lib/*
Remove-Item ./chrome/options_ui/*
Remove-Item ./chrome/popup/*

Copy-Item ./resources/background_chrome.js ./chrome/background/background.js
Get-Content ./background/background.js | Add-Content -Path ./chrome/background/background.js
Copy-Item ./content_scripts/entry.js ./chrome/content_scripts
Copy-Item ./icons/icon-on.png ./chrome/icons
Copy-Item ./icons/icon-run-48.png ./chrome/icons
Copy-Item ./node_modules/webextension-polyfill/dist/browser-polyfill.min.js ./chrome/lib
Copy-Item ./options_ui/options.css ./chrome/options_ui
Copy-Item ./options_ui/options.html ./chrome/options_ui
Copy-Item ./options_ui/options.js ./chrome/options_ui
Copy-Item ./popup/popup.css ./chrome/popup
Copy-Item ./popup/popup.html ./chrome/popup
Copy-Item ./popup/popup.js ./chrome/popup
Copy-Item LICENSE.txt ./chrome
Copy-Item README.md ./chrome
Copy-Item ./resources/web-ext-config_chrome.js ./chrome/web-ext-config.js

$manifest = Get-Content .\manifest.json | ConvertFrom-Json
<#
{
  "applications": {
    "gecko": {
      "strict_min_version": "64"
    }
  },
  "page_action": {
    "browser_style": true,
    "show_matches": [
      "https://twitter.com/*"
    ]
  },
}
#>
$manifest | Add-Member minimum_chrome_version "72"
$manifest | Add-Member short_name "PPTW"
$manifest.PsObject.Members.Remove("applications")
$pageAction = $manifest.page_action
$pageAction | Add-Member chrome_style $pageAction.browser_style
$pageAction.PsObject.Members.Remove("browser_style")
$pageAction.PsObject.Members.Remove("show_matches")

$manifest | ConvertTo-Json -Depth 9 | Out-File .\chrome\manifest.json
