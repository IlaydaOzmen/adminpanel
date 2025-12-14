"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";

interface AuthContextType {
    isAuthenticated: boolean;
    user: { name: string; email: string; role: string } | null;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<{ name: string; email: string; role: string } | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    // Check localStorage on mount
    useEffect(() => {
        const storedAuth = localStorage.getItem("wegs_auth");
        if (storedAuth) {
            const parsed = JSON.parse(storedAuth);
            setIsAuthenticated(true);
            setUser(parsed.user);
        }
        setIsLoading(false);
    }, []);

    // Redirect logic
    useEffect(() => {
        if (isLoading) return;

        const isLoginPage = pathname?.startsWith("/login");

        if (!isAuthenticated && !isLoginPage) {
            router.push("/login");
        }

        if (isAuthenticated && isLoginPage) {
            router.push("/");
        }
    }, [isAuthenticated, pathname, isLoading, router]);

    const login = async (email: string, password: string): Promise<boolean> => {
        // Simulate API call - accept any credentials for demo
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock validation
        if (email && password) {
            const mockUser = {
                name: email.split("@")[0].charAt(0).toUpperCase() + email.split("@")[0].slice(1),
                email: email,
                role: "Super Admin"
            };

            setIsAuthenticated(true);
            setUser(mockUser);
            localStorage.setItem("wegs_auth", JSON.stringify({ user: mockUser }));
            return true;
        }
        return false;
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem("wegs_auth");
        router.push("/login");
    };

    // Show nothing while checking auth
    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
            </div>
        );
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
