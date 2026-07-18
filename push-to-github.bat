@echo off
REM push-to-github.bat

echo Initializing Git repository...
git init

echo Adding remote origin...
git remote add origin https://github.com/NICHOLASKARANI/intelliwavverealtimeintelligence.git

echo Creating .gitignore...
(
echo node_modules/
echo dist/
echo .next/
echo .env
echo .env.local
echo *.log
echo .turbo/
echo docker-data/
) > .gitignore

echo Adding all files...
git add .

echo Creating initial commit...
git commit -m "Initial commit: IntelliWave ITIS Platform

- Complete monorepo structure
- Backend API with NestJS
- Frontend with Next.js 15
- AI Trading Engine
- Bot Engine with 7 strategies
- Deriv API Connector
- Analytics Dashboard
- Admin Panel
- Docker configuration
- CI/CD pipeline"

echo Pushing to GitHub...
git branch -M main
git push -u origin main

echo.
echo Successfully pushed to GitHub!
echo Repository: https://github.com/NICHOLASKARANI/intelliwavverealtimeintelligence
pause