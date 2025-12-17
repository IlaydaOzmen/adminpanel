"use client";

import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { BotKPIs } from "@/components/support/ai-bot/BotKPIs";
import { CallLogTable } from "@/components/support/ai-bot/CallLogTable";
import { BotPerformanceCharts } from "@/components/support/ai-bot/BotPerformanceCharts";
import { TagAnalysis } from "@/components/support/ai-bot/TagAnalysis";
import { BotTicketList } from "@/components/support/ai-bot/BotTicketList";
import { ArrowLeft, Download, Settings } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AIBotPage() {
    const router = useRouter();

    return (
        <PageContainer>
            <PageHeader
                title="Yapay Zeka Destekli Bot Analizi"
                description="Bot performansını, müşteri etkileşimlerini ve memnuniyet oranlarını takip edin."
            >
                <div className="flex gap-2">
                    <button
                        onClick={() => router.back()}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Geri Dön
                    </button>
                    <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                        <Settings className="h-4 w-4" />
                        Bot Ayarları
                    </button>
                    <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 border border-transparent rounded-lg text-sm font-medium text-white hover:bg-blue-700 transition-colors">
                        <Download className="h-4 w-4" />
                        Rapor İndir
                    </button>
                </div>
            </PageHeader>

            <div className="space-y-6">
                {/* 1. KPIs */}
                <BotKPIs />

                {/* 2. Charts Row 1: Hourly Density & Satisfaction */}
                <BotPerformanceCharts />

                {/* 3. Charts Row 2: Tag Analysis & Redirected Tickets */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <TagAnalysis />
                    </div>
                    <div>
                        <BotTicketList />
                    </div>
                </div>

                {/* 4. Detailed Call Logs */}
                <CallLogTable />
            </div>
        </PageContainer>
    );
}
