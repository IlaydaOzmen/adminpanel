"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    Users,
    CreditCard,
    ShieldAlert,
    HeadphonesIcon,
    Settings,
    LogOut,
    MessageSquare,
    Shield,
    BarChart3,
    Handshake,
    Coins,
    Plug,
    Bell,
    Landmark,
    FlaskConical,
    Calculator
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
    {
        title: "Panel",
        href: "/",
        icon: LayoutDashboard,
    },
    {
        title: "Finans",
        href: "/finance",
        icon: CreditCard,
    },
    {
        title: "Banka Modülü",
        href: "/banking",
        icon: Landmark,
    },
    {
        title: "Müşteriler",
        href: "/customers",
        icon: Users,
    },
    {
        title: "Kontörler",
        href: "/credits",
        icon: Coins,
    },
    {
        title: "Entegrasyonlar",
        href: "/integrations",
        icon: Plug,
    },
    {
        title: "Risk & Otomasyon",
        href: "/risk",
        icon: ShieldAlert,
    },
    {
        title: "A/B Testi",
        href: "/experiments",
        icon: FlaskConical,
    },
    {
        title: "Destek",
        href: "/support",
        icon: HeadphonesIcon,
    },
    {
        title: "Sistem",
        href: "/system",
        icon: Settings,
    },
    {
        title: "Raporlar",
        href: "/reports",
        icon: BarChart3,
    },
    {
        title: "Maliyet Analizi",
        href: "/costs",
        icon: Calculator,
    },
    {
        title: "Partner Portal",
        href: "/partners",
        icon: Handshake,
    },
    {
        title: "Geri Bildirim",
        href: "/feedback",
        icon: MessageSquare,
    },
    {
        title: "Bildirimler",
        href: "/notifications",
        icon: Bell,
    },
    {
        title: "Admin",
        href: "/admin",
        icon: Shield,
    },
];

export function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();

    // Import useAuth dynamically to avoid SSR issues
    let logout: (() => void) | null = null;
    try {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const auth = require("@/components/providers/AuthProvider").useAuth();
        logout = auth.logout;
    } catch {
        // Fallback if auth context not available
    }

    const handleLogout = () => {
        if (window.confirm("Çıkış yapmak istediğinize emin misiniz?")) {
            if (logout) {
                logout();
            } else {
                localStorage.removeItem("wegs_auth");
                router.push('/login');
            }
        }
    };

    return (
        <div className="flex h-full w-64 flex-col bg-slate-900 text-white">
            <div className="flex h-16 items-center justify-center border-b border-slate-800">
                <h1 className="text-2xl font-bold text-blue-500">Wegs<span className="text-white">Admin</span></h1>
            </div>
            <nav className="flex-1 space-y-1 px-2 py-4">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "group flex items-center rounded-md px-2 py-2 text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-slate-800 text-white"
                                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                            )}
                        >
                            <item.icon
                                className={cn(
                                    "mr-3 h-5 w-5 flex-shrink-0",
                                    isActive ? "text-blue-500" : "text-slate-400 group-hover:text-white"
                                )}
                                aria-hidden="true"
                            />
                            {item.title}
                        </Link>
                    );
                })}
            </nav>
            <div className="border-t border-slate-800 p-4">
                <div className="flex items-center justify-between group rounded-md p-2 hover:bg-slate-800 transition-colors cursor-pointer">
                    <div className="flex items-center">
                        <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                            A
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">Admin User</p>
                            <p className="text-xs text-slate-400">Sistem Yöneticisi</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="p-1.5 rounded-md text-slate-400 hover:text-red-400 hover:bg-slate-700 transition-colors"
                        title="Çıkış Yap"
                    >
                        <LogOut className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
