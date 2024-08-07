Project README
Welcome to Devs Blogs App!

Overview
Our web application offers a seamless blogging experience with a variety of features for user management and interaction. Here’s a quick rundown of what you can do:

Features
User Authentication
Login/Register: Users can register for a new account or log in to an existing one.
Google OAUTH Authentication: Integrated with Google OAUTH for a streamlined and secure login experience.
Blog Functionality
Create/Read/Update/Delete (CRUD) Blogs: Registered users can manage their own blogs. This includes:
Creating new posts
Reading their own or others' posts
Updating existing posts
Deleting posts
Commenting: Authenticated users can leave comments on blogs, and have the ability to update or delete their own comments.
Bonuses
Firebase Deployment: The application is deployed on Firebase, ensuring high availability and performance.
GitHub Actions: Integrated for automated deployment to Firebase, streamlining the deployment process.
Toast Notifications: Provides instant feedback to users with toast notifications for various actions and statuses.
Email Integration: Configured for sending sign-in notifications and handling contact form submissions.
Contact Form: A contact form is available for users to send messages directly to the developers.
Getting Started
To get started with the project locally, follow these steps:

Clone the Repository
bash
Копиране на код
git clone https://github.com/yourusername/your-repository.git
Start Client App
bash
Копиране на код
cd your-repository/client
npm install
npm run dev
Start Server App
bash
Копиране на код
cd your-repository/server
node server.js
Open the URL generated in the client terminal.

Deployment to Firebase
To deploy to Firebase:

Ensure you are authenticated.
Build the project:
bash
Копиране на код
npm run build
Deploy the project:
bash
Копиране на код
npm run deploy
Continuous Deployment
The application is deployed to Firebase with GitHub Actions configured for continuous deployment. Every push to the main branch triggers a new deployment.

Feel free to reach out if you have any questions or need further assistance!
