"use client";

import { useState } from "react";
import { Shield, Lock, LogOut, AlertTriangle, CheckCircle, ExternalLink, X, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";

interface GodModeButtonProps {
    customerName: string;
    customerEmail: string;
    hasDataSharingPermission: boolean;
    hasActiveSession?: boolean;
}

export function GodModeButton({
    customerName,
    customerEmail,
    hasDataSharingPermission,
    hasActiveSession = false
}: GodModeButtonProps) {
    const [showModal, setShowModal] = useState(false);
    const [step, setStep] = useState<"check" | "verify" | "loading" | "success">("check");
    const [code, setCode] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [activeAdminSession, setActiveAdminSession] = useState<boolean>(hasActiveSession);

    const handleStartAccess = () => {
        if (!hasDataSharingPermission) {
            alert("Bu müşteri veri paylaşımı iznini açmamış. God Mode kullanılamaz.");
            return;
        }
        setShowModal(true);
        setStep(activeAdminSession ? "check" : "verify");
    };

    const handleCloseExistingSession = () => {
        setStep("loading");
        setTimeout(() => {
            setActiveAdminSession(false);
            setStep("verify");
        }, 1000);
    };

    const handleVerify = () => {
        if (code === "1234") {
            setStep("loading");
            setError(null);
            setTimeout(() => {
                setStep("success");
            }, 1500);
        } else {
            setError("Geçersiz kod. Lütfen tekrar deneyin.");
        }
    };

    const handleOpenPanel = () => {
        // Gerçek uygulamada kullanıcı paneline yönlendirme yapılır
        window.open(`https://app.wegs.com/impersonate/${customerEmail}`, "_blank");
        setShowModal(false);
        resetModal();
    };

    const resetModal = () => {
        setStep("check");
        setCode("");
        setError(null);
    };

    const handleClose = () => {
        setShowModal(false);
        resetModal();
    };

    return (
        <>
            <button
                onClick={handleStartAccess}
                disabled={!hasDataSharingPermission}
                className={cn(
                    "flex items-center rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                    hasDataSharingPermission
                        ? "bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 shadow-lg shadow-red-500/25"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                )}
            >
                <Shield className="mr-2 h-4 w-4" />
                Kullanıcı Paneline Eriş
            </button>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-full max-w-md rounded-xl bg-white shadow-xl overflow-hidden">
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gradient-to-r from-red-50 to-orange-50">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-red-100 rounded-lg">
                                    <Shield className="h-5 w-5 text-red-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">God Mode Erişimi</h3>
                                    <p className="text-sm text-gray-500">{customerName}</p>
                                </div>
                            </div>
                            <button onClick={handleClose} className="p-1 rounded-lg hover:bg-gray-100">
                                <X className="h-5 w-5 text-gray-400" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            {/* Check for existing session */}
                            {step === "check" && activeAdminSession && (
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Monitor className="h-8 w-8 text-amber-600" />
                                    </div>
                                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Mevcut Oturum Var</h4>
                                    <p className="text-sm text-gray-500 mb-4">
                                        Bu müşterinin panelinde halihazırda bir admin oturumu açık.
                                        Devam etmek için mevcut oturumu kapatmanız gerekiyor.
                                    </p>
                                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800 mb-4">
                                        <p><strong>Aktif Oturum:</strong> admin@wegs.com</p>
                                        <p><strong>Başlangıç:</strong> 15.12.2024 14:30</p>
                                    </div>
                                    <button
                                        onClick={handleCloseExistingSession}
                                        className="w-full flex items-center justify-center gap-2 bg-amber-600 text-white py-3 rounded-lg font-medium hover:bg-amber-700 transition-colors"
                                    >
                                        <LogOut className="h-4 w-4" />
                                        Mevcut Oturumu Kapat ve Devam Et
                                    </button>
                                </div>
                            )}

                            {/* Verification step */}
                            {step === "verify" && (
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Lock className="h-8 w-8 text-indigo-600" />
                                    </div>
                                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Güvenlik Doğrulaması</h4>
                                    <p className="text-sm text-gray-500 mb-4">
                                        Telefonunuza gönderilen SMS doğrulama kodunu girin.
                                    </p>

                                    {/* Demo Code Display */}
                                    <div className="mb-4 p-2 bg-blue-50 border border-blue-200 rounded-lg">
                                        <p className="text-xs text-blue-600">Demo Kod</p>
                                        <p className="text-lg font-mono font-bold text-blue-700">1234</p>
                                    </div>

                                    <input
                                        type="text"
                                        className={cn(
                                            "w-full text-center text-2xl font-mono tracking-widest py-4 border rounded-lg focus:outline-none focus:ring-2 mb-4",
                                            error
                                                ? "border-red-300 focus:ring-red-500"
                                                : "border-gray-300 focus:ring-indigo-500"
                                        )}
                                        placeholder="• • • •"
                                        maxLength={4}
                                        value={code}
                                        onChange={(e) => {
                                            setCode(e.target.value.replace(/\D/g, ""));
                                            setError(null);
                                        }}
                                    />

                                    {error && (
                                        <div className="mb-4 p-2 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                                            {error}
                                        </div>
                                    )}

                                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2 text-left">
                                        <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                                        <p className="text-sm text-amber-800">
                                            Bu erişim kaydedilecek ve denetim loglarına yazılacaktır.
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Loading */}
                            {step === "loading" && (
                                <div className="text-center py-8">
                                    <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4" />
                                    <p className="text-gray-600">İşleniyor...</p>
                                </div>
                            )}

                            {/* Success */}
                            {step === "success" && (
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <CheckCircle className="h-8 w-8 text-green-600" />
                                    </div>
                                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Erişim Onaylandı!</h4>
                                    <p className="text-sm text-gray-500 mb-4">
                                        <strong>{customerName}</strong> paneline erişebilirsiniz.
                                    </p>
                                    <div className="p-3 bg-gray-50 rounded-lg text-sm text-gray-600 mb-4">
                                        <p>Oturum 30 dakika sonra otomatik olarak sonlandırılacaktır.</p>
                                    </div>
                                    <button
                                        onClick={handleOpenPanel}
                                        className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
                                    >
                                        <ExternalLink className="h-4 w-4" />
                                        Paneli Aç
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {(step === "verify") && (
                            <div className="flex justify-end gap-3 p-4 border-t border-gray-100 bg-gray-50">
                                <button
                                    onClick={handleClose}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                                >
                                    İptal
                                </button>
                                <button
                                    onClick={handleVerify}
                                    disabled={code.length !== 4}
                                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Doğrula & Giriş Yap
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
