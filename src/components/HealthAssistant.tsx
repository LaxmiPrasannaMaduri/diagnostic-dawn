import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Brain, Send, User, Bot } from "lucide-react";
import { useHealthChat } from "@/hooks/useHealthChat";
import { useState } from "react";

const HealthAssistant = () => {
  const { messages, sendMessage, isLoading } = useHealthChat();
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input.trim());
    setInput("");
  };

  return (
    <section id="assistant" className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
            <Brain className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI Assistant</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            24/7 Health Consultation
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get instant answers to your health questions from our AI-powered medical assistant
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="shadow-[var(--shadow-card)]">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5 border-b">
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-6 h-6 text-primary" />
                AI Health Assistant
              </CardTitle>
              <CardDescription>
                Ask me anything about symptoms, diseases, or general health
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[500px] p-6">
                <div className="space-y-4">
                  {messages.map((message, idx) => (
                    <div
                      key={idx}
                      className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {message.role === "assistant" && (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                          <Bot className="w-5 h-5 text-white" />
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                          message.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary/50 text-foreground"
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{message.content}</p>
                      </div>
                      {message.role === "user" && (
                        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                          <User className="w-5 h-5 text-foreground" />
                        </div>
                      )}
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                      <div className="bg-secondary/50 rounded-2xl px-4 py-3">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" />
                          <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:0.2s]" />
                          <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:0.4s]" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
              
              <div className="border-t p-4 bg-background">
                <div className="flex gap-2">
                  <Input
                    placeholder="Ask about symptoms, diseases, or health advice..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleSend} 
                    disabled={isLoading || !input.trim()}
                    variant="medical"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HealthAssistant;
