$manifest = Get-Content .\manifest.json | ConvertFrom-Json
<#
{
  "applications": {
    "gecko": {
      "strict_min_version": "64"
    }
  },
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
}
#>
$manifest.PsObject.Members.Remove("applications")
$pageAction = $manifest.page_action
$pageAction | Add-Member chrome_style $pageAction.browser_style
$pageAction.PsObject.Members.Remove("browser_style")
$pageAction.PsObject.Members.Remove("show_matches")

$manifest | ConvertTo-Json -Depth 9 | Out-File .\manifest_c.json
