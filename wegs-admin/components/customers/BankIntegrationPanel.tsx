"use client";

import { useState } from "react";
import {
    Eye,
    EyeOff,
    Copy,
    Check,
    Building2,
    CreditCard,
    User,
    Key,
    RefreshCw,
    CheckCircle,
    XCircle,
    Wifi,
    WifiOff,
    Plus,
    Trash2
} from "lucide-react";
import { cn } from "@/lib/utils";

interface BankAccount {
    id: string;
    bankName: string;
    bankLogo: string;
    accountType: "vadesiz" | "vadeli";
    iban: string;
    currency: string;
    username: string;
    password: string;
    apiToken?: string;
    lastTransaction: string;
    status: "connected" | "disconnected" | "error";
    balance?: string;
}

// Mock data - gerçek uygulamada API'den gelecek
const mockAccounts: BankAccount[] = [
    {
        id: "1",
        bankName: "Garanti BBVA",
        bankLogo: "🏦",
        accountType: "vadesiz",
        iban: "TR33 0006 1005 1978 6457 8413 26",
        currency: "TRY",
        username: "tech_solutions_api",
        password: "Grnt2024!Api",
        apiToken: "eyJhbGciOiJIUzI1NiIs...",
        lastTransaction: "15.12.2024 16:30",
        status: "connected",
        balance: "₺125.450,00"
    },
    {
        id: "2",
        bankName: "İş Bankası",
        bankLogo: "🏛️",
        accountType: "vadesiz",
        iban: "TR76 0006 4000 0011 2340 0001 23",
        currency: "TRY",
        username: "wegs_isbank_user",
        password: "IsBank2024!",
        lastTransaction: "14.12.2024 11:15",
        status: "connected",
        balance: "₺78.320,50"
    },
    {
        id: "3",
        bankName: "Yapı Kredi",
        bankLogo: "💳",
        accountType: "vadeli",
        iban: "TR12 0006 7010 0000 0012 3456 78",
        currency: "USD",
        username: "ykb_tech_api",
        password: "YKB2024Secure!",
        lastTransaction: "10.12.2024 09:00",
        status: "error",
        balance: "$5.200,00"
    }
];

