"use client";

import { TrendingDown, AlertTriangle, Zap, BarChart3 } from "lucide-react";

const RISK_USERS = [
    { name: "Ajans 360", credits: 150, dailyAvg: 45, daysLeft: 3 },
    { name: "Mega Market", credits: 80, dailyAvg: 20, daysLeft: 4 },
    { name: "Tech Start", credits: 200, dailyAvg: 40, daysLeft: 5 },
];

export function CreditAnalytics() {
    return (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Usage Overview */}
            <div className="rounded-lg bg-white shadow-sm ring-1 ring-gray-900/5 p-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4 flex items-center">
                    <Zap className="h-5 w-5 text-yellow-500 mr-2" />
                    Kontör Tüketim Analizi
                </h3>
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-500">Ort. Günlük Tüketim</p>
                        <p className="text-2xl font-bold text-gray-900">1,250</p>
                        <span className="text-xs text-green-600 flex items-center mt-1">
                            <TrendingDown className="h-3 w-3 mr-1" /> %5 düşüş (geçen hafta)
                        </span>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-500">Toplam Kalan Kontör</p>
                        <p className="text-2xl font-bold text-gray-900">850,000</p>
                        <span className="text-xs text-gray-500 mt-1">Tüm müşteriler</span>
                    </div>
                </div>

                <div className="space-y-4">
                    <h4 className="text-sm font-medium text-gray-900">Dönemsel Tüketim (Son 3 Ay)</h4>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden flex">
                        <div className="h-full bg-blue-500 w-[30%]" title="Ekim"></div>
                        <div className="h-full bg-blue-400 w-[45%]" title="Kasım"></div>
                        <div className="h-full bg-blue-600 w-[25%]" title="Aralık"></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                        <span>Ekim: 30k</span>
                        <span>Kasım: 45k</span>
                        <span>Aralık: 25k</span>
                    </div>
                </div>
            </div>

            {/* Risk List */}
            <div className="rounded-lg bg-white shadow-sm ring-1 ring-gray-900/5 p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 flex items-center">
                        <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                        Limit Riski Olanlar
                    </h3>
                    <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                        Tümünü Gör
                    </button>
                </div>
                <div className="overflow-hidden">
                    <table className="min-w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left text-xs font-medium text-gray-500 uppercase py-2">Müşteri</th>
                                <th className="text-right text-xs font-medium text-gray-500 uppercase py-2">Kalan</th>
                                <th className="text-right text-xs font-medium text-gray-500 uppercase py-2">Tahmini Bitiş</th>
                                <th className="text-right text-xs font-medium text-gray-500 uppercase py-2">İşlem</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {RISK_USERS.map((user, idx) => (
                                <tr key={idx}>
                                    <td className="py-3 text-sm font-medium text-gray-900">{user.name}</td>
                                    <td className="py-3 text-sm text-right text-red-600 font-bold">{user.credits}</td>
                                    <td className="py-3 text-sm text-right text-gray-500">{user.daysLeft} gün</td>
                                    <td className="py-3 text-right">
                                        <button className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded hover:bg-blue-100">
                                            Mail At
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="mt-4 bg-yellow-50 p-3 rounded-md border border-yellow-100">
                    <p className="text-xs text-yellow-800 flex items-center">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Bu müşterilerin kontörleri ortalama tüketim hızlarına göre 1 hafta içinde tükenecek.
                    </p>
                </div>
            </div>
        </div>
    );
}
