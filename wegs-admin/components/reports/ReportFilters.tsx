"use client";

import { Calendar, Filter, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReportFiltersProps {
    dateRange: { start: string; end: string };
    onDateRangeChange: (range: { start: string; end: string }) => void;
    category: string;
    onCategoryChange: (category: string) => void;
    onSelectAll: () => void;
    onDeselectAll: () => void;
    selectedCount: number;
    totalCount: number;
}

export function ReportFilters({
    dateRange,
    onDateRangeChange,
    category,
    onCategoryChange,
    onSelectAll,
    onDeselectAll,
    selectedCount,
    totalCount,
}: ReportFiltersProps) {
    const categories = [
        { value: "all", label: "Tüm Kategoriler" },
        { value: "users", label: "Kullanıcılar" },
        { value: "finance", label: "Finans" },
        { value: "support", label: "Destek" },
        { value: "modules", label: "Modüller" },
    ];

    return (
        <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                {/* Date Range */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-700">Tarih Aralığı:</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <input
                            type="date"
                            value={dateRange.start}
                            onChange={(e) => onDateRangeChange({ ...dateRange, start: e.target.value })}
                            className="rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        <span className="text-gray-400">-</span>
                        <input
                            type="date"
                            value={dateRange.end}
                            onChange={(e) => onDateRangeChange({ ...dateRange, end: e.target.value })}
                            className="rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {/* Category Filter */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-700">Kategori:</span>
                    </div>
                    <select
                        value={category}
                        onChange={(e) => onCategoryChange(e.target.value)}
                        className="rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                        {categories.map((cat) => (
                            <option key={cat.value} value={cat.value}>
                                {cat.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Selection Controls */}
                <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500">
                        {selectedCount} / {totalCount} seçili
                    </span>
                    <button
                        onClick={onSelectAll}
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                        Tümünü Seç
                    </button>
                    <button
                        onClick={onDeselectAll}
                        className="text-sm text-gray-600 hover:text-gray-700 font-medium"
                    >
                        Temizle
                    </button>
                </div>
            </div>
        </div>
    );
}
