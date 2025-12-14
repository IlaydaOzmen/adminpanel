export function CreditManager() {
    const credits = [
        { user: "Acme Corp", remaining: 1500, total: 5000, usage: 70 },
        { user: "Global Ltd", remaining: 4500, total: 10000, usage: 55 },
        { user: "Small Biz", remaining: 10, total: 1000, usage: 99 },
    ];

    return (
        <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Kontör Kullanımı</h3>
            <div className="space-y-4">
                {credits.map((credit) => (
                    <div key={credit.user}>
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium text-gray-700">{credit.user}</span>
                            <span className="text-sm text-gray-500">{credit.remaining} / {credit.total}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                                className={`h-2.5 rounded-full ${credit.usage > 90 ? 'bg-red-600' : 'bg-blue-600'}`}
                                style={{ width: `${credit.usage}%` }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
