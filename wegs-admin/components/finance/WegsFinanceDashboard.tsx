"use client";

import { useState } from "react";
import {
    TrendingUp,
    TrendingDown,
    ArrowUpRight,
    ArrowDownRight,
    CreditCard,
    Users,
    Calendar,
    Filter,
    Download,
    Search,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

interface Transaction {
    id: string;
    date: string;
    description: string;
    customer: string;
    type: "income" | "expense";
    category: string;
    amount: number;
    paymentMethod: string;
}

const revenueData = [
    { month: "Oca", income: 185000, expense: 42000 },
    { month: "Şub", income: 195000, expense: 45000 },
    { month: "Mar", income: 210000, expense: 48000 },
    { month: "Nis", income: 225000, expense: 51000 },
    { month: "May", income: 245000, expense: 53000 },
    { month: "Haz", income: 268000, expense: 56000 },
    { month: "Tem", income: 285000, expense: 58000 },
    { month: "Ağu", income: 295000, expense: 61000 },
    { month: "Eyl", income: 312000, expense: 64000 },
    { month: "Eki", income: 328000, expense: 67000 },
    { month: "Kas", income: 345000, expense: 70000 },
    { month: "Ara", income: 365000, expense: 73000 },
];

const transactions: Transaction[] = [
    { id: "TRX-001", date: "2024-12-15", description: "Enterprise Plan Yenileme", customer: "Atlas Lojistik A.Ş.", type: "income", category: "Abonelik", amount: 12500, paymentMethod: "Kredi Kartı" },
    { id: "TRX-002", date: "2024-12-15", description: "Business Plan Yeni Kayıt", customer: "TechSoft Bilişim", type: "income", category: "Abonelik", amount: 4500, paymentMethod: "Havale" },
    { id: "TRX-003", date: "2024-12-15", description: "Sunucu Maliyeti - AWS", customer: "-", type: "expense", category: "Altyapı", amount: 8500, paymentMethod: "Kurumsal Kart" },
    { id: "TRX-004", date: "2024-12-14", description: "Kontör Satışı (5000 adet)", customer: "Mega Market", type: "income", category: "Kontör", amount: 2500, paymentMethod: "Kredi Kartı" },
    { id: "TRX-005", date: "2024-12-14", description: "Starter Plan Yenileme", customer: "Birlik Gıda", type: "income", category: "Abonelik", amount: 1500, paymentMethod: "Kredi Kartı" },
    { id: "TRX-006", date: "2024-12-14", description: "Personel Maaşları", customer: "-", type: "expense", category: "Personel", amount: 45000, paymentMethod: "Havale" },
    { id: "TRX-007", date: "2024-12-13", description: "Enterprise Plan Yenileme", customer: "Kaya Holding", type: "income", category: "Abonelik", amount: 12500, paymentMethod: "Havale" },
    { id: "TRX-008", date: "2024-12-13", description: "Ofis Kirası", customer: "-", type: "expense", category: "Ofis", amount: 15000, paymentMethod: "Havale" },
    { id: "TRX-009", date: "2024-12-13", description: "Kontör Satışı (10000 adet)", customer: "ABC Lojistik", type: "income", category: "Kontör", amount: 5000, paymentMethod: "Kredi Kartı" },
    { id: "TRX-010", date: "2024-12-12", description: "Business Plan Upgrade", customer: "Zeynep Design", type: "income", category: "Abonelik", amount: 3000, paymentMethod: "Kredi Kartı" },
];

const expenseCategories = [
    { name: "Personel", amount: 180000, color: "#ef4444" },
    { name: "Altyapı", amount: 68000, color: "#f59e0b" },
    { name: "Ofis", amount: 45000, color: "#3b82f6" },
    { name: "Pazarlama", amount: 32000, color: "#8b5cf6" },
    { name: "Diğer", amount: 15000, color: "#6b7280" },
];

export function WegsFinanceDashboard() {
    const [dateFilter, setDateFilter] = useState("this-month");
    const [typeFilter, setTypeFilter] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");

    const totalIncome = revenueData.reduce((sum, d) => sum + d.income, 0);
    const totalExpense = revenueData.reduce((sum, d) => sum + d.expense, 0);
    const netProfit = totalIncome - totalExpense;
    const profitMargin = ((netProfit / totalIncome) * 100).toFixed(1);

    const currentMonthIncome = revenueData[11].income;
    const lastMonthIncome = revenueData[10].income;
    const incomeGrowth = (((currentMonthIncome - lastMonthIncome) / lastMonthIncome) * 100).toFixed(1);

    const filteredTransactions = transactions.filter((t) => {
        const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            t.customer.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = typeFilter === "all" || t.type === typeFilter;
        return matchesSearch && matchesType;
    });

    return (
        <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-6 shadow-sm ring-1 ring-gray-900/5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Toplam Gelir (Yıllık)</p>
                            <p className="mt-1 text-2xl font-bold text-gray-900">₺{(totalIncome / 1000).toFixed(0)}K</p>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                            <TrendingUp className="h-6 w-6 text-green-600" />
                        </div>
                    </div>
                    <div className="mt-3 flex items-center text-sm">
                        <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                        <span className="text-green-600 font-medium">+{incomeGrowth}%</span>
                        <span className="text-gray-500 ml-1">geçen aya göre</span>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm ring-1 ring-gray-900/5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Toplam Gider (Yıllık)</p>
                            <p className="mt-1 text-2xl font-bold text-gray-900">₺{(totalExpense / 1000).toFixed(0)}K</p>
                        </div>
                        <div className="p-3 bg-red-50 rounded-lg">
                            <TrendingDown className="h-6 w-6 text-red-600" />
                        </div>
                    </div>
                    <div className="mt-3 flex items-center text-sm">
                        <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                        <span className="text-red-600 font-medium">+4.3%</span>
                        <span className="text-gray-500 ml-1">geçen aya göre</span>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm ring-1 ring-gray-900/5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Net Kâr (Yıllık)</p>
                            <p className="mt-1 text-2xl font-bold text-green-600">₺{(netProfit / 1000).toFixed(0)}K</p>
                        </div>
                        <div className="p-3 bg-emerald-50 rounded-lg">
                            <CreditCard className="h-6 w-6 text-emerald-600" />
                        </div>
                    </div>
                    <div className="mt-3 flex items-center text-sm">
                        <span className="text-gray-500">Kâr Marjı: </span>
                        <span className="text-emerald-600 font-medium ml-1">%{profitMargin}</span>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm ring-1 ring-gray-900/5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Aktif Müşteri</p>
                            <p className="mt-1 text-2xl font-bold text-gray-900">2,543</p>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-lg">
                            <Users className="h-6 w-6 text-blue-600" />
                        </div>
                    </div>
                    <div className="mt-3 flex items-center text-sm">
                        <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                        <span className="text-green-600 font-medium">+127</span>
                        <span className="text-gray-500 ml-1">bu ay</span>
                    </div>
                </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Revenue Chart */}
                <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm ring-1 ring-gray-900/5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Gelir & Gider Trendi</h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={revenueData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} tickFormatter={(v) => `₺${v / 1000}K`} />
                                <Tooltip formatter={(value: number) => `₺${value.toLocaleString("tr-TR")}`} />
                                <Area type="monotone" dataKey="income" stroke="#10b981" fill="#10b98120" strokeWidth={2} name="Gelir" />
                                <Area type="monotone" dataKey="expense" stroke="#ef4444" fill="#ef444420" strokeWidth={2} name="Gider" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Expense Breakdown */}
                <div className="bg-white rounded-xl p-6 shadow-sm ring-1 ring-gray-900/5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Gider Dağılımı</h3>
                    <div className="h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={expenseCategories} layout="vertical">
                                <XAxis type="number" hide />
                                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={80} />
                                <Tooltip formatter={(value: number) => `₺${value.toLocaleString("tr-TR")}`} />
                                <Bar dataKey="amount" radius={[0, 4, 4, 0]}>
                                    {expenseCategories.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-4 space-y-2">
                        {expenseCategories.map((cat) => (
                            <div key={cat.name} className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                                    <span className="text-gray-600">{cat.name}</span>
                                </div>
                                <span className="font-medium text-gray-900">₺{cat.amount.toLocaleString("tr-TR")}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Transactions Table */}
            <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5">
                <div className="p-4 border-b border-gray-200">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <h3 className="text-lg font-semibold text-gray-900">Son İşlemler</h3>
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="İşlem ara..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <select
                                value={typeFilter}
                                onChange={(e) => setTypeFilter(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">Tümü</option>
                                <option value="income">Gelirler</option>
                                <option value="expense">Giderler</option>
                            </select>
                            <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
                                <Download className="h-4 w-4 mr-1" />
                                Dışa Aktar
                            </button>
                        </div>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tarih</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Açıklama</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Müşteri</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kategori</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ödeme</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Tutar</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredTransactions.map((t) => (
                                <tr key={t.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(t.date).toLocaleDateString("tr-TR")}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{t.description}</div>
                                        <div className="text-xs text-gray-400">{t.id}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        {t.customer}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={cn(
                                            "px-2 py-1 rounded text-xs font-medium",
                                            t.category === "Abonelik" && "bg-blue-100 text-blue-800",
                                            t.category === "Kontör" && "bg-purple-100 text-purple-800",
                                            t.category === "Altyapı" && "bg-orange-100 text-orange-800",
                                            t.category === "Personel" && "bg-red-100 text-red-800",
                                            t.category === "Ofis" && "bg-gray-100 text-gray-800"
                                        )}>
                                            {t.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        {t.paymentMethod}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <span className={cn(
                                            "text-sm font-semibold",
                                            t.type === "income" ? "text-green-600" : "text-red-600"
                                        )}>
                                            {t.type === "income" ? "+" : "-"}₺{t.amount.toLocaleString("tr-TR")}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

// Need to import Cell for BarChart
import { Cell } from "recharts";
