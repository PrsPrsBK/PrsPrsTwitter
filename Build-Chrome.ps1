$manifest = Get-Content .\manifest.json | ConvertFrom-Json
<#
{
  "applications": {
    "gecko": {
      "strict_min_version": "64"
    }
  },
  "background": {
    "scripts": [
      "background/background.js"
    ]
  },
  "content_scripts": [
    {
      "matches": "https://twitter.com/*",
      "js": [
        "content_scripts/entry.js"
      ]
    }
  ],
  "options_ui": {
    "open_in_tab": true,
    "page": "options_ui/options.html"
  },
  "page_action": {
    "browser_style": true,
    "default_icon": {
      "19": "icons/icon-on.png"
    },
    "default_popup": "popup/popup.html",
    "default_title": "PrsPrsTwitter",
    "show_matches": [
      "https://twitter.com/*"
    ]
  },
  "permissions": [
    "storage",
    "tabs"
  ]
}
#>
$manifest.PsObject.Members.Remove("applications")

$manifest | ConvertTo-Json -Depth 9 | Out-File .\manifest_c.json
