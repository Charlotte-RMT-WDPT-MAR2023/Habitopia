# Habitopia

In habit.model.js I've added a details field to the occurance section -  this would be e.g. distance for running, duration for yoga/meditation or volume for water drunk.

We can push to the occurance array when a habit is done


These sections below I haven't updated: Routes, Project, Trello and Slides









## [See the App!](www.your-deploy-url-here.com)

![App Logo](your-image-logo-path-or-name)

## Description

A digital bullet journal. Habitopia is a habit tracking app designed to easily capture and organize your thoughts, goals, and daily activities. 
 
## User Stories

**NOTE -**  List here all the actions a user can do in the app. Example:

- **homepage** - welcome to the website, log in or sign up.
- **sign up** - create an account on Habitopia
- **logout** - logout of you account
- **self check-in** - log how you're feeling today and track how your mood changes
- **journal** - Write a diary, notes, brain dump, poetry, the journal page is your place to be expressive, creative and free
- **habit tracker** - Track your habits. Did you have enough water to drink today? Did you meet your goal of exercising 3 days this week? Keep a record of all the important things you want to achieve.
- **success** - Your self check-in, journal entry or habits have been recorded succesfully.
- **404** - 404 page to let you know that page doesn’t exist 
- **500** - an error page to let you know something has gone wrong

## Backlog Functionalities

- **Backgrounds** - Habitopia should be visually engaging so we want to add as much beautiful art as possible, but this isn't the main aim of the project

- **Search function** - search previous journal entries

- **Records** - longest run, best week for meeting goals, longest streak 

- **Custom habits** - add your own habits to track, including selecting an image to track it

## Technologies used

HTML, CSS, Javascript, Node, Express, Handlebars, Sessions & Cookies


## Routes

- GET / 
  - renders the homepage
- GET /auth/signup
  - redirects to / if user logged in
  - renders the signup form (with flash msg)
- POST /auth/signup
  - redirects to / if user logged in
  - body:
    - username
    - email
    - password
- GET /auth/login
  - redirects to / if user logged in
  - renders the login form (with flash msg)
- POST /auth/login
  - redirects to / if user logged in
  - body:
    - username
    - password


## Models



User model
 
```
username: String
email: String
password: String
```

Checkin model

```
mood: String
date: Date
``` 

Journal model

```
title: String
content: String
createdAt: Date
updatedAt: Date
``` 

Habit model

```
habit: String
goal: String
occurences:
   date: Date
   details: String
``` 

## Links

## Collaborators

[Patricia Moutinho](https://github.com/ThePainterThree)

[Charlotte Forsdick](https://github.com/Charlotte-RMT-WDPT-MAR2023)

### Project

[Repository Link](www.your-github-url-here.com)

[Deploy Link](www.your-deploy-url-here.com)

### Trello

[Link to your trello board](www.your-trello-url-here.com)

### Slides

[Slides Link](www.your-slides-url-here.com)


