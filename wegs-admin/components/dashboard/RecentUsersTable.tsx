"use client";

import { cn } from "@/lib/utils";

const recentUsers = [
    { name: "Ahmet Yılmaz", email: "ahmet@ornek.com", status: "Active", lastLogin: "2 dk önce", sessionDuration: "15 dk" },
    { name: "Ayşe Demir", email: "ayse@firma.com", status: "Active", lastLogin: "5 dk önce", sessionDuration: "42 dk" },
    { name: "Mehmet Kaya", email: "mehmet@ticaret.com", status: "Passive", lastLogin: "3 saat önce", sessionDuration: "8 dk" },
    { name: "Zeynep Çelik", email: "zeynep@magaza.com", status: "Active", lastLogin: "1 gün önce", sessionDuration: "25 dk" },
    { name: "Caner Erkin", email: "caner@spor.com", status: "Active", lastLogin: "2 gün önce", sessionDuration: "10 dk" },
];

export function RecentUsersTable() {
    return (
        <div className="rounded-lg bg-white shadow-sm ring-1 ring-gray-900/5">
            <div className="border-b border-gray-200 px-6 py-4">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Son Aktif Kullanıcılar</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Kullanıcı</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Durum</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Son Giriş</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Oturum Süresi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {recentUsers.map((user) => (
                            <tr key={user.email}>
                                <td className="whitespace-nowrap px-6 py-4">
                                    <div className="flex items-center">
                                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                                            {user.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                            <div className="text-sm text-gray-500">{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                    <span className={cn(
                                        "inline-flex rounded-full px-2 text-xs font-semibold leading-5",
                                        user.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                                    )}>
                                        {user.status === "Active" ? "Aktif" : "Pasif"}
                                    </span>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                    {user.lastLogin}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 font-medium">
                                    {user.sessionDuration}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="border-t border-gray-200 px-6 py-4">
                <button className="text-sm font-medium text-blue-600 hover:text-blue-500">
                    Tüm kullanıcıları gör &rarr;
                </button>
            </div>
        </div>
    );
}
