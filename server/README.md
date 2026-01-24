# Chat Server Setup

This is the real-time chat server for the FloodGuard AI Live Chat Board.

## Installation

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

## Running the Server

Start the server with:
```bash
npm start
```

The server will run on port 3001 by default.

## Features

- Real-time messaging using WebSockets (Socket.io)
- Multiple chat rooms support
- User presence tracking
- Typing indicators
- Message history
- Create new chat rooms

## Configuration

The server is configured to accept connections from:
- Frontend running on `http://localhost:5173` (Vite default port)

To change the port, set the `PORT` environment variable:
```bash
PORT=3002 npm start
```
