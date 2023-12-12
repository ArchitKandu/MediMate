# Medimate Documentation

<i>YOUR HEALTH, OUR REMINDER</i>

## Table of Contents

- [Introduction](#introduction)
- [Demo](#demo)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Register User](#register-user)
  - [Authenticate User](#authenticate-user)
  - [Add Medicine](#add-medicine)
  - [Remove Medicine](#remove-medicine)
  - [Update Medicine](#update-medicine)
  - [Get Medicine Details](#get-medicine-details)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Medimate is a medication management system designed to help users keep track of their medications and receive timely reminders for doses.

## Demo

A demo video for the end project is shown below.
<video src="demo/demo.mp4" controls title="Demo-Video"></video>

## Getting Started

### Prerequisites

- Node.js (version 18.16.0)
- MongoDB

### Installation

1. Clone the Medimate repository.

   ```bash
   git clone https://github.com/ArchitKandu/MediMate.git
   ```

2. Install dependencies.

   ```bash
   cd MediMate
   npm install
   ```

3. Configure environment variables.
   Create a `.env` file in the root directory and add necessary configuration details.
   Example:
   MONGO_URI = <i>YOUR MONGODB URI</i>
   JWT_SECRET = <i>YOUR JSON WEB TOKEN SECRET</i>

4. Start the server.
   ```bash
   npm start
   ```

## Usage

### Register User

Register a new user with Medimate.

#### Request

```bash
POST /api/user/signup
```

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secretpassword",
  "gender": "M"
}
```

#### Response

```json
{
  "_id": "user-id",
  "name": "John Doe",
  "email": "john@example.com",
  "gender": "M",
  "medicine": [],
  "token": "user-token"
}
```

### Login User

Login an existing user.

#### Request

```bash
POST /api/user/login
```

```json
{
  "email": "john@example.com",
  "password": "secretpassword"
}
```

#### Response

```json
{
  "_id": "user-id",
  "name": "John Doe",
  "email": "john@example.com",
  "gender": "M",
  "medicine": [],
  "token": "user-token"
}
```

### Add Medicine

Add a new medicine to the user's profile.

#### Request

<i>Bearer token is required to use this api.</i>

```bash
POST /api/user/addMedicine
```

```json
{
  "id": "user-id",
  "newMedicine": {
    "medName": "Aspirin",
    "dosage": 2,
    "time": ["10:00", "22:00"]
  }
}
```

#### Response

```json
{
  "_id": "user-id",
  "name": "John Doe",
  "email": "john@example.com",
  "gender": "M",
  "medicine": [
    {
      "_id": "medicine-id",
      "medName": "Aspirin",
      "dosage": 2,
      "time": ["10:00", "22:00"]
    },
    {
      "_id": "medicine-id",
      "medName": "Vitamin C",
      "dosage": 2,
      "time": ["09:00", "21:00"]
    }
  ]
}
```

### Remove Medicine

Remove an existing medicine from the user's profile.

#### Request

<i>Bearer token is required to use this api.</i>

```bash
POST /api/user/removeMedicine
```

```json
{
  "id": "user-id",
  "medId": "medicine-id"
}
```

#### Response

```json
{
  "_id": "user-id",
  "name": "John Doe",
  "email": "john@example.com",
  "gender": "M",
  "medicine": [
    {
      "_id": "medicine-id",
      "medName": "Aspirin",
      "dosage": 2,
      "time": ["10:00", "22:00"]
    }
  ]
}
```

### Update Medicine

Update an existing medicine from the user's profile.

#### Request

<i>Bearer token is required to use this api.</i>

```bash
POST /api/user/updateMedicine
```

```json
{
  "id": "user-id",
  "medId": "medicine-id",
  "updatedMedValue": {
    "medName": "Aspirin",
    "dosage": 3,
    "time": ["08:00", "16:00", "00:00"]
  }
}
```

#### Response

```json
{
  "_id": "user-id",
  "name": "John Doe",
  "email": "john@example.com",
  "gender": "M",
  "medicine": [
    {
      "_id": "medicine-id",
      "medName": "Aspirin",
      "dosage": 3,
      "time": ["08:00", "16:00", "00:00"]
    }
  ]
}
```

### Get Medicine Details

Get all the medicine details from the user's profile. This can be used to add in Hardware Implementation.

#### Request

```bash
POST /api/user/getMedicine
```

```json
{
  "id": "user-id"
}
```

#### Response

```json
{
  "_id": "user-id",
  "medicine1": {
    "_id": "medicine-id",
    "medName": "Aspirin",
    "dosage": 3,
    "time": ["08:00", "16:00", "00:00"]
  }
}
```

## API Endpoints

- `POST /api/user/signup`: Register a new user.
- `POST /api/user/login`: Login to an existing user.
- `POST /api/user/addMedicine`: Add a new medicine to the user's profile.
- `POST /api/user/removeMedicine`: Remove an existing medicine to the user's profile.
- `POST /api/user/updateMedicine`: Update an existing medicine to the user's profile.
- `POST /api/user/getMedicine`: Get medicine details from the user's profile.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

- Fork the project.
- Create a new branch for your feature or bug fix.
- Make your changes and ensure tests pass.
- Commit your changes.
- Push to your fork and submit a pull request.

## License

Medimate is licensed under the [MIT License](LICENSE).

This is a basic template, and you may want to expand on each section depending on the features and complexity of your project. Additionally, consider adding details about database schema, error handling, and more advanced features in the documentation.
