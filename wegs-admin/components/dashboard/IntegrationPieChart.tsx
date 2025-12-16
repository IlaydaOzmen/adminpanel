"use client";

import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { X, FileText, FileCheck, Truck, Receipt, FileSpreadsheet, MoreHorizontal, TrendingUp, Users, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface IntegrationData {
    name: string;
    value: number;
    color: string;
    gradientFrom: string;
    gradientTo: string;
    customers: string[];
    icon: React.ReactNode;
    [key: string]: string | number | string[] | React.ReactNode;
}

const data: IntegrationData[] = [
    {
        name: "E-Fatura",
        value: 520,
        color: "#10B981",
        gradientFrom: "#10B981",
        gradientTo: "#059669",
        icon: <FileText className="w-4 h-4" />,
        customers: ["Büyük Holding", "Kurumsal A.Ş.", "Sanayi Ltd.", "Ticaret Grubu", "İthalat İhracat", "Dağıtım Merkezi", "Üretim Tesisi"]
    },
    {
        name: "E-Arşiv",
        value: 480,
        color: "#3B82F6",
        gradientFrom: "#3B82F6",
        gradientTo: "#2563EB",
        icon: <FileCheck className="w-4 h-4" />,
        customers: ["Perakende Zinciri", "Market Grubu", "Mağaza A.Ş.", "Online Satış", "Hizmet Sektörü", "Danışmanlık Ltd."]
    },
    {
        name: "E-İrsaliye",
        value: 280,
        color: "#F59E0B",
        gradientFrom: "#F59E0B",
        gradientTo: "#D97706",
        icon: <Truck className="w-4 h-4" />,
        customers: ["Lojistik Firması", "Kargo Şirketi", "Nakliyat Ltd.", "Depo Yönetimi", "Tedarik Zinciri"]
    },
    {
        name: "E-Müstahsil",
        value: 150,
        color: "#8B5CF6",
        gradientFrom: "#8B5CF6",
        gradientTo: "#7C3AED",
        icon: <Receipt className="w-4 h-4" />,
        customers: ["Tarım Kooperatifi", "Çiftlik Ürünleri", "Organik Gıda", "Hasat Market"]
    },
    {
        name: "E-Defter",
        value: 320,
        color: "#EC4899",
        gradientFrom: "#EC4899",
        gradientTo: "#DB2777",
        icon: <FileSpreadsheet className="w-4 h-4" />,
        customers: ["Muhasebe Ofisi", "Mali Müşavir", "Denetim Şirketi", "Finans Departmanı", "Raporlama Merkezi"]
    },
    {
        name: "Diğer",
        value: 90,
        color: "#64748B",
        gradientFrom: "#64748B",
        gradientTo: "#475569",
        icon: <MoreHorizontal className="w-4 h-4" />,
        customers: ["E-SMM", "E-Bilet Entegrasyonu", "Özel Entegrasyon"]
    },
];

const COLORS = data.map(d => d.color);

export function IntegrationPieChart() {
    const [selectedSegment, setSelectedSegment] = useState<IntegrationData | null>(null);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const handlePieClick = (entry: IntegrationData) => {
        setSelectedSegment(entry);
    };

    const total = data.reduce((acc, curr) => acc + curr.value, 0);

    return (
        <div className="rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-lg ring-1 ring-gray-900/5 overflow-hidden relative">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100/40 to-purple-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            {/* Header */}
            <div className="flex items-center justify-between mb-6 relative">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">GİB Entegrasyon Dağılımı</h3>
                    <p className="text-sm text-gray-500 mt-0.5">Toplam {total.toLocaleString('tr-TR')} müşteri</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-full">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-700">+12.4%</span>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Pie Chart */}
                <div className="flex-1 h-72 relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <defs>
                                {data.map((item, index) => (
                                    <linearGradient key={`gradient-${index}`} id={`gradient-${index}`} x1="0" y1="0" x2="1" y2="1">
                                        <stop offset="0%" stopColor={item.gradientFrom} />
                                        <stop offset="100%" stopColor={item.gradientTo} />
                                    </linearGradient>
                                ))}
                            </defs>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={70}
                                outerRadius={hoveredIndex !== null ? 110 : 100}
                                paddingAngle={3}
                                dataKey="value"
                                onClick={(_, index) => handlePieClick(data[index])}
                                onMouseEnter={(_, index) => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                style={{ cursor: 'pointer', filter: 'drop-shadow(0 4px 6px rgb(0 0 0 / 0.1))' }}
                                animationDuration={500}
                            >
                                {data.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={`url(#gradient-${index})`}
                                        stroke="white"
                                        strokeWidth={2}
                                        style={{
                                            transform: hoveredIndex === index ? 'scale(1.05)' : 'scale(1)',
                                            transformOrigin: 'center',
                                            transition: 'transform 0.2s ease-out'
                                        }}
                                    />
                                ))}
                            </Pie>
                            <Tooltip
                                formatter={(value: number) => [`${value.toLocaleString('tr-TR')} müşteri`, '']}
                                contentStyle={{
                                    borderRadius: '12px',
                                    border: 'none',
                                    boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1)',
                                    padding: '12px 16px'
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                    {/* Center label */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                        <Users className="w-6 h-6 mx-auto text-gray-400 mb-1" />
                        <p className="text-2xl font-bold text-gray-900">{total.toLocaleString('tr-TR')}</p>
                        <p className="text-xs text-gray-500">Toplam</p>
                    </div>
                </div>

                {/* Legend with progress bars */}
                <div className="lg:w-64 space-y-2">
                    {data.map((item, index) => {
                        const percentage = (item.value / total) * 100;
                        return (
                            <div
                                key={item.name}
                                onClick={() => handlePieClick(item)}
                                className={cn(
                                    "p-3 rounded-xl cursor-pointer transition-all duration-200 group border",
                                    hoveredIndex === index
                                        ? "bg-white shadow-md border-gray-200 scale-[1.02]"
                                        : "bg-gray-50/50 border-transparent hover:bg-white hover:shadow-sm"
                                )}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="p-1.5 rounded-lg text-white"
                                            style={{ background: `linear-gradient(135deg, ${item.gradientFrom}, ${item.gradientTo})` }}
                                        >
                                            {item.icon}
                                        </div>
                                        <span className="text-sm font-medium text-gray-700">{item.name}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span className="text-sm font-bold text-gray-900">{item.value}</span>
                                        <ChevronRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full rounded-full transition-all duration-500"
                                            style={{
                                                width: `${percentage}%`,
                                                background: `linear-gradient(90deg, ${item.gradientFrom}, ${item.gradientTo})`
                                            }}
                                        />
                                    </div>
                                    <span className="text-xs text-gray-500 w-10 text-right">{percentage.toFixed(0)}%</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Modal for Customer List */}
            {selectedSegment && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div
                            className="flex items-center justify-between p-5"
                            style={{ background: `linear-gradient(135deg, ${selectedSegment.gradientFrom}15, ${selectedSegment.gradientTo}25)` }}
                        >
                            <div className="flex items-center gap-4">
                                <div
                                    className="p-3 rounded-xl text-white shadow-lg"
                                    style={{ background: `linear-gradient(135deg, ${selectedSegment.gradientFrom}, ${selectedSegment.gradientTo})` }}
                                >
                                    {selectedSegment.icon}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">{selectedSegment.name}</h3>
                                    <p className="text-sm text-gray-500">{selectedSegment.value} müşteri · {((selectedSegment.value / total) * 100).toFixed(1)}% oran</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedSegment(null)}
                                className="p-2 rounded-full hover:bg-white/50 transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>
                        <div className="max-h-[50vh] overflow-y-auto">
                            <ul className="divide-y divide-gray-100">
                                {selectedSegment.customers.map((customer, idx) => (
                                    <li key={idx} className="flex items-center p-4 hover:bg-gray-50 transition-colors cursor-pointer group">
                                        <div
                                            className="w-10 h-10 rounded-xl flex items-center justify-center mr-4 flex-shrink-0 text-white font-bold"
                                            style={{ background: `linear-gradient(135deg, ${selectedSegment.gradientFrom}, ${selectedSegment.gradientTo})` }}
                                        >
                                            {customer.charAt(0)}
                                        </div>
                                        <div className="flex-1">
                                            <span className="text-sm font-medium text-gray-900">{customer}</span>
                                            <p className="text-xs text-gray-500">{selectedSegment.name} Entegrasyonu</p>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors" />
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="p-4 bg-gray-50 border-t border-gray-100">
                            <button
                                onClick={() => setSelectedSegment(null)}
                                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
                            >
                                Kapat
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
