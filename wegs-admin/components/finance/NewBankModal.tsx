"use client";

import { X, Building2 } from "lucide-react";
import { useState } from "react";

interface NewBankModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function NewBankModal({ isOpen, onClose }: NewBankModalProps) {
    const [isLoading, setIsLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Mock API call
        setTimeout(() => {
            setIsLoading(false);
            onClose();
            alert("Banka entegrasyonu başarıyla başlatıldı!");
        }, 1000);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden relative">
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                    <div className="flex items-center space-x-2">
                        <div className="p-1.5 bg-blue-100 rounded-lg">
                            <Building2 className="h-5 w-5 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">Yeni Banka Ekle</h3>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-500 transition-colors">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    <div>
                        <label htmlFor="bankName" className="block text-sm font-medium text-gray-700 mb-1">
                            Banka Adı
                        </label>
                        <select
                            id="bankName"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                        >
                            <option value="">Seçiniz...</option>
                            <option value="ziraat">Ziraat Bankası</option>
                            <option value="vakif">Vakıfbank</option>
                            <option value="halk">Halkbank</option>
                            <option value="sms">Diğer (Manuel API)</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-1">
                            API Key / Müşteri No
                        </label>
                        <input
                            type="text"
                            id="apiKey"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-mono text-sm"
                            placeholder="xxxx-xxxx-xxxx-xxxx"
                        />
                    </div>

                    <div>
                        <label htmlFor="apiSecret" className="block text-sm font-medium text-gray-700 mb-1">
                            API Secret
                        </label>
                        <input
                            type="password"
                            id="apiSecret"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-mono text-sm"
                            placeholder="••••••••••••••••"
                        />
                    </div>

                    <div className="bg-blue-50 p-3 rounded-lg flex items-start space-x-2">
                        <input type="checkbox" id="testMode" className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                        <label htmlFor="testMode" className="text-sm text-blue-800">
                            Test modunda başlat (Sandbox)
                        </label>
                    </div>

                    <div className="pt-2 flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                            İptal
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? "Bağlanıyor..." : "Entegrasyonu Başlat"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
