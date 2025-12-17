"use client";

import { useState } from "react";
import {
    X,
    Download,
    FileSpreadsheet,
    FileText,
    Loader2,
    Check,
    Users,
    CreditCard,
    FileCheck2,
    HeadphonesIcon,
    Package,
    Calendar,
    ChevronDown,
    ChevronUp,
    Settings2
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ReportBuilderModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type DateFilter = "today" | "yesterday" | "last7" | "last30" | "thisMonth" | "q1" | "q2" | "q3" | "q4" | "custom";
type ExportFormat = "csv" | "excel" | "pdf";

interface DataModule {
    id: string;
    name: string;
    icon: React.ElementType;
    fields: { id: string; name: string; selected: boolean }[];
    expanded: boolean;
}

const initialModules: DataModule[] = [
    {
        id: "customers",
        name: "Müşteriler",
        icon: Users,
        expanded: true,
        fields: [
            { id: "c_name", name: "Firma Adı", selected: true },
            { id: "c_contact", name: "İletişim Kişisi", selected: true },
            { id: "c_email", name: "E-posta", selected: true },
            { id: "c_phone", name: "Telefon", selected: false },
            { id: "c_package", name: "Paket", selected: true },
            { id: "c_status", name: "Durum", selected: true },
            { id: "c_created", name: "Kayıt Tarihi", selected: false },
            { id: "c_last_login", name: "Son Giriş", selected: false },
        ],
    },
    {
        id: "payments",
        name: "Ödemeler",
        icon: CreditCard,
        expanded: false,
        fields: [
            { id: "p_customer", name: "Müşteri", selected: true },
            { id: "p_amount", name: "Tutar", selected: true },
            { id: "p_method", name: "Ödeme Yöntemi", selected: true },
            { id: "p_status", name: "Durum", selected: true },
            { id: "p_date", name: "Tarih", selected: true },
            { id: "p_invoice", name: "Fatura No", selected: false },
        ],
    },
    {
        id: "invoices",
        name: "E-Faturalar",
        icon: FileCheck2,
        expanded: false,
        fields: [
            { id: "i_number", name: "Fatura No", selected: true },
            { id: "i_customer", name: "Müşteri", selected: true },
            { id: "i_amount", name: "Tutar", selected: true },
            { id: "i_date", name: "Tarih", selected: true },
            { id: "i_status", name: "Durum", selected: true },
            { id: "i_type", name: "Fatura Tipi", selected: false },
        ],
    },
    {
        id: "support",
        name: "Destek Talepleri",
        icon: HeadphonesIcon,
        expanded: false,
        fields: [
            { id: "s_id", name: "Talep No", selected: true },
            { id: "s_customer", name: "Müşteri", selected: true },
            { id: "s_subject", name: "Konu", selected: true },
            { id: "s_status", name: "Durum", selected: true },
            { id: "s_priority", name: "Öncelik", selected: false },
            { id: "s_created", name: "Oluşturma Tarihi", selected: true },
            { id: "s_resolved", name: "Çözüm Tarihi", selected: false },
        ],
    },
    {
        id: "credits",
        name: "Kontör Kullanımı",
        icon: Package,
        expanded: false,
        fields: [
            { id: "cr_customer", name: "Müşteri", selected: true },
            { id: "cr_balance", name: "Bakiye", selected: true },
            { id: "cr_used", name: "Kullanılan", selected: true },
            { id: "cr_limit", name: "Limit", selected: false },
            { id: "cr_avg", name: "Aylık Ortalama", selected: false },
        ],
    },
];

export function ReportBuilderModal({ isOpen, onClose }: ReportBuilderModalProps) {
    const [modules, setModules] = useState<DataModule[]>(initialModules);
    const [dateFilter, setDateFilter] = useState<DateFilter>("thisMonth");
    const [customDateStart, setCustomDateStart] = useState("");
    const [customDateEnd, setCustomDateEnd] = useState("");
    const [exportFormat, setExportFormat] = useState<ExportFormat>("csv");
    const [isExporting, setIsExporting] = useState(false);

    if (!isOpen) return null;

    const toggleModule = (moduleId: string) => {
        setModules((prev) =>
            prev.map((m) => (m.id === moduleId ? { ...m, expanded: !m.expanded } : m))
        );
    };

    const toggleField = (moduleId: string, fieldId: string) => {
        setModules((prev) =>
            prev.map((m) =>
                m.id === moduleId
                    ? {
                        ...m,
                        fields: m.fields.map((f) =>
                            f.id === fieldId ? { ...f, selected: !f.selected } : f
                        ),
                    }
                    : m
            )
        );
    };

    const toggleAllFields = (moduleId: string, select: boolean) => {
        setModules((prev) =>
            prev.map((m) =>
                m.id === moduleId
                    ? { ...m, fields: m.fields.map((f) => ({ ...f, selected: select })) }
                    : m
            )
        );
    };

    const getSelectedCount = () => {
        return modules.reduce((acc, m) => acc + m.fields.filter((f) => f.selected).length, 0);
    };

    const getSelectedModules = () => {
        return modules.filter((m) => m.fields.some((f) => f.selected));
    };

    const handleExport = () => {
        if (getSelectedCount() === 0) {
            alert("Lütfen en az bir alan seçin.");
            return;
        }

        setIsExporting(true);

        setTimeout(() => {
            // Mock export - in real app, this would call an API
            const selectedData = getSelectedModules().map((m) => ({
                module: m.name,
                fields: m.fields.filter((f) => f.selected).map((f) => f.name),
            }));

            console.log("Exporting:", { dateFilter, customDateStart, customDateEnd, exportFormat, selectedData });

            // Create mock CSV
            const content = selectedData
                .map((d) => `${d.module}: ${d.fields.join(", ")}`)
                .join("\n");

            const blob = new Blob(["\uFEFF" + content], { type: "text/csv;charset=utf-8;" });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = `wegs_ozel_rapor_${new Date().toISOString().split("T")[0]}.${exportFormat}`;
            link.click();

            setIsExporting(false);
            onClose();
        }, 1500);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <Settings2 className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">Özel Rapor Oluştur</h2>
                            <p className="text-sm text-gray-500">İstediğiniz verileri seçin ve indirin</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <X className="h-5 w-5 text-gray-500" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {/* Date Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            Tarih Aralığı
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {[
                                { id: "today", label: "Bugün" },
                                { id: "yesterday", label: "Dün" },
                                { id: "last7", label: "Son 7 Gün" },
                                { id: "last30", label: "Son 30 Gün" },
                                { id: "thisMonth", label: "Bu Ay" },
                                { id: "q1", label: "1. Çeyrek" },
                                { id: "q2", label: "2. Çeyrek" },
                                { id: "q3", label: "3. Çeyrek" },
                                { id: "q4", label: "4. Çeyrek" },
                                { id: "custom", label: "Özel" },
                            ].map((option) => (
                                <button
                                    key={option.id}
                                    onClick={() => setDateFilter(option.id as DateFilter)}
                                    className={cn(
                                        "px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
                                        dateFilter === option.id
                                            ? "bg-blue-600 text-white"
                                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    )}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                        {dateFilter === "custom" && (
                            <div className="mt-3 flex gap-4">
                                <div className="flex-1">
                                    <label className="block text-xs text-gray-500 mb-1">Başlangıç</label>
                                    <input
                                        type="date"
                                        value={customDateStart}
                                        onChange={(e) => setCustomDateStart(e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-xs text-gray-500 mb-1">Bitiş</label>
                                    <input
                                        type="date"
                                        value={customDateEnd}
                                        onChange={(e) => setCustomDateEnd(e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Data Modules */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                            Veri Modülleri & Alanlar
                        </label>
                        <div className="space-y-3">
                            {modules.map((module) => {
                                const selectedFields = module.fields.filter((f) => f.selected).length;
                                const Icon = module.icon;
                                return (
                                    <div key={module.id} className="border border-gray-200 rounded-xl overflow-hidden">
                                        <div
                                            className={cn(
                                                "flex items-center justify-between px-4 py-3 cursor-pointer transition-colors",
                                                selectedFields > 0 ? "bg-blue-50" : "bg-gray-50 hover:bg-gray-100"
                                            )}
                                            onClick={() => toggleModule(module.id)}
                                        >
                                            <div className="flex items-center gap-3">
                                                <Icon className={cn("h-5 w-5", selectedFields > 0 ? "text-blue-600" : "text-gray-400")} />
                                                <span className="font-medium text-gray-900">{module.name}</span>
                                                {selectedFields > 0 && (
                                                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                                                        {selectedFields} alan
                                                    </span>
                                                )}
                                            </div>
                                            {module.expanded ? (
                                                <ChevronUp className="h-4 w-4 text-gray-400" />
                                            ) : (
                                                <ChevronDown className="h-4 w-4 text-gray-400" />
                                            )}
                                        </div>
                                        {module.expanded && (
                                            <div className="px-4 py-3 border-t border-gray-100 bg-white">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-xs text-gray-500">Alanları seçin:</span>
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => toggleAllFields(module.id, true)}
                                                            className="text-xs text-blue-600 hover:underline"
                                                        >
                                                            Tümünü Seç
                                                        </button>
                                                        <span className="text-gray-300">|</span>
                                                        <button
                                                            onClick={() => toggleAllFields(module.id, false)}
                                                            className="text-xs text-gray-500 hover:underline"
                                                        >
                                                            Temizle
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {module.fields.map((field) => (
                                                        <button
                                                            key={field.id}
                                                            onClick={() => toggleField(module.id, field.id)}
                                                            className={cn(
                                                                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all",
                                                                field.selected
                                                                    ? "bg-blue-100 text-blue-700 ring-1 ring-blue-200"
                                                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                                            )}
                                                        >
                                                            {field.selected && <Check className="h-3 w-3" />}
                                                            {field.name}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Export Format */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Dışa Aktarma Formatı
                        </label>
                        <div className="flex gap-3">
                            {[
                                { id: "csv", label: "CSV", icon: FileSpreadsheet },
                                { id: "excel", label: "Excel", icon: FileSpreadsheet },
                                { id: "pdf", label: "PDF", icon: FileText },
                            ].map((format) => (
                                <button
                                    key={format.id}
                                    onClick={() => setExportFormat(format.id as ExportFormat)}
                                    className={cn(
                                        "flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all border",
                                        exportFormat === format.id
                                            ? "bg-blue-50 text-blue-700 border-blue-200"
                                            : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                                    )}
                                >
                                    <format.icon className="h-4 w-4" />
                                    {format.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50">
                    <span className="text-sm text-gray-500">
                        <strong>{getSelectedCount()}</strong> alan seçildi
                    </span>
                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            İptal
                        </button>
                        <button
                            onClick={handleExport}
                            disabled={isExporting || getSelectedCount() === 0}
                            className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {isExporting ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Hazırlanıyor...
                                </>
                            ) : (
                                <>
                                    <Download className="h-4 w-4" />
                                    Raporu İndir
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
