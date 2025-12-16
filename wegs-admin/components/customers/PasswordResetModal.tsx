"use client";

import { useState } from "react";
import { X, Mail, MessageSquare, Key, Send, CheckCircle, AlertCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface PasswordResetModalProps {
    isOpen: boolean;
    onClose: () => void;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
}

type ResetMethod = "email" | "sms" | "temporary";

export function PasswordResetModal({
    isOpen,
    onClose,
    customerName,
    customerEmail,
    customerPhone
}: PasswordResetModalProps) {
    const [method, setMethod] = useState<ResetMethod>("email");
    const [isSending, setIsSending] = useState(false);
    const [sent, setSent] = useState(false);
    const [tempPassword, setTempPassword] = useState<string | null>(null);

    if (!isOpen) return null;

    const generateTempPassword = () => {
        const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$";
        let password = "";
        for (let i = 0; i < 12; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return password;
    };

    const handleSend = async () => {
        setIsSending(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        if (method === "temporary") {
            const newPassword = generateTempPassword();
            setTempPassword(newPassword);
        }

        setIsSending(false);
        setSent(true);
    };

    const handleClose = () => {
        setMethod("email");
        setSent(false);
        setTempPassword(null);
        onClose();
    };

    const methodOptions = [
        {
            id: "email" as ResetMethod,
            label: "E-posta ile Link Gönder",
            description: "Müşteriye şifre sıfırlama linki e-posta ile gönderilir",
            icon: Mail,
            color: "blue"
        },
        {
            id: "sms" as ResetMethod,
            label: "SMS ile Kod Gönder",
            description: "Tek kullanımlık kod SMS ile gönderilir",
            icon: MessageSquare,
            color: "green"
        },
        {
            id: "temporary" as ResetMethod,
            label: "Geçici Şifre Oluştur",
            description: "Geçici şifre oluşturulur ve ekranda gösterilir",
            icon: Key,
            color: "purple"
        }
    ];

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-4">
                {/* Backdrop */}
                <div className="fixed inset-0 bg-black/50 transition-opacity" onClick={handleClose} />

                {/* Modal */}
                <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-indigo-50">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-100 rounded-lg">
                                <Key className="h-5 w-5 text-purple-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Şifre Sıfırlama</h3>
                                <p className="text-sm text-gray-500">{customerName}</p>
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
                        {!sent ? (
                            <>
                                {/* Customer Info */}
                                <div className="mb-6 p-4 bg-gray-50 rounded-lg space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-500">E-posta:</span>
                                        <span className="font-medium text-gray-900">{customerEmail}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-500">Telefon:</span>
                                        <span className="font-medium text-gray-900">{customerPhone}</span>
                                    </div>
                                </div>

                                {/* Method Selection */}
                                <div className="space-y-3">
                                    <label className="text-sm font-medium text-gray-700">Sıfırlama Yöntemi</label>
                                    {methodOptions.map((option) => {
                                        const Icon = option.icon;
                                        const isSelected = method === option.id;
                                        return (
                                            <div
                                                key={option.id}
                                                onClick={() => setMethod(option.id)}
                                                className={cn(
                                                    "flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all",
                                                    isSelected
                                                        ? `border-${option.color}-500 bg-${option.color}-50`
                                                        : "border-gray-200 hover:border-gray-300"
                                                )}
                                            >
                                                <div className={cn(
                                                    "p-2 rounded-lg",
                                                    isSelected ? `bg-${option.color}-100` : "bg-gray-100"
                                                )}>
                                                    <Icon className={cn(
                                                        "h-5 w-5",
                                                        isSelected ? `text-${option.color}-600` : "text-gray-500"
                                                    )} />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="font-medium text-gray-900">{option.label}</div>
                                                    <p className="text-sm text-gray-500 mt-0.5">{option.description}</p>
                                                </div>
                                                <div className={cn(
                                                    "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                                                    isSelected
                                                        ? `border-${option.color}-500 bg-${option.color}-500`
                                                        : "border-gray-300"
                                                )}>
                                                    {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Warning for temporary password */}
                                {method === "temporary" && (
                                    <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2">
                                        <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                                        <p className="text-sm text-amber-800">
                                            Geçici şifre sadece bir kez gösterilecektir. Lütfen müşteriye güvenli bir şekilde iletin.
                                        </p>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="text-center py-6">
                                {method === "temporary" && tempPassword ? (
                                    <>
                                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <CheckCircle className="h-8 w-8 text-green-600" />
                                        </div>
                                        <h4 className="text-lg font-semibold text-gray-900 mb-2">Geçici Şifre Oluşturuldu</h4>
                                        <p className="text-sm text-gray-500 mb-4">
                                            Aşağıdaki şifreyi müşteriye güvenli bir şekilde iletin:
                                        </p>
                                        <div className="p-4 bg-gray-100 rounded-lg">
                                            <code className="text-xl font-mono font-bold text-gray-900 select-all">
                                                {tempPassword}
                                            </code>
                                        </div>
                                        <p className="text-xs text-gray-400 mt-3 flex items-center justify-center gap-1">
                                            <Clock className="h-3 w-3" />
                                            Şifre ilk girişte değiştirilmesi istenecektir
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <CheckCircle className="h-8 w-8 text-green-600" />
                                        </div>
                                        <h4 className="text-lg font-semibold text-gray-900 mb-2">
                                            {method === "email" ? "Link Gönderildi!" : "Kod Gönderildi!"}
                                        </h4>
                                        <p className="text-sm text-gray-500">
                                            {method === "email"
                                                ? `Şifre sıfırlama linki ${customerEmail} adresine gönderildi.`
                                                : `Doğrulama kodu ${customerPhone} numarasına gönderildi.`
                                            }
                                        </p>
                                    </>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-3 p-4 border-t border-gray-100 bg-gray-50">
                        <button
                            onClick={handleClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            {sent ? "Kapat" : "İptal"}
                        </button>
                        {!sent && (
                            <button
                                onClick={handleSend}
                                disabled={isSending}
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors"
                            >
                                {isSending ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                        Gönderiliyor...
                                    </>
                                ) : (
                                    <>
                                        <Send className="h-4 w-4 mr-2" />
                                        Gönder
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
