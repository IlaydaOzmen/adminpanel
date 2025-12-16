"use client";

import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { X, Globe, ShoppingCart, Box, Store, Layers, MoreHorizontal } from "lucide-react";

interface EcommerceData {
    name: string;
    value: number;
    color: string;
    customers: string[];
    icon: React.ReactNode;
    [key: string]: string | number | string[] | React.ReactNode;
}

const data: EcommerceData[] = [
    {
        name: "WooCommerce",
        value: 320,
        color: "#9B5C8F",
        icon: <Globe className="w-4 h-4 text-purple-600" />,
        customers: ["WordPress Mağaza", "WP Store Pro", "Tema Shop", "Plugin Market", "Blog Shop", "Dijital Ürünler"]
    },
    {
        name: "Shopify",
        value: 280,
        color: "#95BF47",
        icon: <ShoppingCart className="w-4 h-4 text-green-600" />,
        customers: ["Global Fashion", "Tech Accessories", "Beauty Plus", "Home Decor", "Sports Gear"]
    },
    {
        name: "OpenCart",
        value: 190,
        color: "#2AB5E2",
        icon: <Box className="w-4 h-4 text-blue-500" />,
        customers: ["Açık Kaynak Market", "OC Store", "Multi Vendor Shop", "Toptan Satış"]
    },
    {
        name: "Magento",
        value: 150,
        color: "#F36B22",
        icon: <Layers className="w-4 h-4 text-orange-600" />,
        customers: ["Enterprise Store", "B2B Platform", "Kurumsal Mağaza"]
    },
    {
        name: "PrestaShop",
        value: 120,
        color: "#DF0067",
        icon: <Store className="w-4 h-4 text-pink-600" />,
        customers: ["Avrupa Market", "Multi Lang Store", "EU Shop"]
    },
    {
        name: "Diğer",
        value: 80,
        color: "#78909C",
        icon: <MoreHorizontal className="w-4 h-4 text-gray-600" />,
        customers: ["Custom CMS", "Özel Yazılım", "API Entegrasyon"]
    },
];

const COLORS = data.map(d => d.color);

export function EcommercePieChart() {
    const [selectedSegment, setSelectedSegment] = useState<EcommerceData | null>(null);

    const handlePieClick = (entry: EcommerceData) => {
        setSelectedSegment(entry);
    };

    const total = data.reduce((acc, curr) => acc + curr.value, 0);

    return (
        <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium leading-6 text-gray-900">E-ticaret Platform Dağılımı</h3>
                <span className="text-sm text-gray-500">Toplam: {total} müşteri</span>
            </div>

            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={90}
                            paddingAngle={2}
                            dataKey="value"
                            onClick={(_, index) => handlePieClick(data[index])}
                            style={{ cursor: 'pointer' }}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index]} />
                            ))}
                        </Pie>
                        <Tooltip
                            formatter={(value: number) => [`${value} müşteri`, 'Sayı']}
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                        <Legend
                            verticalAlign="middle"
                            align="right"
                            layout="vertical"
                            iconSize={10}
                            wrapperStyle={{ fontSize: "12px" }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* Stats List */}
            <div className="mt-4 space-y-2 border-t border-gray-100 pt-4">
                {data.map((item) => (
                    <div
                        key={item.name}
                        onClick={() => handlePieClick(item)}
                        className="flex items-center justify-between text-sm p-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors group"
                    >
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 rounded-md bg-gray-100 group-hover:bg-white transition-colors">
                                {item.icon}
                            </div>
                            <span className="text-gray-600 group-hover:text-gray-900 transition-colors">{item.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-400">{((item.value / total) * 100).toFixed(1)}%</span>
                            <span className="font-semibold text-gray-900">{item.value}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal for Customer List */}
            {selectedSegment && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between p-4 border-b border-gray-100" style={{ backgroundColor: `${selectedSegment.color}15` }}>
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg" style={{ backgroundColor: `${selectedSegment.color}25` }}>
                                    {selectedSegment.icon}
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800">{selectedSegment.name}</h3>
                                    <p className="text-sm text-gray-500">{selectedSegment.value} müşteri</p>
                                </div>
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
        </div>
    );
}
