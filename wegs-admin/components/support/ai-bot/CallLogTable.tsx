import { Search, Info, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

const mockLogs = [
    { id: 1, customer: "Ahmet Yılmaz", topic: "Fatura Sorunu", duration: "2dk 15sn", status: "Resolved", sentiment: "Positive", date: "10 dk önce" },
    { id: 2, customer: "Ayşe Demir", topic: "Kargo Takip", duration: "1dk 45sn", status: "Resolved", sentiment: "Neutral", date: "25 dk önce" },
    { id: 3, customer: "Mehmet Kaya", topic: "İade İşlemi", duration: "5dk 10sn", status: "Escalated", sentiment: "Negative", date: "1 saat önce" },
    { id: 4, customer: "Zeynep Çelik", topic: "Ürün Bilgisi", duration: "45sn", status: "Resolved", sentiment: "Positive", date: "2 saat önce" },
    { id: 5, customer: "Ali Vural", topic: "Ödeme Hatası", duration: "3dk 20sn", status: "Resolved", sentiment: "Neutral", date: "3 saat önce" },
];

export function CallLogTable() {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">Arama Kayıtları ve Analizi</h3>
                        <p className="text-sm text-gray-500">Son bot görüşmeleri ve duygu analizleri</p>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Kayıt ara..."
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Müşteri</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Konu</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Süre</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durum</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duygu Analizi</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Zaman</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Detay</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {mockLogs.map((log) => (
                            <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{log.customer}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {log.topic}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {log.duration}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={cn(
                                        "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                                        log.status === "Resolved" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                                    )}>
                                        {log.status === "Resolved" ? "Çözüldü" : "Yönlendirildi"}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={cn(
                                        "px-2 py-1 text-xs font-medium rounded-lg",
                                        log.sentiment === "Positive" ? "bg-green-50 text-green-700" :
                                            log.sentiment === "Negative" ? "bg-red-50 text-red-700" : "bg-gray-100 text-gray-700"
                                    )}>
                                        {log.sentiment === "Positive" ? "Pozitif 😊" :
                                            log.sentiment === "Negative" ? "Negatif 😠" : "Nötr 😐"}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {log.date}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button className="text-blue-600 hover:text-blue-900">
                                        <Info className="h-4 w-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
