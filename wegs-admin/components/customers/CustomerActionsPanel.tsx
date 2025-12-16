"use client";

import { useState } from "react";
import {
    Key,
    MessageSquare,
    Shield,
    Building2,
    FileText,
    Calendar,
    Package,
    Trash2,
    PauseCircle,
    RefreshCw,
    Download
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PasswordResetModal } from "./PasswordResetModal";
import { SMSVerificationModal } from "./SMSVerificationModal";
import { DataSyncModal } from "./DataSyncModal";
import { ActionModals } from "./ActionModals";
import { GodModeButton } from "./GodModeButton";

interface CustomerActionsPanelProps {
    customer: {
        name: string;
        email: string;
        phone: string;
        hasDataSharingPermission: boolean;
    };
}

type ModalType = "password" | "sms" | "bankSync" | "invoiceSync" | "license" | "package" | "delete" | "freeze" | "deleteFinancial" | "deleteCompany" | "deleteAccount" | null;

export function CustomerActionsPanel({ customer }: CustomerActionsPanelProps) {
    const [activeModal, setActiveModal] = useState<ModalType>(null);
    const [smsActionType, setSmsActionType] = useState<string>("");
    const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);
    const [deleteType, setDeleteType] = useState<"financial" | "company" | "account" | null>(null);

    const handleSMSVerificationRequired = (actionType: string) => {
        setSmsActionType(actionType);
        setActiveModal("sms");
    };

    const handleSMSVerified = () => {
        setActiveModal(null);
        if (pendingAction) {
            pendingAction();
            setPendingAction(null);
        } else {
            alert(`${smsActionType} işlemi başarıyla tamamlandı!`);
        }
    };

    const actionGroups = [
        {
            title: "Güvenlik İşlemleri",
            color: "purple",
            actions: [
                {
                    id: "password",
                    label: "Şifre Sıfırla",
                    description: "E-posta veya SMS ile şifre sıfırlama",
                    icon: Key,
                    color: "purple"
                },
                {
                    id: "sms-verify",
                    label: "SMS Doğrulama",
                    description: "Kimlik doğrulama kodu gönder",
                    icon: MessageSquare,
                    color: "indigo"
                }
            ]
        },
        {
            title: "Veri Senkronizasyonu",
            color: "blue",
            actions: [
                {
                    id: "bankSync",
                    label: "Banka Hareketleri Çek",
                    description: "Bankadan son hareketleri al",
                    icon: Building2,
                    color: "blue"
                },
                {
                    id: "invoiceSync",
                    label: "Faturaları Çek",
                    description: "Entegratörden faturaları al",
                    icon: FileText,
                    color: "emerald"
                }
            ]
        },
        {
            title: "Hesap Yönetimi",
            color: "gray",
            actions: [
                {
                    id: "license",
                    label: "Lisans Yönetimi",
                    description: "Süre artır veya azalt",
                    icon: Calendar,
                    color: "blue"
                },
                {
                    id: "package",
                    label: "Paket Değiştir",
                    description: "Ön Muhasebe / E-Ticaret",
                    icon: Package,
                    color: "purple"
                },
                {
                    id: "freeze",
                    label: "Hesap Dondur",
                    description: "Geçici olarak devre dışı bırak",
                    icon: PauseCircle,
                    color: "yellow"
                }
            ]
        },
        {
            title: "Veri Silme İşlemleri",
            color: "red",
            actions: [
                {
                    id: "deleteFinancial",
                    label: "Mali Veri Sıfırla",
                    description: "Tüm mali verileri sil",
                    icon: Trash2,
                    color: "red"
                },
                {
                    id: "deleteCompany",
                    label: "Şirket Verisi Sil",
                    description: "Şirket bilgilerini sil",
                    icon: Trash2,
                    color: "red"
                },
                {
                    id: "deleteAccount",
                    label: "Hesabı Sil",
                    description: "Hesabı tamamen kaldır",
                    icon: Trash2,
                    color: "red"
                }
            ]
        }
    ];

    const handleAction = (actionId: string) => {
        if (actionId === "sms-verify") {
            setSmsActionType("Genel Kimlik Doğrulama");
            setActiveModal("sms");
        } else if (actionId === "deleteFinancial") {
            setDeleteType("financial");
            handleSMSVerificationRequired("Mali Veri Sıfırlama");
        } else if (actionId === "deleteCompany") {
            setDeleteType("company");
            handleSMSVerificationRequired("Şirket Verisi Silme");
        } else if (actionId === "deleteAccount") {
            setDeleteType("account");
            handleSMSVerificationRequired("Hesap Silme");
        } else {
            setActiveModal(actionId as ModalType);
        }
    };

    return (
        <div className="space-y-6">
            {/* God Mode Button - Prominent */}
            <div className="rounded-xl bg-gradient-to-r from-red-50 to-orange-50 p-6 border border-red-100">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                            <Shield className="h-5 w-5 text-red-600" />
                            God Mode Erişimi
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                            {customer.hasDataSharingPermission
                                ? "Müşteri veri paylaşımı iznini açmış. Paneline erişebilirsiniz."
                                : "Müşteri veri paylaşımı iznini açmamış."
                            }
                        </p>
                    </div>
                    <GodModeButton
                        customerName={customer.name}
                        customerEmail={customer.email}
                        hasDataSharingPermission={customer.hasDataSharingPermission}
                        hasActiveSession={false}
                    />
                </div>
            </div>

            {/* Action Groups */}
            {actionGroups.map((group) => (
                <div key={group.title} className="rounded-xl bg-white shadow-sm ring-1 ring-gray-900/5 overflow-hidden">
                    <div className={cn(
                        "px-6 py-4 border-b border-gray-100",
                        group.color === "purple" && "bg-gradient-to-r from-purple-50 to-indigo-50",
                        group.color === "blue" && "bg-gradient-to-r from-blue-50 to-cyan-50",
                        group.color === "gray" && "bg-gradient-to-r from-gray-50 to-slate-50"
                    )}>
                        <h3 className="text-base font-semibold text-gray-900">{group.title}</h3>
                    </div>
                    <div className="p-4 grid grid-cols-2 gap-3">
                        {group.actions.map((action) => {
                            const Icon = action.icon;
                            return (
                                <button
                                    key={action.id}
                                    onClick={() => handleAction(action.id)}
                                    className={cn(
                                        "flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all hover:shadow-md",
                                        action.color === "red"
                                            ? "border-red-200 hover:border-red-300 hover:bg-red-50"
                                            : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                                    )}
                                >
                                    <div className={cn(
                                        "p-2 rounded-lg",
                                        action.color === "purple" && "bg-purple-100",
                                        action.color === "indigo" && "bg-indigo-100",
                                        action.color === "blue" && "bg-blue-100",
                                        action.color === "emerald" && "bg-emerald-100",
                                        action.color === "yellow" && "bg-yellow-100",
                                        action.color === "red" && "bg-red-100"
                                    )}>
                                        <Icon className={cn(
                                            "h-5 w-5",
                                            action.color === "purple" && "text-purple-600",
                                            action.color === "indigo" && "text-indigo-600",
                                            action.color === "blue" && "text-blue-600",
                                            action.color === "emerald" && "text-emerald-600",
                                            action.color === "yellow" && "text-yellow-600",
                                            action.color === "red" && "text-red-600"
                                        )} />
                                    </div>
                                    <div>
                                        <span className={cn(
                                            "font-medium block",
                                            action.color === "red" ? "text-red-700" : "text-gray-900"
                                        )}>
                                            {action.label}
                                        </span>
                                        <span className="text-xs text-gray-500">{action.description}</span>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            ))}

            {/* Modals */}
            <PasswordResetModal
                isOpen={activeModal === "password"}
                onClose={() => setActiveModal(null)}
                customerName={customer.name}
                customerEmail={customer.email}
                customerPhone={customer.phone}
            />

            <SMSVerificationModal
                isOpen={activeModal === "sms"}
                onClose={() => setActiveModal(null)}
                onVerified={handleSMSVerified}
                customerName={customer.name}
                customerPhone={customer.phone}
                actionType={smsActionType}
            />

            <DataSyncModal
                isOpen={activeModal === "bankSync"}
                onClose={() => setActiveModal(null)}
                type="bank"
                customerName={customer.name}
            />

            <DataSyncModal
                isOpen={activeModal === "invoiceSync"}
                onClose={() => setActiveModal(null)}
                type="invoice"
                customerName={customer.name}
            />

            <ActionModals
                isOpen={["license", "package", "delete", "freeze"].includes(activeModal || "")}
                onClose={() => setActiveModal(null)}
                type={activeModal as "license" | "package" | "delete" | "freeze" | null}
                onSMSVerificationRequired={handleSMSVerificationRequired}
            />
        </div>
    );
}
