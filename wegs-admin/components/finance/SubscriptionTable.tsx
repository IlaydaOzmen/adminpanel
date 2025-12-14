const subscriptions = [
    { id: 1, user: "Acme Corp", plan: "Pro", status: "Aktif", renewal: "2024-01-15", amount: "₺499" },
    { id: 2, user: "Global Ltd", plan: "Kurumsal", status: "Aktif", renewal: "2024-02-01", amount: "₺999" },
    { id: 3, user: "Small Biz", plan: "Başlangıç", status: "Riskli", renewal: "2023-12-20", amount: "₺199" },
    { id: 4, user: "Tech Start", plan: "Pro", status: "Süresi Dolmuş", renewal: "2023-11-30", amount: "₺499" },
];

export function SubscriptionTable() {
    return (
        <div className="rounded-lg bg-white shadow-sm ring-1 ring-gray-900/5">
            <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Abonelik Durumu</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kullanıcı</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durum</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Yenileme</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tutar</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {subscriptions.map((sub) => (
                            <tr key={sub.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{sub.user}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sub.plan}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${sub.status === 'Aktif' ? 'bg-green-100 text-green-800' :
                                            sub.status === 'Riskli' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-red-100 text-red-800'}`}>
                                        {sub.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sub.renewal}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sub.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
