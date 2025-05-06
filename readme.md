# Job Portal Application

## Description

This is a job portal application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It allows users to search for jobs, post job listings, and manage their profiles. The application provides a user-friendly interface and a robust backend to handle various functionalities.

## Features

- User authentication (sign up, login, logout)
- Job search functionality
- Job posting and management
- User profile management
- Job application management

## Model Structure

### User Model

- name
- email
- password
- role (user, recruiter, admin)
- profilePicture
- resume
- isBlocked

### Job Model

- title
- description
- location
- recruiter
- applicants
- status (open, closed)

### Application Model

- job
- applicant
- status (applied, shortlisted, rejected)

### Company Model

- name
- location
- jobs (array of job IDs)
- recruiter - a single user ID

### Endpoints

/auth
    - POST /register - Register a new user
    - POST /login - Login a user
    - POST /logout - Logout a user
    - GET /me - Get user profile

/users
    - GET /profile - Get user profile
    - PUT /profile - Update user profile (pending)
    - GET / - Get all users (admin only)
    - GET /:id - Get user by ID (admin only)
    - PUT /:id - Update user by ID (admin only)
    - DELETE /:id - Delete user by ID (admin only)

/files
    - POST /upload - Upload a file (resume, profile picture)

/companies
    - POST / - Create a new company (admin only)
    - GET / - Get all companies (user, manager, admin)
    - GET /:id - Get company by ID (user, manager, admin)
    - PUT /:id - Update company by ID (admin only)
    - DELETE /:id - Delete company by ID (admin only)
    - to assign a company to a user (admin only) - PUT /:id/assign
    - to remove a company from a user (admin only) - PUT /:id/remove

/jobs
    - to create a new job (recruiter, admin) - POST /
    - to get all jobs (user, recruiter, admin) - GET /
    - to get a job by ID (user, recruiter, admin) - GET /:id
    - to update a job by ID (recruiter, admin) - PUT /:id
    - to delete a job by ID (recruiter, admin) - DELETE /:id

/applications
    - to apply for a job (user) - POST /
    - to get all applications (recruiter, admin) - GET /
    - to get an application by ID (recruiter, admin) - GET /:id
    - to update an application by ID (recruiter, admin) - PUT /:id
    - to delete an application by ID (recruiter, admin) - DELETE /:id
    - to get all applications for a job (recruiter, admin) - GET /job/:jobId
    - to get all applications by a user (user) - GET /user/:userId
    - to get all applications by a recruiter (recruiter, admin) - GET /recruiter/:recruiterId
    - to get all applications by a status (recruiter, admin) - GET /status/:status
    - to update an application status (recruiter, admin) - PUT /status/:id
