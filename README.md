# Odin Blog Backend

This is the backend for the Odin Blog project, handling the API, authentication, and database interactions for both the regular and admin frontends.

## Overview

The backend API powers the entire blog, enabling data storage, retrieval, and manipulation for posts, comments, and user management.

- **Authentication**: Provides secure user authentication and authorization to control access to specific parts of the blog (e.g., admin access).
- **CRUD Operations**: Supports creating, reading, updating, and deleting posts and comments.
- **Role-Based Access Control**: Restricts certain actions (like publishing or role assignment) to authorized users only.

## Features

- **API for Posts and Comments**: RESTful endpoints to manage blog content.
- **Authentication**: JWT-based authentication to secure user sessions.
- **Role Management**: Provides endpoints for managing user roles (e.g., assigning "Author" status).
- **Pagination and Filtering**: Supports pagination and optional filtering for efficient content retrieval.

## Tech Stack

- **Framework**: Node.js with Express for handling API requests.
- **Database**: Prisma as the ORM for interacting with a relational database.
- **Authentication**: JSON Web Tokens (JWT) for user sessions.
- **Validation**: Input validation for secure, reliable data handling.

## Links

- [Frontend](https://github.com/Uruwhy1/odin-blog-frontend): Regular frontend for user access.
- [Admin Frontend](https://github.com/Uruwhy1/odin-blog-admin): Admin interface for managing posts and user roles.

---


