# Habitopia

In habit.model.js I've added a note to the occurance section -  this would be e.g. distance for running, duration for yoga/meditation or volume for water drunk.

We can push to the occurance array when a habbit is done












## [See the App!](www.your-deploy-url-here.com)

![App Logo](your-image-logo-path-or-name)

## Description

**NOTE -** Describe your project in one/two lines.
 
## User Stories

**NOTE -**  List here all the actions a user can do in the app. Example:

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault 
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **homepage** - As a user I want to be able to access the homepage so that I see what the app is about and login and signup
- **sign up** - As a user I want to sign up on the webpage so that I can see all the events that I could attend
- **login** - As a user I want to be able to log in on the webpage so that I can get back to my account
- **logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
- **events list** - As a user I want to see all the events available so that I can choose which ones I want to attend
- **events create** - As a user I want to create an event so that I can invite others to attend

## Backlog Functionalities

**NOTE -** List here all functionalities you wish to add to your proyect later.

## Technologies used

**NOTE -** List here all technologies used in the project like HTML, CSS, Javascript, Node, Express, Handlebars, Sessions & Cookies, etc.


## (Optional) Routes

**NOTE -** List here all the routes of your server. Example:

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

- GET /events
  - renders the event list + the create form
- POST /events/create 
  - redirects to / if user is anonymous
  - body: 
    - name
    - date
    - location
    - description


## Models

**NOTE -** List here all the models & Schemas of your Database Structure. Example: 

User model
 
```
username: String
password: String
```

Event model

```
owner: ObjectId<User>
name: String
description: String
date: Date
``` 

## Links

## Collaborators

[Developer 1 name](www.github-url.com)

[Developer 2 name](www.github-url.com)

### Project

[Repository Link](www.your-github-url-here.com)

[Deploy Link](www.your-deploy-url-here.com)

### Trello

[Link to your trello board](www.your-trello-url-here.com)

### Slides

[Slides Link](www.your-slides-url-here.com)


