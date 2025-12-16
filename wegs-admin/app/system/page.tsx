import { MaintenanceControl } from "@/components/system/MaintenanceControl";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default function SystemPage() {
    return (
        <PageContainer>
            <PageHeader title="Sistem Yönetimi" description="Bakım modu ve sistem yapılandırmaları.">
                <Link
                    href="/system/outages"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                >
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Kesinti Raporu
                </Link>
            </PageHeader>
            <MaintenanceControl />
        </PageContainer>
    );
}
