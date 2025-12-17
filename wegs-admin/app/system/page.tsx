"use client";

import { useState } from "react";
import { MaintenanceControl } from "@/components/system/MaintenanceControl";
import { SystemHealthDashboard } from "@/components/system/SystemHealthDashboard";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import Link from "next/link";
import { AlertTriangle, Activity, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";

type ViewMode = "health" | "maintenance";

export default function SystemPage() {
    const [viewMode, setViewMode] = useState<ViewMode>("health");

    return (
        <PageContainer>
            <PageHeader title="Sistem Yönetimi" description="Sistem sağlığı, bakım modu ve yapılandırmalar.">
                <Link
                    href="/system/outages"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                >
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Kesinti Raporu
                </Link>
            </PageHeader>

            {/* Tabs */}
            <div className="flex items-center gap-2 mb-6 bg-white p-1.5 rounded-xl border border-gray-200 shadow-sm w-fit">
                {[
                    { id: "health" as ViewMode, label: "Sistem Sağlığı", icon: Activity },
                    { id: "maintenance" as ViewMode, label: "Bakım Yönetimi", icon: Wrench },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setViewMode(tab.id)}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                            viewMode === tab.id
                                ? "bg-blue-50 text-blue-700"
                                : "text-gray-600 hover:bg-gray-50"
                        )}
                    >
                        <tab.icon className="h-4 w-4" />
                        {tab.label}
                    </button>
                ))}
            </div>

            {viewMode === "health" && <SystemHealthDashboard />}
            {viewMode === "maintenance" && <MaintenanceControl />}
        </PageContainer>
    );
}

