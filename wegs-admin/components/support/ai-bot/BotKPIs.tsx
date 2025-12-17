import { Bot, MessageSquare, ThumbsUp, Clock, AlertTriangle } from "lucide-react";

export function BotKPIs() {
    return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
            <div className="bg-white overflow-hidden rounded-xl shadow-sm border border-gray-100 p-5">
                <div className="flex items-center">
                    <div className="flex-shrink-0 p-3 bg-blue-50 rounded-lg">
                        <Bot className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                        <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">Toplam Görüşme</dt>
                            <dd className="flex items-baseline">
                                <div className="text-2xl font-bold text-gray-900">12,450</div>
                                <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                                    +12%
                                </div>
                            </dd>
                        </dl>
                    </div>
                </div>
            </div>

            <div className="bg-white overflow-hidden rounded-xl shadow-sm border border-gray-100 p-5">
                <div className="flex items-center">
                    <div className="flex-shrink-0 p-3 bg-green-50 rounded-lg">
                        <ThumbsUp className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                        <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">Çözüm Oranı</dt>
                            <dd className="flex items-baseline">
                                <div className="text-2xl font-bold text-gray-900">%85</div>
                                <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                                    +2.1%
                                </div>
                            </dd>
                        </dl>
                    </div>
                </div>
            </div>

            <div className="bg-white overflow-hidden rounded-xl shadow-sm border border-gray-100 p-5">
                <div className="flex items-center">
                    <div className="flex-shrink-0 p-3 bg-purple-50 rounded-lg">
                        <Clock className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                        <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">Ort. Süre</dt>
                            <dd className="flex items-baseline">
                                <div className="text-2xl font-bold text-gray-900">1m 42s</div>
                                <div className="ml-2 flex items-baseline text-sm font-semibold text-gray-500">
                                    -12s
                                </div>
                            </dd>
                        </dl>
                    </div>
                </div>
            </div>

            <div className="bg-white overflow-hidden rounded-xl shadow-sm border border-gray-100 p-5">
                <div className="flex items-center">
                    <div className="flex-shrink-0 p-3 bg-yellow-50 rounded-lg">
                        <AlertTriangle className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                        <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">İnsan Müdahalesi</dt>
                            <dd className="flex items-baseline">
                                <div className="text-2xl font-bold text-gray-900">%15</div>
                                <div className="ml-2 flex items-baseline text-sm font-semibold text-red-600">
                                    +1.2%
                                </div>
                            </dd>
                        </dl>
                    </div>
                </div>
            </div>

            <div className="bg-white overflow-hidden rounded-xl shadow-sm border border-gray-100 p-5">
                <div className="flex items-center">
                    <div className="flex-shrink-0 p-3 bg-indigo-50 rounded-lg">
                        <MessageSquare className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                        <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">CSAT Skoru</dt>
                            <dd className="flex items-baseline">
                                <div className="text-2xl font-bold text-gray-900">4.2/5</div>
                                <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                                    +0.3
                                </div>
                            </dd>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
}
