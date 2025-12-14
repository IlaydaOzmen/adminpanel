"use client";

import { useState } from "react";
import { CustomerTable } from "@/components/customers/CustomerTable";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { NewCustomerModal } from "@/components/customers/NewCustomerModal";

export default function CustomersPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <PageContainer>
            <PageHeader
                title="Müşteri Yönetimi"
                description="Müşterilerinizi listeleyin, filtreleyin ve detaylar için inceleyin."
            >
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    + Yeni Müşteri
                </button>
            </PageHeader>

            <CustomerTable />

            <NewCustomerModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </PageContainer>
    );
}
