import React, { useState, useEffect, useRef } from 'react';
import { Send, MessageCircle, User, Clock, CheckCircle } from 'lucide-react';
import { chatAPI, ChatMessage } from '../services/api';
import { authService } from '../services/authService';

interface Thread {
  id: string;
  universityName: string;
  formationTitle: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
}

const ChatPage = () => {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedThread, setSelectedThread] = useState<Thread | null>(null);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (authService.isAuthenticated()) {
      fetchThreads();
    }
  }, []);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchThreads = async () => {
    try {
      setLoading(true);
      const response = await chatAPI.getThreads();
      const mockThreads: Thread[] = [
        {
          id: '1',
          universityName: 'Université d\'Antananarivo',
          formationTitle: 'Informatique de Gestion',
          lastMessage: 'Votre dossier a été reçu et est en cours d\'examen.',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          unreadCount: 2
        },
        {
          id: '2',
          universityName: 'EMIT Fianarantsoa',
          formationTitle: 'Marketing Digital',
          lastMessage: 'Nous avons besoin de votre bulletin du baccalauréat.',
          timestamp: new Date(Date.now() - 7200000).toISOString(),
          unreadCount: 0
        },
        {
          id: '3',
          universityName: 'Université de Toamasina',
          formationTitle: 'Sciences Marines',
          lastMessage: 'Félicitations ! Votre inscription a été acceptée.',
          timestamp: new Date(Date.now() - 86400000).toISOString(),
          unreadCount: 1
        }
      ];
      setThreads(mockThreads);

      // Select first thread by default
      if (mockThreads.length > 0) {
        setSelectedThread(mockThreads[0]);
        fetchMessages(mockThreads[0].id);
      }
    } catch (err: any) {
      setError('Erreur lors du chargement des conversations');
      console.error('Error fetching threads:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (threadId: string) => {
    try {
      const response = await chatAPI.getMessages(threadId);
      const mockMessages: ChatMessage[] = [
        {
          _id: '1',
          threadKey: threadId,
          fromUserId: 'university-admin',
          toUserId: authService.getUser()?._id || '',
          body: 'Bonjour ! Nous avons bien reçu votre demande d\'inscription.',
          createdAt: new Date(Date.now() - 3600000).toISOString()
        },
        {
          _id: '2',
          threadKey: threadId,
          fromUserId: authService.getUser()?._id || '',
          toUserId: 'university-admin',
          body: 'Merci ! Quand aurai-je une réponse concernant mon dossier ?',
          createdAt: new Date(Date.now() - 1800000).toISOString()
        },
        {
          _id: '3',
          threadKey: threadId,
          fromUserId: 'university-admin',
          toUserId: authService.getUser()?._id || '',
          body: 'Votre dossier est en cours d\'examen. Nous vous tiendrons informé dans les plus brefs délais.',
          createdAt: new Date(Date.now() - 900000).toISOString()
        }
      ];
      setMessages(mockMessages);
    } catch (err: any) {
      console.error('Error fetching messages:', err);
    }
  };

  const selectThread = (thread: Thread) => {
    setSelectedThread(thread);
    fetchMessages(thread.id);
    // Mark as read
    setThreads(prev => prev.map(t =>
      t.id === thread.id ? { ...t, unreadCount: 0 } : t
    ));
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedThread) return;

    const messageText = newMessage.trim();
    setNewMessage('');
    setSending(true);

    try {
      // Create user message immediately
      const userMessage: ChatMessage = {
        _id: `msg-${Date.now()}`,
        threadKey: selectedThread.id,
        fromUserId: authService.getUser()?._id || '',
        toUserId: 'university-admin',
        body: messageText,
        createdAt: new Date().toISOString()
      };

      setMessages(prev => [...prev, userMessage]);

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simulate university response after a delay
      setTimeout(() => {
        const responses = [
          'Merci pour votre message. Nous traitons votre demande.',
          'Votre dossier est en cours d\'examen par notre équipe.',
          'Nous vous contacterons dès que possible avec une réponse.',
          'Pouvez-vous nous fournir plus de détails sur votre demande ?',
          'Nous avons bien reçu votre message et y répondrons rapidement.'
        ];

        const randomResponse = responses[Math.floor(Math.random() * responses.length)];

        const universityMessage: ChatMessage = {
          _id: `msg-${Date.now() + 1}`,
          threadKey: selectedThread.id,
          fromUserId: 'university-admin',
          toUserId: authService.getUser()?._id || '',
          body: randomResponse,
          createdAt: new Date().toISOString()
        };

        setMessages(prev => [...prev, universityMessage]);

        // Update thread's last message
        setThreads(prev => prev.map(t =>
          t.id === selectedThread.id
            ? { ...t, lastMessage: messageText, timestamp: new Date().toISOString() }
            : t
        ));
      }, 2000 + Math.random() * 3000); // Random delay between 2-5 seconds

    } catch (err: any) {
      setError('Erreur lors de l\'envoi du message');
      // Re-add the message if sending failed
      setNewMessage(messageText);
    } finally {
      setSending(false);
    }
  };

  if (!authService.isAuthenticated()) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Connexion requise</h2>
          <p className="text-gray-600">Veuillez vous connecter pour accéder à la messagerie</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Messagerie</h1>
          <p className="text-gray-600 mt-1">
            Échangez avec les universités concernant vos formations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Conversations List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Conversations</h2>

              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-2 text-gray-600">Chargement...</p>
                </div>
              ) : threads.length === 0 ? (
                <div className="text-center py-8">
                  <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune conversation</h3>
                  <p className="text-gray-600 text-sm">
                    Vous n'avez pas encore de conversations. Les universités vous contacteront ici concernant vos inscriptions.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {threads.map((thread) => (
                    <div
                      key={thread.id}
                      onClick={() => selectThread(thread)}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedThread?.id === thread.id
                          ? 'bg-blue-100 border-blue-200'
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          selectedThread?.id === thread.id ? 'bg-blue-200' : 'bg-gray-200'
                        }`}>
                          <User className={`w-5 h-5 ${
                            selectedThread?.id === thread.id ? 'text-blue-700' : 'text-gray-600'
                          }`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-gray-900 truncate">{thread.universityName}</h3>
                            {thread.unreadCount > 0 && (
                              <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                {thread.unreadCount}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 truncate">{thread.formationTitle}</p>
                          <div className="flex items-center justify-between mt-1">
                            <p className="text-xs text-gray-500 truncate">{thread.lastMessage}</p>
                            <span className="text-xs text-gray-400">
                              {new Date(thread.timestamp).toLocaleDateString('fr-FR', {
                                day: '2-digit',
                                month: '2-digit'
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm h-[600px] flex flex-col">
              {/* Chat Header */}
              <div className="p-6 border-b border-gray-200">
                {selectedThread ? (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{selectedThread.universityName}</h3>
                      <p className="text-sm text-gray-600">{selectedThread.formationTitle}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-xs text-gray-500">En ligne</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <h3 className="text-lg font-medium text-gray-900">Sélectionnez une conversation</h3>
                    <p className="text-sm text-gray-600">Choisissez une conversation pour commencer à discuter</p>
                  </div>
                )}
              </div>

              {/* Messages Area */}
              <div className="flex-1 p-6 overflow-y-auto">
                {messages.length === 0 ? (
                  <div className="text-center py-12">
                    <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun message</h3>
                    <p className="text-gray-600">Commencez une conversation avec l'université</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message) => {
                      const isOwnMessage = message.fromUserId === authService.getUser()?._id;
                      const isUniversityMessage = message.fromUserId === 'university-admin';

                      return (
                        <div
                          key={message._id}
                          className={`flex mb-4 ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`flex max-w-xs lg:max-w-md ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'}`}>
                            {/* Avatar */}
                            <div className={`flex-shrink-0 ${isOwnMessage ? 'ml-3' : 'mr-3'}`}>
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                isUniversityMessage ? 'bg-blue-100' : 'bg-gray-100'
                              }`}>
                                <User className={`w-4 h-4 ${
                                  isUniversityMessage ? 'text-blue-600' : 'text-gray-600'
                                }`} />
                              </div>
                            </div>

                            {/* Message bubble */}
                            <div
                              className={`px-4 py-2 rounded-2xl shadow-sm ${
                                isOwnMessage
                                  ? 'bg-blue-600 text-white'
                                  : isUniversityMessage
                                    ? 'bg-blue-50 text-blue-900 border border-blue-200'
                                    : 'bg-gray-100 text-gray-900'
                              }`}
                            >
                              <p className="text-sm leading-relaxed">{message.body}</p>
                              <div className={`flex items-center justify-end mt-1 space-x-1 ${
                                isOwnMessage ? 'text-blue-100' : 'text-gray-500'
                              }`}>
                                <span className="text-xs">
                                  {new Date(message.createdAt).toLocaleTimeString('fr-FR', {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </span>
                                {isOwnMessage && (
                                  <CheckCircle className="w-3 h-3" />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Message Input */}
              {selectedThread && (
                <div className="p-6 border-t border-gray-200">
                  {sending && (
                    <div className="mb-4 text-center">
                      <div className="inline-flex items-center gap-2 text-sm text-gray-600">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                        Envoi en cours...
                      </div>
                    </div>
                  )}
                  <form onSubmit={handleSendMessage} className="flex gap-4">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Tapez votre message..."
                      disabled={sending}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    <button
                      type="submit"
                      disabled={!newMessage.trim() || sending}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      {sending ? 'Envoi...' : 'Envoyer'}
                    </button>
                  </form>
                  <div className="mt-2 text-xs text-gray-500 text-center">
                    💡 Les universités répondent généralement sous 24h
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;