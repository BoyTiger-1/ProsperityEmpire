@echo off
echo ============================================
echo   PROSPERITY EMPIRE - Local Dev Server
echo ============================================
echo.
echo Starting server on http://localhost:8080
echo Press Ctrl+C to stop.
echo.

:: Try Python 3 first
python -m http.server 8080 2>nul
if %ERRORLEVEL% EQU 0 goto :done

:: Try Python launcher
py -m http.server 8080 2>nul
if %ERRORLEVEL% EQU 0 goto :done

:: Try Python 2
python2 -m SimpleHTTPServer 8080 2>nul
if %ERRORLEVEL% EQU 0 goto :done

:: Try Node.js npx serve
npx serve -l 8080 . 2>nul
if %ERRORLEVEL% EQU 0 goto :done

echo ERROR: Could not start a web server.
echo Please install Python (python.org) or Node.js (nodejs.org)
echo Then run: python -m http.server 8080
pause

:done
