'use client'
import Link from 'next/link'
import { Suspense, useEffect, useRef, useState } from 'react'
import { useChat } from "@ai-sdk/react";
import { useSearchParams, redirect, permanentRedirect } from 'next/navigation'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';


export default function Chat() {

  const { messages, sendMessage } = useChat();
  const [input, setInput] = useState('');
  const chatBottom = useRef<HTMLDivElement>(null);
  const handleMessage = () => {
    if (input.trim()) {
      sendMessage({ text: input });
      setInput('');
    }
  }
  //一致滚动到底部
  useEffect(() => {
    chatBottom.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  return (
    <div className='flex flex-col h-screen bg-gradient-to-br from-slate-50 to-slate-100'>
      {/* Header */}
      <div className='bg-white border-b border-slate-200 shadow-sm p-4'>
        <h1 className='text-2xl font-semibold text-slate-800'>Chat Assistant</h1>
        <p className='text-sm text-slate-500'>Powered by DeepSeek</p>
      </div>

      {/* Messages Container */}
      <div className='flex-1 overflow-y-auto p-6 space-y-4'>
        {messages.length === 0 ? (
          <div className='h-full flex items-center justify-center'>
            <div className='text-center'>
              <p className='text-lg text-slate-400 mb-2'>开始对话</p>
              <p className='text-sm text-slate-300'>输入您的问题或消息</p>
            </div>
          </div>
        ) : (
          <>
            {messages.map((msg) => (
              <div 
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-3 rounded-lg ${
                    msg.role === 'user'
                      ? 'bg-blue-500 text-white rounded-br-none'
                      : 'bg-white text-slate-800 rounded-bl-none shadow-sm border border-slate-200'
                  }`}
                >
                  {msg.parts.map((part, index) => (
                    <div key={msg.id + index}>
                      {part.type === 'text' ? part.text : ''}
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div ref={chatBottom}></div>
          </>
        )}
      </div>

      {/* Input Area */}
      <div className='bg-white border-t border-slate-200 shadow-lg p-4'>
        <div className='max-w-4xl mx-auto flex gap-3'>
          <Input 
            value={input} 
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleMessage()}
            placeholder='输入消息... (Enter 发送)'
            className='flex-1 rounded-lg border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
          />
          <Button 
            onClick={handleMessage}
            disabled={!input.trim()}
            className='bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 rounded-lg transition-colors'
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  )
}