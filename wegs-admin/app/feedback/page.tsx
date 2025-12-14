"use client";

import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { FeatureVoting } from "@/components/feedback/FeatureVoting";
import { ComplaintStats } from "@/components/feedback/ComplaintStats";
import { MessageSquarePlus } from "lucide-react";

export default function FeedbackPage() {
    return (
        <PageContainer>
            <PageHeader title="Geri Bildirim Merkezi" description="Kullanıcı isteklerini yönetin, şikayetleri izleyin ve geliştirme önceliklerini belirleyin.">
                <button className="hidden sm:inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                    <MessageSquarePlus className="mr-2 h-4 w-4" />
                    Yeni Kayıt Ekle
                </button>
            </PageHeader>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Side: Feature Voting */}
                <div className="lg:col-span-2 space-y-6">
                    <FeatureVoting />

                    {/* Recent Suggestions List (Simple Text List) */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-900">Son Gelen Öneriler</h3>
                        </div>
                        <div className="p-0">
                            <ul className="divide-y divide-gray-100">
                                {[
                                    "Mobil uygulamada fontlar biraz küçük görünüyor.",
                                    "Rapoları PDF olarak indirirken bazen tablo taşıyor.",
                                    "Karanlık modda kontrast sorunu var.",
                                    "Müşteri listesinde şehre göre filtreleme olsa iyi olur."
                                ].map((suggestion, idx) => (
                                    <li key={idx} className="p-4 hover:bg-gray-50 flex items-start gap-3">
                                        <div className="w-2 h-2 mt-2 rounded-full bg-blue-400 flex-shrink-0" />
                                        <p className="text-sm text-gray-600">{suggestion}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Right Side: Complaint Stats */}
                <div className="lg:col-span-1">
                    <ComplaintStats />
                </div>
            </div>
        </PageContainer>
    );
}