export function BankIntegrationPanel() {
    const [accounts] = useState<BankAccount[]>(mockAccounts);
    const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({});
    const [showTokens, setShowTokens] = useState<Record<string, boolean>>({});
    const [copiedField, setCopiedField] = useState<string | null>(null);
    const [syncingAccount, setSyncingAccount] = useState<string | null>(null);
    const [expandedAccount, setExpandedAccount] = useState<string | null>(null);

    const handleCopy = (value: string, field: string) => {
        navigator.clipboard.writeText(value);
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 2000);
    };

    const togglePassword = (accountId: string) => {
        setShowPasswords(prev => ({ ...prev, [accountId]: !prev[accountId] }));
    };

    const toggleToken = (accountId: string) => {
        setShowTokens(prev => ({ ...prev, [accountId]: !prev[accountId] }));
    };

    const handleSync = (accountId: string) => {
        setSyncingAccount(accountId);
        setTimeout(() => {
            setSyncingAccount(null);
            alert("Banka verileri başarıyla senkronize edildi!");
        }, 2000);
    };

    const statusConfig = {
        connected: { label: "Bağlı", color: "bg-green-100 text-green-700", icon: Wifi },
        disconnected: { label: "Bağlı Değil", color: "bg-gray-100 text-gray-700", icon: WifiOff },
        error: { label: "Bağlantı Hatası", color: "bg-red-100 text-red-700", icon: XCircle }
    };

    return (
        <div className="rounded-xl bg-white shadow-sm ring-1 ring-gray-900/5 overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <Building2 className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">Banka Entegrasyonları</h3>
                            <p className="text-sm text-gray-500">{accounts.length} banka hesabı bağlı</p>
                        </div>
                    </div>
                    <button className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors">
                        <Plus className="h-4 w-4" />
                        Banka Ekle
                    </button>
                </div>
            </div>

            {/* Accounts List */}
            <div className="divide-y divide-gray-100">
                {accounts.map((account) => {
                    const StatusIcon = statusConfig[account.status].icon;
                    const isExpanded = expandedAccount === account.id;

                    return (
                        <div key={account.id} className="p-4">
                            {/* Account Header */}
                            <div
                                className="flex items-center justify-between cursor-pointer"
                                onClick={() => setExpandedAccount(isExpanded ? null : account.id)}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="text-2xl">{account.bankLogo}</div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold text-gray-900">{account.bankName}</span>
                                            <span className={cn(
                                                "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium",
                                                statusConfig[account.status].color
                                            )}>
                                                <StatusIcon className="h-3 w-3" />
                                                {statusConfig[account.status].label}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-500 font-mono">{account.iban}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    {account.balance && (
                                        <span className="text-lg font-bold text-gray-900">{account.balance}</span>
                                    )}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleSync(account.id);
                                        }}
                                        disabled={syncingAccount === account.id}
                                        className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-50"
                                    >
                                        <RefreshCw className={cn(
                                            "h-4 w-4 text-gray-600",
                                            syncingAccount === account.id && "animate-spin"
                                        )} />
                                    </button>
                                </div>
                            </div>

                            {/* Expanded Details */}
                            {isExpanded && (
                                <div className="mt-4 pt-4 border-t border-gray-100 space-y-4">
                                    {/* Account Info */}
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="p-3 bg-gray-50 rounded-lg">
                                            <p className="text-xs text-gray-500">Hesap Türü</p>
                                            <p className="text-sm font-medium text-gray-900 capitalize">
                                                {account.accountType}
                                            </p>
                                        </div>
                                        <div className="p-3 bg-gray-50 rounded-lg">
                                            <p className="text-xs text-gray-500">Para Birimi</p>
                                            <p className="text-sm font-medium text-gray-900">{account.currency}</p>
                                        </div>
                                        <div className="p-3 bg-gray-50 rounded-lg">
                                            <p className="text-xs text-gray-500">Son İşlem</p>
                                            <p className="text-sm font-medium text-gray-900">{account.lastTransaction}</p>
                                        </div>
                                    </div>

                                    {/* Credentials */}
                                    <div className="grid grid-cols-2 gap-4">
                                        {/* Username */}
                                        <div className="space-y-2">
                                            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                                <User className="h-4 w-4 text-gray-400" />
                                                Kullanıcı Adı
                                            </label>
                                            <div className="flex">
                                                <input
                                                    type="text"
                                                    readOnly
                                                    value={account.username}
                                                    className="flex-1 rounded-l-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-700"
                                                />
                                                <button
                                                    onClick={() => handleCopy(account.username, `username-${account.id}`)}
                                                    className="px-3 py-2 border border-l-0 border-gray-300 bg-white rounded-r-lg hover:bg-gray-50 transition-colors"
                                                >
                                                    {copiedField === `username-${account.id}` ? (
                                                        <Check className="h-4 w-4 text-green-500" />
                                                    ) : (
                                                        <Copy className="h-4 w-4 text-gray-400" />
                                                    )}
                                                </button>
                                            </div>
                                        </div>

                                        {/* Password */}
                                        <div className="space-y-2">
                                            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                                <Key className="h-4 w-4 text-gray-400" />
                                                Şifre
                                            </label>
                                            <div className="flex">
                                                <input
                                                    type={showPasswords[account.id] ? "text" : "password"}
                                                    readOnly
                                                    value={account.password}
                                                    className="flex-1 rounded-l-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-700 font-mono"
                                                />
                                                <button
                                                    onClick={() => togglePassword(account.id)}
                                                    className="px-3 py-2 border border-l-0 border-gray-300 bg-white hover:bg-gray-50 transition-colors"
                                                >
                                                    {showPasswords[account.id] ? (
                                                        <EyeOff className="h-4 w-4 text-gray-400" />
                                                    ) : (
                                                        <Eye className="h-4 w-4 text-gray-400" />
                                                    )}
                                                </button>
                                                <button
                                                    onClick={() => handleCopy(account.password, `password-${account.id}`)}
                                                    className="px-3 py-2 border border-l-0 border-gray-300 bg-white rounded-r-lg hover:bg-gray-50 transition-colors"
                                                >
                                                    {copiedField === `password-${account.id}` ? (
                                                        <Check className="h-4 w-4 text-green-500" />
                                                    ) : (
                                                        <Copy className="h-4 w-4 text-gray-400" />
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* API Token (if exists) */}
                                    {account.apiToken && (
                                        <div className="space-y-2">
                                            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                                <Key className="h-4 w-4 text-gray-400" />
                                                API Token (OAuth)
                                            </label>
                                            <div className="flex">
                                                <input
                                                    type={showTokens[account.id] ? "text" : "password"}
                                                    readOnly
                                                    value={account.apiToken}
                                                    className="flex-1 rounded-l-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-700 font-mono"
                                                />
                                                <button
                                                    onClick={() => toggleToken(account.id)}
                                                    className="px-3 py-2 border border-l-0 border-gray-300 bg-white hover:bg-gray-50 transition-colors"
                                                >
                                                    {showTokens[account.id] ? (
                                                        <EyeOff className="h-4 w-4 text-gray-400" />
                                                    ) : (
                                                        <Eye className="h-4 w-4 text-gray-400" />
                                                    )}
                                                </button>
                                                <button
                                                    onClick={() => handleCopy(account.apiToken!, `token-${account.id}`)}
                                                    className="px-3 py-2 border border-l-0 border-gray-300 bg-white rounded-r-lg hover:bg-gray-50 transition-colors"
                                                >
                                                    {copiedField === `token-${account.id}` ? (
                                                        <Check className="h-4 w-4 text-green-500" />
                                                    ) : (
                                                        <Copy className="h-4 w-4 text-gray-400" />
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {/* IBAN Copy */}
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                            <CreditCard className="h-4 w-4 text-gray-400" />
                                            IBAN
                                        </label>
                                        <div className="flex">
                                            <input
                                                type="text"
                                                readOnly
                                                value={account.iban}
                                                className="flex-1 rounded-l-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-700 font-mono"
                                            />
                                            <button
                                                onClick={() => handleCopy(account.iban.replace(/\s/g, ""), `iban-${account.id}`)}
                                                className="px-3 py-2 border border-l-0 border-gray-300 bg-white rounded-r-lg hover:bg-gray-50 transition-colors"
                                            >
                                                {copiedField === `iban-${account.id}` ? (
                                                    <Check className="h-4 w-4 text-green-500" />
                                                ) : (
                                                    <Copy className="h-4 w-4 text-gray-400" />
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex justify-end gap-2 pt-2">
                                        <button className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-red-600 hover:bg-red-50 text-sm font-medium transition-colors">
                                            <Trash2 className="h-4 w-4" />
                                            Kaldır
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
