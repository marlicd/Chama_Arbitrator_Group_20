"use client";
import { useState } from 'react';

export default function ChatInterface() {
    const [messages, setMessages] = useState<{ role: string, content: string }[]>([
        { role: 'assistant', content: 'Habari! I am your Chama AI Arbitrator. You can ask me to verify M-Pesa statements or explain specific rules from our uploaded constitution.' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const sendMessage = () => {
        if (!input.trim()) return;
        setMessages([...messages, { role: 'user', content: input }]);
        setInput('');
        setIsTyping(true);

        // Call the unified Next.js API integrated with Google Cloud SDK
        fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: input })
        })
            .then(res => res.json())
            .then(data => {
                setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
            })
            .catch(err => {
                setMessages(prev => [...prev, { role: 'assistant', content: 'System error querying Vertex AI.' }]);
            })
            .finally(() => setIsTyping(false));
    };

    return (
        <div className="flex flex-col h-[65vh] bg-gray-900 rounded-2xl shadow-2xl border border-gray-800 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-5 shadow-lg flex items-center justify-between">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <span className="text-2xl">⚖️</span>
                    Arbitration Chat
                </h2>
                <span className="px-3 py-1 bg-emerald-800/50 rounded-full text-xs text-emerald-200 font-semibold border border-emerald-500/30">
                    Agent Active
                </span>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-5">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] p-4 rounded-2xl ${msg.role === 'user' ? 'bg-emerald-600 text-white rounded-br-none shadow-md' : 'bg-gray-800/80 text-gray-100 rounded-bl-none shadow border border-gray-700'}`}>
                            <p className="leading-relaxed">{msg.content}</p>
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div className="flex justify-start">
                        <div className="max-w-[80%] p-4 rounded-2xl bg-gray-800 text-gray-400 rounded-bl-none border border-gray-700 flex items-center gap-2">
                            <span className="animate-bounce">●</span>
                            <span className="animate-bounce delay-100">●</span>
                            <span className="animate-bounce delay-200">●</span>
                        </div>
                    </div>
                )}
            </div>

            <div className="p-5 bg-gray-800/50 border-t border-gray-700 flex gap-3">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="e.g. Nikalipa late, fine ni ganji ngapi?"
                    className="flex-1 bg-gray-900 text-white border border-gray-700 rounded-xl px-5 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none placeholder-gray-500 shadow-inner"
                />
                <button
                    onClick={sendMessage}
                    className="bg-emerald-500 hover:bg-emerald-400 text-gray-900 font-bold py-3 px-8 rounded-xl transition-all shadow-[0_0_15px_rgba(16,185,129,0.4)] hover:shadow-[0_0_25px_rgba(16,185,129,0.6)]"
                >
                    Send
                </button>
            </div>
        </div>
    );
}
