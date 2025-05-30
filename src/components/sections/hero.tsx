import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronRight, 
  DollarSign, 
  PieChart, 
  TrendingUp, 
  Send, 
  RefreshCw,
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ChatBubble, TypingIndicator } from '../ui/chat-bubble';
import { useChat } from '../../context/ChatContext';
import { VideoBackground } from '../ui/video-background';

export function HeroSection() {
  const { messages, isTyping, sendMessage, clearChat, suggestedQuestions } = useChat();
  const [userInput, setUserInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (userInput.trim()) {
      sendMessage(userInput);
      setUserInput('');
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    sendMessage(question);
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  return (
    <section
      id="home"
      className="relative min-h-screen pt-24 pb-16 flex items-center overflow-hidden"
    >
      {/* Video background with financial animations */}
      <VideoBackground className="-z-10" />

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column: Text content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Badge variant="gradient" className="mb-4">
                Your Financial Coach
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
            >
              Smarter Finance. 
              <span className="text-primary"> Instantly.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-lg text-muted-foreground max-w-xl"
            >
              Get AI-powered budgeting, saving, and investing advice in a simple chat. 
              Your personal financial advisor is just a message away.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <Button
                size="xl"
                variant="gradient"
                className="group"
                onClick={() => {
                  const chatSection = document.getElementById('chat-section');
                  if (chatSection) {
                    chatSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Start Chat Now
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={() => {
                    const subscriptionSection = document.getElementById('subscription');
                    if (subscriptionSection) {
                      subscriptionSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  Get 1:1 Personalized Advice
                </Button>
              </div>
            </motion.div>
          </motion.div>

          {/* Right column: Chat window */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="relative"
          >
            <div className="bg-card rounded-2xl shadow-lg border p-6 relative z-10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold flex items-center">
                  <span className="text-primary mr-2">FinIQ</span> Assistant
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-1 bg-success/10 text-success rounded-full">
                    Online
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearChat}
                    className="text-xs flex items-center gap-1"
                  >
                    <RefreshCw className="h-3 w-3" />
                    <span>New Chat</span>
                  </Button>
                </div>
              </div>
              
              <div className="h-[300px] overflow-y-auto mb-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <ChatBubble key={message.id} message={message} />
                  ))}
                  {isTyping && <TypingIndicator />}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              <div className="border-t pt-4">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Ask about your finances..."
                    className="flex-1 bg-background rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Button type="submit" variant="default" size="icon" disabled={!userInput.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </form>

                <div className="mt-4 flex flex-wrap gap-2">
                  {suggestedQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestedQuestion(question)}
                      className="text-xs bg-muted px-3 py-1 rounded-full hover:bg-primary/10 transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating financial icons */}
            <motion.div 
              className="absolute top-12 -right-10 text-primary bg-card p-3 rounded-full shadow-md border animate-float"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <DollarSign className="h-6 w-6" />
            </motion.div>
            
            <motion.div 
              className="absolute bottom-12 right-20 text-secondary bg-card p-3 rounded-full shadow-md border animate-float-delay-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <PieChart className="h-6 w-6" />
            </motion.div>
            
            <motion.div 
              className="absolute top-1/2 -right-4 text-accent bg-card p-3 rounded-full shadow-md border animate-float-delay-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
            >
              <TrendingUp className="h-6 w-6" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}