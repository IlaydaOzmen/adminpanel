"use client";

import { useState } from "react";
import { Eye, EyeOff, Copy } from "lucide-react";

export function SensitiveDataPanel() {
    const [showKey, setShowKey] = useState(false);

    return (
        <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-900/5 mt-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Hassas Veriler</h3>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">E-Fatura API Anahtarı</label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                            type={showKey ? "text" : "password"}
                            readOnly
                            value="sk_live_51Mz..."
                            className="block w-full rounded-none rounded-l-md border-gray-300 bg-gray-50 p-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        <button
                            onClick={() => setShowKey(!showKey)}
                            className="relative -ml-px inline-flex items-center border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                        <button className="relative -ml-px inline-flex items-center rounded-r-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                            <Copy className="h-4 w-4" />
                        </button>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Banka Entegrasyon Şifresi</label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                            type="text" // Explicitly requested to be visible
                            readOnly
                            value="bank_secret_pass_123"
                            className="block w-full rounded-md border-gray-300 bg-gray-50 p-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                    <p className="mt-1 text-xs text-red-500">Yönetici isteği üzerine görünür.</p>
                </div>
            </div>
        </div>
    );
}
