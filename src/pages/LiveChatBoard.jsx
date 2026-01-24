import React, { useState, useMemo, useRef, useEffect } from 'react';
import io from 'socket.io-client';
import {
  Search,
  Plus,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Image as ImageIcon,
  Smile,
  Send,
  AlertCircle,
  MapPin,
  FileText,
  ChevronRight,
  X,
  ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SOCKET_URL = 'http://localhost:3001';

const LiveChatBoard = () => {
  const navigate = useNavigate();
  const socketRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  
  // User state
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('chatUser');
    return saved ? JSON.parse(saved) : null;
  });
  const [showUserModal, setShowUserModal] = useState(!currentUser);
  const [usernameInput, setUsernameInput] = useState('');
  const [userRole, setUserRole] = useState('Admin');
  
  // Chat state
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [chatFilter, setChatFilter] = useState('All Chats');
  const [messageInput, setMessageInput] = useState('');
  const [isEmergency, setIsEmergency] = useState(false);
  const [typingUsers, setTypingUsers] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  
  const messagesEndRef = useRef(null);
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [newChatName, setNewChatName] = useState('');
  const [newChatType, setNewChatType] = useState('Admin');

  // Initialize socket connection
  useEffect(() => {
    if (!currentUser) return;

    // Connect to server
    socketRef.current = io(SOCKET_URL, {
      transports: ['websocket', 'polling']
    });

    const socket = socketRef.current;

    socket.on('connect', () => {
      console.log('Connected to server');
      setIsConnected(true);
      
      // Join with user info
      socket.emit('user-join', {
        userId: currentUser.id,
        username: currentUser.username,
        chatId: activeChatId || 2 // Default to Rescue Team Alpha
      });
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
      setIsConnected(false);
    });

    // Receive chats list
    socket.on('chats-list', (chatsList) => {
      setChats(chatsList.map(chat => ({
        id: chat.id,
        name: chat.name,
        type: chat.type,
        lastMessage: chat.lastMessage?.content || 'No messages yet',
        timeAgo: chat.lastMessage ? getTimeAgo(new Date(chat.lastMessage.timestamp)) : 'No messages',
        timestamp: chat.lastMessage ? new Date(chat.lastMessage.timestamp) : new Date(),
        unread: 0,
        online: true,
        avatar: chat.name.substring(0, 2).toUpperCase(),
        memberCount: chat.memberCount || 0
      })));
    });

    // Receive chat history
    socket.on('chat-history', ({ chatId, messages }) => {
      setChats(prevChats => prevChats.map(chat => {
        if (chat.id === chatId) {
          return {
            ...chat,
            messages: messages.map(msg => ({
              ...msg,
              timestamp: new Date(msg.timestamp),
              isOwn: msg.sender === currentUser.username
            }))
          };
        }
        return chat;
      }));
    });

    // Receive new message
    socket.on('new-message', ({ chatId, message }) => {
      setChats(prevChats => prevChats.map(chat => {
        if (chat.id === chatId) {
          const updatedMessages = [...(chat.messages || []), {
            ...message,
            timestamp: new Date(message.timestamp),
            isOwn: message.sender === currentUser.username
          }];
          
          return {
            ...chat,
            messages: updatedMessages,
            lastMessage: message.content.substring(0, 50),
            timeAgo: 'Just now',
            timestamp: new Date(),
            unread: chat.id === activeChatId ? 0 : (chat.unread || 0) + 1
          };
        }
        return chat;
      }));
    });

    // Receive typing indicator
    socket.on('user-typing', ({ username, chatId }) => {
      if (chatId === activeChatId && username !== currentUser.username) {
        setTypingUsers(prev => {
          if (!prev.includes(username)) {
            return [...prev, username];
          }
          return prev;
        });
      }
    });

    socket.on('user-stopped-typing', ({ username, chatId }) => {
      if (chatId === activeChatId) {
        setTypingUsers(prev => prev.filter(u => u !== username));
      }
    });

    // Receive new chat created
    socket.on('new-chat-created', (newChat) => {
      setChats(prevChats => [{
        id: newChat.id,
        name: newChat.name,
        type: newChat.type,
        lastMessage: 'Chat created',
        timeAgo: 'Just now',
        timestamp: new Date(),
        unread: 0,
        online: true,
        avatar: newChat.name.substring(0, 2).toUpperCase(),
        memberCount: 0,
        messages: []
      }, ...prevChats]);
    });

    // Chat updated
    socket.on('chat-updated', ({ chatId, lastMessage }) => {
      setChats(prevChats => prevChats.map(chat => {
        if (chat.id === chatId) {
          return {
            ...chat,
            lastMessage: lastMessage.content,
            timeAgo: getTimeAgo(new Date(lastMessage.timestamp)),
            timestamp: new Date(lastMessage.timestamp)
          };
        }
        return chat;
      }));
    });

    return () => {
      socket.disconnect();
    };
  }, [currentUser, activeChatId]);

  // Join chat when active chat changes
  useEffect(() => {
    if (socketRef.current && activeChatId && currentUser) {
      socketRef.current.emit('join-chat', activeChatId);
      
      // Mark as read
      setChats(prevChats => prevChats.map(chat => {
        if (chat.id === activeChatId) {
          return { ...chat, unread: 0 };
        }
        return chat;
      }));
    }
  }, [activeChatId, currentUser]);

  // Handle user login
  const handleUserLogin = () => {
    if (!usernameInput.trim()) {
      alert('Please enter your name');
      return;
    }

    const user = {
      id: Date.now().toString(),
      username: usernameInput.trim(),
      role: userRole
    };

    setCurrentUser(user);
    localStorage.setItem('chatUser', JSON.stringify(user));
    setShowUserModal(false);
    setUsernameInput('');
  };

  // Get time ago string
  const getTimeAgo = (date) => {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  // Get active chat
  const activeChat = useMemo(() => {
    return chats.find(chat => chat.id === activeChatId);
  }, [chats, activeChatId]);

  // Filter chats
  const filteredChats = useMemo(() => {
    return chats.filter(chat => {
      const matchesSearch = chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = chatFilter === 'All Chats' || chat.type === chatFilter;
      return matchesSearch && matchesFilter;
    }).sort((a, b) => b.timestamp - a.timestamp);
  }, [chats, searchQuery, chatFilter]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat?.messages, typingUsers]);

  // Format time
  const formatTime = (date) => {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  // Format date
  const formatDate = (date) => {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    }
  };

  // Group messages by date
  const groupedMessages = useMemo(() => {
    if (!activeChat?.messages) return {};
    const groups = {};
    activeChat.messages.forEach(msg => {
      const date = msg.timestamp instanceof Date ? msg.timestamp : new Date(msg.timestamp);
      const dateKey = date.toDateString();
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(msg);
    });
    return groups;
  }, [activeChat?.messages]);

  // Handle typing
  const handleTyping = () => {
    if (!socketRef.current || !activeChatId) return;

    socketRef.current.emit('typing', { chatId: activeChatId });

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Stop typing after 3 seconds
    typingTimeoutRef.current = setTimeout(() => {
      socketRef.current?.emit('stop-typing', { chatId: activeChatId });
    }, 3000);
  };

  // Send message
  const handleSendMessage = () => {
    if (!messageInput.trim() && !isEmergency) return;
    if (!socketRef.current || !activeChatId || !currentUser) return;

    socketRef.current.emit('send-message', {
      chatId: activeChatId,
      content: messageInput || (isEmergency ? 'Emergency alert sent' : ''),
      type: isEmergency ? 'emergency' : 'normal'
    });

    // Stop typing
    socketRef.current.emit('stop-typing', { chatId: activeChatId });
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    setMessageInput('');
    setIsEmergency(false);
  };

  // Handle key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    } else {
      handleTyping();
    }
  };

  // Create new chat
  const handleCreateChat = () => {
    if (!newChatName.trim() || !socketRef.current) return;

    socketRef.current.emit('create-chat', {
      name: newChatName.trim(),
      type: newChatType
    });

    setShowNewChatModal(false);
    setNewChatName('');
    setNewChatType('Admin');
  };

  // Select chat
  const selectChat = (chatId) => {
    setActiveChatId(chatId);
    setTypingUsers([]);
    
    // Mark as read
    setChats(prevChats => prevChats.map(chat => {
      if (chat.id === chatId) {
        return { ...chat, unread: 0 };
      }
      return chat;
    }));
  };

  if (!currentUser) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Enter Your Name</h2>
          <p className="text-gray-600 mb-4">Please enter your name to start chatting</p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Name *
              </label>
              <input
                type="text"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleUserLogin()}
                placeholder="Enter your name..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Role
              </label>
              <select
                value={userRole}
                onChange={(e) => setUserRole(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Admin">Admin</option>
                <option value="Rescue">Rescue</option>
                <option value="User">User</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleUserLogin}
            className="w-full mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Start Chatting
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Panel - Chat List */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate('/dashboard')}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                title="Back to Dashboard"
              >
                <ArrowLeft size={20} className="text-gray-600" />
              </button>
              <h2 className="text-xl font-bold text-gray-900">Live Chat Board</h2>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} title={isConnected ? 'Connected' : 'Disconnected'}></div>
              <button
                onClick={() => setShowNewChatModal(true)}
                className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search chats..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="px-4 py-3 border-b border-gray-200 flex gap-2">
          {['All Chats', 'Admin', 'Rescue'].map(filter => (
            <button
              key={filter}
              onClick={() => setChatFilter(filter)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                chatFilter === filter
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {filteredChats.length === 0 ? (
            <div className="p-4 text-center text-gray-500 text-sm">
              {isConnected ? 'No chats found' : 'Connecting to server...'}
            </div>
          ) : (
            filteredChats.map(chat => (
              <div
                key={chat.id}
                onClick={() => selectChat(chat.id)}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                  activeChatId === chat.id ? 'bg-blue-50 border-l-4 border-l-blue-600' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm">
                      {chat.avatar}
                    </div>
                    {chat.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-900 text-sm truncate">{chat.name}</h3>
                      <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{chat.timeAgo}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                        chat.type === 'Admin' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {chat.type}
                      </span>
                      {chat.unread > 0 && (
                        <span className="w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-semibold">
                          {chat.unread}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-semibold text-sm">
                {currentUser.username.substring(0, 2).toUpperCase()}
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{currentUser.username}</p>
              <p className="text-xs text-green-600">Online</p>
            </div>
          </div>
          <button 
            onClick={() => {
              localStorage.removeItem('chatUser');
              setCurrentUser(null);
            }}
            className="text-gray-400 hover:text-gray-600"
            title="Logout"
          >
            <MoreVertical size={20} />
          </button>
        </div>
      </div>

      {/* Center Panel - Chat Messages */}
      <div className="flex-1 flex flex-col bg-white">
        {activeChat ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm">
                    {activeChat.avatar}
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900">{activeChat.name}</h3>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                      activeChat.type === 'Admin' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {activeChat.type}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    {activeChat.memberCount || 0} members active
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Phone size={20} className="text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Video size={20} className="text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Search size={20} className="text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <MoreVertical size={20} className="text-gray-600" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {activeChat.messages && activeChat.messages.length > 0 ? (
                Object.entries(groupedMessages).map(([dateKey, messages]) => {
                  const date = new Date(dateKey);
                  return (
                    <div key={dateKey}>
                      <div className="text-center mb-4">
                        <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                          {formatDate(date)}, {date.toLocaleDateString('en-US', { year: 'numeric' })}
                        </span>
                      </div>
                      {messages.map(msg => (
                        <div
                          key={msg.id}
                          className={`flex mb-4 ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`max-w-[70%] ${msg.isOwn ? 'order-2' : 'order-1'}`}>
                            {!msg.isOwn && (
                              <p className="text-xs text-gray-600 mb-1 ml-1">{msg.sender}</p>
                            )}
                            <div
                              className={`rounded-lg p-3 ${
                                msg.type === 'emergency'
                                  ? 'bg-red-50 border-2 border-red-500'
                                  : msg.isOwn
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-gray-100 text-gray-900'
                              }`}
                            >
                              {msg.type === 'emergency' && (
                                <div className="flex items-center gap-2 mb-2">
                                  <AlertCircle className="text-red-600" size={16} />
                                  <span className="text-xs font-semibold text-red-600">EMERGENCY REQUEST</span>
                                </div>
                              )}
                              <p className={`text-sm ${msg.isOwn ? 'text-white' : 'text-gray-900'}`}>
                                {msg.content}
                              </p>
                              <p className={`text-xs mt-1 ${
                                msg.isOwn ? 'text-blue-100' : 'text-gray-500'
                              }`}>
                                {formatTime(msg.timestamp)}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">No messages yet. Start the conversation!</p>
                </div>
              )}
              
              {/* Typing Indicator */}
              {typingUsers.length > 0 && (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>{typingUsers.join(', ')} {typingUsers.length === 1 ? 'is' : 'are'} typing</span>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <div className="flex items-end gap-2 mb-2">
                <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                  <Paperclip size={20} className="text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                  <ImageIcon size={20} className="text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                  <Smile size={20} className="text-gray-600" />
                </button>
                <div className="flex-1">
                  <textarea
                    value={messageInput}
                    onChange={(e) => {
                      setMessageInput(e.target.value);
                      handleTyping();
                    }}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message..."
                    rows={1}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    style={{ minHeight: '40px', maxHeight: '120px' }}
                  />
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!isConnected}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={18} />
                  Send
                </button>
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isEmergency}
                    onChange={(e) => setIsEmergency(e.target.checked)}
                    className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                  />
                  <span className="text-sm text-gray-700 flex items-center gap-1">
                    <AlertCircle size={14} className="text-red-600" />
                    Mark as Emergency
                  </span>
                </label>
                <p className="text-xs text-gray-500">Press Enter to send, Shift+Enter for new line</p>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-500 text-lg">Select a chat to start messaging</p>
            </div>
          </div>
        )}
      </div>

      {/* Right Panel - Chat Details */}
      {activeChat && (
        <div className="w-80 bg-white border-l border-gray-200 p-4 overflow-y-auto">
          {/* Chat Info */}
          <div className="text-center mb-6 pb-6 border-b border-gray-200">
            <div className="relative inline-block mb-3">
              <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-lg mx-auto">
                {activeChat.avatar}
              </div>
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">{activeChat.name}</h3>
            <span className={`inline-block px-3 py-1 rounded text-xs font-medium mb-2 ${
              activeChat.type === 'Admin' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
            }`}>
              {activeChat.type} Team
            </span>
            <p className="text-sm text-green-600 flex items-center justify-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Active Now
            </p>
          </div>

          {/* Quick Actions */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Quick Actions</h4>
            <div className="space-y-2">
              <button className="w-full flex items-center justify-between p-3 bg-red-50 hover:bg-red-100 rounded-lg transition-colors text-left">
                <div className="flex items-center gap-3">
                  <AlertCircle className="text-red-600" size={20} />
                  <span className="text-sm font-medium text-red-900">Send Emergency Alert</span>
                </div>
                <ChevronRight size={18} className="text-red-600" />
              </button>
              <button className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-left">
                <div className="flex items-center gap-3">
                  <MapPin className="text-gray-600" size={20} />
                  <span className="text-sm font-medium text-gray-900">Share Location</span>
                </div>
                <ChevronRight size={18} className="text-gray-600" />
              </button>
              <button className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-left">
                <div className="flex items-center gap-3">
                  <FileText className="text-gray-600" size={20} />
                  <span className="text-sm font-medium text-gray-900">Request Resources</span>
                </div>
                <ChevronRight size={18} className="text-gray-600" />
              </button>
            </div>
          </div>

          {/* Shared Files */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Shared Files</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <FileText className="text-red-600" size={20} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Emergency_Protocol.pdf</p>
                  <p className="text-xs text-gray-500">2.4 MB</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <ImageIcon className="text-blue-600" size={20} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Location_Map.jpg</p>
                  <p className="text-xs text-gray-500">1.8 MB</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Chat Modal */}
      {showNewChatModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Create New Chat</h2>
              <button
                onClick={() => {
                  setShowNewChatModal(false);
                  setNewChatName('');
                  setNewChatType('Admin');
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Chat Name *
                </label>
                <input
                  type="text"
                  value={newChatName}
                  onChange={(e) => setNewChatName(e.target.value)}
                  placeholder="Enter chat name..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Chat Type *
                </label>
                <select
                  value={newChatType}
                  onChange={(e) => setNewChatType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Admin">Admin</option>
                  <option value="Rescue">Rescue</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowNewChatModal(false);
                  setNewChatName('');
                  setNewChatType('Admin');
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateChat}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Chat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveChatBoard;
