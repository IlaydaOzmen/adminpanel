"use client";

import { X, CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface CustomerListModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    customers: string[];
    type: 'trained' | 'untrained';
}

export function CustomerListModal({ isOpen, onClose, title, customers, type }: CustomerListModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                    <h3 className={cn("text-lg font-semibold", type === 'trained' ? "text-green-700" : "text-red-700")}>
                        {title}
                    </h3>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 transition-colors">
                        <X className="w-5 h-5 text-gray-400" />
                    </button>
                </div>
                <div className="max-h-[60vh] overflow-y-auto p-0">
                    {customers.length === 0 ? (
                        <div className="p-8 text-center text-gray-500 text-sm">
                            Liste boş.
                        </div>
                    ) : (
                        <ul className="divide-y divide-gray-50">
                            {customers.map((customer, idx) => (
                                <li key={idx} className="flex items-center p-4 hover:bg-gray-50 transition-colors">
                                    {type === 'trained' ? (
                                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                                            <CheckCircle className="w-4 h-4 text-green-600" />
                                        </div>
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3 flex-shrink-0">
                                            <AlertCircle className="w-4 h-4 text-red-600" />
                                        </div>
                                    )}
                                    <span className="text-sm font-medium text-gray-700">{customer}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
                    <button
                        onClick={onClose}
                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
                    >
                        Kapat
                    </button>
                </div>
            </div>
        </div>
    );
}
