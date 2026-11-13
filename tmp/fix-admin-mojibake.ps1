$files = Get-ChildItem -Path "admin.99-exch.red" -Recurse -File -Include *.html
$replacements = @(
  @{from = "http://www.wGaminxV)#0tO%e877ds&9e%?Td}=/V*GaminxV)#0tO%e877ds&9e%?Td}=/V*3.org/2000/svg"; to = "http://www.w3.org/2000/svg"},
  @{from = "Ãƒâ€”"; to = "×"},
  @{from = "Ã—"; to = "×"},
  @{from = "Ã¢â‚¬Â¢"; to = "•"}
)
foreach ($f in $files) {
  $text = Get-Content -Path $f.FullName -Raw
  $orig = $text
  foreach ($r in $replacements) {
    $text = $text.Replace($r.from, $r.to)
  }
  if ($text -ne $orig) {
    Set-Content -Path $f.FullName -Value $text -Encoding UTF8
  }
}
Write-Output "done"
