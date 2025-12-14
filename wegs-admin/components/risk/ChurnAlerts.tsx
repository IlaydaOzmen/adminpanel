import { AlertTriangle, ArrowRight, BellRing, Check, Play, History } from "lucide-react";
import { useState } from "react";

const alerts = [
    { id: 1, user: "Ahmet Yılmaz", company: "Tech Start A.Ş.", reason: "7+ gündür giriş yok", risk: "Yüksek", avatarColor: "bg-blue-600" },
    { id: 2, user: "Ayşe Demir", company: "Butik Tasarım", reason: "Fatura hacmi %50 düştü", risk: "Orta", avatarColor: "bg-purple-600" },
    { id: 3, user: "Mehmet Kaya", company: "Lojistik Ltd.", reason: "Entegrasyon bağlantısı kesildi", risk: "Yüksek", avatarColor: "bg-red-600" },
    { id: 4, user: "Zeynep Çelik", company: "Design Studio", reason: "Destek talebi sayısı arttı", risk: "Düşük", avatarColor: "bg-green-600" },
];

const automationActions = [
    "Satış Ekibini Bilgilendir",
    "WhatsApp & Mail Uyarısı",
    "Otomatik E-posta & SMS",
    "Özel İndirim Tanımla",
    "Manuel Arama Planla"
];

export function ChurnAlerts() {
    const [selectedActions, setSelectedActions] = useState<Record<number, string>>({});
    // Changed from appliedActions boolean map to history map: { id: ["Action 1", "Action 2"] }
    const [actionHistory, setActionHistory] = useState<Record<number, string[]>>({});

    const handleActionChange = (id: number, action: string) => {
        setSelectedActions(prev => ({ ...prev, [id]: action }));
    };

    const handleApplyAction = (id: number) => {
        const action = selectedActions[id];
        if (!action) return;

        setActionHistory(prev => ({
            ...prev,
            [id]: [...(prev[id] || []), action]
        }));

        // Reset selection but allow re-selection
        setSelectedActions(prev => ({ ...prev, [id]: "" }));

        console.log(`Applied action "${action}" for alert ${id}`);
    };

    return (
        <div className="rounded-xl bg-white shadow-sm border border-gray-200 overflow-hidden flex flex-col h-full">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between bg-gray-50/50">
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-red-100 rounded-lg">
                        <BellRing className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">Churn Risk Uyarıları</h3>
                        <p className="text-sm text-gray-500">Müdahale gereken kritik müşteriler</p>
                    </div>
                </div>
                <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    {alerts.filter(a => a.risk === 'Yüksek').length} Kritik
                </span>
            </div>
            <div className="flex-1 overflow-y-auto">
                <ul className="divide-y divide-gray-100">
                    {alerts.map((alert) => (
                        <li key={alert.id} className="p-4 hover:bg-gray-50 transition-colors group">
                            <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white text-sm font-medium shadow-sm ${alert.avatarColor}`}>
                                        {alert.user.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div>
                                        <div className="flex items-center">
                                            <p className="text-sm font-semibold text-gray-900">{alert.user}</p>
                                            <span className="mx-2 text-gray-300">•</span>
                                            <p className="text-xs text-gray-500">{alert.company}</p>
                                        </div>
                                        <div className="flex items-center mt-1 text-xs text-gray-500">
                                            <AlertTriangle className="h-3 w-3 text-amber-500 mr-1.5" />
                                            {alert.reason}
                                        </div>
                                        {/* Action History Display */}
                                        {actionHistory[alert.id] && actionHistory[alert.id].length > 0 && (
                                            <div className="mt-2 flex flex-wrap gap-1">
                                                {actionHistory[alert.id].map((act, idx) => (
                                                    <span key={idx} className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-green-50 text-green-700 border border-green-100">
                                                        <Check className="w-2.5 h-2.5 mr-1" />
                                                        {act}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3 sm:space-x-4 pl-14 sm:pl-0">
                                    <span className={`px-2.5 py-1 inline-flex text-xs font-medium rounded-full border 
                                        ${alert.risk === 'Yüksek' ? 'bg-red-50 text-red-700 border-red-200' :
                                            alert.risk === 'Orta' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                                                'bg-blue-50 text-blue-700 border-blue-200'}`}>
                                        {alert.risk} Risk
                                    </span>

                                    <div className="flex items-center space-x-2">
                                        <select
                                            className="block w-40 pl-2 pr-8 py-1 text-xs border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                                            value={selectedActions[alert.id] || ""}
                                            onChange={(e) => handleActionChange(alert.id, e.target.value)}
                                        >
                                            <option value="" disabled>Aksiyon Ekle...</option>
                                            {automationActions.map(action => (
                                                <option key={action} value={action}>{action}</option>
                                            ))}
                                        </select>
                                        <button
                                            onClick={() => handleApplyAction(alert.id)}
                                            disabled={!selectedActions[alert.id]}
                                            className={`p-1.5 rounded-md transition-colors ${selectedActions[alert.id]
                                                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
                                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                }`}
                                            title="Uygula"
                                        >
                                            <Play className="h-3 w-3" fill="currentColor" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="p-4 bg-gray-50 border-t border-gray-200 text-center">
                <button className="text-sm font-medium text-blue-600 hover:text-blue-700">Tüm Riskli Müşterileri Gör</button>
            </div>
        </div>
    );
}
