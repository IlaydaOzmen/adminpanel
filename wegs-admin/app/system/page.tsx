import { PartnerPortal } from "@/components/system/PartnerPortal";
import { MaintenanceControl } from "@/components/system/MaintenanceControl";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";

export default function SystemPage() {
    return (
        <PageContainer>
            <PageHeader title="Sistem Yönetimi" />
            <MaintenanceControl />
            <PartnerPortal />
        </PageContainer>
    );
}
