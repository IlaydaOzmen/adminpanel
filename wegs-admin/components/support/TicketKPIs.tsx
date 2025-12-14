import { Clock, CheckCircle, AlertCircle } from "lucide-react";

export function TicketKPIs() {
    return (
        <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Destek KPI'ları</h3>
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <Clock className="h-5 w-5 text-gray-400 mr-3" />
                        <span className="text-sm font-medium text-gray-700">Ort. Yanıt Süresi</span>
                    </div>
                    <span className="text-sm font-bold text-gray-900">1s 45d</span>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                        <span className="text-sm font-medium text-gray-700">Kapanan Biletler (Bugün)</span>
                    </div>
                    <span className="text-sm font-bold text-gray-900">24</span>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <AlertCircle className="h-5 w-5 text-red-500 mr-3" />
                        <span className="text-sm font-medium text-gray-700">Geciken Biletler</span>
                    </div>
                    <span className="text-sm font-bold text-red-600">3</span>
                </div>
            </div>
        </div>
    );
}
