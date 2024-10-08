# API Chaining Dashboard

This is a simple React application that demonstrates how to integrate with a REST API. The app allows users to fetch a list of users, create posts, and view comments associated with those posts.

## Features

- Fetch users from the API.
- Create new posts linked to a selected user.
- View comments related to each post.
- Basic error handling and loading states.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **Axios**: Promise-based HTTP client for the browser and Node.js.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **JSONPlaceholder**: A free fake API for testing and prototyping.

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (Node Package Manager)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/shivasai789/api-chaining-dashboard.git

2. Navigate to the project directory:

   ```bash
   cd api-chaining-dashboard

3. Install the dependencies:

   ```bash
   npm install 


## Running the Application

1. Start the development server:

   ```bash
   npm start 

2. Open your browser and go to http://localhost:3000 to view the application.


## API Integration

The application interacts with the following endpoints of the JSONPlaceholder API:

1. GET /users: Fetches a list of users.
2. POST /posts: Creates a new post linked to a user.
3. GET /comments?postId={postId}: Fetches comments related to a specific post.


## Usage

1. Click the "Fetch Users" button to load users from the API.
2. Select a user from the dropdown list.
3. Fill in the post title and body, then click "Create Post" to add a new post.
4. View comments for each post by clicking the corresponding post.


