"use client";

import { useState } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import {
    Shield, Users, Activity, Key, Plus, Download,
    CheckCircle, Clock, AlertTriangle, MoreVertical,
    UserPlus, FileEdit, Trash2, Settings
} from "lucide-react";

// Mock Data
const adminUsers = [
    { id: 1, name: "Ahmet Yılmaz", email: "ahmet@wegs.com", role: "Super Admin", status: "active", lastLogin: "Bugün, 14:30" },
    { id: 2, name: "Ayşe Demir", email: "ayse@wegs.com", role: "Editor", status: "active", lastLogin: "Dün, 09:15" },
    { id: 3, name: "Mehmet Kaya", email: "mehmet@wegs.com", role: "Viewer", status: "inactive", lastLogin: "3 gün önce" },
    { id: 4, name: "Fatma Çelik", email: "fatma@wegs.com", role: "Editor", status: "active", lastLogin: "Bugün, 11:45" },
];

const roles = [
    { name: "Super Admin", description: "Tüm yetkilere sahip", permissions: ["create", "read", "update", "delete", "admin"], color: "red" },
    { name: "Editor", description: "İçerik düzenleme yetkisi", permissions: ["create", "read", "update"], color: "blue" },
    { name: "Viewer", description: "Sadece görüntüleme", permissions: ["read"], color: "gray" },
];

const activityLog = [
    { id: 1, user: "Ahmet Yılmaz", action: "Yeni müşteri ekledi", target: "Atlas Lojistik", time: "2 dakika önce", icon: UserPlus },
    { id: 2, user: "Ayşe Demir", action: "Fatura güncelledi", target: "#INV-2024-001", time: "15 dakika önce", icon: FileEdit },
    { id: 3, user: "Ahmet Yılmaz", action: "Kullanıcı sildi", target: "test@test.com", time: "1 saat önce", icon: Trash2 },
    { id: 4, user: "Fatma Çelik", action: "Ayarları değiştirdi", target: "E-posta bildirimleri", time: "3 saat önce", icon: Settings },
];

export default function AdminPage() {
    const [selectedRole, setSelectedRole] = useState<string | null>(null);

    return (
        <PageContainer>
            <PageHeader title="Admin Yönetimi">
                <div className="flex items-center gap-2">
                    <button className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-gray-300 hover:bg-gray-50 transition-colors">
                        <Download className="h-4 w-4" />
                        Log İndir
                    </button>
                    <button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition-colors">
                        <Plus className="h-4 w-4" />
                        Kullanıcı Ekle
                    </button>
                </div>
            </PageHeader>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
                    <div className="flex items-center">
                        <div className="rounded-lg bg-blue-50 p-3 ring-1 ring-blue-100">
                            <Users className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Toplam Admin</p>
                            <p className="text-2xl font-bold text-gray-900">{adminUsers.length}</p>
                        </div>
                    </div>
                </div>
                <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
                    <div className="flex items-center">
                        <div className="rounded-lg bg-green-50 p-3 ring-1 ring-green-100">
                            <CheckCircle className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Aktif</p>
                            <p className="text-2xl font-bold text-gray-900">{adminUsers.filter(u => u.status === 'active').length}</p>
                        </div>
                    </div>
                </div>
                <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
                    <div className="flex items-center">
                        <div className="rounded-lg bg-amber-50 p-3 ring-1 ring-amber-100">
                            <Key className="h-6 w-6 text-amber-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Roller</p>
                            <p className="text-2xl font-bold text-gray-900">{roles.length}</p>
                        </div>
                    </div>
                </div>
                <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
                    <div className="flex items-center">
                        <div className="rounded-lg bg-purple-50 p-3 ring-1 ring-purple-100">
                            <Activity className="h-6 w-6 text-purple-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Bugünkü İşlem</p>
                            <p className="text-2xl font-bold text-gray-900">24</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Admin Users Table */}
                <div className="lg:col-span-2 rounded-xl bg-white shadow-sm ring-1 ring-gray-900/5 overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                            <Shield className="h-5 w-5 text-blue-600" />
                            Admin Kullanıcılar
                        </h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kullanıcı</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rol</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durum</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Son Giriş</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {adminUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                                                    {user.name.split(' ').map(n => n[0]).join('')}
                                                </div>
                                                <div className="ml-3">
                                                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                                    <p className="text-xs text-gray-500">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.role === 'Super Admin' ? 'bg-red-100 text-red-800' :
                                                    user.role === 'Editor' ? 'bg-blue-100 text-blue-800' :
                                                        'bg-gray-100 text-gray-800'
                                                }`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center gap-1 text-xs font-medium ${user.status === 'active' ? 'text-green-600' : 'text-gray-400'
                                                }`}>
                                                <span className={`h-2 w-2 rounded-full ${user.status === 'active' ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                                                {user.status === 'active' ? 'Aktif' : 'Pasif'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {user.lastLogin}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            <button className="p-1 rounded hover:bg-gray-100 transition-colors">
                                                <MoreVertical className="h-4 w-4 text-gray-400" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Sidebar: Roles & Activity */}
                <div className="space-y-6">
                    {/* Roles */}
                    <div className="rounded-xl bg-white shadow-sm ring-1 ring-gray-900/5 p-6">
                        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Key className="h-5 w-5 text-amber-600" />
                            Roller
                        </h3>
                        <div className="space-y-3">
                            {roles.map((role) => (
                                <div
                                    key={role.name}
                                    onClick={() => setSelectedRole(selectedRole === role.name ? null : role.name)}
                                    className={`p-3 rounded-lg border cursor-pointer transition-all ${selectedRole === role.name
                                            ? 'border-blue-300 bg-blue-50 shadow-sm'
                                            : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <span className={`text-sm font-medium ${role.color === 'red' ? 'text-red-700' :
                                                role.color === 'blue' ? 'text-blue-700' :
                                                    'text-gray-700'
                                            }`}>{role.name}</span>
                                        <span className="text-xs text-gray-500">{role.permissions.length} yetki</span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">{role.description}</p>
                                    {selectedRole === role.name && (
                                        <div className="mt-3 pt-3 border-t border-gray-200">
                                            <p className="text-xs font-medium text-gray-600 mb-2">Yetkiler:</p>
                                            <div className="flex flex-wrap gap-1">
                                                {role.permissions.map((perm) => (
                                                    <span key={perm} className="px-2 py-0.5 bg-white rounded text-xs text-gray-600 border border-gray-200">
                                                        {perm}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Activity Log */}
                    <div className="rounded-xl bg-white shadow-sm ring-1 ring-gray-900/5 p-6">
                        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Activity className="h-5 w-5 text-purple-600" />
                            Son İşlemler
                        </h3>
                        <div className="space-y-4">
                            {activityLog.map((log) => (
                                <div key={log.id} className="flex items-start gap-3">
                                    <div className="p-2 rounded-lg bg-gray-100 flex-shrink-0">
                                        <log.icon className="h-4 w-4 text-gray-600" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-gray-900">
                                            <span className="font-medium">{log.user}</span>
                                            {' '}{log.action}
                                        </p>
                                        <p className="text-xs text-gray-500 truncate">{log.target}</p>
                                        <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                                            <Clock className="h-3 w-3" />
                                            {log.time}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </PageContainer>
    );
}
