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
