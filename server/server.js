import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const httpServer = createServer(app);

// Configure CORS
app.use(cors({
  origin: "http://localhost:5173", // Vite default port
  credentials: true
}));

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Store active users and messages
const users = new Map(); // socketId -> { userId, username, chatId }
const chatRooms = new Map(); // chatId -> { messages: [], members: [] }

// Default chat rooms
const defaultChats = [
  { id: 1, name: 'Admin Support', type: 'Admin' },
  { id: 2, name: 'Rescue Team Alpha', type: 'Rescue' },
  { id: 3, name: 'Emergency Coordinator', type: 'Admin' },
  { id: 4, name: 'Rescue Team Bravo', type: 'Rescue' },
  { id: 5, name: 'System Administrator', type: 'Admin' },
  { id: 6, name: 'Medical Support', type: 'Rescue' }
];

// Initialize default chat rooms
defaultChats.forEach(chat => {
  chatRooms.set(chat.id, {
    id: chat.id,
    name: chat.name,
    type: chat.type,
    messages: [],
    members: []
  });
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // User joins with their info
  socket.on('user-join', (userData) => {
    const { userId, username, chatId } = userData;
    users.set(socket.id, { userId, username, chatId });
    
    // Add user to chat room
    if (chatRooms.has(chatId)) {
      const room = chatRooms.get(chatId);
      if (!room.members.find(m => m.userId === userId)) {
        room.members.push({ userId, username, socketId: socket.id });
      }
      socket.join(`chat-${chatId}`);
      
      // Send updated room info to all clients
      io.to(`chat-${chatId}`).emit('room-updated', {
        chatId,
        members: room.members
      });
    }
    
    // Send list of available chats
    const chatsList = Array.from(chatRooms.values()).map(room => ({
      id: room.id,
      name: room.name,
      type: room.type,
      memberCount: room.members.length,
      lastMessage: room.messages.length > 0 ? room.messages[room.messages.length - 1] : null
    }));
    
    socket.emit('chats-list', chatsList);
  });

  // Join a specific chat room
  socket.on('join-chat', (chatId) => {
    const user = users.get(socket.id);
    if (user) {
      user.chatId = chatId;
      
      if (chatRooms.has(chatId)) {
        const room = chatRooms.get(chatId);
        socket.join(`chat-${chatId}`);
        
        // Send chat history
        socket.emit('chat-history', {
          chatId,
          messages: room.messages
        });
        
        // Notify others in the room
        socket.to(`chat-${chatId}`).emit('user-joined-room', {
          username: user.username,
          chatId
        });
      }
    }
  });

  // Leave a chat room
  socket.on('leave-chat', (chatId) => {
    socket.leave(`chat-${chatId}`);
  });

  // Handle new message
  socket.on('send-message', (messageData) => {
    const user = users.get(socket.id);
    if (!user) return;

    const { chatId, content, type } = messageData;
    
    if (chatRooms.has(chatId)) {
      const room = chatRooms.get(chatId);
      const newMessage = {
        id: Date.now(),
        sender: user.username,
        senderId: user.userId,
        content,
        type: type || 'normal',
        timestamp: new Date(),
        isOwn: false // Will be set by client
      };

      room.messages.push(newMessage);
      
      // Broadcast to all users in the chat room
      io.to(`chat-${chatId}`).emit('new-message', {
        chatId,
        message: newMessage
      });

      // Update last message for chat list
      io.emit('chat-updated', {
        chatId,
        lastMessage: {
          content: content.substring(0, 50),
          timestamp: newMessage.timestamp
        }
      });
    }
  });

  // Handle typing indicator
  socket.on('typing', (data) => {
    const user = users.get(socket.id);
    if (user) {
      socket.to(`chat-${data.chatId}`).emit('user-typing', {
        username: user.username,
        chatId: data.chatId
      });
    }
  });

  socket.on('stop-typing', (data) => {
    const user = users.get(socket.id);
    if (user) {
      socket.to(`chat-${data.chatId}`).emit('user-stopped-typing', {
        username: user.username,
        chatId: data.chatId
      });
    }
  });

  // Create new chat room
  socket.on('create-chat', (chatData) => {
    const { name, type } = chatData;
    const newChatId = Date.now();
    
    chatRooms.set(newChatId, {
      id: newChatId,
      name,
      type,
      messages: [],
      members: []
    });

    // Notify all clients about new chat
    io.emit('new-chat-created', {
      id: newChatId,
      name,
      type,
      messages: [],
      members: []
    });
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    const user = users.get(socket.id);
    if (user) {
      // Remove user from chat room
      if (chatRooms.has(user.chatId)) {
        const room = chatRooms.get(user.chatId);
        room.members = room.members.filter(m => m.socketId !== socket.id);
        
        io.to(`chat-${user.chatId}`).emit('room-updated', {
          chatId: user.chatId,
          members: room.members
        });
      }
      
      users.delete(socket.id);
    }
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3001;

httpServer.listen(PORT, () => {
  console.log(`🚀 Chat server running on port ${PORT}`);
  console.log(`📡 WebSocket server ready for connections`);
});
