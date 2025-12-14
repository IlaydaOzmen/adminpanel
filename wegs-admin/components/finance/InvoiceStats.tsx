import { FileText, DollarSign, CreditCard, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const stats = [
    {
        name: "Toplam Fatura",
        value: "1,245",
        subValue: "₺450,230",
        change: "+12%",
        changeType: "positive",
        icon: FileText,
    },
    {
        name: "Aktif Ödeyenler",
        value: "850",
        subValue: "%75 Oran",
        change: "+5%",
        changeType: "positive",
        icon: DollarSign,
    },
    {
        name: "Bekleyen Ödemeler",
        value: "45",
        subValue: "₺12,450",
        change: "-2%",
        changeType: "positive",
        icon: CreditCard,
    },
    {
        name: "Ciro Büyümesi",
        value: "%18",
        subValue: "Ç3 vs Ç2",
        change: "+2.4%",
        changeType: "positive",
        icon: TrendingUp,
    },
];

export function InvoiceStats() {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
                <div
                    key={stat.name}
                    className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-900/5"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="rounded-md bg-indigo-50 p-2">
                                <stat.icon className="h-6 w-6 text-indigo-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 flex justify-between items-end">
                        <div>
                            <span
                                className={cn(
                                    "inline-flex items-center text-sm font-medium",
                                    stat.changeType === "positive" ? "text-green-600" : "text-red-600"
                                )}
                            >
                                {stat.change}
                            </span>
                            <span className="ml-2 text-sm text-gray-500">geçen aya göre</span>
                        </div>
                        <span className="text-sm font-medium text-gray-700">{stat.subValue}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}
