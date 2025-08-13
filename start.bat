@echo off
setlocal

REM Change to the directory of this script (repo root)
cd /d "%~dp0"

if not exist "site\package.json" (
  echo Error: Could not find site\package.json. Make sure the project exists in the ^'site^' folder.
  exit /b 1
)

cd site

REM Install dependencies if missing
if not exist "node_modules" (
  echo Installing dependencies...
  call npm ci --no-audit --fund=false
  if errorlevel 1 (
    echo npm ci failed, trying npm install...
    call npm install --no-audit --fund=false
    if errorlevel 1 (
      echo Failed to install dependencies.
      exit /b 1
    )
  )
)

set PORT=3000
echo Starting dev server on http://localhost:%PORT% ...
start "" "http://localhost:%PORT%"
call npm run dev -- -p %PORT%

endlocal

