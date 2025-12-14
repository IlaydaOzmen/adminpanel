const partners = [
    { id: 1, name: "Ajans A", referred: 12, commission: "₺2,400", status: "Aktif" },
    { id: 2, name: "Danışman B", referred: 5, commission: "₺1,000", status: "Aktif" },
    { id: 3, name: "Yazılım Evi C", referred: 8, commission: "₺1,600", status: "Pasif" },
];

export function PartnerPortal() {
    return (
        <div className="rounded-lg bg-white shadow-sm border border-gray-50 ring-0">
            <div className="border-b border-gray-50 px-4 py-5 sm:px-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Partner Portalı</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-50">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Partner Adı</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Yönlendirilen</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Komisyon</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durum</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-50">
                        {partners.map((partner, idx) => (
                            <tr key={idx}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{partner.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{partner.referred}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{partner.commission}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <span className={`px - 2 inline - flex text - xs leading - 5 font - semibold rounded - full 
                    ${partner.status === 'Aktif' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'} `}>
                                        {partner.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
