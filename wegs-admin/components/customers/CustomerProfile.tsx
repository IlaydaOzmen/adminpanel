export function CustomerProfile() {
    return (
        <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
            <div className="flex items-center space-x-4">
                <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-500">
                    AC
                </div>
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Acme Corp</h2>
                    <p className="text-sm text-gray-500">admin@acme.com</p>
                    <div className="mt-2 flex space-x-2">
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                            Aktif
                        </span>
                        <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                            Pro Plan
                        </span>
                    </div>
                </div>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-md border border-gray-200 p-4">
                    <p className="text-sm font-medium text-gray-500">Toplam Fatura</p>
                    <p className="mt-1 text-lg font-semibold text-gray-900">1,234</p>
                </div>
                <div className="rounded-md border border-gray-200 p-4">
                    <p className="text-sm font-medium text-gray-500">Kalan Kontör</p>
                    <p className="mt-1 text-lg font-semibold text-gray-900">450</p>
                </div>
            </div>
        </div>
    );
}
