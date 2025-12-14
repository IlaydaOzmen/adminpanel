"use client";

import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { X, Building2, Store, ShoppingCart, Package, FileCheck, Calculator } from "lucide-react";

interface SegmentData {
    name: string;
    value: number;
    color: string;
    customers: string[];
    [key: string]: string | number | string[];
}

interface SubStatData {
    label: string;
    value: number;
    color: string;
    icon: React.ReactNode;
    customers: string[];
}

const data: SegmentData[] = [
    {
        name: "Sadece Muhasebe",
        value: 400,
        color: "#3b82f6",
        customers: ["Alfa Danışmanlık", "Beta Hukuk", "Gamma Mühendislik", "Delta İnşaat", "Epsilon Lojistik", "Zeta Tarım"]
    },
    {
        name: "Muhasebe + Pazaryeri",
        value: 300,
        color: "#10b981",
        customers: ["Atlas Market", "TechSoft A.Ş.", "Mega Dağıtım", "Birlik Gıda", "Kaya Ticaret"]
    },
    {
        name: "Full E-ticaret",
        value: 300,
        color: "#f59e0b",
        customers: ["Online Moda", "E-Elektronik", "Dijital Kitap", "Spor Merkezi", "Ev & Yaşam Plus"]
    },
];

const subStats: SubStatData[] = [
    {
        label: "E-ticaret Entegrasyonlu",
        value: 600,
        color: "#10b981",
        icon: <Package className="w-4 h-4 text-green-600" />,
        customers: ["Atlas Market", "TechSoft A.Ş.", "Mega Dağıtım", "Online Moda", "E-Elektronik", "Dijital Kitap", "Spor Merkezi", "Birlik Gıda", "Kaya Ticaret", "Ev & Yaşam Plus"]
    },
    {
        label: "E-tic. ve E-Fatura Kullanan",
        value: 450,
        color: "#8b5cf6",
        icon: <FileCheck className="w-4 h-4 text-purple-600" />,
        customers: ["Atlas Market", "TechSoft A.Ş.", "Online Moda", "E-Elektronik", "Dijital Kitap", "Mega Dağıtım", "Spor Merkezi"]
    },
    {
        label: "Sadece Muhasebe",
        value: 400,
        color: "#3b82f6",
        icon: <Calculator className="w-4 h-4 text-blue-600" />,
        customers: ["Alfa Danışmanlık", "Beta Hukuk", "Gamma Mühendislik", "Delta İnşaat", "Epsilon Lojistik", "Zeta Tarım"]
    },
];

const iconMap: Record<string, React.ReactNode> = {
    "Sadece Muhasebe": <Building2 className="w-4 h-4 text-blue-600" />,
    "Muhasebe + Pazaryeri": <Store className="w-4 h-4 text-green-600" />,
    "Full E-ticaret": <ShoppingCart className="w-4 h-4 text-amber-600" />,
};

export function SegmentationPieChart() {
    const [selectedSegment, setSelectedSegment] = useState<SegmentData | null>(null);
    const [selectedSubStat, setSelectedSubStat] = useState<SubStatData | null>(null);

    const handlePieClick = (entry: SegmentData) => {
        setSelectedSegment(entry);
    };

    const handleSubStatClick = (stat: SubStatData) => {
        setSelectedSubStat(stat);
    };

    return (
        <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-900/5 h-full">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Müşteri Segmentasyonu</h3>

            <div className="mt-4 h-48">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={70}
                            paddingAngle={5}
                            dataKey="value"
                            onClick={(_, index) => handlePieClick(data[index])}
                            style={{ cursor: 'pointer' }}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend verticalAlign="middle" align="right" layout="vertical" iconSize={8} wrapperStyle={{ fontSize: "12px" }} />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-4 space-y-2 border-t border-gray-100 pt-4">
                {subStats.map((stat) => (
                    <div
                        key={stat.label}
                        onClick={() => handleSubStatClick(stat)}
                        className="flex items-center justify-between text-sm p-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors group"
                    >
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 rounded-md bg-gray-100 group-hover:bg-white transition-colors">
                                {stat.icon}
                            </div>
                            <span className="text-gray-600 group-hover:text-gray-900 transition-colors">{stat.label}</span>
                        </div>
                        <span className="font-semibold text-gray-900">{stat.value}</span>
                    </div>
                ))}
            </div>

            {/* Modal for Pie Segment Customer List */}
            {selectedSegment && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between p-4 border-b border-gray-100" style={{ backgroundColor: `${selectedSegment.color}10` }}>
                            <div className="flex items-center gap-2">
                                <div className="p-2 rounded-lg" style={{ backgroundColor: `${selectedSegment.color}20` }}>
                                    {iconMap[selectedSegment.name]}
                                </div>
                                <h3 className="text-lg font-semibold text-gray-800">{selectedSegment.name}</h3>
                            </div>
                            <button onClick={() => setSelectedSegment(null)} className="p-1 rounded-full hover:bg-gray-100 transition-colors">
                                <X className="w-5 h-5 text-gray-400" />
                            </button>
                        </div>
                        <div className="max-h-[60vh] overflow-y-auto p-0">
                            <ul className="divide-y divide-gray-50">
                                {selectedSegment.customers.map((customer, idx) => (
                                    <li key={idx} className="flex items-center p-4 hover:bg-gray-50 transition-colors">
                                        <div
                                            className="w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0"
                                            style={{ backgroundColor: `${selectedSegment.color}20` }}
                                        >
                                            <span className="text-xs font-bold" style={{ color: selectedSegment.color }}>
                                                {customer.charAt(0)}
                                            </span>
                                        </div>
                                        <span className="text-sm font-medium text-gray-700">{customer}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
                            <button
                                onClick={() => setSelectedSegment(null)}
                                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
                            >
                                Kapat
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal for SubStat Customer List */}
            {selectedSubStat && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between p-4 border-b border-gray-100" style={{ backgroundColor: `${selectedSubStat.color}10` }}>
                            <div className="flex items-center gap-2">
                                <div className="p-2 rounded-lg" style={{ backgroundColor: `${selectedSubStat.color}20` }}>
                                    {selectedSubStat.icon}
                                </div>
                                <h3 className="text-lg font-semibold text-gray-800">{selectedSubStat.label}</h3>
                            </div>
                            <button onClick={() => setSelectedSubStat(null)} className="p-1 rounded-full hover:bg-gray-100 transition-colors">
                                <X className="w-5 h-5 text-gray-400" />
                            </button>
                        </div>
                        <div className="max-h-[60vh] overflow-y-auto p-0">
                            <ul className="divide-y divide-gray-50">
                                {selectedSubStat.customers.map((customer, idx) => (
                                    <li key={idx} className="flex items-center p-4 hover:bg-gray-50 transition-colors">
                                        <div
                                            className="w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0"
                                            style={{ backgroundColor: `${selectedSubStat.color}20` }}
                                        >
                                            <span className="text-xs font-bold" style={{ color: selectedSubStat.color }}>
                                                {customer.charAt(0)}
                                            </span>
                                        </div>
                                        <span className="text-sm font-medium text-gray-700">{customer}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
                            <button
                                onClick={() => setSelectedSubStat(null)}
                                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
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
