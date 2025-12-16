"use client";

import { useState } from "react";
import {
    Calendar,
    RefreshCw,
    Trash2,
    PauseCircle,
    PlayCircle,
    AlertTriangle,
    CheckCircle,
    Minus,
    Plus,
    Package,
    ShoppingCart,
    Calculator,
    Shield,
    X
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ActionModalsProps {
    isOpen: boolean;
    onClose: () => void;
    type: "license" | "package" | "delete" | "freeze" | null;
    onSMSVerificationRequired?: (actionType: string) => void;
}

export function ActionModals({ isOpen, onClose, type, onSMSVerificationRequired }: ActionModalsProps) {
    const [loading, setLoading] = useState(false);
    const [licenseAction, setLicenseAction] = useState<"add" | "remove">("add");
    const [licenseDays, setLicenseDays] = useState(30);
    const [customDate, setCustomDate] = useState("");
    const [selectedPackage, setSelectedPackage] = useState<"muhasebe" | "eticaret">("eticaret");
    const [deleteType, setDeleteType] = useState<"financial" | "company" | "account" | null>(null);
    const [confirmText, setConfirmText] = useState("");
    const [isFrozen, setIsFrozen] = useState(false);
    const [freezeReason, setFreezeReason] = useState("");

    if (!isOpen || !type) return null;

    const handleAction = () => {
        if (type === "delete" && onSMSVerificationRequired) {
            const actionName = deleteType === "financial" ? "Mali Veri Silme"
                : deleteType === "company" ? "Şirket Verisi Silme"
                    : "Hesap Silme";
            onSMSVerificationRequired(actionName);
            return;
        }

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            alert("İşlem başarıyla tamamlandı!");
            onClose();
        }, 1500);
    };

    const packages = [
        {
            id: "muhasebe" as const,
            name: "Wegs Ön Muhasebe",
            description: "Temel muhasebe özellikleri, fatura kesme, gelir-gider takibi",
            icon: Calculator,
            color: "blue",
            features: ["Fatura Kesme", "Gelir-Gider", "Müşteri Takibi", "Raporlama"]
        },
        {
            id: "eticaret" as const,
            name: "Wegs E-Ticaret",
            description: "Pazaryeri entegrasyonları, stok yönetimi, sipariş takibi dahil",
            icon: ShoppingCart,
            color: "purple",
            features: ["Trendyol", "Hepsiburada", "N11", "Amazon", "Stok Yönetimi", "Sipariş Takibi"]
        }
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-lg rounded-xl bg-white shadow-xl overflow-hidden">
                {/* License Management */}
                {type === "license" && (
                    <>
                        <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <Calendar className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">Lisans Süresi Yönetimi</h3>
                                    <p className="text-sm text-gray-500">Lisans süresini artır veya azalt</p>
                                </div>
                            </div>
                            <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100">
                                <X className="h-5 w-5 text-gray-400" />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <p className="text-sm text-gray-500">Mevcut Lisans Bitiş Tarihi</p>
                                <p className="text-xl font-bold text-gray-900">15 Ocak 2025</p>
                            </div>

                            {/* Action Type */}
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setLicenseAction("add")}
                                    className={cn(
                                        "flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border-2 font-medium transition-all",
                                        licenseAction === "add"
                                            ? "border-green-500 bg-green-50 text-green-700"
                                            : "border-gray-200 text-gray-600 hover:border-gray-300"
                                    )}
                                >
                                    <Plus className="h-4 w-4" />
                                    Süre Ekle
                                </button>
                                <button
                                    onClick={() => setLicenseAction("remove")}
                                    className={cn(
                                        "flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border-2 font-medium transition-all",
                                        licenseAction === "remove"
                                            ? "border-red-500 bg-red-50 text-red-700"
                                            : "border-gray-200 text-gray-600 hover:border-gray-300"
                                    )}
                                >
                                    <Minus className="h-4 w-4" />
                                    Süre Azalt
                                </button>
                            </div>

                            {/* Quick Options */}
                            <div className="grid grid-cols-3 gap-2">
                                {[7, 30, 90, 180, 365].map((days) => (
                                    <button
                                        key={days}
                                        onClick={() => setLicenseDays(days)}
                                        className={cn(
                                            "py-2 rounded-lg text-sm font-medium transition-all",
                                            licenseDays === days
                                                ? licenseAction === "add"
                                                    ? "bg-green-600 text-white"
                                                    : "bg-red-600 text-white"
                                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        )}
                                    >
                                        {days < 365 ? `${days} Gün` : "1 Yıl"}
                                    </button>
                                ))}
                                <button
                                    onClick={() => setLicenseDays(0)}
                                    className={cn(
                                        "py-2 rounded-lg text-sm font-medium transition-all",
                                        licenseDays === 0
                                            ? "bg-blue-600 text-white"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    )}
                                >
                                    Özel
                                </button>
                            </div>

                            {licenseDays === 0 && (
                                <input
                                    type="date"
                                    value={customDate}
                                    onChange={(e) => setCustomDate(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            )}

                            {/* Preview */}
                            <div className={cn(
                                "p-4 rounded-lg border",
                                licenseAction === "add"
                                    ? "bg-green-50 border-green-200"
                                    : "bg-red-50 border-red-200"
                            )}>
                                <p className="text-sm text-gray-600">
                                    {licenseAction === "add" ? "Yeni bitiş tarihi:" : "Yeni bitiş tarihi:"}
                                </p>
                                <p className={cn(
                                    "text-lg font-bold",
                                    licenseAction === "add" ? "text-green-700" : "text-red-700"
                                )}>
                                    {licenseDays > 0
                                        ? new Date(Date.now() + licenseDays * 24 * 60 * 60 * 1000).toLocaleDateString("tr-TR")
                                        : customDate || "Tarih seçin"
                                    }
                                </p>
                            </div>
                        </div>
                    </>
                )}

                {/* Package Switching */}
                {type === "package" && (
                    <>
                        <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-pink-50">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-purple-100 rounded-lg">
                                    <Package className="h-5 w-5 text-purple-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">Paket Değişikliği</h3>
                                    <p className="text-sm text-gray-500">Müşteri paketini değiştir</p>
                                </div>
                            </div>
                            <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100">
                                <X className="h-5 w-5 text-gray-400" />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
                                <p className="text-sm text-purple-600">Mevcut Paket</p>
                                <p className="text-lg font-bold text-purple-900">Wegs E-Ticaret (Pro)</p>
                            </div>

                            <div className="space-y-3">
                                {packages.map((pkg) => {
                                    const Icon = pkg.icon;
                                    const isSelected = selectedPackage === pkg.id;
                                    return (
                                        <div
                                            key={pkg.id}
                                            onClick={() => setSelectedPackage(pkg.id)}
                                            className={cn(
                                                "p-4 rounded-xl border-2 cursor-pointer transition-all",
                                                isSelected
                                                    ? `border-${pkg.color}-500 bg-${pkg.color}-50`
                                                    : "border-gray-200 hover:border-gray-300"
                                            )}
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className={cn(
                                                    "p-2 rounded-lg",
                                                    isSelected ? `bg-${pkg.color}-100` : "bg-gray-100"
                                                )}>
                                                    <Icon className={cn(
                                                        "h-5 w-5",
                                                        isSelected ? `text-${pkg.color}-600` : "text-gray-500"
                                                    )} />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between">
                                                        <span className="font-semibold text-gray-900">{pkg.name}</span>
                                                        <div className={cn(
                                                            "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                                                            isSelected
                                                                ? `border-${pkg.color}-500 bg-${pkg.color}-500`
                                                                : "border-gray-300"
                                                        )}>
                                                            {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                                                        </div>
                                                    </div>
                                                    <p className="text-sm text-gray-500 mt-1">{pkg.description}</p>
                                                    <div className="flex flex-wrap gap-1 mt-2">
                                                        {pkg.features.slice(0, 4).map((feature) => (
                                                            <span
                                                                key={feature}
                                                                className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded"
                                                            >
                                                                {feature}
                                                            </span>
                                                        ))}
                                                        {pkg.features.length > 4 && (
                                                            <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">
                                                                +{pkg.features.length - 4}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2">
                                <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-amber-800">
                                    Paket değişikliği anında geçerli olacaktır. Mevcut veriler korunur ancak bazı özellikler devre dışı kalabilir.
                                </p>
                            </div>
                        </div>
                    </>
                )}

                {/* Data Deletion */}
                {type === "delete" && (
                    <>
                        <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gradient-to-r from-red-50 to-orange-50">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-red-100 rounded-lg">
                                    <Trash2 className="h-5 w-5 text-red-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">Ciddi İşlemler</h3>
                                    <p className="text-sm text-gray-500">Bu işlemler geri alınamaz</p>
                                </div>
                            </div>
                            <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100">
                                <X className="h-5 w-5 text-gray-400" />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="rounded-lg bg-red-50 p-4 border border-red-200">
                                <div className="flex">
                                    <AlertTriangle className="h-5 w-5 text-red-600" />
                                    <div className="ml-3">
                                        <h3 className="text-sm font-medium text-red-800">Dikkat!</h3>
                                        <p className="mt-1 text-sm text-red-700">
                                            Bu işlemler geri alınamaz. SMS doğrulaması gereklidir.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <button
                                    onClick={() => setDeleteType("financial")}
                                    className={cn(
                                        "w-full text-left px-4 py-4 rounded-lg border-2 transition-all flex justify-between items-center",
                                        deleteType === "financial"
                                            ? "border-red-500 bg-red-50"
                                            : "border-gray-200 hover:border-red-200 hover:bg-red-50"
                                    )}
                                >
                                    <div>
                                        <span className="font-medium text-gray-900">Mali Verileri Sil</span>
                                        <p className="text-sm text-gray-500">Faturalar, gelir-gider kayıtları silinir</p>
                                    </div>
                                    <Trash2 className="h-5 w-5 text-red-500" />
                                </button>
                                <button
                                    onClick={() => setDeleteType("company")}
                                    className={cn(
                                        "w-full text-left px-4 py-4 rounded-lg border-2 transition-all flex justify-between items-center",
                                        deleteType === "company"
                                            ? "border-red-500 bg-red-50"
                                            : "border-gray-200 hover:border-red-200 hover:bg-red-50"
                                    )}
                                >
                                    <div>
                                        <span className="font-medium text-gray-900">Şirket Verilerini Sil</span>
                                        <p className="text-sm text-gray-500">Şirket bilgileri ve ayarları silinir</p>
                                    </div>
                                    <Trash2 className="h-5 w-5 text-red-500" />
                                </button>
                                <button
                                    onClick={() => setDeleteType("account")}
                                    className={cn(
                                        "w-full text-left px-4 py-4 rounded-lg border-2 transition-all flex justify-between items-center",
                                        deleteType === "account"
                                            ? "border-red-600 bg-red-100"
                                            : "border-red-300 bg-red-50 hover:bg-red-100"
                                    )}
                                >
                                    <div>
                                        <span className="font-medium text-red-700">Hesabı Tamamen Sil</span>
                                        <p className="text-sm text-red-600">Tüm veriler kalıcı olarak silinir</p>
                                    </div>
                                    <Trash2 className="h-5 w-5 text-red-600" />
                                </button>
                            </div>

                            {deleteType && (
                                <div className="space-y-3 pt-2">
                                    <p className="text-sm text-gray-600">
                                        Onaylamak için <strong className="text-red-600">SİL</strong> yazın:
                                    </p>
                                    <input
                                        type="text"
                                        value={confirmText}
                                        onChange={(e) => setConfirmText(e.target.value)}
                                        placeholder="SİL"
                                        className="w-full border border-red-300 rounded-lg p-3 text-center font-bold text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                                    />
                                </div>
                            )}
                        </div>
                    </>
                )}

                {/* Freeze Account */}
                {type === "freeze" && (
                    <>
                        <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gradient-to-r from-yellow-50 to-orange-50">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-yellow-100 rounded-lg">
                                    {isFrozen ? (
                                        <PlayCircle className="h-5 w-5 text-green-600" />
                                    ) : (
                                        <PauseCircle className="h-5 w-5 text-yellow-600" />
                                    )}
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">Hesap Durumu</h3>
                                    <p className="text-sm text-gray-500">Hesabı dondur veya aktif et</p>
                                </div>
                            </div>
                            <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100">
                                <X className="h-5 w-5 text-gray-400" />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <span className="text-sm font-medium text-gray-700">Mevcut Durum</span>
                                <span className={cn(
                                    "inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium",
                                    isFrozen
                                        ? "bg-blue-100 text-blue-700"
                                        : "bg-green-100 text-green-700"
                                )}>
                                    {isFrozen ? (
                                        <>
                                            <PauseCircle className="h-4 w-4" />
                                            Dondurulmuş
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircle className="h-4 w-4" />
                                            Aktif
                                        </>
                                    )}
                                </span>
                            </div>

                            {!isFrozen ? (
                                <>
                                    <p className="text-sm text-gray-500">
                                        Hesabı dondurduğunuzda kullanıcı sisteme giriş yapamaz ancak verileri saklanır.
                                    </p>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Dondurma Nedeni (Opsiyonel)</label>
                                        <textarea
                                            value={freezeReason}
                                            onChange={(e) => setFreezeReason(e.target.value)}
                                            placeholder="Örn: Ödeme gecikmesi, müşteri talebi..."
                                            rows={3}
                                            className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                        />
                                    </div>
                                    <button
                                        onClick={() => setIsFrozen(true)}
                                        className="w-full flex items-center justify-center gap-2 rounded-lg bg-yellow-500 px-4 py-3 text-sm font-medium text-white hover:bg-yellow-600 transition-colors"
                                    >
                                        <PauseCircle className="h-5 w-5" />
                                        Hesabı Dondur
                                    </button>
                                </>
                            ) : (
                                <>
                                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                        <p className="text-sm text-blue-800">
                                            Bu hesap <strong>10.12.2024</strong> tarihinde donduruldu.
                                        </p>
                                        {freezeReason && (
                                            <p className="text-sm text-blue-700 mt-2">
                                                Neden: {freezeReason}
                                            </p>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => setIsFrozen(false)}
                                        className="w-full flex items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-3 text-sm font-medium text-white hover:bg-green-700 transition-colors"
                                    >
                                        <PlayCircle className="h-5 w-5" />
                                        Hesabı Aktif Et
                                    </button>
                                </>
                            )}
                        </div>
                    </>
                )}

                {/* Footer Actions */}
                <div className="flex justify-end gap-3 p-4 border-t border-gray-100 bg-gray-50">
                    <button
                        onClick={onClose}
                        className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        İptal
                    </button>
                    {type !== "freeze" && (
                        <button
                            onClick={handleAction}
                            disabled={loading || (type === "delete" && (!deleteType || confirmText !== "SİL"))}
                            className={cn(
                                "rounded-lg px-4 py-2 text-sm font-medium text-white flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
                                type === "delete" ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"
                            )}
                        >
                            {loading && <RefreshCw className="h-4 w-4 animate-spin" />}
                            {type === "delete" ? (
                                <>
                                    <Shield className="h-4 w-4" />
                                    SMS Doğrula ve Sil
                                </>
                            ) : (
                                "Kaydet"
                            )}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
