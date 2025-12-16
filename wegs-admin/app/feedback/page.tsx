"use client";

import { useState } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { FeatureVoting } from "@/components/feedback/FeatureVoting";
import { ComplaintStats } from "@/components/feedback/ComplaintStats";
import { FeedbackManagement, FeedbackItem } from "@/components/feedback/FeedbackManagement";
import { FeedbackResponseModal } from "@/components/feedback/FeedbackResponseModal";
import { TicketManagement } from "@/components/support/TicketManagement";
import { MessageSquarePlus } from "lucide-react";

export default function FeedbackPage() {
    const [selectedFeedback, setSelectedFeedback] = useState<FeedbackItem | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSelectFeedback = (feedback: FeedbackItem) => {
        setSelectedFeedback(feedback);
        setIsModalOpen(true);
    };

    const handleSendResponse = (feedbackId: string, message: string, newStatus: string) => {
        // In a real app, this would call an API
        console.log("Sending response:", { feedbackId, message, newStatus });
        alert(`${feedbackId} numaralı geri bildirime yanıt gönderildi.`);
        setIsModalOpen(false);
        setSelectedFeedback(null);
    };

    return (
        <PageContainer>
            <PageHeader title="Geri Bildirim Merkezi" description="Kullanıcı isteklerini, önerilerini, şikayetlerini ve destek taleplerini yönetin.">
                <button className="hidden sm:inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                    <MessageSquarePlus className="mr-2 h-4 w-4" />
                    Yeni Kayıt Ekle
                </button>
            </PageHeader>

            {/* Feedback Management - Full Width */}
            <div className="mb-6">
                <FeedbackManagement onSelectFeedback={handleSelectFeedback} />
            </div>

            {/* Ticket Management Section */}
            <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Destek Talepleri</h2>
                <TicketManagement />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Side: Feature Voting */}
                <div className="lg:col-span-2 space-y-6">
                    <FeatureVoting />
                </div>

                {/* Right Side: Complaint Stats */}
                <div className="lg:col-span-1">
                    <ComplaintStats />
                </div>
            </div>

            {/* Response Modal */}
            {selectedFeedback && (
                <FeedbackResponseModal
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
                        setSelectedFeedback(null);
                    }}
                    feedback={selectedFeedback}
                    onSendResponse={handleSendResponse}
                />
            )}
        </PageContainer>
    );
}
