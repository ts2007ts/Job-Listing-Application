# Job Listing Application

## Introduction

Job Listing Application is designed using Node JS and React + Vite to Post Jobs to the website and each user can manage his own posted job (Create, Edit, Delete) as well as files upload and managment to it. 

## Features

- **User Authentication and Authorization**

  - Register and login functionality
  - JWT-based authentication

- **Roles and Permissions**

  
  - **Logged In User**:
    - Add, edit, delete tasks
    - Cannot edit or delete another user job
  - **User**:
    - View jobs

- **Job Management**

  - Add, edit, delete jobs


## Project Structure

````plaintext
Job-Lising-Application/
├── client/
│   └── (Vite + React frontend files)
├── server/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── jobListingController.js
│   │   └── loginController.js
│   │   └── registerController.js
│   ├── Database/
│   │   ├── mongoConnection.js
│   ├── Errors/
│   │   ├── error.js
│   ├── Middleware/
│   │   ├── filesUpload.js
│   │   ├── verifyToken.js
│   ├── Models/
│   │   ├── jobListingModel.js
│   │   ├── userModel.js
│   ├── public/
│   │   ├── files
│   ├── Routers/
│   │   ├── authRoutes.js
│   │   ├── guestsRoutes.js
│   │   └── jobListingRoutes.js
│   ├── app.js
│   ├── server.js
````

## Setup and Installation

### Prerequisites
- Node.js
- npm

### Backend Setup
1. Navigate to the `server` directory:
   ```sh
   cd "server"

2. Install dependencies:
   ```sh
   npm install

3. Create a `config.env` file based on the `.env.example` and configure your environment variables:
    ```sh
    SECRET_KEY=your_secret_key
    DB_LOCAL_URL_STR=your_mongodb_connection_string

4. Start the backend server:
   ```sh
   npm start
````
````
### Frontend Setup
1. Navigate to the `client` directory:
   ```sh
   cd "/client"

2. Install dependencies:
   ```sh
   npm install

3. Start the frontend development server:
   ```sh
   npm start
````
````

## API Endpoints

### Authentication
- **Register**: `POST /api/register`
- **Login**: `POST /api/login`
- **Logout**: `POST /api/logout`

### job Management
- **Add Job**: `POST /api/jobs`
- **Edit Job**: `PATCH /api/jobs/:id`
- **Delete Job**: `DELETE /api/jobs/:id`
- **Get All Jobs**: `GET /api/jobs`
- **Get One Job**: `GET /api/jobs/:id`

### Files Download
- **Download All Attachments as zip file**: `GET /api/jobs/download/:id`
- **Download Single File**: `GET /api/jobs/download/single/:fileName/:id`
- **Delete Single File**: `DELETE /api/jobs/delete/single/:fileName/:id`

## Contributing
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.


## Contact
For any questions or support, please contact [rachidalmustafa377@gamil.com].
