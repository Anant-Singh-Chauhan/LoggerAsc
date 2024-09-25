# LoggerAsc

## Overview
LoggerAsc is a web service designed for creating and storing logs related to personal projects in one centralized location. It provides an easy-to-use API for logging various types of information, helping you maintain visibility, track website traffic, footfall and events in your applications.

## Features
- Store logs in console, file and MongoDB.
- Support for multiple log levels (info, error, debug, etc.).
- Ability to log additional metadata for better context.
- Easily deployable and configurable.

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB installation

### Steps to Install
1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/LoggerAsc.git
    cd LoggerAsc
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add your MongoDB connection string:
    ```env
    MONGO_URI=mongodb://<username>:<password>@cluster0.mongodb.net/loggerDB?retryWrites=true&w=majority
    ```

4. Start the server:
    ```bash
    npm start
    ```

## API Endpoints

### POST /log
Create a new log entry.

#### Request Body
```json
{
    "label": "ABCD",
    "level": "info",
    "message": "Portfolio accessed.",
    "meta": {
      "browser": "Chrome",
      "ip": "xxx.xxx.xxx.xxx",
      "isDefault": false,
      "os": "Android",
      "project": "ABCD"
    },
    "timestamp": "2024-09-25T13:56:48.154Z"
}
