"use client";

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar
} from "recharts";
import { Clock, Smile } from "lucide-react";

const hourlyData = [
    { hour: "00:00", active: 20 }, { hour: "02:00", active: 10 },
    { hour: "04:00", active: 5 }, { hour: "06:00", active: 30 },
    { hour: "08:00", active: 80 }, { hour: "10:00", active: 150 },
    { hour: "12:00", active: 120 }, { hour: "14:00", active: 160 },
    { hour: "16:00", active: 140 }, { hour: "18:00", active: 110 },
    { hour: "20:00", active: 90 }, { hour: "22:00", active: 50 },
];

const satisfactionData = [
    { subject: 'Hız', A: 120, fullMark: 150 },
    { subject: 'Doğruluk', A: 98, fullMark: 150 },
    { subject: 'Nezahet', A: 86, fullMark: 150 },
    { subject: 'Çözüm', A: 99, fullMark: 150 },
    { subject: 'Kolaylık', A: 85, fullMark: 150 },
    { subject: 'Empati', A: 65, fullMark: 150 },
];

export function BotPerformanceCharts() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Hourly Density */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-blue-50 rounded-lg">
                        <Clock className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">Saatlik Arama Yoğunluğu</h3>
                        <p className="text-sm text-gray-500">Günün hangi saatlerinde bot daha aktif?</p>
                    </div>
                </div>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={hourlyData}>
                            <defs>
                                <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                            <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                            <Tooltip />
                            <Area type="monotone" dataKey="active" stroke="#3b82f6" fillOpacity={1} fill="url(#colorActive)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Satisfaction Survey */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-green-50 rounded-lg">
                        <Smile className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">Memnuniyet Analizi</h3>
                        <p className="text-sm text-gray-500">Bot performans kriter puanları</p>
                    </div>
                </div>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={satisfactionData}>
                            <PolarGrid stroke="#e5e7eb" />
                            <PolarAngleAxis dataKey="subject" tick={{ fill: '#4b5563', fontSize: 12 }} />
                            <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                            <Radar
                                name="Bot Puanı"
                                dataKey="A"
                                stroke="#10b981"
                                strokeWidth={2}
                                fill="#10b981"
                                fillOpacity={0.4}
                            />
                            <Tooltip />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
