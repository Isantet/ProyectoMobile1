$files = Get-ChildItem -Path "C:\Users\isaac\.gemini\antigravity\scratch\*.html"

$replacements = @{
    ">🍎 iPhone<" = '><i class="fab fa-apple" style="width:20px;text-align:center;margin-right:6px"></i> iPhone<'
    ">📱 Samsung<" = '><i class="fas fa-mobile-alt" style="width:20px;text-align:center;margin-right:6px"></i> Samsung<'
    ">🟠 Xiaomi<" = '><i class="fas fa-mobile" style="width:20px;text-align:center;margin-right:6px"></i> Xiaomi<'
    ">📟 iPad<" = '><i class="fas fa-tablet-alt" style="width:20px;text-align:center;margin-right:6px"></i> iPad<'
    ">🎧 Accesorios<" = '><i class="fas fa-headphones" style="width:20px;text-align:center;margin-right:6px"></i> Accesorios<'
    "📦 " = '<i class="fas fa-box" style="margin-right:4px"></i> '
    "✅ " = '<i class="fas fa-check-circle" style="margin-right:4px"></i> '
    "📱 " = '<i class="fas fa-mobile-alt" style="margin-right:4px"></i> '
    "🔥 " = '<i class="fas fa-fire" style="margin-right:4px"></i> '
}

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    
    foreach ($key in $replacements.Keys) {
        $content = $content.Replace($key, $replacements[$key])
    }
    
    [System.IO.File]::WriteAllText($file.FullName, $content, (New-Object System.Text.UTF8Encoding($False)))
    Write-Host "Replaced emojis in $($file.Name)"
}
