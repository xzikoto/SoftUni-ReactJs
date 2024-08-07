# Project README

## Welcome to Devs Blogs!

---

## Overview

Our web application offers a seamless blogging experience with a variety of features for user management and interaction. Here’s a quick rundown of what you can do:

### Features

#### User Authentication
- **Login/Register**: Users can register for a new account or log in to an existing one.
- **Google OAUTH Authentication**: Integrated with Google OAUTH for a streamlined and secure login experience.

#### Blog Functionality
- **Create/Read/Update/Delete (CRUD) Blogs**: Registered users can manage their own blogs. This includes:
  - Creating new posts
  - Reading their own or others' posts
  - Updating existing posts
  - Deleting posts
- **Commenting**: Authenticated users can leave comments on blogs and have the ability to update or delete their own comments.

### Bonuses
- **Firebase Deployment**: The application is deployed on Firebase, ensuring high availability and performance.
- **GitHub Actions**: Integrated for automated deployment to Firebase, streamlining the deployment process.
- **Toast Notifications**: Provides instant feedback to users with toast notifications for various actions and statuses.
- **Email Integration**: Configured for sending sign-in notifications and handling contact form submissions.
- **Contact Form**: A contact form is available for users to send messages directly to the developers.
- **Google Gemini AI Comment Generator**: When writing a comment to a Blog you have the functionality to generate a comment by the Google Gemini AI.

---
You can directly check the application from here: https://reactjs-project-softuni.web.app/

## Getting Started

To get started with the project locally, follow these steps:

### Clone the Repository
git clone [https://github.com/xzikoto/SoftUni-ReactJs.git](Repo URL)

### Run Client App locally with firebase 
- (Client will send api request to the deployed Server app on Firebase)
- cd client 
- npm run build (wait a bit)
- firebase serve
- go to localhost:5000/login
- email: admin@abv.bg
- password: admin

### Run both the Client App and Server
- cd client
- npm install
- npm run dev
- cd .. (go back one directory)
- cd server
- node server.js
- go to localhost:5173/login
- email: admin@abv.bg
- password: admin

## Architecture
- Client App (client folder)
- Server App (server folder)

Enjoy, if you have any questions, send a email form request from the Contact page :)
