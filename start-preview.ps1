$logFile = 'D:\Blujaylabs\.freebuff\preview-1767db1b-20d5-4365-8fc5-2d50a102c715.log'
$errFile = 'D:\Blujaylabs\.freebuff\preview-1767db1b-20d5-4365-8fc5-2d50a102c715.log.err'
$proc = Start-Process -FilePath 'npm.cmd' -ArgumentList 'run','dev' -WorkingDirectory 'D:\Blujaylabs\website' -RedirectStandardOutput $logFile -RedirectStandardError $errFile -WindowStyle Hidden -PassThru
Write-Output $proc.Id
