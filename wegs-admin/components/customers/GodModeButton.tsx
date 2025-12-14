"use client";

import { useState } from "react";
import { Shield, Lock } from "lucide-react";

export function GodModeButton() {
    const [showModal, setShowModal] = useState(false);
    const [code, setCode] = useState("");

    const handleAccess = () => {
        if (code === "1234") {
            alert("Erişim İzni Verildi! Kullanıcı paneline yönlendiriliyorsunuz...");
            setShowModal(false);
        } else {
            alert("Geçersiz kod");
        }
    };

    return (
        <>
            <button
                onClick={() => setShowModal(true)}
                className="flex items-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
                <Shield className="mr-2 h-4 w-4" />
                Kullanıcı Paneline Eriş (God Mode)
            </button>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-medium text-gray-900">Güvenlik Doğrulaması</h3>
                            <Lock className="h-5 w-5 text-gray-500" />
                        </div>
                        <p className="mb-4 text-sm text-gray-500">
                            Lütfen yönetici telefon numaranıza gönderilen SMS doğrulama kodunu girin.
                        </p>
                        <input
                            type="text"
                            className="w-full rounded-md border border-gray-300 p-2 mb-4 focus:border-blue-500 focus:outline-none"
                            placeholder="SMS Kodunu Girin (1234)"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setShowModal(false)}
                                className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
                            >
                                İptal
                            </button>
                            <button
                                onClick={handleAccess}
                                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                            >
                                Doğrula & Giriş Yap
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
