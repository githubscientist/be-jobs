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
- resumeUrl
