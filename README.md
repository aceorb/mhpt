## Description
**Title**: Development of a Mental Health Progress Tracker

**Objective**: Create a simple web application using React for the frontend and Node.js for the backend, which allows patients to log daily mental health statuses
and view trends over time.
The application should be secure and user-friendly, covering sensitivity to the needs of mental health patients.

## Features
User Authentication: Implement login with Google for authentication.

Daily LogForm: Create a form where users can submit their daily mental health status. The form accepts following on each day.
- Mood Ratings: Self-reported mood on a scale, typically from very sad to very happy.
- Anxiety Levels: Self-assessed anxiety levels.
- Sleep Patterns: Hours of sleep, quality of sleep, and any disturbances.
- Physical Activity: Type and duration of physical activity.
- Social interactionis: Frequency of social engagements.
- Stress Levels: Self-reported stress levels.
- Symptoms of Depression or Anxiety: presence and severity of specific symptoms.

## Installation
    Backend : mhpt-api(NestJs)
    Frontend : mhpt-web(Next.js, React)
    Databse : PostreSQL

## Configure Google Authentication

mhpt-api/.env

```
DATABASE_URL=postgres://postgres:postgres@p@ssw0rd@127.0.0.1:5432/mhpt
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

## Running the app

```bash
# 
$ cd mhpt-api
$ npm install
$ npm run start

$ cd mhpt-web
$ npm install
$ npm run start
```

You can see backend is running on http://localhost:9000, and frontend is running on http://localhost:3000

Have a look on http://localhost:3000
