# Email Verification Service - Nest.JS

## Description

This NestJS application handles user registrations with an email verification step. It uses MongoDB for storing user data and SendGrid for sending verification emails. The verification process helps in confirming that an email address provided by a new user belongs to them.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed (version 12.x or later recommended).
- MongoDB installed and running on your machine or accessible via an online instance.
- A SendGrid account with an API key and a verified sender email address.

## Installation

To install the dependencies, follow these steps:

```bash
npm install
```

## Setting Up Environment Variables

Create a `.env` file in the root of your project and populate it with your MongoDB and SendGrid credentials:

```
MONGO_URI=your_mongo_uri
SENDGRID_API_KEYS=your_sendgrid_api_key
MAIL_ADRESS=your_verified_sender_email@example.com
```

## Running the Application

To run the application, execute:

```bash
npm run start
```

For development mode with hot reload, use:

```bash
npm run start:dev
```

## Usage

### Register a User

Send a POST request to `/user/register` with a JSON body containing a username and an email:

```json
{
  "username": "egeoztas",
  "email": "egeoztas@sabanciuniv.edu"
}
```

### Verify Email

Follow the link sent to the provided email to verify the account, or manually send a GET request to `/user/verify-email/{username}/{verificationToken}`.

### Check Verification Status

Send a GET request to `/user/check-verification/{username}` to check if the user's email has been verified.

## Contact

Ege Öztaş - egeoztas@sabanciuniv.edu
