"use client";

import { useTheme } from "next-themes";
import { Moon, Sun, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function ThemeSettings() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Avoid hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <div className="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-base font-semibold leading-7 text-gray-900 dark:text-white">Görünüm Ayarları</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Panelin renk temasını buradan değiştirebilirsiniz.</p>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <button
                    onClick={() => setTheme("light")}
                    className={cn(
                        "flex items-center justify-between rounded-lg border p-4 text-sm font-medium transition-all hover:bg-gray-50 dark:hover:bg-gray-700",
                        theme === "light"
                            ? "border-blue-600 bg-blue-50 text-blue-700 ring-1 ring-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                            : "border-gray-200 text-gray-900 dark:text-white dark:border-gray-600"
                    )}
                >
                    <span className="flex items-center">
                        <Sun className={cn("mr-3 h-5 w-5", theme === "light" ? "text-blue-600 dark:text-blue-400" : "text-gray-400")} />
                        Aydınlık
                    </span>
                    {theme === "light" && <div className="h-2 w-2 rounded-full bg-blue-600" />}
                </button>

                <button
                    onClick={() => setTheme("dark")}
                    className={cn(
                        "flex items-center justify-between rounded-lg border p-4 text-sm font-medium transition-all hover:bg-gray-50 dark:hover:bg-gray-700",
                        theme === "dark"
                            ? "border-purple-600 bg-purple-50 text-purple-700 ring-1 ring-purple-600 dark:bg-purple-900/20 dark:text-purple-400"
                            : "border-gray-200 text-gray-900 dark:text-white dark:border-gray-600"
                    )}
                >
                    <span className="flex items-center">
                        <Moon className={cn("mr-3 h-5 w-5", theme === "dark" ? "text-purple-600 dark:text-purple-400" : "text-gray-400")} />
                        Karanlık
                    </span>
                    {theme === "dark" && <div className="h-2 w-2 rounded-full bg-purple-600" />}
                </button>

                <button
                    onClick={() => setTheme("system")}
                    className={cn(
                        "flex items-center justify-between rounded-lg border p-4 text-sm font-medium transition-all hover:bg-gray-50 dark:hover:bg-gray-700",
                        theme === "system"
                            ? "border-gray-900 bg-gray-50 text-gray-900 ring-1 ring-gray-900 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-500"
                            : "border-gray-200 text-gray-900 dark:text-white dark:border-gray-600"
                    )}
                >
                    <span className="flex items-center">
                        <Monitor className={cn("mr-3 h-5 w-5", theme === "system" ? "text-gray-900 dark:text-gray-100" : "text-gray-400")} />
                        Sistem
                    </span>
                    {theme === "system" && <div className="h-2 w-2 rounded-full bg-gray-900 dark:bg-white" />}
                </button>
            </div>
        </div>
    );
}
