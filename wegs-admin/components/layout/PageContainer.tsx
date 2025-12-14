import { cn } from "@/lib/utils";

interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export function PageContainer({ children, className, ...props }: PageContainerProps) {
    return (
        <div className={cn("space-y-6", className)} {...props}>
            {children}
        </div>
    );
}
