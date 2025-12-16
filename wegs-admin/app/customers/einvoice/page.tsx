"use client";

import { EInvoiceCustomerTable } from "@/components/customers/EInvoiceCustomerTable";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { FileText } from "lucide-react";

export default function EInvoiceCustomersPage() {
    return (
        <PageContainer>
            <PageHeader
                title="E-Fatura Müşterileri"
                description="E-Fatura entegrasyonlu müşterilerinizi görüntüleyin ve yönetin."
            >
                <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-lg">
                    <FileText className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-700">GİB Entegrasyonu Aktif</span>
                </div>
            </PageHeader>

            <EInvoiceCustomerTable />
        </PageContainer>
    );
}
