"use client";

import { useState, useEffect } from "react";
import { X, Shield, MessageSquare, Smartphone, Clock, CheckCircle, AlertCircle, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface SMSVerificationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onVerified: () => void;
    customerName: string;
    customerPhone: string;
    actionType: string; // Hangi işlem için doğrulama yapılıyor
}

export function SMSVerificationModal({
    isOpen,
    onClose,
    onVerified,
    customerName,
    customerPhone,
    actionType
}: SMSVerificationModalProps) {
    const [step, setStep] = useState<"send" | "verify" | "success">("send");
    const [code, setCode] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [countdown, setCountdown] = useState(0);
    const [generatedCode, setGeneratedCode] = useState<string | null>(null);

    // Demo için: Gerçek uygulamada bu kod backend'de tutulur
    const DEMO_CODE = "123456";

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (countdown > 0) {
            timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        }
        return () => clearTimeout(timer);
    }, [countdown]);

    if (!isOpen) return null;

    const handleSendCode = async () => {
        setIsSending(true);
        setError(null);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Demo: Kodu ekranda göster (gerçek uygulamada SMS gönderilir)
        setGeneratedCode(DEMO_CODE);
        setCountdown(300); // 5 dakika
        setStep("verify");
        setIsSending(false);
    };

    const handleVerify = async () => {
        if (code.length !== 6) {
            setError("Lütfen 6 haneli kodu girin.");
            return;
        }

        setIsVerifying(true);
        setError(null);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (code === DEMO_CODE) {
            setStep("success");
            setTimeout(() => {
                onVerified();
                handleClose();
            }, 2000);
        } else {
            setError("Geçersiz kod. Lütfen tekrar deneyin.");
        }
        setIsVerifying(false);
    };

    const handleResend = async () => {
        setCode("");
        setError(null);
        await handleSendCode();
    };

    const handleClose = () => {
        setStep("send");
        setCode("");
        setError(null);
        setGeneratedCode(null);
        setCountdown(0);
        onClose();
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    const maskedPhone = customerPhone.replace(/(\d{3})(\d{3})(\d+)/, "$1 *** ** $3");

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-4">
                {/* Backdrop */}
                <div className="fixed inset-0 bg-black/50 transition-opacity" onClick={handleClose} />

                {/* Modal */}
                <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-blue-50">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-indigo-100 rounded-lg">
                                <Shield className="h-5 w-5 text-indigo-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">SMS Doğrulama</h3>
                                <p className="text-sm text-gray-500">{actionType}</p>
                            </div>
                        </div>
                        <button
                            onClick={handleClose}
                            className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <X className="h-5 w-5 text-gray-400" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        {step === "send" && (
                            <div className="text-center">
                                <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Smartphone className="h-10 w-10 text-indigo-600" />
                                </div>
                                <h4 className="text-lg font-semibold text-gray-900 mb-2">Kimlik Doğrulama</h4>
                                <p className="text-sm text-gray-500 mb-6">
                                    <strong>{customerName}</strong> için işlem yapabilmek adına müşterinin telefonuna
                                    doğrulama kodu göndereceğiz. Müşteri kodu size söyledikten sonra doğrulayabilirsiniz.
                                </p>

                                {/* Customer Info */}
                                <div className="p-4 bg-gray-50 rounded-lg mb-6">
                                    <div className="flex items-center justify-center gap-2 text-gray-700">
                                        <MessageSquare className="h-5 w-5 text-gray-400" />
                                        <span className="font-mono text-lg">{maskedPhone}</span>
                                    </div>
                                </div>

                                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-left flex items-start gap-2">
                                    <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                                    <p className="text-sm text-amber-800">
                                        Müşterinizden telefon numarasını onaylamasını ve SMS'i beklemesini isteyin.
                                    </p>
                                </div>
                            </div>
                        )}

                        {step === "verify" && (
                            <div className="text-center">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <MessageSquare className="h-8 w-8 text-green-600" />
                                </div>
                                <h4 className="text-lg font-semibold text-gray-900 mb-2">Kod Gönderildi</h4>
                                <p className="text-sm text-gray-500 mb-2">
                                    {maskedPhone} numarasına 6 haneli doğrulama kodu gönderildi.
                                </p>

                                {/* Demo: Kodu göster (sadece test için) */}
                                {generatedCode && (
                                    <div className="mb-4 p-2 bg-blue-50 border border-blue-200 rounded-lg">
                                        <p className="text-xs text-blue-600">Demo: SMS Kodu</p>
                                        <p className="text-2xl font-mono font-bold text-blue-700">{generatedCode}</p>
                                    </div>
                                )}

                                {/* Countdown */}
                                {countdown > 0 && (
                                    <div className="flex items-center justify-center gap-1 text-sm text-gray-500 mb-4">
                                        <Clock className="h-4 w-4" />
                                        <span>Kalan süre: {formatTime(countdown)}</span>
                                    </div>
                                )}

                                {/* Code Input */}
                                <div className="mb-4">
                                    <input
                                        type="text"
                                        maxLength={6}
                                        value={code}
                                        onChange={(e) => {
                                            const value = e.target.value.replace(/\D/g, "");
                                            setCode(value);
                                            setError(null);
                                        }}
                                        placeholder="• • • • • •"
                                        className={cn(
                                            "w-full text-center text-3xl font-mono tracking-[0.5em] py-4 border rounded-lg focus:outline-none focus:ring-2",
                                            error
                                                ? "border-red-300 focus:ring-red-500"
                                                : "border-gray-300 focus:ring-indigo-500"
                                        )}
                                    />
                                </div>

                                {/* Error Message */}
                                {error && (
                                    <div className="mb-4 p-2 bg-red-50 border border-red-200 rounded-lg flex items-center justify-center gap-2">
                                        <AlertCircle className="h-4 w-4 text-red-500" />
                                        <span className="text-sm text-red-600">{error}</span>
                                    </div>
                                )}

                                {/* Resend */}
                                {countdown === 0 && (
                                    <button
                                        onClick={handleResend}
                                        className="text-sm text-indigo-600 hover:text-indigo-700 flex items-center justify-center gap-1 mx-auto"
                                    >
                                        <RefreshCw className="h-4 w-4" />
                                        Yeniden gönder
                                    </button>
                                )}
                            </div>
                        )}

                        {step === "success" && (
                            <div className="text-center py-6">
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle className="h-10 w-10 text-green-600" />
                                </div>
                                <h4 className="text-xl font-semibold text-gray-900 mb-2">Doğrulama Başarılı!</h4>
                                <p className="text-sm text-gray-500">
                                    Kimlik doğrulandı. İşleminize devam ediliyor...
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    {step !== "success" && (
                        <div className="flex justify-end gap-3 p-4 border-t border-gray-100 bg-gray-50">
                            <button
                                onClick={handleClose}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                İptal
                            </button>
                            {step === "send" ? (
                                <button
                                    onClick={handleSendCode}
                                    disabled={isSending}
                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors"
                                >
                                    {isSending ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                            Gönderiliyor...
                                        </>
                                    ) : (
                                        <>
                                            <MessageSquare className="h-4 w-4 mr-2" />
                                            SMS Gönder
                                        </>
                                    )}
                                </button>
                            ) : (
                                <button
                                    onClick={handleVerify}
                                    disabled={isVerifying || code.length !== 6}
                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
                                >
                                    {isVerifying ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                            Doğrulanıyor...
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircle className="h-4 w-4 mr-2" />
                                            Doğrula
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
