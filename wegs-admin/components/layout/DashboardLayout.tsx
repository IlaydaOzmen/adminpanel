"use client";

import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { usePathname } from "next/navigation";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    if (pathname?.startsWith("/login")) {
        return <>{children}</>;
    }

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className="flex flex-1 flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-y-auto p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
