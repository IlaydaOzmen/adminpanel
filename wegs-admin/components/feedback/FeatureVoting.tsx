"use client";

import { useState } from "react";
import { ThumbsUp, MessageSquare, CheckCircle, Clock, AlertCircle, X, Send, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface Comment {
    id: number;
    author: string;
    message: string;
    timestamp: string;
    isAdmin: boolean;
}

interface FeatureRequest {
    id: number;
    title: string;
    description: string;
    votes: number;
    status: 'planned' | 'in-progress' | 'under-review' | 'completed';
    comments: Comment[];
    hasVoted: boolean;
}

const initialFeatures: FeatureRequest[] = [
    {
        id: 1,
        title: "Koyu Mod Desteği (Mobil)",
        description: "Mobil uygulama için tam karanlık mod desteği getirilmeli.",
        votes: 142,
        status: 'in-progress',
        hasVoted: true,
        comments: [
            { id: 1, author: "Ahmet Yılmaz", message: "Bu özellik çok gerekli, gece göz yoruyor.", timestamp: "2024-12-10T14:30:00", isAdmin: false },
            { id: 2, author: "Admin", message: "Geliştirme aşamasındayız, önümüzdeki hafta yayınlayacağız.", timestamp: "2024-12-11T09:00:00", isAdmin: true },
            { id: 3, author: "Zeynep Çelik", message: "Harika haber, sabırsızlıkla bekliyoruz!", timestamp: "2024-12-11T10:15:00", isAdmin: false },
        ]
    },
    {
        id: 2,
        title: "Toplu Fatura İçe Aktarma",
        description: "Excel ile yüzlerce faturayı tek seferde sisteme yükleyebilmek istiyoruz.",
        votes: 89,
        status: 'planned',
        hasVoted: false,
        comments: [
            { id: 1, author: "Mehmet Kaya", message: "Çok ihtiyacımız var, manuel giriş çok zaman alıyor.", timestamp: "2024-12-08T11:00:00", isAdmin: false },
            { id: 2, author: "Admin", message: "Ocak ayı için planlıyoruz.", timestamp: "2024-12-09T14:00:00", isAdmin: true },
        ]
    },
    {
        id: 3,
        title: "API Webhook Entegrasyonu",
        description: "Sipariş durumları değiştiğinde kendi sistemimize webhook atılmalı.",
        votes: 56,
        status: 'under-review',
        hasVoted: false,
        comments: [
            { id: 1, author: "Caner Erkin", message: "ERP entegrasyonu için şart.", timestamp: "2024-12-12T16:30:00", isAdmin: false },
        ]
    },
    {
        id: 4,
        title: "Otomatik E-posta Raporları",
        description: "Haftalık özet raporların her Pazartesi otomatik mail atılması.",
        votes: 34,
        status: 'completed',
        hasVoted: false,
        comments: [
            { id: 1, author: "Ayşe Demir", message: "Sonunda! Teşekkürler.", timestamp: "2024-12-05T09:00:00", isAdmin: false },
            { id: 2, author: "Admin", message: "Rica ederiz, keyifli kullanımlar!", timestamp: "2024-12-05T10:00:00", isAdmin: true },
        ]
    },
];

export function FeatureVoting() {
    const [features, setFeatures] = useState(initialFeatures);
    const [selectedFeature, setSelectedFeature] = useState<FeatureRequest | null>(null);
    const [newComment, setNewComment] = useState("");

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

    const handleAddComment = () => {
        if (!newComment.trim() || !selectedFeature) return;

        const comment: Comment = {
            id: Date.now(),
            author: "Admin",
            message: newComment,
            timestamp: new Date().toISOString(),
            isAdmin: true,
        };

        setFeatures(prev => prev.map(f => {
            if (f.id === selectedFeature.id) {
                return {
                    ...f,
                    comments: [...f.comments, comment],
                };
            }
            return f;
        }));

        setSelectedFeature(prev => prev ? {
            ...prev,
            comments: [...prev.comments, comment],
        } : null);

        setNewComment("");
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
        <>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900">Özellik İstekleri & Oylama</h3>
                    <p className="text-sm text-gray-500 mt-1">Kullanıcıların en çok talep ettiği geliştirmeler. Yorumları görüntülemek için tıklayın.</p>
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
                                    <button
                                        onClick={() => setSelectedFeature(feature)}
                                        className="flex items-center hover:text-blue-600 cursor-pointer transition-colors"
                                    >
                                        <MessageSquare className="w-3 h-3 mr-1" />
                                        {feature.comments.length} Yorum
                                    </button>
                                    <span>ID: #{feature.id}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Comments Modal */}
            {selectedFeature && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex min-h-screen items-center justify-center p-4">
                        <div className="fixed inset-0 bg-black/50 transition-opacity" onClick={() => setSelectedFeature(null)} />

                        <div className="relative bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[80vh] flex flex-col">
                            {/* Header */}
                            <div className="flex items-start justify-between p-4 border-b border-gray-200">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        {getStatusBadge(selectedFeature.status)}
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900">{selectedFeature.title}</h3>
                                    <p className="text-sm text-gray-500 mt-1">{selectedFeature.description}</p>
                                </div>
                                <button
                                    onClick={() => setSelectedFeature(null)}
                                    className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <X className="h-5 w-5 text-gray-400" />
                                </button>
                            </div>

                            {/* Comments */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[400px]">
                                {selectedFeature.comments.length === 0 ? (
                                    <div className="text-center py-8 text-gray-400">
                                        <MessageSquare className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                                        <p className="text-sm">Henüz yorum yok.</p>
                                    </div>
                                ) : (
                                    selectedFeature.comments.map((comment) => (
                                        <div
                                            key={comment.id}
                                            className={cn(
                                                "flex gap-3",
                                                comment.isAdmin && "flex-row-reverse"
                                            )}
                                        >
                                            <div className={cn(
                                                "flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center",
                                                comment.isAdmin ? "bg-blue-100" : "bg-gray-100"
                                            )}>
                                                <User className={cn(
                                                    "h-4 w-4",
                                                    comment.isAdmin ? "text-blue-600" : "text-gray-500"
                                                )} />
                                            </div>
                                            <div className={cn(
                                                "max-w-[80%] rounded-lg p-3",
                                                comment.isAdmin ? "bg-blue-50" : "bg-gray-100"
                                            )}>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className={cn(
                                                        "text-xs font-medium",
                                                        comment.isAdmin ? "text-blue-600" : "text-gray-600"
                                                    )}>
                                                        {comment.author}
                                                    </span>
                                                    {comment.isAdmin && (
                                                        <span className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">Admin</span>
                                                    )}
                                                </div>
                                                <p className="text-sm text-gray-900">{comment.message}</p>
                                                <p className="text-xs text-gray-400 mt-1">
                                                    {new Date(comment.timestamp).toLocaleDateString("tr-TR", {
                                                        day: "numeric",
                                                        month: "short",
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                    })}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* Add Comment */}
                            <div className="border-t border-gray-200 p-4">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        placeholder="Yorum yazın..."
                                        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        onKeyPress={(e) => e.key === "Enter" && handleAddComment()}
                                    />
                                    <button
                                        onClick={handleAddComment}
                                        disabled={!newComment.trim()}
                                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <Send className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
