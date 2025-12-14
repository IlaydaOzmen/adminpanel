"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, Search, User, X, Check, AlertCircle, FileText, UserPlus, CreditCard } from "lucide-react";

// Mock Notifications
const mockNotifications = [
    { id: 1, title: "Yeni müşteri kaydı", message: "Atlas Lojistik sisteme eklendi", time: "2 dk önce", icon: UserPlus, type: "success", read: false },
    { id: 2, title: "Ödeme alındı", message: "TechSoft A.Ş. - ₺4,800", time: "15 dk önce", icon: CreditCard, type: "success", read: false },
    { id: 3, title: "Fatura hatası", message: "INV-2024-005 işlenemedi", time: "1 saat önce", icon: AlertCircle, type: "error", read: false },
    { id: 4, title: "Yeni destek talebi", message: "Mega Market entegrasyon sorunu", time: "2 saat önce", icon: FileText, type: "warning", read: true },
    { id: 5, title: "Sistem güncellemesi", message: "v2.4.1 hazır", time: "5 saat önce", icon: Check, type: "info", read: true },
];

export function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState(mockNotifications);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const unreadCount = notifications.filter(n => !n.read).length;

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    const markAsRead = (id: number) => {
        setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case "success": return "bg-green-100 text-green-600";
            case "error": return "bg-red-100 text-red-600";
            case "warning": return "bg-amber-100 text-amber-600";
            default: return "bg-blue-100 text-blue-600";
        }
    };

    return (
        <header className="flex h-16 items-center justify-between border-b bg-white px-6 shadow-sm">
            <div className="flex items-center">
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <Search className="h-5 w-5 text-gray-400" />
                    </span>
                    <input
                        type="text"
                        placeholder="Ara..."
                        className="rounded-md border border-gray-300 bg-gray-50 py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 w-64"
                    />
                </div>
            </div>
            <div className="flex items-center space-x-4">
                {/* Notification Bell */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="relative rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200 transition-colors"
                    >
                        <Bell className="h-5 w-5" />
                        {unreadCount > 0 && (
                            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                                {unreadCount}
                            </span>
                        )}
                    </button>

                    {/* Dropdown */}
                    {isOpen && (
                        <div className="absolute right-0 top-full mt-2 w-80 rounded-xl bg-white shadow-2xl border border-gray-100 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                            <div className="flex items-center justify-between p-4 border-b border-gray-100">
                                <h3 className="font-semibold text-gray-900">Bildirimler</h3>
                                {unreadCount > 0 && (
                                    <button
                                        onClick={markAllAsRead}
                                        className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                                    >
                                        Tümünü okundu işaretle
                                    </button>
                                )}
                            </div>
                            <div className="max-h-[400px] overflow-y-auto">
                                {notifications.length === 0 ? (
                                    <div className="p-8 text-center text-gray-500">
                                        <Bell className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                                        <p className="text-sm">Bildirim yok</p>
                                    </div>
                                ) : (
                                    notifications.map((notification) => (
                                        <div
                                            key={notification.id}
                                            onClick={() => markAsRead(notification.id)}
                                            className={`flex items-start gap-3 p-4 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-50 last:border-0 ${!notification.read ? 'bg-blue-50/50' : ''}`}
                                        >
                                            <div className={`p-2 rounded-lg flex-shrink-0 ${getTypeColor(notification.type)}`}>
                                                <notification.icon className="h-4 w-4" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                                                    {!notification.read && (
                                                        <span className="h-2 w-2 rounded-full bg-blue-500 flex-shrink-0"></span>
                                                    )}
                                                </div>
                                                <p className="text-xs text-gray-500 truncate">{notification.message}</p>
                                                <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                            <div className="p-3 border-t border-gray-100 text-center">
                                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                                    Tüm bildirimleri gör
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex items-center space-x-2">
                    <div className="flex flex-col items-end">
                        <span className="text-sm font-medium text-gray-900">Admin User</span>
                        <span className="text-xs text-gray-500">Super Admin</span>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                        <User className="h-5 w-5" />
                    </div>
                </div>
            </div>
        </header>
    );
}
