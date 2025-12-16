"use client";

import { Download, FileSpreadsheet, Loader2 } from "lucide-react";
import { useState } from "react";

interface KPIData {
    id: string;
    title: string;
    value: string | number;
    category: string;
}

interface ReportExporterProps {
    selectedKPIs: KPIData[];
    dateRange: { start: string; end: string };
}

export function ReportExporter({ selectedKPIs, dateRange }: ReportExporterProps) {
    const [isExporting, setIsExporting] = useState(false);

    const exportToCSV = () => {
        if (selectedKPIs.length === 0) {
            alert("Lütfen en az bir KPI seçin.");
            return;
        }

        setIsExporting(true);

        // Simulate export delay
        setTimeout(() => {
            // Create CSV content
            const headers = ["KPI Adı", "Değer", "Kategori", "Tarih Aralığı"];
            const rows = selectedKPIs.map((kpi) => [
                kpi.title,
                String(kpi.value),
                kpi.category,
                `${dateRange.start} - ${dateRange.end}`,
            ]);

            const csvContent = [
                headers.join(","),
                ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
            ].join("\n");

            // Create and download file
            const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
            const link = document.createElement("a");
            const url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", `wegs_rapor_${new Date().toISOString().split("T")[0]}.csv`);
            link.style.visibility = "hidden";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setIsExporting(false);
        }, 1000);
    };

    return (
        <div className="flex items-center gap-3">
            <button
                onClick={exportToCSV}
                disabled={isExporting || selectedKPIs.length === 0}
                className="inline-flex items-center px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg shadow-sm hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
                {isExporting ? (
                    <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        Hazırlanıyor...
                    </>
                ) : (
                    <>
                        <FileSpreadsheet className="h-5 w-5 mr-2" />
                        Rapor İndir (CSV)
                    </>
                )}
            </button>
            {selectedKPIs.length === 0 && (
                <span className="text-sm text-amber-600">
                    ⚠️ Rapor için KPI seçin
                </span>
            )}
        </div>
    );
}
