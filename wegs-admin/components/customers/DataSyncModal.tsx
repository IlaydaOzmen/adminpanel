"use client";

import { useState } from "react";
import { X, Building2, FileText, RefreshCw, Calendar, CheckCircle, AlertCircle, Download, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface DataSyncModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: "bank" | "invoice";
    customerName: string;
}

interface SyncResult {
    success: boolean;
    count: number;
    message: string;
}

export function DataSyncModal({
    isOpen,
    onClose,
    type,
    customerName
}: DataSyncModalProps) {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [selectedBanks, setSelectedBanks] = useState<string[]>([]);
    const [invoiceType, setInvoiceType] = useState<"all" | "incoming" | "outgoing">("all");
    const [isSyncing, setIsSyncing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [result, setResult] = useState<SyncResult | null>(null);

    const banks = [
        { id: "garanti", name: "Garanti BBVA", icon: "🏦" },
        { id: "isbank", name: "İş Bankası", icon: "🏛️" },
        { id: "yapikredi", name: "Yapı Kredi", icon: "💳" },
    ];

    if (!isOpen) return null;

    const handleSync = async () => {
        if (!startDate || !endDate) {
            alert("Lütfen tarih aralığı seçin.");
            return;
        }

        if (type === "bank" && selectedBanks.length === 0) {
            alert("Lütfen en az bir banka seçin.");
            return;
        }

        setIsSyncing(true);
        setProgress(0);
        setResult(null);

        // Simulate progress
        for (let i = 0; i <= 100; i += 10) {
            await new Promise(resolve => setTimeout(resolve, 200));
            setProgress(i);
        }

        // Simulate result
        setResult({
            success: true,
            count: type === "bank" ? 47 : 123,
            message: type === "bank"
                ? "47 banka hareketi başarıyla çekildi."
                : "123 fatura başarıyla senkronize edildi."
        });
        setIsSyncing(false);
    };

    const handleClose = () => {
        setStartDate("");
        setEndDate("");
        setSelectedBanks([]);
        setInvoiceType("all");
        setProgress(0);
        setResult(null);
        onClose();
    };

    const toggleBank = (bankId: string) => {
        setSelectedBanks(prev =>
            prev.includes(bankId)
                ? prev.filter(id => id !== bankId)
                : [...prev, bankId]
        );
    };

    const config = {
        bank: {
            title: "Banka Hareketleri Çekme",
            subtitle: "Bankadan son hareketleri çek",
            icon: Building2,
            color: "blue",
            gradientFrom: "from-blue-50",
            gradientTo: "to-indigo-50"
        },
        invoice: {
            title: "Faturaları Çekme",
            subtitle: "Entegratörden faturaları çek",
            icon: FileText,
            color: "emerald",
            gradientFrom: "from-emerald-50",
            gradientTo: "to-teal-50"
        }
    };

    const currentConfig = config[type];
    const Icon = currentConfig.icon;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-4">
                {/* Backdrop */}
                <div className="fixed inset-0 bg-black/50 transition-opacity" onClick={handleClose} />

                {/* Modal */}
                <div className="relative bg-white rounded-xl shadow-xl max-w-lg w-full overflow-hidden">
                    {/* Header */}
                    <div className={cn(
                        "flex items-center justify-between p-4 border-b border-gray-100 bg-gradient-to-r",
                        currentConfig.gradientFrom,
                        currentConfig.gradientTo
                    )}>
                        <div className="flex items-center gap-3">
                            <div className={cn("p-2 rounded-lg", `bg-${currentConfig.color}-100`)}>
                                <Icon className={cn("h-5 w-5", `text-${currentConfig.color}-600`)} />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">{currentConfig.title}</h3>
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
                    <div className="p-6 space-y-6">
                        {!result ? (
                            <>
                                {/* Date Range */}
                                <div className="space-y-3">
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                        <Calendar className="h-4 w-4 text-gray-400" />
                                        Tarih Aralığı
                                    </label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs text-gray-500 mb-1">Başlangıç</label>
                                            <input
                                                type="date"
                                                value={startDate}
                                                onChange={(e) => setStartDate(e.target.value)}
                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-500 mb-1">Bitiş</label>
                                            <input
                                                type="date"
                                                value={endDate}
                                                onChange={(e) => setEndDate(e.target.value)}
                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                    </div>
                                    {/* Quick Date Options */}
                                    <div className="flex gap-2">
                                        {["Son 7 Gün", "Son 30 Gün", "Bu Ay", "Son 3 Ay"].map((label, idx) => (
                                            <button
                                                key={label}
                                                onClick={() => {
                                                    const today = new Date();
                                                    const start = new Date();
                                                    if (idx === 0) start.setDate(today.getDate() - 7);
                                                    else if (idx === 1) start.setDate(today.getDate() - 30);
                                                    else if (idx === 2) start.setDate(1);
                                                    else start.setMonth(today.getMonth() - 3);
                                                    setStartDate(start.toISOString().split("T")[0]);
                                                    setEndDate(today.toISOString().split("T")[0]);
                                                }}
                                                className="px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                                            >
                                                {label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Bank Selection (for bank type) */}
                                {type === "bank" && (
                                    <div className="space-y-3">
                                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                            <Building2 className="h-4 w-4 text-gray-400" />
                                            Bankalar
                                        </label>
                                        <div className="space-y-2">
                                            {banks.map((bank) => (
                                                <div
                                                    key={bank.id}
                                                    onClick={() => toggleBank(bank.id)}
                                                    className={cn(
                                                        "flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all",
                                                        selectedBanks.includes(bank.id)
                                                            ? "border-blue-500 bg-blue-50"
                                                            : "border-gray-200 hover:border-gray-300"
                                                    )}
                                                >
                                                    <span className="text-xl">{bank.icon}</span>
                                                    <span className="flex-1 font-medium text-gray-900">{bank.name}</span>
                                                    <div className={cn(
                                                        "w-5 h-5 rounded border-2 flex items-center justify-center",
                                                        selectedBanks.includes(bank.id)
                                                            ? "border-blue-500 bg-blue-500"
                                                            : "border-gray-300"
                                                    )}>
                                                        {selectedBanks.includes(bank.id) && (
                                                            <CheckCircle className="h-3 w-3 text-white" />
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Invoice Type (for invoice type) */}
                                {type === "invoice" && (
                                    <div className="space-y-3">
                                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                            <FileText className="h-4 w-4 text-gray-400" />
                                            Fatura Türü
                                        </label>
                                        <div className="grid grid-cols-3 gap-2">
                                            {[
                                                { id: "all", label: "Tümü" },
                                                { id: "incoming", label: "Gelen" },
                                                { id: "outgoing", label: "Giden" }
                                            ].map((option) => (
                                                <button
                                                    key={option.id}
                                                    onClick={() => setInvoiceType(option.id as typeof invoiceType)}
                                                    className={cn(
                                                        "px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all",
                                                        invoiceType === option.id
                                                            ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                                                            : "border-gray-200 text-gray-700 hover:border-gray-300"
                                                    )}
                                                >
                                                    {option.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Progress */}
                                {isSyncing && (
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-600">Çekiliyor...</span>
                                            <span className="font-medium text-gray-900">{progress}%</span>
                                        </div>
                                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <div
                                                className={cn(
                                                    "h-full rounded-full transition-all duration-300",
                                                    type === "bank" ? "bg-blue-600" : "bg-emerald-600"
                                                )}
                                                style={{ width: `${progress}%` }}
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Warning */}
                                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2">
                                    <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                                    <p className="text-sm text-amber-800">
                                        {type === "bank"
                                            ? "Banka hareketleri doğrudan banka API'sinden çekilecektir. Bu işlem birkaç dakika sürebilir."
                                            : "Faturalar GİB entegratöründen çekilecektir. Çok sayıda fatura olması durumunda işlem uzun sürebilir."
                                        }
                                    </p>
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-6">
                                <div className={cn(
                                    "w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4",
                                    result.success ? "bg-green-100" : "bg-red-100"
                                )}>
                                    {result.success ? (
                                        <CheckCircle className="h-10 w-10 text-green-600" />
                                    ) : (
                                        <AlertCircle className="h-10 w-10 text-red-600" />
                                    )}
                                </div>
                                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                                    {result.success ? "Tamamlandı!" : "Hata Oluştu"}
                                </h4>
                                <p className="text-sm text-gray-500 mb-4">{result.message}</p>

                                {result.success && (
                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-sm text-gray-600">
                                        <Clock className="h-4 w-4" />
                                        Son güncelleme: {new Date().toLocaleString("tr-TR")}
                                    </div>
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
                            {result ? "Kapat" : "İptal"}
                        </button>
                        {!result && (
                            <button
                                onClick={handleSync}
                                disabled={isSyncing}
                                className={cn(
                                    "inline-flex items-center px-4 py-2 text-sm font-medium text-white rounded-lg disabled:opacity-50 transition-colors",
                                    type === "bank"
                                        ? "bg-blue-600 hover:bg-blue-700"
                                        : "bg-emerald-600 hover:bg-emerald-700"
                                )}
                            >
                                {isSyncing ? (
                                    <>
                                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                                        Çekiliyor...
                                    </>
                                ) : (
                                    <>
                                        <Download className="h-4 w-4 mr-2" />
                                        Verileri Çek
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
