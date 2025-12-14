import { RefreshCw, Trash2, PauseCircle, Calendar, Layers } from "lucide-react";

interface AdminActionsProps {
    onAction: (type: "license" | "package" | "delete" | "freeze") => void;
}

export function AdminActions({ onAction }: AdminActionsProps) {
    return (
        <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-900/5 mt-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Yönetici İşlemleri</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <button
                    onClick={() => onAction("license")}
                    className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                >
                    <Calendar className="mr-2 h-4 w-4 text-blue-500" />
                    Lisans Yönetimi
                </button>
                <button
                    onClick={() => onAction("package")}
                    className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                >
                    <Layers className="mr-2 h-4 w-4 text-green-500" />
                    Paket Değiştir
                </button>
                <button
                    onClick={() => onAction("freeze")}
                    className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                >
                    <PauseCircle className="mr-2 h-4 w-4 text-yellow-500" />
                    Hesabı Dondur
                </button>
                <button className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
                    <RefreshCw className="mr-2 h-4 w-4 text-blue-500" />
                    Banka Verilerini Çek
                </button>
                <button className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
                    <RefreshCw className="mr-2 h-4 w-4 text-purple-500" />
                    Şifre Sıfırla
                </button>
                <button
                    onClick={() => onAction("delete")}
                    className="flex items-center justify-center rounded-md border border-red-300 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 shadow-sm hover:bg-red-100"
                >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Hesabı Sil
                </button>
            </div>
        </div>
    );
}
