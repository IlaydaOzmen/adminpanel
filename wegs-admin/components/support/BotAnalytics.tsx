import { Bot, MessageSquare, ThumbsUp } from "lucide-react";

export function BotAnalytics() {
    return (
        <div className="rounded-lg bg-white shadow-sm ring-1 ring-gray-900/5">
            <div className="border-b border-gray-200 px-4 py-5 sm:px-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">AI Bot Performansı</h3>
            </div>
            <dl className="grid grid-cols-1 gap-5 sm:grid-cols-3 px-4 py-5 sm:px-6">
                <div className="flex flex-col items-center p-4 bg-blue-50 rounded-lg">
                    <Bot className="h-8 w-8 text-blue-600 mb-2" />
                    <span className="text-2xl font-bold text-gray-900">1,240</span>
                    <span className="text-sm text-gray-500">Toplam Konuşma</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-green-50 rounded-lg">
                    <ThumbsUp className="h-8 w-8 text-green-600 mb-2" />
                    <span className="text-2xl font-bold text-gray-900">92%</span>
                    <span className="text-sm text-gray-500">Çözüm Oranı</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-yellow-50 rounded-lg">
                    <MessageSquare className="h-8 w-8 text-yellow-600 mb-2" />
                    <span className="text-2xl font-bold text-gray-900">45</span>
                    <span className="text-sm text-gray-500">Escalated to Human</span>
                </div>
            </dl>
        </div>
    );
}
