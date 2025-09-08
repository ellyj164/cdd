import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  Bot, 
  User, 
  Headphones, 
  Search,
  FileText,
  CheckCircle,
  AlertCircle,
  Star,
  ThumbsUp,
  ThumbsDown,
  Paperclip,
  Image,
  Video,
  Mic,
  Camera,
  MapPin,
  Calendar,
  Filter,
  MoreHorizontal,
  X,
  Plus,
  ArrowLeft,
  ExternalLink,
  Download,
  Share2,
  Flag,
  Shield,
  Zap,
  Globe,
  Settings,
  Bell,
  RefreshCw
} from 'lucide-react';

// Comprehensive Customer Support System
export const CustomerSupportSystem = ({ 
  userId, 
  userRole = 'customer', // customer, agent, admin
  onTicketCreate,
  onTicketUpdate 
}) => {
  const [activeView, setActiveView] = useState('chat');
  const [chatMessages, setChatMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [knowledgeBase, setKnowledgeBase] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const chatEndRef = useRef(null);

  // Initialize data
  useEffect(() => {
    // Load chat history
    setChatMessages([
      {
        id: 1,
        type: 'system',
        content: 'Welcome to Global Nexus Support! I\'m your AI assistant. How can I help you today?',
        timestamp: new Date(),
        agent: 'AI Assistant'
      }
    ]);

    // Load support tickets
    setTickets([
      {
        id: 'TKT-001234',
        subject: 'Order delivery issue',
        status: 'open',
        priority: 'high',
        category: 'shipping',
        createdAt: new Date('2024-01-20'),
        updatedAt: new Date('2024-01-21'),
        customer: {
          name: 'John Smith',
          email: 'john@example.com',
          avatar: '/api/placeholder/40/40'
        },
        agent: {
          name: 'Sarah Johnson',
          avatar: '/api/placeholder/40/40'
        },
        messages: [
          {
            id: 1,
            content: 'My order was supposed to arrive yesterday but I haven\'t received it yet.',
            author: 'customer',
            timestamp: new Date('2024-01-20T14:30:00')
          },
          {
            id: 2,
            content: 'I apologize for the delay. Let me check your order status. Can you provide your order number?',
            author: 'agent',
            timestamp: new Date('2024-01-20T14:45:00')
          }
        ]
      },
      {
        id: 'TKT-001235',
        subject: 'Refund request for damaged item',
        status: 'in-progress',
        priority: 'medium',
        category: 'returns',
        createdAt: new Date('2024-01-19'),
        updatedAt: new Date('2024-01-21'),
        customer: {
          name: 'Emily Davis',
          email: 'emily@example.com',
          avatar: '/api/placeholder/40/40'
        },
        agent: {
          name: 'Mike Chen',
          avatar: '/api/placeholder/40/40'
        },
        messages: []
      }
    ]);

    // Load knowledge base
    setKnowledgeBase([
      {
        id: 1,
        title: 'How to track your order',
        category: 'Shipping',
        content: 'You can track your order by visiting the Order Tracking page and entering your order number.',
        views: 1245,
        helpful: 89,
        tags: ['shipping', 'tracking', 'orders']
      },
      {
        id: 2,
        title: 'Return and refund policy',
        category: 'Returns',
        content: 'Items can be returned within 30 days of purchase for a full refund.',
        views: 2156,
        helpful: 95,
        tags: ['returns', 'refunds', 'policy']
      },
      {
        id: 3,
        title: 'Payment methods accepted',
        category: 'Payment',
        content: 'We accept all major credit cards, PayPal, Apple Pay, and Google Pay.',
        views: 987,
        helpful: 78,
        tags: ['payment', 'cards', 'methods']
      }
    ]);
  }, []);

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // AI Chat functionality
  const sendMessage = async () => {
    if (!currentMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: currentMessage,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(currentMessage);
      setChatMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userMessage) => {
    const responses = {
      'order': 'I can help you with your order. Please provide your order number so I can look up the details.',
      'shipping': 'For shipping inquiries, you can track your package using our order tracking system. Would you like me to help you with that?',
      'return': 'Our return policy allows returns within 30 days. I can help you initiate a return process. What item would you like to return?',
      'payment': 'We accept various payment methods including credit cards, PayPal, and digital wallets. What payment issue are you experiencing?',
      'account': 'I can help you with account-related questions. Are you having trouble logging in or updating your information?',
      'default': 'I understand you need assistance. Let me connect you with the right information or a human agent who can help you better.'
    };

    const messageWords = userMessage.toLowerCase();
    let responseKey = 'default';

    for (const key in responses) {
      if (messageWords.includes(key)) {
        responseKey = key;
        break;
      }
    }

    return {
      id: Date.now(),
      type: 'ai',
      content: responses[responseKey],
      timestamp: new Date(),
      agent: 'AI Assistant',
      suggestions: [
        'Track my order',
        'Return an item',
        'Contact human agent',
        'Check order status'
      ]
    };
  };

  const handleSuggestionClick = (suggestion) => {
    setCurrentMessage(suggestion);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-red-600';
      case 'urgent': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diff = now - date;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Customer Support Center
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Get help through live chat, submit tickets, or browse our knowledge base
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-6">
              <h3 className="text-lg font-bold mb-4">Support Options</h3>
              <nav className="space-y-2">
                {[
                  { id: 'chat', label: 'Live Chat', icon: MessageSquare, badge: 'AI' },
                  { id: 'tickets', label: 'Support Tickets', icon: FileText, badge: tickets.filter(t => t.status !== 'closed').length },
                  { id: 'knowledge', label: 'Knowledge Base', icon: Search },
                  { id: 'contact', label: 'Contact Us', icon: Phone },
                  { id: 'feedback', label: 'Feedback', icon: Star }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setActiveView(item.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                      activeView === item.id
                        ? 'bg-primary-50 text-primary-700 border border-primary-200'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon className="h-5 w-5" />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.badge === 'AI' 
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </div>

            {/* Quick Stats */}
            <div className="border-t border-gray-200 dark:border-gray-600 p-6">
              <h4 className="font-bold mb-3">Support Statistics</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Response Time</span>
                  <span className="text-sm font-medium">< 2 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Resolution Rate</span>
                  <span className="text-sm font-medium">94.5%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Satisfaction</span>
                  <span className="text-sm font-medium">4.8/5</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {activeView === 'chat' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 h-96 flex flex-col">
              {/* Chat Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-600">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                    <Bot className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold">AI Support Assistant</h3>
                    <p className="text-sm text-green-600">Online • Instant replies</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                    <Phone className="h-4 w-4" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                    <Video className="h-4 w-4" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {chatMessages.map(message => (
                  <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-md ${
                      message.type === 'user' 
                        ? 'bg-primary-600 text-white rounded-l-2xl rounded-tr-2xl rounded-br-md'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-r-2xl rounded-tl-2xl rounded-bl-md'
                    } p-3`}>
                      {message.type !== 'user' && (
                        <div className="flex items-center space-x-2 mb-2">
                          <Bot className="h-4 w-4" />
                          <span className="text-xs font-medium">{message.agent}</span>
                        </div>
                      )}
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}

                {/* AI Suggestions */}
                {chatMessages.length > 0 && chatMessages[chatMessages.length - 1].type === 'ai' && chatMessages[chatMessages.length - 1].suggestions && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {chatMessages[chatMessages.length - 1].suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-r-2xl rounded-tl-2xl rounded-bl-md p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Chat Input */}
              <div className="border-t border-gray-200 dark:border-gray-600 p-4">
                <div className="flex items-center space-x-3">
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                    <Paperclip className="h-5 w-5 text-gray-500" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                    <Image className="h-5 w-5 text-gray-500" />
                  </button>
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={currentMessage}
                      onChange={(e) => setCurrentMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      placeholder="Type your message..."
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                    <Mic className="h-5 w-5 text-gray-500" />
                  </button>
                  <button
                    onClick={sendMessage}
                    disabled={!currentMessage.trim()}
                    className="p-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeView === 'tickets' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              {selectedTicket ? (
                // Ticket Detail View
                <div>
                  <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-600">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => setSelectedTicket(null)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                      >
                        <ArrowLeft className="h-5 w-5" />
                      </button>
                      <div>
                        <h2 className="text-xl font-bold">{selectedTicket.subject}</h2>
                        <p className="text-sm text-gray-500">Ticket #{selectedTicket.id}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedTicket.status)}`}>
                        {selectedTicket.status}
                      </span>
                      <span className={`text-sm font-medium ${getPriorityColor(selectedTicket.priority)}`}>
                        {selectedTicket.priority} priority
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2">
                        {/* Ticket Conversation */}
                        <div className="space-y-4">
                          {selectedTicket.messages.map(message => (
                            <div key={message.id} className={`flex ${message.author === 'customer' ? 'justify-end' : 'justify-start'}`}>
                              <div className={`max-w-lg ${
                                message.author === 'customer'
                                  ? 'bg-primary-50 dark:bg-primary-900/20 border border-primary-200'
                                  : 'bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600'
                              } rounded-lg p-4`}>
                                <div className="flex items-center space-x-2 mb-2">
                                  <User className="h-4 w-4" />
                                  <span className="text-sm font-medium">
                                    {message.author === 'customer' ? selectedTicket.customer.name : selectedTicket.agent.name}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    {message.timestamp.toLocaleString()}
                                  </span>
                                </div>
                                <p className="text-gray-900 dark:text-white">{message.content}</p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Reply Form */}
                        <div className="mt-6 border-t border-gray-200 dark:border-gray-600 pt-6">
                          <textarea
                            placeholder="Type your reply..."
                            rows={4}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                          />
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center space-x-3">
                              <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                                <Paperclip className="h-4 w-4" />
                                <span>Attach</span>
                              </button>
                              <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                                <Camera className="h-4 w-4" />
                                <span>Photo</span>
                              </button>
                            </div>
                            <button className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                              Send Reply
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="lg:col-span-1">
                        {/* Ticket Sidebar */}
                        <div className="space-y-6">
                          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                            <h4 className="font-bold mb-3">Ticket Details</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">Created:</span>
                                <span>{selectedTicket.createdAt.toLocaleDateString()}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">Updated:</span>
                                <span>{formatTimeAgo(selectedTicket.updatedAt)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">Category:</span>
                                <span className="capitalize">{selectedTicket.category}</span>
                              </div>
                            </div>
                          </div>

                          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                            <h4 className="font-bold mb-3">Customer Info</h4>
                            <div className="flex items-center space-x-3 mb-3">
                              <img
                                src={selectedTicket.customer.avatar}
                                alt={selectedTicket.customer.name}
                                className="w-10 h-10 rounded-full"
                              />
                              <div>
                                <p className="font-medium">{selectedTicket.customer.name}</p>
                                <p className="text-sm text-gray-500">{selectedTicket.customer.email}</p>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <button className="w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700">
                              Mark as Resolved
                            </button>
                            <button className="w-full py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                              Escalate Ticket
                            </button>
                            <button className="w-full py-2 px-4 border border-red-300 text-red-600 rounded-lg hover:bg-red-50">
                              Close Ticket
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // Tickets List View
                <div>
                  <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-600">
                    <h2 className="text-xl font-bold">Support Tickets</h2>
                    <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center space-x-2">
                      <Plus className="h-4 w-4" />
                      <span>New Ticket</span>
                    </button>
                  </div>

                  <div className="p-6">
                    {/* Filters */}
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="flex-1">
                        <input
                          type="text"
                          placeholder="Search tickets..."
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                        />
                      </div>
                      <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white">
                        <option value="">All Status</option>
                        <option value="open">Open</option>
                        <option value="in-progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                      </select>
                      <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white">
                        <option value="">All Priority</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>

                    {/* Tickets List */}
                    <div className="space-y-4">
                      {tickets.map(ticket => (
                        <div
                          key={ticket.id}
                          onClick={() => setSelectedTicket(ticket)}
                          className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="font-bold text-gray-900 dark:text-white">{ticket.subject}</h3>
                              <p className="text-sm text-gray-500">#{ticket.id}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                                {ticket.status}
                              </span>
                              <span className={`text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                                {ticket.priority}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <img
                                src={ticket.customer.avatar}
                                alt={ticket.customer.name}
                                className="w-8 h-8 rounded-full"
                              />
                              <div>
                                <p className="text-sm font-medium">{ticket.customer.name}</p>
                                <p className="text-xs text-gray-500 capitalize">{ticket.category}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-500">Updated {formatTimeAgo(ticket.updatedAt)}</p>
                              {ticket.agent && (
                                <p className="text-xs text-gray-500">Assigned to {ticket.agent.name}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeView === 'knowledge' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="p-6 border-b border-gray-200 dark:border-gray-600">
                <h2 className="text-xl font-bold mb-4">Knowledge Base</h2>
                <div className="relative">
                  <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search articles..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {knowledgeBase
                    .filter(article => 
                      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      article.content.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map(article => (
                      <div key={article.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-3">
                          <span className="px-2 py-1 bg-primary-100 text-primary-800 text-xs font-medium rounded-full">
                            {article.category}
                          </span>
                          <div className="flex items-center space-x-1 text-sm text-gray-500">
                            <Eye className="h-4 w-4" />
                            <span>{article.views}</span>
                          </div>
                        </div>
                        
                        <h3 className="font-bold text-gray-900 dark:text-white mb-2">{article.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{article.content}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1">
                            <ThumbsUp className="h-4 w-4 text-green-500" />
                            <span className="text-sm text-gray-500">{article.helpful}% helpful</span>
                          </div>
                          <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                            Read More
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          {activeView === 'contact' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-6">Contact Us</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Contact Methods */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="p-3 bg-blue-100 dark:bg-blue-800 rounded-full">
                        <Phone className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-bold">Phone Support</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Available 24/7</p>
                        <p className="font-medium text-blue-600">1-800-SUPPORT</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="p-3 bg-green-100 dark:bg-green-800 rounded-full">
                        <Mail className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-bold">Email Support</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Response within 2 hours</p>
                        <p className="font-medium text-green-600">support@globalnexus.com</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <div className="p-3 bg-purple-100 dark:bg-purple-800 rounded-full">
                        <MessageSquare className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-bold">Live Chat</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Instant AI assistance</p>
                        <p className="font-medium text-purple-600">Available now</p>
                      </div>
                    </div>
                  </div>

                  {/* Contact Form */}
                  <div>
                    <h3 className="font-bold mb-4">Send us a message</h3>
                    <form className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Subject
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                          placeholder="How can we help?"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Category
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white">
                          <option value="">Select a category</option>
                          <option value="orders">Orders & Shipping</option>
                          <option value="returns">Returns & Refunds</option>
                          <option value="account">Account Issues</option>
                          <option value="technical">Technical Support</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Message
                        </label>
                        <textarea
                          rows={4}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                          placeholder="Please describe your issue..."
                        />
                      </div>
                      
                      <button className="w-full py-2 px-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                        Send Message
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeView === 'feedback' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-6">Feedback & Ratings</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Feedback Form */}
                  <div>
                    <h3 className="font-bold mb-4">Rate Your Experience</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Overall Satisfaction
                        </label>
                        <div className="flex space-x-2">
                          {[1, 2, 3, 4, 5].map(rating => (
                            <button key={rating} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                              <Star className="h-6 w-6 text-yellow-400 fill-current" />
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          What went well?
                        </label>
                        <textarea
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                          placeholder="Tell us what you liked..."
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          How can we improve?
                        </label>
                        <textarea
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                          placeholder="Suggestions for improvement..."
                        />
                      </div>
                      
                      <button className="w-full py-2 px-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                        Submit Feedback
                      </button>
                    </div>
                  </div>

                  {/* Recent Feedback */}
                  <div>
                    <h3 className="font-bold mb-4">Recent Customer Feedback</h3>
                    <div className="space-y-4">
                      {[
                        { rating: 5, comment: "Excellent customer service! Quick response and helpful.", date: '2024-01-21' },
                        { rating: 4, comment: "Good experience overall. Minor delay in response.", date: '2024-01-20' },
                        { rating: 5, comment: "AI chat was very helpful and resolved my issue quickly.", date: '2024-01-19' }
                      ].map((feedback, index) => (
                        <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex space-x-1">
                              {[1, 2, 3, 4, 5].map(star => (
                                <Star
                                  key={star}
                                  className={`h-4 w-4 ${
                                    star <= feedback.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">{feedback.date}</span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{feedback.comment}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerSupportSystem;