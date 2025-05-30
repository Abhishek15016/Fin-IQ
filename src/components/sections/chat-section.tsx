import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { Button } from '../ui/button';
import { ChatBubble, TypingIndicator } from '../ui/chat-bubble';
import { useChat } from '../../context/ChatContext';
import { ProfileForm } from '../ui/profile-form';

export function ChatSection() {
  const { messages, isTyping, sendMessage, clearChat, suggestedQuestions, hasProfile } = useChat();
  const [userInput, setUserInput] = React.useState('');
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

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

  return (
    <section id="chat-section" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-card rounded-2xl shadow-lg border p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">FinIQ Assistant</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearChat}
                className="text-sm"
              >
                New Chat
              </Button>
            </div>

            {!hasProfile ? (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-2 text-foreground">Set Up Your Financial Profile</h3>
                  <p className="text-muted-foreground">
                    Please provide your financial information to get personalized advice.
                  </p>
                </div>
                <ProfileForm />
              </div>
            ) : (
              <>
                <div className="h-[400px] overflow-y-auto mb-4">
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
              </>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}