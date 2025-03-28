# Api Routes

This project contains a collection of API endpoints used for various purposes such as database management, image and text generation, and more. Below is an overview of the directory structure and a description of each part.
<br>
Every api endpoint is made in the file called `+server.js`
<br>
If you have any questions, contact us at [contact@dasigpt.com](mailto:contact@dasigpt.com)

## Directory Structure

```bash
api/
├── database/   # Database
│   └── user/   # Users in the database
│   │   ├── generate-id # Generate user ID
│   │   ├── create  # Create user in the database
│   │   ├── user-info  # Saves neccesary user info when you create a user
│   │   └── get-id  # Put in the external ID to get the Dasi ID
│   └── chat/   # Users in the database
│       ├── save # Saves the chat to the database
│       ├── get  # Gets the chat from the database
│       └── delete  # Deletes the chat from the database
├── title   # Title generation
├── image/  # Image AI
│   └── generation  # Image generation
├── text   # Text generation
```
