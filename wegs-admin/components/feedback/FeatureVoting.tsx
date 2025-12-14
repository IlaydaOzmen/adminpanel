"use client";

import { useState } from "react";
import { ThumbsUp, MessageSquare, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureRequest {
    id: number;
    title: string;
    description: string;
    votes: number;
    status: 'planned' | 'in-progress' | 'under-review' | 'completed';
    comments: number;
    hasVoted: boolean;
}

const initialFeatures: FeatureRequest[] = [
    { id: 1, title: "Koyu Mod Desteği (Mobil)", description: "Mobil uygulama için tam karanlık mod desteği getirilmeli.", votes: 142, status: 'in-progress', comments: 12, hasVoted: true },
    { id: 2, title: "Toplu Fatura İçe Aktarma", description: "Excel ile yüzlerce faturayı tek seferde sisteme yükleyebilmek istiyoruz.", votes: 89, status: 'planned', comments: 8, hasVoted: false },
    { id: 3, title: "API Webhook Entegrasyonu", description: "Sipariş durumları değiştiğinde kendi sistemimize webhook atılmalı.", votes: 56, status: 'under-review', comments: 4, hasVoted: false },
    { id: 4, title: "Otomatik E-posta Raporları", description: "Haftalık özet raporların her Pazartesi otomatik mail atılması.", votes: 34, status: 'completed', comments: 2, hasVoted: false },
];

export function FeatureVoting() {
    const [features, setFeatures] = useState(initialFeatures);

    const handleVote = (id: number) => {
        setFeatures(prev => prev.map(f => {
            if (f.id === id) {
                return {
                    ...f,
                    votes: f.hasVoted ? f.votes - 1 : f.votes + 1,
                    hasVoted: !f.hasVoted
                };
            }
            return f;
        }));
    };

    const getStatusBadge = (status: FeatureRequest['status']) => {
        switch (status) {
            case 'completed': return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" /> Tamamlandı</span>;
            case 'in-progress': return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"><Clock className="w-3 h-3 mr-1" /> Geliştiriliyor</span>;
            case 'planned': return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"><CalendarIcon className="w-3 h-3 mr-1" /> Planlandı</span>;
            case 'under-review': return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"><AlertCircle className="w-3 h-3 mr-1" /> İnceleniyor</span>;
        }
    };

    // Helper icon for Planned status
    const CalendarIcon = ({ className }: { className?: string }) => (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
    );

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">Özellik İstekleri & Oylama</h3>
                <p className="text-sm text-gray-500 mt-1">Kullanıcıların en çok talep ettiği geliştirmeler.</p>
            </div>
            <div className="divide-y divide-gray-100">
                {features.sort((a, b) => b.votes - a.votes).map((feature) => (
                    <div key={feature.id} className="p-6 flex items-start space-x-4 hover:bg-gray-50 transition-colors">
                        <div className="flex flex-col items-center space-y-1 min-w-[60px]">
                            <button
                                onClick={() => handleVote(feature.id)}
                                className={cn(
                                    "flex flex-col items-center justify-center w-12 h-12 rounded-lg border transition-all",
                                    feature.hasVoted
                                        ? "border-blue-500 bg-blue-50 text-blue-600"
                                        : "border-gray-200 bg-white text-gray-500 hover:border-gray-300"
                                )}
                            >
                                <ThumbsUp className={cn("w-4 h-4 mb-1", feature.hasVoted && "fill-current")} />
                                <span className="text-xs font-bold">{feature.votes}</span>
                            </button>
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                                <h4 className="text-base font-medium text-gray-900">{feature.title}</h4>
                                {getStatusBadge(feature.status)}
                            </div>
                            <p className="text-gray-600 text-sm mb-3">{feature.description}</p>
                            <div className="flex items-center text-xs text-gray-500 space-x-4">
                                <span className="flex items-center hover:text-gray-700 cursor-pointer">
                                    <MessageSquare className="w-3 h-3 mr-1" />
                                    {feature.comments} Yorum
                                </span>
                                <span>ID: #{feature.id}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
