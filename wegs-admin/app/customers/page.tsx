"use client";

import { useState } from "react";
import { CustomerTable } from "@/components/customers/CustomerTable";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { NewCustomerModal } from "@/components/customers/NewCustomerModal";
import Link from "next/link";
import { FileText, BarChart3 } from "lucide-react";

export default function CustomersPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <PageContainer>
            <PageHeader
                title="Müşteri Yönetimi"
                description="Müşterilerinizi listeleyin, filtreleyin ve detaylar için inceleyin."
            >
                <div className="flex items-center gap-2">
                    <Link
                        href="/einvoice"
                        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                        <FileText className="h-4 w-4 mr-1.5" />
                        E-Fatura
                    </Link>
                    <Link
                        href="/analytics"
                        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                        <BarChart3 className="h-4 w-4 mr-1.5" />
                        Modül Kullanımı
                    </Link>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        + Yeni Müşteri
                    </button>
                </div>
            </PageHeader>

            <CustomerTable />

            <NewCustomerModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </PageContainer>
    );
}
