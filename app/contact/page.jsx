"use client";
import React, { useState, useRef, useEffect } from "react";
import InstagramSidebar from "../_components/Sidebar";
import Image from "next/image";
import { Send, Phone, Video, Info, Smile, Image as ImageIcon, Mail, X, Loader2 } from "lucide-react";
import MobileHeader from "../_components/MobileHeader";
import BottomNav from "../_components/BottomNav";
import EmojiPicker from 'emoji-picker-react';
import { toast } from "sonner";

function SquarePenIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-square-pen"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4Z" /></svg>
}

export default function ContactPage() {
    const [activeTab, setActiveTab] = useState("general"); // 'general', 'inquiry', 'mail'
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [senderName, setSenderName] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // UI States
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [showNameModal, setShowNameModal] = useState(false);
    const [tempName, setTempName] = useState("");

    // Mail State
    const [mailSubject, setMailSubject] = useState("");
    const [mailBody, setMailBody] = useState("");
    const [mailFrom, setMailFrom] = useState("");
    const [sendingMail, setSendingMail] = useState(false);

    // Admin State
    const [allConversations, setAllConversations] = useState([]);
    const [selectedConversationId, setSelectedConversationId] = useState(null);

    const fileInputRef = useRef(null);
    const messagesEndRef = useRef(null);

    const [mobileView, setMobileView] = useState("list"); // 'list' | 'chat'

    // Initial Load
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get("admin") === "true") {
            setIsAdmin(true);
            fetchAdminMessages();
        } else {
            const storedName = localStorage.getItem("visitorName");
            if (storedName) {
                setSenderName(storedName);
                fetchVisitorMessages(storedName);
            } else {
                // Delay slightly to show modal
                setTimeout(() => setShowNameModal(true), 1000);
            }
        }
    }, [activeTab]);

    // Scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Polling
    useEffect(() => {
        const interval = setInterval(() => {
            if (isAdmin) fetchAdminMessages();
            else if (senderName && activeTab !== 'mail') fetchVisitorMessages(senderName);
        }, 5000);
        return () => clearInterval(interval);
    }, [isAdmin, senderName, activeTab]);

    const fetchVisitorMessages = async (name) => {
        try {
            const res = await fetch(`/api/messages?senderName=${name}`);
            const data = await res.json();
            if (data.success) {
                const relevantThread = data.data.find(t => t.type === activeTab);
                setMessages(relevantThread ? relevantThread.messages : []);
            }
        } catch (err) { console.error(err); }
    };

    const fetchAdminMessages = async () => {
        try {
            const res = await fetch(`/api/messages?admin=true`);
            const data = await res.json();
            if (data.success) {
                setAllConversations(data.data);
                if (selectedConversationId) {
                    const updated = data.data.find(c => c._id === selectedConversationId);
                    if (updated) setMessages(updated.messages);
                }
            }
        } catch (err) { console.error(err); }
    };

    // Update selection handlers to switch view on mobile
    const handleTabSelect = (tab) => {
        setActiveTab(tab);
        setMobileView("chat");
    };

    const handleAdminSelect = (conv) => {
        setSelectedConversationId(conv._id);
        setMessages(conv.messages);
        setMobileView("chat");
    };

    const handleSaveName = () => {
        if (!tempName.trim()) return;
        localStorage.setItem("visitorName", tempName);
        setSenderName(tempName);
        setShowNameModal(false);
        toast.success(`Welcome, ${tempName}!`);
        fetchVisitorMessages(tempName);
    };

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const handleSendChat = async (e) => {
        e.preventDefault();
        const file = fileInputRef.current?.files?.[0];
        if (!message.trim() && !file) return;

        // Ensure name is set for visitor
        if (!isAdmin && !senderName) {
            setShowNameModal(true);
            return;
        }

        let imageData = null;
        if (file) {
            try {
                imageData = await toBase64(file);
            } catch (err) { toast.error("Image upload failed"); return; }
        }

        const newMessagePayload = {
            text: message,
            image: imageData,
            createdAt: new Date().toISOString(),
            isReply: isAdmin
        };

        // Optimistic UI
        setMessages(prev => [...prev, newMessagePayload]);
        setMessage("");
        if (fileInputRef.current) fileInputRef.current.value = "";
        setShowEmojiPicker(false);

        const currentName = senderName || localStorage.getItem("visitorName");

        try {
            const payload = isAdmin
                ? { isAdminReply: true, messageId: selectedConversationId, text: newMessagePayload.text, image: imageData }
                : { senderName: currentName, type: activeTab, text: newMessagePayload.text, image: imageData };

            await fetch('/api/messages', { method: 'POST', body: JSON.stringify(payload) });

            // Refetch to sync real ID/status
            if (isAdmin) fetchAdminMessages();
            else fetchVisitorMessages(currentName);

        } catch (err) { toast.error("Failed to send message"); }
    };

    const handleSendMail = async (e) => {
        e.preventDefault();
        if (!mailFrom || !mailSubject || !mailBody) {
            toast.error("Please fill in all fields");
            return;
        }

        setSendingMail(true);
        try {
            const res = await fetch('/api/send-mail', {
                method: 'POST',
                body: JSON.stringify({
                    name: senderName || "Visitor",
                    from: mailFrom,
                    subject: mailSubject,
                    message: mailBody
                })
            });
            const data = await res.json();
            if (data.success) {
                toast.success("Email sent successfully!", {
                    description: "I'll get back to you soon."
                });
                setMailSubject("");
                setMailBody("");
            } else {
                toast.error("Failed to send email");
            }
        } catch (err) {
            toast.error("Error sending email");
        } finally {
            setSendingMail(false);
        }
    };

    const onEmojiClick = (emojiData) => {
        setMessage(prev => prev + emojiData.emoji);
    };

    return (
        <div className="flex bg-black min-h-screen text-white font-sans pb-16 lg:pb-0 relative">
            {showNameModal && (
                <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center px-4">
                    <div className="bg-[#1a1a1a] p-6 rounded-2xl w-full max-w-sm border border-[#262626]">
                        <h3 className="text-xl font-bold mb-2 text-center">What should I call you?</h3>
                        <p className="text-gray-400 text-sm text-center mb-6">Enter your name so I know who I'm chatting with!</p>
                        <input
                            type="text"
                            className="w-full bg-[#262626] border border-gray-700 rounded-lg px-4 py-3 mb-4 text-white focus:border-blue-500 outline-none text-center"
                            placeholder="Your Name"
                            value={tempName}
                            onChange={(e) => setTempName(e.target.value)}
                            autoFocus
                        />
                        <button
                            onClick={handleSaveName}
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-xl transition-all"
                        >
                            Start Chatting
                        </button>
                    </div>
                </div>
            )}

            <InstagramSidebar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
            <div className="flex-1 lg:ml-64 grid grid-cols-1 md:grid-cols-[350px_1fr] h-[calc(100vh-70px)] md:h-screen pt-[50px] md:pt-0">
                <div className="md:hidden fixed top-0 left-0 right-0 z-50">
                    <MobileHeader setIsMobileMenuOpen={setIsMobileMenuOpen} />
                </div>

                {/* Left Side (Conversation List) 
                    - Mobile: Show if mobileView === 'list'
                    - Desktop: Always Show
                */}
                <div className={`${mobileView === 'list' ? 'flex' : 'hidden'} md:flex flex-col border-r border-[#262626] h-full`}>
                    <div className="p-5 flex items-center justify-between border-b border-[#262626] h-[70px]">
                        <h2 className="text-xl font-bold flex items-center gap-1">
                            {isAdmin ? "Inbox (Admin)" : (senderName || "Guest")}
                            <span className="text-xs align-top">▼</span>
                        </h2>
                        <SquarePenIcon />
                    </div>


                    <div className="flex-1 overflow-y-auto">
                        <div className="flex items-center justify-between px-5 py-3">
                            <h3 className="font-bold">Messages</h3>
                            <span className="text-gray-500 text-sm font-semibold">Requests</span>
                        </div>


                        {isAdmin ? (
                            displayConversations.map(conv => (
                                <div
                                    key={conv._id}
                                    onClick={() => handleAdminSelect(conv)}
                                    className={`px-5 py-3 flex items-center gap-3 cursor-pointer hover:bg-[#121212] ${selectedConversationId === conv._id ? 'bg-[#1a1a1a]' : ''}`}
                                >
                                    <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-purple-500 to-orange-500 flex items-center justify-center text-xl font-bold uppercase flex-shrink-0">
                                        {conv.senderName[0]}
                                    </div>
                                    <div className="overflow-hidden">
                                        <h4 className="text-sm font-semibold text-white">{conv.senderName}</h4>
                                        <p className="text-xs text-gray-400 capitalize truncate">
                                            {conv.type} • {conv.messages[conv.messages.length - 1]?.text || 'Image'}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <>
                                <div
                                    onClick={() => handleTabSelect("general")}
                                    className={`px-5 py-3 flex items-center gap-3 cursor-pointer hover:bg-[#121212] ${activeTab === 'general' ? 'bg-[#1a1a1a]' : ''}`}
                                >
                                    <div className="relative w-14 h-14">
                                        <Image src="/omsalunke_photo.jpg" alt="Om" fill className="rounded-full object-cover" />
                                        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-black"></div>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-normal">Om Salunke</h4>
                                        <p className="text-xs text-gray-400">General Message</p>
                                    </div>
                                </div>

                                <div
                                    onClick={() => handleTabSelect("inquiry")}
                                    className={`px-5 py-3 flex items-center gap-3 cursor-pointer hover:bg-[#121212] ${activeTab === 'inquiry' ? 'bg-[#1a1a1a]' : ''}`}
                                >
                                    <div className="w-14 h-14 rounded-full bg-gray-800 flex items-center justify-center text-xl">🚀</div>
                                    <div>
                                        <h4 className="text-sm font-normal">Project Inquiry</h4>
                                        <p className="text-xs text-gray-400">Ask about a project</p>
                                    </div>
                                </div>

                                <div
                                    onClick={() => handleTabSelect("mail")}
                                    className={`px-5 py-3 flex items-center gap-3 cursor-pointer hover:bg-[#121212] ${activeTab === 'mail' ? 'bg-[#1a1a1a]' : ''}`}
                                >
                                    <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center text-xl">
                                        <Mail size={20} className="text-white" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-normal">Send Mail</h4>
                                        <p className="text-xs text-gray-400">Drop an email</p>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Right Side (Chat/Content) 
                    - Mobile: Show if mobileView === 'chat'
                    - Desktop: Always Show
                */}
                <div className={`${mobileView === 'chat' ? 'flex' : 'hidden'} md:flex flex-col h-full bg-black relative`}>

                    {/* Header */}
                    <div className="px-5 py-3.5 border-b border-[#262626] flex items-center justify-between sticky top-0 bg-black z-10 h-[70px]">
                        <div className="flex items-center gap-3">
                            {/* Mobile Back Button */}
                            <button onClick={() => setMobileView("list")} className="md:hidden mr-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left"><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg>
                            </button>

                            {activeTab === 'mail' && !isAdmin ? (
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center justify-center w-11 h-11 bg-red-600 rounded-full">
                                        <Mail size={20} />
                                    </div>
                                    <div className="flex flex-col">
                                        <h3 className="font-semibold text-base">Send Email</h3>
                                        <span className="text-xs text-gray-400">Reach out directly via mail</span>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="relative w-11 h-11 md:hidden">
                                        <Image src="/omsalunke_photo.jpg" alt="Om" fill className="rounded-full object-cover" />
                                    </div>
                                    <div className="flex flex-col">
                                        <h3 className="font-semibold text-base">
                                            {isAdmin
                                                ? (selectedConversationId ? "Chatting with User" : "Select a conversation")
                                                : (activeTab === 'inquiry' ? "Project Inquiry" : "Om Salunke")}
                                        </h3>
                                        <span className="text-xs text-gray-400">
                                            {isAdmin
                                                ? (selectedConversationId ? "Visitor" : "")
                                                : (activeTab === 'inquiry' ? "Let's build something together" : "Active now • Software Engineer")}
                                        </span>
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="flex items-center gap-4 text-white">
                            <Phone size={24} />
                            <Video size={24} />
                            <Info size={24} />
                        </div>
                    </div>

                    {/* Content Area */}
                    {activeTab === 'mail' && !isAdmin ? (
                        <div className="flex-1 p-5 overflow-y-auto flex flex-col items-center justify-start max-w-2xl mx-auto w-full">
                            <div className="w-full bg-[#121212] p-6 rounded-2xl border border-[#262626] mt-10">
                                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <Mail className="text-blue-400" /> Compose Email
                                </h2>

                                <label className="block text-xs font-semibold text-gray-400 mb-1">Your Email</label>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full bg-[#262626] border border-gray-700 rounded-lg px-4 py-3 mb-4 text-white focus:border-blue-500 outline-none transition-all"
                                    value={mailFrom}
                                    onChange={(e) => setMailFrom(e.target.value)}
                                />

                                <label className="block text-xs font-semibold text-gray-400 mb-1">Subject</label>
                                <input
                                    type="text"
                                    placeholder="What's this about?"
                                    className="w-full bg-[#262626] border border-gray-700 rounded-lg px-4 py-3 mb-4 text-white focus:border-blue-500 outline-none transition-all"
                                    value={mailSubject}
                                    onChange={(e) => setMailSubject(e.target.value)}
                                />

                                <label className="block text-xs font-semibold text-gray-400 mb-1">Message</label>
                                <textarea
                                    placeholder="Write your message here..."
                                    className="w-full bg-[#262626] border border-gray-700 rounded-lg px-4 py-3 mb-6 text-white focus:border-blue-500 outline-none h-40 resize-none transition-all"
                                    value={mailBody}
                                    onChange={(e) => setMailBody(e.target.value)}
                                />

                                <button
                                    onClick={handleSendMail}
                                    disabled={sendingMail}
                                    className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
                                >
                                    {sendingMail ? <Loader2 className="animate-spin" /> : <Send size={18} />}
                                    {sendingMail ? "Sending..." : "Send Email"}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Chat Messages */}
                            <div className="flex-1 overflow-y-auto p-5 space-y-4">
                                {!isAdmin && messages.length === 0 && (
                                    <div className="flex flex-col items-center justify-center h-full text-center opacity-50 pb-20">
                                        <div className="w-24 h-24 rounded-full border-2 border-white/10 flex items-center justify-center mb-4 relative overflow-hidden">
                                            <Image src="/omsalunke_photo.jpg" alt="Om" fill className="object-cover" />
                                        </div>
                                        <h3 className="text-xl font-bold mb-2">Om Salunke</h3>
                                        <p className="text-sm max-w-xs">{activeTab === 'inquiry' ? "Interested in working together?" : "Send me a message!"}</p>
                                    </div>
                                )}

                                {messages.map((msg, i) => {
                                    const isMe = isAdmin ? msg.isReply : !msg.isReply;
                                    return (
                                        <div key={i} className={`flex items-end gap-2 ${isMe ? "justify-end" : "justify-start"}`}>
                                            {!isMe && (
                                                <div className="w-7 h-7 relative mb-1 flex-shrink-0">
                                                    {isAdmin ? (
                                                        <div className="w-full h-full rounded-full bg-gray-700 flex items-center justify-center text-[10px]">U</div>
                                                    ) : (
                                                        <Image src="/omsalunke_photo.jpg" alt="Om" fill className="rounded-full object-cover" />
                                                    )}
                                                </div>
                                            )}
                                            <div className={`px-4 py-2 rounded-2xl max-w-[70%] break-words ${isMe ? "bg-[#3797f0] text-white rounded-br-sm" : "bg-[#262626] text-white rounded-bl-sm"}`}>
                                                {msg.image && (
                                                    <div className="mb-2 rounded overflow-hidden">
                                                        <img src={msg.image} alt="Attachment" className="max-h-[200px] w-auto object-cover" />
                                                    </div>
                                                )}
                                                {msg.text && <p className="text-sm">{msg.text}</p>}
                                            </div>
                                        </div>
                                    )
                                })}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input Area */}
                            <div className="p-4 m-4 relative">
                                {showEmojiPicker && (
                                    <div className="absolute bottom-16 left-0 z-20">
                                        <EmojiPicker onEmojiClick={onEmojiClick} theme="dark" width={300} height={400} />
                                    </div>
                                )}
                                <form onSubmit={handleSendChat} className="bg-[#262626] rounded-full flex items-center px-4 py-2 gap-4 border border-transparent focus-within:border-gray-600 transition-colors">
                                    <div className="bg-blue-500 rounded-full p-1 text-white cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                                        <ImageIcon size={16} />
                                    </div>
                                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={() => setMessage(prev => prev)} />

                                    <input
                                        type="text"
                                        placeholder={`Message ${isAdmin && !selectedConversationId ? '(Select chat first)' : '...'}`}
                                        className="bg-transparent flex-1 text-white focus:outline-none text-sm h-8"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        disabled={isAdmin && !selectedConversationId}
                                    />

                                    {(message.trim() || fileInputRef.current?.files?.length > 0) ? (
                                        <button type="submit" className="text-blue-500 font-semibold text-sm">Send</button>
                                    ) : (
                                        <div className="flex gap-3">
                                            <Smile className="text-gray-400 cursor-pointer hover:text-white" size={24} onClick={() => setShowEmojiPicker(!showEmojiPicker)} />
                                        </div>
                                    )}
                                </form>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <BottomNav />
        </div>
    );
}
