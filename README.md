
# InstagramClone

## Overview
InstagramClone is a full-stack web application that replicates the core features of Instagram. This project is built using ASP.NET for the backend and React for the frontend. It includes functionalities such as user authentication, image uploads, posts, comments, and likes.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)


## Features
- User Authentication (JWT)
- Post Image Uploads
- Create, Read,  Posts
- Like and Comment on Posts
- Follow/Unfollow Users

## Technologies Used
### Backend
- ASP.NET Core
- SQL Server
- Dapper
- JWT Authentication

### Frontend
- React
- Redux
- Axios

## Installation

rver

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/mo-ha-amini/InstagramClone.git
   cd InstagramClone/Server
   ```

2. Update the connection string in `appsettings.json`:
   ```json
   "ConnectionStrings": {
     "DefaultConnection": "Server=your_server;Database=InstagramDb;User Id=your_user;Password=your_password;"
   }
   ```
   or you can use database backup


### Frontend Setup
1. Navigate to the client directory:
   ```bash
   cd ../Client
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Start the frontend server:
  ```bash
  npm run dev
   ```
  or
   ```bash
   npm start npm run dev
   ```
  

## Usage
1. run both client and server.
2. Register a new account or log in with an existing account.
3. all user's password in backup database is ```mha123``` for login. 
4. Explore the features such as creating posts, liking, commenting, and following other users.
