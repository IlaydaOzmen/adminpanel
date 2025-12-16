"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import Link from "next/link";
import {
    GraduationCap,
    UserX,
    Search,
    Filter,
    Calendar,
    Mail,
    Phone,
    Building2,
    Clock,
    CheckCircle2,
    XCircle,
    ArrowLeft,
    ChevronRight,
    Star,
    TrendingUp,
    Users,
    BookOpen,
    Award,
    AlertTriangle
} from "lucide-react";
import { cn } from "@/lib/utils";

type TrainingStatus = "trained" | "untrained" | "scheduled" | "all";
type Package = "Starter" | "Business" | "Enterprise" | "all";

interface TrainingCustomer {
    id: string;
    name: string;
    company: string;
    email: string;
    phone: string;
    package: "Starter" | "Business" | "Enterprise";
    registrationDate: string;
    trainingStatus: "trained" | "untrained" | "scheduled";
    trainingDate?: string;
    trainingType?: string;
    trainedBy?: string;
    satisfactionScore?: number;
    lastLogin: string;
    riskLevel: "low" | "medium" | "high";
}

const mockCustomers: TrainingCustomer[] = [
    {
        id: "1",
        name: "Ahmet Yılmaz",
        company: "TechSoft A.Ş.",
        email: "ahmet@techsoft.com",
        phone: "+90 532 123 4567",
        package: "Enterprise",
        registrationDate: "2024-01-15",
        trainingStatus: "trained",
        trainingDate: "2024-01-20",
        trainingType: "Yerinde Kurulum",
        trainedBy: "Mehmet Öztürk",
        satisfactionScore: 5,
        lastLogin: "2 saat önce",
        riskLevel: "low"
    },
    {
        id: "2",
        name: "Ayşe Demir",
        company: "Demir Ticaret",
        email: "ayse@demirticaret.com",
        phone: "+90 533 234 5678",
        package: "Business",
        registrationDate: "2024-02-10",
        trainingStatus: "trained",
        trainingDate: "2024-02-15",
        trainingType: "Online Eğitim",
        trainedBy: "Zeynep Kaya",
        satisfactionScore: 4,
        lastLogin: "1 gün önce",
        riskLevel: "low"
    },
    {
        id: "3",
        name: "Mehmet Kaya",
        company: "Kaya Lojistik",
        email: "mehmet@kayalojistik.com",
        phone: "+90 534 345 6789",
        package: "Enterprise",
        registrationDate: "2024-03-01",
        trainingStatus: "untrained",
        lastLogin: "1 hafta önce",
        riskLevel: "high"
    },
    {
        id: "4",
        name: "Zeynep Çelik",
        company: "Çelik Mobilya",
        email: "zeynep@celikmobilya.com",
        phone: "+90 535 456 7890",
        package: "Starter",
        registrationDate: "2024-03-15",
        trainingStatus: "scheduled",
        trainingDate: "2024-12-20",
        trainingType: "Online Eğitim",
        lastLogin: "3 gün önce",
        riskLevel: "medium"
    },
    {
        id: "5",
        name: "Ali Vural",
        company: "Vural İnşaat",
        email: "ali@vuralinşaat.com",
        phone: "+90 536 567 8901",
        package: "Business",
        registrationDate: "2024-04-01",
        trainingStatus: "trained",
        trainingDate: "2024-04-10",
        trainingType: "Yerinde Kurulum",
        trainedBy: "Mehmet Öztürk",
        satisfactionScore: 5,
        lastLogin: "5 saat önce",
        riskLevel: "low"
    },
    {
        id: "6",
        name: "Fatma Şahin",
        company: "Şahin Market",
        email: "fatma@sahinmarket.com",
        phone: "+90 537 678 9012",
        package: "Starter",
        registrationDate: "2024-05-10",
        trainingStatus: "untrained",
        lastLogin: "2 hafta önce",
        riskLevel: "high"
    },
    {
        id: "7",
        name: "Can Öztürk",
        company: "Öztürk Tekstil",
        email: "can@ozturktekstil.com",
        phone: "+90 538 789 0123",
        package: "Enterprise",
        registrationDate: "2024-06-01",
        trainingStatus: "trained",
        trainingDate: "2024-06-10",
        trainingType: "İleri Seviye Eğitim",
        trainedBy: "Zeynep Kaya",
        satisfactionScore: 4,
        lastLogin: "1 gün önce",
        riskLevel: "low"
    },
    {
        id: "8",
        name: "Deniz Arslan",
        company: "Arslan Gıda",
        email: "deniz@arslangida.com",
        phone: "+90 539 890 1234",
        package: "Business",
        registrationDate: "2024-07-15",
        trainingStatus: "scheduled",
        trainingDate: "2024-12-18",
        trainingType: "Online Eğitim",
        lastLogin: "12 saat önce",
        riskLevel: "medium"
    },
    {
        id: "9",
        name: "Emre Yıldız",
        company: "Yıldız Enerji",
        email: "emre@yildizenerji.com",
        phone: "+90 540 901 2345",
        package: "Enterprise",
        registrationDate: "2024-08-01",
        trainingStatus: "untrained",
        lastLogin: "3 hafta önce",
        riskLevel: "high"
    },
    {
        id: "10",
        name: "Gizem Acar",
        company: "Acar Kimya",
        email: "gizem@acarkimya.com",
        phone: "+90 541 012 3456",
        package: "Starter",
        registrationDate: "2024-09-10",
        trainingStatus: "trained",
        trainingDate: "2024-09-20",
        trainingType: "Online Eğitim",
        trainedBy: "Mehmet Öztürk",
        satisfactionScore: 5,
        lastLogin: "4 saat önce",
        riskLevel: "low"
    },
];

