# Run customs sync (Scheduled Task can call this)
$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot
if (-not (Test-Path .\.env)) {
  Write-Error "Missing .env — copy .env.example to .env and fill in values."
}
node .\sync.mjs @args
