"use client";

import { useState } from "react";
import { AnalyticsCards } from "@/components/dashboard/AnalyticsCards";
import { UserActivityChart } from "@/components/dashboard/UserActivityChart";
import { SegmentationPieChart } from "@/components/dashboard/SegmentationPieChart";
import { ConversionFunnel } from "@/components/dashboard/ConversionFunnel";
import { IntegrationChart } from "@/components/dashboard/IntegrationChart";
import { OpportunityList } from "@/components/dashboard/OpportunityList";
import { RecentUsersTable } from "@/components/dashboard/RecentUsersTable";
import { Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";

export default function Home() {
  const [datePeriod, setDatePeriod] = useState("Bugün");
  const [comparisonMode, setComparisonMode] = useState<string | null>(null);

  const periods = ["Bugün", "Dün", "Bu Hafta", "Bu Ay", "Özel"];
  const quarters = ["Q1", "Q2", "Q3", "Q4"];

  return (
    <PageContainer>
      <PageHeader title="Panel">
        <div className="flex items-center space-x-2 rounded-md bg-white p-1 shadow-sm ring-1 ring-gray-900/5">
          <div className="flex items-center gap-1 border-r border-gray-200 pr-2 mr-2">
            <span className="px-2 text-xs font-medium text-gray-500">Karşılaştırma:</span>
            {quarters.map((q) => (
              <button
                key={q}
                onClick={() => setComparisonMode(comparisonMode === q ? null : q)}
                className={cn(
                  "rounded px-2 py-1 text-xs font-medium transition-colors",
                  comparisonMode === q
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                )}
              >
                {q}
              </button>
            ))}
          </div>

          {periods.map((period) => (
            <button
              key={period}
              onClick={() => setDatePeriod(period)}
              className={cn(
                "rounded px-3 py-1.5 text-sm font-medium transition-colors focus:outline-none",
                datePeriod === period
                  ? "bg-gray-100 text-gray-900 shadow-sm"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              {period}
            </button>
          ))}

          {/* Show date inputs if "Özel" is selected */}
          {datePeriod === "Özel" && (
            <div className="flex items-center space-x-2 animate-in fade-in slide-in-from-right-4 duration-300">
              <input type="date" className="rounded-md border border-gray-300 px-2 py-1 text-xs text-gray-600 focus:border-blue-500 focus:outline-none" />
              <span className="text-gray-400">-</span>
              <input type="date" className="rounded-md border border-gray-300 px-2 py-1 text-xs text-gray-600 focus:border-blue-500 focus:outline-none" />
            </div>
          )}

          <button className="p-1.5 text-gray-400 hover:text-gray-600">
            <Calendar className="h-4 w-4" />
          </button>
        </div>
      </PageHeader>

      {/* Stats Cards */}
      <AnalyticsCards datePeriod={datePeriod} comparisonMode={comparisonMode} />

      {/* Conversion Funnel */}
      <ConversionFunnel />

      {/* Main Content Grid */}
      {/* Row 1: User Activity + Segmentation (same height) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <UserActivityChart datePeriod={datePeriod} />
        </div>
        <div className="lg:col-span-1">
          <SegmentationPieChart />
        </div>
      </div>

      {/* Row 2: Integration + Opportunity + Recent Users */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mt-6">
        <div className="lg:col-span-1">
          <IntegrationChart />
        </div>
        <div className="lg:col-span-1">
          <OpportunityList />
        </div>
        <div className="lg:col-span-1">
          <RecentUsersTable />
        </div>
      </div>
    </PageContainer>
  );
}

