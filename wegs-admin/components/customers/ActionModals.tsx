"use client";

import { useState } from "react";
import { Calendar, RefreshCw, Trash2, PauseCircle, AlertTriangle, CheckCircle } from "lucide-react";

interface ActionModalsProps {
    isOpen: boolean;
    onClose: () => void;
    type: "license" | "package" | "delete" | "freeze" | null;
}

export function ActionModals({ isOpen, onClose, type }: ActionModalsProps) {
    const [loading, setLoading] = useState(false);

    if (!isOpen || !type) return null;

    const handleAction = () => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            alert("İşlem başarıyla tamamlandı!");
            onClose();
        }, 1500);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
                {/* License Management */}
                {type === "license" && (
                    <>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-medium text-gray-900">Lisans Süresi Yönetimi</h3>
                            <Calendar className="h-5 w-5 text-blue-500" />
                        </div>
                        <p className="mb-4 text-sm text-gray-500">
                            Mevcut lisans bitiş tarihi: <span className="font-semibold">15 Ocak 2024</span>
                        </p>
                        <div className="space-y-3">
                            <button className="w-full flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                                + 30 Gün Ekle
                            </button>
                            <button className="w-full flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                                + 1 Yıl Ekle
                            </button>
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div className="w-full border-t border-gray-300" />
                                </div>
                                <div className="relative flex justify-center">
                                    <span className="bg-white px-2 text-sm text-gray-500">veya</span>
                                </div>
                            </div>
                            <input
                                type="date"
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                            />
                        </div>
                    </>
                )}

                {/* Package Switching */}
                {type === "package" && (
                    <>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-medium text-gray-900">Paket Değişikliği</h3>
                            <RefreshCw className="h-5 w-5 text-green-500" />
                        </div>
                        <p className="mb-4 text-sm text-gray-500">
                            Mevcut Paket: <span className="font-semibold text-blue-600">Wegs E-Ticaret (Pro)</span>
                        </p>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3 rounded-md border p-3 hover:bg-gray-50 cursor-pointer">
                                <input type="radio" name="package" className="h-4 w-4 text-blue-600 focus:ring-blue-500" />
                                <div className="flex-1">
                                    <span className="block text-sm font-medium text-gray-900">Wegs Ön Muhasebe</span>
                                    <span className="block text-xs text-gray-500">Temel muhasebe özellikleri</span>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3 rounded-md border p-3 hover:bg-gray-50 cursor-pointer bg-blue-50 border-blue-200">
                                <input type="radio" name="package" checked readOnly className="h-4 w-4 text-blue-600 focus:ring-blue-500" />
                                <div className="flex-1">
                                    <span className="block text-sm font-medium text-gray-900">Wegs E-Ticaret</span>
                                    <span className="block text-xs text-gray-500">Pazaryeri entegrasyonları dahil</span>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {/* Data Deletion */}
                {type === "delete" && (
                    <>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-medium text-gray-900">Veri Silme İşlemleri</h3>
                            <Trash2 className="h-5 w-5 text-red-500" />
                        </div>
                        <div className="rounded-md bg-red-50 p-4 mb-4">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <AlertTriangle className="h-5 w-5 text-red-400" aria-hidden="true" />
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-red-800">Dikkat</h3>
                                    <div className="mt-2 text-sm text-red-700">
                                        <p>Bu işlemler geri alınamaz. Lütfen dikkatli olun.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <button className="w-full text-left px-4 py-3 rounded-md border border-red-200 bg-white hover:bg-red-50 text-red-700 text-sm font-medium flex justify-between items-center">
                                Mali Verileri Sil
                                <Trash2 className="h-4 w-4" />
                            </button>
                            <button className="w-full text-left px-4 py-3 rounded-md border border-red-200 bg-white hover:bg-red-50 text-red-700 text-sm font-medium flex justify-between items-center">
                                Şirket Verilerini Sil
                                <Trash2 className="h-4 w-4" />
                            </button>
                            <button className="w-full text-left px-4 py-3 rounded-md border border-red-600 bg-red-600 hover:bg-red-700 text-white text-sm font-medium flex justify-between items-center">
                                Hesabı Tamamen Sil
                                <Trash2 className="h-4 w-4" />
                            </button>
                        </div>
                    </>
                )}

                {/* Freeze Account */}
                {type === "freeze" && (
                    <>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-medium text-gray-900">Hesap Durumu</h3>
                            <PauseCircle className="h-5 w-5 text-yellow-500" />
                        </div>
                        <p className="mb-4 text-sm text-gray-500">
                            Hesabı dondurduğunuzda kullanıcı sisteme giriş yapamaz ancak verileri saklanır.
                        </p>
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-md mb-4">
                            <span className="text-sm font-medium text-gray-700">Mevcut Durum:</span>
                            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                Aktif
                            </span>
                        </div>
                        <button className="w-full flex items-center justify-center rounded-md bg-yellow-500 px-4 py-2 text-sm font-medium text-white hover:bg-yellow-600">
                            <PauseCircle className="mr-2 h-4 w-4" />
                            Hesabı Dondur
                        </button>
                    </>
                )}

                {/* Footer Actions */}
                <div className="mt-6 flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        İptal
                    </button>
                    {type !== "delete" && type !== "freeze" && (
                        <button
                            onClick={handleAction}
                            disabled={loading}
                            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 flex items-center"
                        >
                            {loading ? "İşleniyor..." : "Kaydet"}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
