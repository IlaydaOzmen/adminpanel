import { Ticket } from "lucide-react";
import { cn } from "@/lib/utils";

const redirectedTickets = [
    { id: "TCK-1024", customer: "Demo Müşteri", issue: "API Entegrasyon Hatası", status: "Open", priortiy: "High" },
    { id: "TCK-1025", customer: "Test Ltd.", issue: "Fatura İptali", status: "In Progress", priortiy: "Medium" },
    { id: "TCK-1026", customer: "Örnek A.Ş.", issue: "Kullanıcı Yetkilendirme", status: "Open", priortiy: "Low" },
];

export function BotTicketList() {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-full">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-red-50 rounded-lg">
                    <Ticket className="h-6 w-6 text-red-600" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">Yönlendirilen Talepler</h3>
                    <p className="text-sm text-gray-500">Botun insan desteğine yönlendirdiği konular</p>
                </div>
            </div>
            <div className="space-y-4">
                {redirectedTickets.map((ticket) => (
                    <div key={ticket.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors cursor-pointer">
                        <div className="flex items-center gap-3">
                            <div className="bg-white p-2 rounded-md border border-gray-200 text-xs font-mono font-medium text-gray-500">
                                {ticket.id}
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">{ticket.issue}</p>
                                <p className="text-xs text-gray-500">{ticket.customer}</p>
                            </div>
                        </div>
                        <span className={cn(
                            "px-2 py-1 text-xs font-semibold rounded-full",
                            ticket.priortiy === "High" ? "bg-red-100 text-red-700" :
                                ticket.priortiy === "Medium" ? "bg-orange-100 text-orange-700" : "bg-blue-100 text-blue-700"
                        )}>
                            {ticket.priortiy}
                        </span>
                    </div>
                ))}
            </div>
            <button className="mt-4 w-full py-2 text-sm text-center text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                Tümünü Gör
            </button>
        </div>
    );
}
