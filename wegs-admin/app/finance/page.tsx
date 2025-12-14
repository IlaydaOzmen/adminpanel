"use client";

import { useState } from "react";
import { BankStatsCard } from "@/components/finance/BankStatsCard";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { Wallet, ArrowUpRight, ArrowDownRight, CreditCard, Building2 } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { NewBankModal } from "@/components/finance/NewBankModal";
import Link from "next/link";

// Mock Data
const initialBankData = [
    { name: "Garanti BBVA", value: 450, color: "#22c55e", logo: "bg-green-600", status: "stable" as const },
    { name: "Akbank", value: 320, color: "#ef4444", logo: "bg-red-600", status: "stable" as const },
    { name: "Yapı Kredi", value: 210, color: "#3b82f6", logo: "bg-blue-600", status: "maintenance" as const },
    { name: "İş Bankası", value: 180, color: "#0ea5e9", logo: "bg-sky-600", status: "stable" as const },
    { name: "QNB Finansbank", value: 120, color: "#8b5cf6", logo: "bg-violet-600", status: "stable" as const },
];

export default function FinancePage() {
    const [banks, setBanks] = useState(initialBankData);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const totalAccounts = banks.reduce((acc, curr) => acc + curr.value, 0);

    const toggleMaintenance = (bankName: string) => {
        setBanks(prev => prev.map(bank => {
            if (bank.name === bankName) {
                return {
                    ...bank,
                    status: bank.status === 'maintenance' ? 'stable' : 'maintenance'
                };
            }
            return bank;
        }));
    };

    return (
        <PageContainer>
            <PageHeader title="Finans & Banka Entegrasyonları">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="mt-3 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                    <Building2 className="mr-2 h-4 w-4" />
                    Yeni Banka Ekle
                </button>
                <Link
                    href="/finance/invoices"
                    className="mt-3 sm:mt-0 inline-flex items-center px-4 py-2 border border-blue-600 rounded-md shadow-sm text-sm font-medium text-blue-600 bg-white hover:bg-blue-50"
                >
                    <ArrowUpRight className="mr-2 h-4 w-4" />
                    Fatura Analizi
                </Link>
                <Link
                    href="/finance/payments"
                    className="mt-3 sm:mt-0 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Ödemeler & Tahsilat
                </Link>
            </PageHeader>

            {/* Overview Stats */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center">
                        <div className="p-3 bg-indigo-50 rounded-lg">
                            <Wallet className="h-6 w-6 text-indigo-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Toplam Aktif Hesap</p>
                            <h3 className="text-2xl font-bold text-gray-900">{totalAccounts}</h3>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center">
                        <div className="p-3 bg-green-50 rounded-lg">
                            <ArrowUpRight className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Günlük İşlem Hacmi</p>
                            <h3 className="text-2xl font-bold text-gray-900">₺2.4M</h3>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center">
                        <div className="p-3 bg-blue-50 rounded-lg">
                            <Building2 className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Entegre Banka</p>
                            <h3 className="text-2xl font-bold text-gray-900">{banks.length}</h3>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center">
                        <div className="p-3 bg-yellow-50 rounded-lg">
                            <CreditCard className="h-6 w-6 text-yellow-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Sanal POS Oranı</p>
                            <h3 className="text-2xl font-bold text-gray-900">%85</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Bank Stats Grid */}
                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {banks.map((bank) => (
                        <BankStatsCard
                            key={bank.name}
                            name={bank.name}
                            logoColor={bank.logo}
                            activeCount={bank.value}
                            totalCount={totalAccounts}
                            status={bank.status}
                            onToggleMaintenance={() => toggleMaintenance(bank.name)}
                        />
                    ))}
                </div>

                {/* Distribution Chart */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Banka Dağılımı</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={banks}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {banks.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-6 space-y-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="text-sm font-medium text-gray-900 mb-2">Öneri</h4>
                            <p className="text-sm text-gray-600">
                                Müşterilerin %18'i <strong>Yapı Kredi</strong> entegrasyonu kullanıyor ancak son 24 saatte hata oranı %2 arttı.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <NewBankModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </PageContainer>
    );
}
