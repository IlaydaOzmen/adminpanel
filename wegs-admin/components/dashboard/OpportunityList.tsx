"use client";

const opportunityUsers = [
    { name: "Moda Butik", platform: "Trendyol", issue: "Fatura Kesmiyor" },
    { name: "Tekno Store", platform: "Hepsiburada", issue: "Fatura Kesmiyor" },
    { name: "Evim Dünyası", platform: "N11", issue: "Fatura Kesmiyor" },
    { name: "Spor Outlet", platform: "Amazon", issue: "Fatura Kesmiyor" },
];

export function OpportunityList() {
    return (
        <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-900/5 h-full">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Fırsat: Pazaryeri Var, Fatura Yok</h3>
            <p className="mt-1 text-xs text-gray-500">Bu müşteriler satış yapıyor ama e-fatura kullanmıyor.</p>

            <div className="mt-4 flow-root">
                <ul role="list" className="-my-5 divide-y divide-gray-200">
                    {opportunityUsers.map((user) => (
                        <li key={user.name} className="py-4">
                            <div className="flex items-center space-x-4">
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                                    <p className="text-xs text-gray-500 truncate">{user.platform} Entegrasyonu</p>
                                </div>
                                <div className="inline-flex items-center text-xs font-semibold text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
                                    Potansiyel
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="mt-6">
                <button className="w-full text-center text-sm font-medium text-blue-600 hover:text-blue-500">
                    Tüm listeyi gör ({opportunityUsers.length})
                </button>
            </div>
        </div>
    );
}
