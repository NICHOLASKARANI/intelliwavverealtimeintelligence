@echo off
REM setup.bat
REM IntelliWave ITIS Setup Script for Windows

echo ========================================
echo IntelliWave ITIS - Setup Script
echo ========================================
echo.

echo [1/6] Checking prerequisites...
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js 20+ from https://nodejs.org
    pause
    exit /b 1
)

where pnpm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Installing pnpm...
    npm install -g pnpm@8
)

where docker >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo WARNING: Docker is not installed!
    echo Please install Docker Desktop from https://docker.com
    echo You can continue but need Docker for database services
)

echo.
echo [2/6] Installing dependencies...
pnpm install
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo [3/6] Setting up environment...
if not exist .env (
    copy .env.example .env
    echo Created .env file from .env.example
    echo Please update .env with your configuration values!
)

echo.
echo [4/6] Starting Docker services (if available)...
where docker >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    docker-compose up -d postgres redis
    echo Waiting for services to start...
    timeout /t 10 /nobreak >nul
) else (
    echo Docker not available, skipping...
)

echo.
echo [5/6] Setting up database...
cd packages\database
call npx prisma generate
call npx prisma db push
call npx prisma db seed
cd ..\..

echo.
echo [6/6] Building packages...
pnpm run build

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo To start the development servers:
echo   pnpm run dev
echo.
echo Access points:
echo   Frontend: http://localhost:3000
echo   Backend:  http://localhost:3001
echo   Database Studio: pnpm run db:studio
echo.
echo Default login:
echo   Email: demo@intelliwave.com
echo   Password: demo123
echo.
pause