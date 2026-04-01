"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Send,
  X,
  MessageSquare,
  ChevronUp,
  MessageCircle,
  Phone,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { useMobilePerformance } from "@/hooks/useMobilePerformance";

interface Message {
  id: string;
  type: "bot" | "user";
  text: string;
  options?: string[];
  cta?: boolean;
}

const QUICK_OPTIONS = [
  "Website Design",
  "E-commerce Store",
  "Portfolio Website",
  "AI Integration",
  "Not sure (Guide me)"
];

export default function AIChatBot() {
  const { isMobile } = useMobilePerformance();
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      text: "Hey 👋 Welcome to WebGrows! Looking to build something amazing?",
      options: QUICK_OPTIONS
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      text: text.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI logic
    setTimeout(() => {
      processBotResponse(text.trim());
    }, 1000);
  };

  const processBotResponse = (input: string) => {
    setIsTyping(false);
    const lowInput = input.toLowerCase();
    let response: Message = {
      id: (Date.now() + 1).toString(),
      type: "bot",
      text: ""
    };

    if (lowInput.includes("website") || lowInput.includes("design")) {
      response.text = "We don't just build websites, we build brands 🚀. What industry is your business in?";
    } else if (lowInput.includes("ecommerce") || lowInput.includes("store")) {
      response.text = "E-commerce is our bread and butter! We can build a high-converting store for you. What's your target budget range?";
    } else if (lowInput.includes("ai") || lowInput.includes("integration")) {
      response.text = "AI is the future! We can integrate custom agents into your workflow. Shall we discuss a timeline?";
    } else if (lowInput === "start" || lowInput.includes("contact") || lowInput.includes("hire")) {
      response.text = "Let's bring your vision to life! Contact us 🚀\n\n📞 Phone: 9351469466\n💰 UPI: 9351469466@ibl";
      response.cta = true;
    } else {
      // Confident fallback
      response.text = "That's a fantastic idea! We specialize in building unique, high-end solutions exactly like that. Let's discuss how we can engineer it perfectly for your brand. Type 'START' to begin!";
    }

    setMessages(prev => [...prev, response]);
  };

  return (
    <>
      {/* 1. Sticky Search Bar / Toggle */}
      <div className={`fixed bottom-6 right-6 lg:left-1/2 lg:-translate-x-1/2 z-[150] ${isMobile ? "w-auto" : "w-full max-w-lg px-6"} pointer-events-none`}>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="pointer-events-auto"
        >
          {isMobile ? (
            <button
              onClick={() => setIsOpen(true)}
              className={`
                w-14 h-14 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center shadow-2xl border border-white/20
                hover:scale-110 active:scale-95 transition-all
                ${isOpen ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100"}
              `}
            >
              <MessageCircle className="w-7 h-7 text-white" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-black animate-pulse" />
            </button>
          ) : (
            <div
              onClick={() => { if (!isOpen) setIsOpen(true); }}
              className={`
                relative flex items-center bg-black/60 backdrop-blur-xl border border-white/10 rounded-full px-4 py-3 cursor-pointer
                shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all hover:border-purple-500/50 group
                ${isOpen ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100"}
              `}
            >
              <Search className="w-5 h-5 text-neutral-400 group-hover:text-purple-400 transition-colors mr-3" />
              <span className="text-neutral-400 flex-1 truncate">Ask me anything about your project...</span>
              <div className="flex items-center gap-2">
                <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-white/10 text-neutral-400 uppercase tracking-tighter">AI</span>
                <MessageCircle className="w-5 h-5 text-purple-500" />
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* 2. Full Chat Interface Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[110] flex items-end justify-center pointer-events-none pb-6 px-6">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="pointer-events-auto w-full max-w-lg bg-[#0a0a0a]/95 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[80vh]"
            >
              {/* Header */}
              <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white leading-tight">WebGrows AI</h3>
                    <p className="text-[10px] text-purple-400 uppercase tracking-widest font-bold">Online Assistant</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full hover:bg-white/5 text-neutral-400 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Chat Viewport */}
              <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide"
              >
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`
                      max-w-[85%] rounded-2xl px-4 py-3 text-sm
                      ${msg.type === "user"
                        ? "bg-purple-600 text-white rounded-tr-none shadow-lg shadow-purple-600/20"
                        : "bg-white/5 text-neutral-200 border border-white/10 rounded-tl-none"}
                    `}>
                      <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>

                      {/* Interaction Options */}
                      {msg.options && (
                        <div className="flex flex-wrap gap-2 mt-4">
                          {msg.options.map(opt => (
                            <button
                              key={opt}
                              onClick={() => handleSend(opt)}
                              className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/5 text-xs font-medium transition-all"
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* CTA Buttons */}
                      {msg.cta && (
                        <div className="flex flex-col gap-2 mt-4">
                          <a
                            href="https://wa.me/919351469466"
                            target="_blank"
                            className="flex items-center justify-center gap-2 w-full py-2 bg-green-500/20 text-green-400 border border-green-500/30 rounded-xl text-xs font-bold hover:bg-green-500/30 transition-all"
                          >
                            <MessageSquare className="w-4 h-4" /> WhatsApp Now
                          </a>
                          <button
                            onClick={() => handleSend("Tell me more about services")}
                            className="flex items-center justify-center gap-2 w-full py-2 bg-white/10 text-white border border-white/10 rounded-xl text-xs font-bold hover:bg-white/20 transition-all"
                          >
                            View All Services <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-none px-4 py-3 flex gap-1">
                      <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.2 }} className="w-1.5 h-1.5 bg-neutral-400 rounded-full" />
                      <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.2 }} className="w-1.5 h-1.5 bg-neutral-400 rounded-full" />
                      <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.4 }} className="w-1.5 h-1.5 bg-neutral-400 rounded-full" />
                    </div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="p-4 bg-white/[0.02] border-t border-white/5">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSend(inputValue)}
                    placeholder="Type a message..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-5 pr-12 py-3 text-sm text-white focus:outline-none focus:border-purple-500/50 transition-all placeholder:text-neutral-600"
                  />
                  <button
                    onClick={() => handleSend(inputValue)}
                    className="absolute right-2 p-2 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-xl text-white shadow-lg shadow-purple-600/30 hover:scale-105 active:scale-95 transition-all"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                <div className="mt-3 flex items-center justify-center gap-4 text-[10px] text-neutral-500 font-medium">
                  <p>Type "START" to discuss project</p>
                  <span>•</span>
                  <p>Secured by WebGrows</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
