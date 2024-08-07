Project README
Welcome to our Web Application! This project is a robust platform designed for blogging and user interaction. Below is a comprehensive overview of its features and functionalities:

Overview
Our web application provides a seamless blogging experience with various features for user management and interaction. Here’s a quick rundown of what you can do:

Features
User Authentication
Login/Register: Users can register for a new account or log in to an existing one.
Google OAUTH Authentication: Integrated with Google OAUTH for a streamlined and secure login experience.
Blog Functionality
Create/Read/Update/Delete (CRUD) Blogs: Registered users can manage their own blogs. This includes creating new posts, reading their own or others' posts, updating existing posts, and deleting posts.
Commenting: Authenticated users can leave comments on blogs. They also have the ability to update or delete their own comments.

Bonuses
Firebase Deployment: The application is deployed on Firebase, ensuring high availability and performance. - 
GitHub Actions: Integrated for automated deployment to Firebase, streamlining the deployment process.
Toast Notifications: Provides instant feedback to users with toast notifications for various actions and statuses.
Email Integration: Configured for sending sign in ( and handling contact form submissions.
Contact Form
Send Emails: A contact form is available for users to send messages directly to the developers of the site.

Getting Started
To get started with the project locally, follow these steps:

Clone the Repository

git clone [https://github.com/yourusername/your-repository.git](https://github.com/xzikoto/SoftUni-ReactJs)
Start Client App instructions: 
cd your-repository
cd client
npm install
npm run dev

Start Server App instructions:
cd your-repository
cd server
node server.js

Open the URL generated in the firstterminal(client) :)   

How to deploy to fire base. Have to be authenticated, though
npm run build
npm run deploy
Deployment
The application is deployed to Firebase. GitHub Actions is configured for continuous deployment, which means every push to the main branch triggers a new deployment.
