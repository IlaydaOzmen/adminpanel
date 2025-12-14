import { Users, UserCheck, UserX, CreditCard, AlertTriangle, FileText, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const getStats = (period: string) => {
    // Mock logic to change values based on period
    const multiplier = period === "Bugün" ? 1 : period === "Bu Hafta" ? 7 : period === "Bu Ay" ? 30 : 1;

    return [
        {
            name: "Toplam Müşteri",
            value: (2543 + (multiplier * 5)).toLocaleString('tr-TR'),
            change: "+12.5%",
            changeType: "positive",
            icon: Users,
        },
        {
            name: "Aktif / Pasif Kullanıcı",
            value: `${(1234 * multiplier).toLocaleString('tr-TR')} / ${(1309 * multiplier).toLocaleString('tr-TR')}`,
            change: "+5.2%",
            changeType: "positive",
            icon: UserCheck,
        },
        {
            name: "Toplam Fatura Sayısı",
            value: (14203 * multiplier).toLocaleString('tr-TR'),
            change: "+22.4%",
            changeType: "positive",
            icon: FileText,
        },
        {
            name: "Günlük İşlem Hacmi",
            value: `₺${(452000 * multiplier).toLocaleString('tr-TR')}`,
            change: "+8.1%",
            changeType: "positive",
            icon: CreditCard,
        },
        {
            name: "Churn Riski",
            value: "24 Müşteri",
            change: "-2.1%",
            changeType: "negative",
            icon: AlertTriangle,
        },
        {
            name: "Ort. Kullanıcı Oturum Süresi",
            value: "12dk 30sn",
            change: "+1.2%",
            changeType: "positive",
            icon: Clock,
        },
    ];
};

interface AnalyticsCardsProps {
    datePeriod: string;
    comparisonMode: string | null;
}

export function AnalyticsCards({ datePeriod, comparisonMode }: AnalyticsCardsProps) {
    const stats = getStats(datePeriod);

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {stats.map((stat) => (
                <div
                    key={stat.name}
                    className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-900/5"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="rounded-md bg-blue-50 p-2">
                                <stat.icon className="h-6 w-6 text-blue-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                                <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <span
                            className={cn(
                                "inline-flex items-center text-sm font-medium",
                                stat.changeType === "positive" ? "text-green-600" : "text-red-600"
                            )}
                        >
                            {stat.change}
                        </span>
                        <span className="ml-2 text-sm text-gray-500">
                            {comparisonMode ? `vs ${comparisonMode}` : "vs geçen ay"}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}