export default function TrainingCustomersPage() {
    const searchParams = useSearchParams();
    const urlStatus = searchParams.get("status");

    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<TrainingStatus>("all");
    const [packageFilter, setPackageFilter] = useState<Package>("all");
    const [selectedCustomer, setSelectedCustomer] = useState<TrainingCustomer | null>(null);
    const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

    // Set initial filter from URL parameter
    useEffect(() => {
        if (urlStatus === "trained" || urlStatus === "untrained" || urlStatus === "scheduled") {
            setStatusFilter(urlStatus);
        }
    }, [urlStatus]);

    const filteredCustomers = mockCustomers.filter((customer) => {
        const matchesSearch =
            customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "all" || customer.trainingStatus === statusFilter;
        const matchesPackage = packageFilter === "all" || customer.package === packageFilter;
        return matchesSearch && matchesStatus && matchesPackage;
    });

    // Statistics
    const totalCustomers = mockCustomers.length;
    const trainedCount = mockCustomers.filter(c => c.trainingStatus === "trained").length;
    const untrainedCount = mockCustomers.filter(c => c.trainingStatus === "untrained").length;
    const scheduledCount = mockCustomers.filter(c => c.trainingStatus === "scheduled").length;
    const highRiskUntrained = mockCustomers.filter(c => c.trainingStatus === "untrained" && c.riskLevel === "high").length;

    const handleScheduleTraining = (customer: TrainingCustomer) => {
        setSelectedCustomer(customer);
        setIsScheduleModalOpen(true);
    };

    return (
        <PageContainer>
            <PageHeader title="Eğitim Yönetimi" description="Eğitim alan ve almayan müşterileri yönetin.">
                <Link
                    href="/support"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Destek'e Dön
                </Link>
            </PageHeader>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div
                    onClick={() => setStatusFilter("trained")}
                    className={cn(
                        "bg-white rounded-xl p-5 shadow-sm border cursor-pointer transition-all hover:shadow-md",
                        statusFilter === "trained" ? "border-green-500 ring-2 ring-green-200" : "border-gray-200"
                    )}
                >
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-green-100 rounded-xl">
                            <GraduationCap className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">{trainedCount}</p>
                            <p className="text-sm text-gray-500">Eğitim Aldı</p>
                        </div>
                    </div>
                    <div className="mt-3 flex items-center text-sm text-green-600">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        %{Math.round((trainedCount / totalCustomers) * 100)} tamamlandı
                    </div>
                </div>

                <div
                    onClick={() => setStatusFilter("untrained")}
                    className={cn(
                        "bg-white rounded-xl p-5 shadow-sm border cursor-pointer transition-all hover:shadow-md",
                        statusFilter === "untrained" ? "border-red-500 ring-2 ring-red-200" : "border-gray-200"
                    )}
                >
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-red-100 rounded-xl">
                            <UserX className="h-6 w-6 text-red-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">{untrainedCount}</p>
                            <p className="text-sm text-gray-500">Eğitimsiz</p>
                        </div>
                    </div>
                    {highRiskUntrained > 0 && (
                        <div className="mt-3 flex items-center text-sm text-red-600">
                            <AlertTriangle className="h-4 w-4 mr-1" />
                            {highRiskUntrained} yüksek riskli
                        </div>
                    )}
                </div>

                <div
                    onClick={() => setStatusFilter("scheduled")}
                    className={cn(
                        "bg-white rounded-xl p-5 shadow-sm border cursor-pointer transition-all hover:shadow-md",
                        statusFilter === "scheduled" ? "border-blue-500 ring-2 ring-blue-200" : "border-gray-200"
                    )}
                >
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-blue-100 rounded-xl">
                            <Calendar className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">{scheduledCount}</p>
                            <p className="text-sm text-gray-500">Planlandı</p>
                        </div>
                    </div>
                    <div className="mt-3 flex items-center text-sm text-blue-600">
                        <Clock className="h-4 w-4 mr-1" />
                        Eğitim bekliyor
                    </div>
                </div>

                <div
                    onClick={() => setStatusFilter("all")}
                    className={cn(
                        "bg-white rounded-xl p-5 shadow-sm border cursor-pointer transition-all hover:shadow-md",
                        statusFilter === "all" ? "border-purple-500 ring-2 ring-purple-200" : "border-gray-200"
                    )}
                >
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-purple-100 rounded-xl">
                            <Users className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">{totalCustomers}</p>
                            <p className="text-sm text-gray-500">Toplam</p>
                        </div>
                    </div>
                    <div className="mt-3 flex items-center text-sm text-purple-600">
                        <BookOpen className="h-4 w-4 mr-1" />
                        Tüm müşteriler
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="İsim, şirket veya e-posta ara..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <select
                            value={packageFilter}
                            onChange={(e) => setPackageFilter(e.target.value as Package)}
                            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">Tüm Paketler</option>
                            <option value="Starter">Starter</option>
                            <option value="Business">Business</option>
                            <option value="Enterprise">Enterprise</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Customer Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Müşteri</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paket</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Eğitim Durumu</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Eğitim Bilgileri</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Son Giriş</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredCustomers.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                        <UserX className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                                        <p>Gösterilecek müşteri bulunamadı.</p>
                                    </td>
                                </tr>
                            ) : (
                                filteredCustomers.map((customer) => (
                                    <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                                                    {customer.name.charAt(0)}
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                                                    <div className="text-sm text-gray-500 flex items-center gap-1">
                                                        <Building2 className="h-3 w-3" />
                                                        {customer.company}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={cn(
                                                "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                                                customer.package === "Starter" && "bg-gray-100 text-gray-700",
                                                customer.package === "Business" && "bg-blue-100 text-blue-700",
                                                customer.package === "Enterprise" && "bg-purple-100 text-purple-700"
                                            )}>
                                                {customer.package}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex flex-col gap-1">
                                                {customer.trainingStatus === "trained" && (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                                        <CheckCircle2 className="h-3 w-3 mr-1" />
                                                        Eğitim Aldı
                                                    </span>
                                                )}
                                                {customer.trainingStatus === "untrained" && (
                                                    <>
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">
                                                            <XCircle className="h-3 w-3 mr-1" />
                                                            Eğitimsiz
                                                        </span>
                                                        {customer.riskLevel === "high" && (
                                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-50 text-red-600 animate-pulse">
                                                                <AlertTriangle className="h-3 w-3 mr-1" />
                                                                Yüksek Risk
                                                            </span>
                                                        )}
                                                    </>
                                                )}
                                                {customer.trainingStatus === "scheduled" && (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                                                        <Calendar className="h-3 w-3 mr-1" />
                                                        Planlandı
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {customer.trainingStatus === "trained" ? (
                                                <div className="text-sm">
                                                    <div className="text-gray-900">{customer.trainingType}</div>
                                                    <div className="text-gray-500 text-xs">{customer.trainingDate} • {customer.trainedBy}</div>
                                                    {customer.satisfactionScore && (
                                                        <div className="flex items-center gap-0.5 mt-1">
                                                            {[...Array(5)].map((_, i) => (
                                                                <Star
                                                                    key={i}
                                                                    className={cn(
                                                                        "h-3 w-3",
                                                                        i < customer.satisfactionScore! ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                                                    )}
                                                                />
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            ) : customer.trainingStatus === "scheduled" ? (
                                                <div className="text-sm">
                                                    <div className="text-gray-900">{customer.trainingType}</div>
                                                    <div className="text-blue-600 text-xs font-medium">{customer.trainingDate}</div>
                                                </div>
                                            ) : (
                                                <span className="text-sm text-gray-400">—</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {customer.lastLogin}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            {customer.trainingStatus === "untrained" ? (
                                                <button
                                                    onClick={() => handleScheduleTraining(customer)}
                                                    className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors"
                                                >
                                                    <Calendar className="h-3 w-3 mr-1" />
                                                    Planla
                                                </button>
                                            ) : customer.trainingStatus === "scheduled" ? (
                                                <button className="inline-flex items-center px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-200 transition-colors">
                                                    Düzenle
                                                </button>
                                            ) : (
                                                <button className="inline-flex items-center px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-xs font-medium hover:bg-green-100 transition-colors">
                                                    <Award className="h-3 w-3 mr-1" />
                                                    Sertifika
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Schedule Training Modal */}
            {isScheduleModalOpen && selectedCustomer && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
                    onClick={() => setIsScheduleModalOpen(false)}
                >
                    <div
                        className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                                    <Calendar className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">Eğitim Planla</h3>
                                    <p className="text-sm text-gray-500">{selectedCustomer.name} - {selectedCustomer.company}</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Eğitim Tipi</label>
                                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="online">Online Temel Eğitim</option>
                                    <option value="onsite">Yerinde Kurulum & Eğitim</option>
                                    <option value="advanced">İleri Seviye Modül Eğitimi</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tarih</label>
                                <input
                                    type="date"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Saat</label>
                                <input
                                    type="time"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Eğitmen</label>
                                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="">Seçiniz...</option>
                                    <option value="mehmet">Mehmet Öztürk</option>
                                    <option value="zeynep">Zeynep Kaya</option>
                                    <option value="ali">Ali Vural</option>
                                </select>
                            </div>
                        </div>

                        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex gap-3">
                            <button
                                onClick={() => {
                                    alert(`${selectedCustomer.name} için eğitim planlandı! (Demo)`);
                                    setIsScheduleModalOpen(false);
                                }}
                                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                            >
                                Eğitimi Planla
                            </button>
                            <button
                                onClick={() => setIsScheduleModalOpen(false)}
                                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                            >
                                İptal
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </PageContainer>
    );
}
