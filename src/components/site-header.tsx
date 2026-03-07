"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

function SunIcon({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className={className ?? "h-5 w-5"}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="M4.93 4.93l1.41 1.41" />
            <path d="M17.66 17.66l1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="M4.93 19.07l1.41-1.41" />
            <path d="M17.66 6.34l1.41-1.41" />
        </svg>
    );
}

function MoonIcon({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className={className ?? "h-5 w-5"}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
    );
}

function SearchIcon({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className={className ?? "h-4 w-4"}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
        </svg>
    );
}

export type NavItem = {
    label: string;
    href: string;
};

export default function SiteHeader({ items }: { items: NavItem[] }) {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    // const [theme, setTheme] = useState<"light" | "dark" | null>(null);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const mobileItems = useMemo(() => {
        const about = { label: "About", href: "/about" };
        return [...items, about];
    }, [items]);

    useEffect(() => {
        setOpen(false);
    }, [pathname]);

    // useEffect(() => {
    //     try {
    //         const stored = localStorage.getItem("fe-theme");
    //         const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    //         const nextTheme = stored === "light" || stored === "dark" ? stored : prefersDark ? "dark" : "light";
    //         setTheme(nextTheme);
    //     } catch {
    //         setTheme("light");
    //     }
    // }, []);

    // function applyTheme(nextTheme: "light" | "dark") {
    //     try {
    //         const root = document.documentElement;
    //         root.classList.remove("light", "dark");
    //         root.classList.add(nextTheme);
    //         localStorage.setItem("fe-theme", nextTheme);
    //     } catch {
    //         // ignore
    //     }
    //     setTheme(nextTheme);
    // }

    // function toggleTheme() {
    //     const nextTheme = theme === "dark" ? "light" : "dark";
    //     applyTheme(nextTheme);
    // }

    return (
        <>
            <header
                className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
                    ? "border-b border-border bg-background/80 backdrop-blur-md py-3"
                    : "bg-transparent py-5"
                    }`}
            >
                <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-6">
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <span className="relative h-24 w-[380px] overflow-hidden sm:h-28 sm:w-[420px]">
                            <Image
                                src="/logo.png"
                                alt="Financial EDGE"
                                fill
                                className="object-contain object-left"
                                priority
                            />
                        </span>
                    </Link>

                    <nav className="hidden items-center gap-1 md:flex">
                        {items.map((i) => (
                            <Link
                                key={i.href}
                                href={i.href}
                                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary hover:text-foreground ${pathname === i.href ? "text-foreground" : "text-muted"
                                    }`}
                            >
                                {i.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-3">
                        <div className="hidden items-center gap-2 rounded-full border border-border bg-secondary/50 px-3 py-1.5 focus-within:border-accent focus-within:ring-1 focus-within:ring-accent lg:flex">
                            <SearchIcon className="text-muted" />
                            <input
                                type="text"
                                placeholder="Search intelligence..."
                                className="bg-transparent text-sm outline-none placeholder:text-muted/70"
                            />
                            <kbd className="hidden rounded bg-background px-1.5 py-0.5 text-[10px] font-medium text-muted lg:inline-block">⌘K</kbd>
                        </div>

                        {/* Theme toggle button commented out */}
                        {/* <button
                        type="button"
                        onClick={toggleTheme}
                        aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/50 text-foreground transition-all hover:bg-secondary hover:shadow-sm active:scale-95"
                    >
                        {theme === "dark" ? <SunIcon /> : <MoonIcon />}
                    </button> */}

                        <Link href="/about" className="btn-modern hidden lg:flex">
                            Get Started
                        </Link>

                        <button
                            type="button"
                            aria-label="Open menu"
                            aria-expanded={open}
                            onClick={() => setOpen((v) => !v)}
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/50 text-foreground transition-all hover:bg-secondary md:hidden"
                        >
                            <div className="relative h-4 w-4 overflow-hidden">
                                <span
                                    className={`absolute left-0 top-0.5 block h-0.5 w-4 rounded bg-current transition-all duration-300 ${open ? "translate-y-[6px] rotate-45" : ""
                                        }`}
                                />
                                <span
                                    className={`absolute left-0 top-[7px] block h-0.5 w-4 rounded bg-current transition-all duration-300 ${open ? "opacity-0" : "opacity-100"
                                        }`}
                                />
                                <span
                                    className={`absolute left-0 top-[13.5px] block h-0.5 w-4 rounded bg-current transition-all duration-300 ${open ? "-translate-y-[6.5px] -rotate-45" : ""
                                        }`}
                                />
                            </div>
                        </button>
                    </div>
                </div>
            </header>

            {open ? (
                <div className="fixed left-0 right-0 top-[73px] bottom-0 z-[999] bg-background md:hidden">
                    <div className="flex h-full flex-col p-6 animate-fe-fade-in overflow-y-auto">
                        <div className="mb-8 flex items-center gap-3 rounded-2xl border border-border bg-secondary/50 p-4">
                            <SearchIcon className="h-5 w-5 text-muted" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full bg-transparent text-base outline-none"
                            />
                        </div>
                        <nav className="flex flex-col gap-2">
                            {mobileItems.map((i) => (
                                <Link
                                    key={i.href}
                                    href={i.href}
                                    className="rounded-xl px-4 py-4 text-lg font-semibold transition-colors hover:bg-secondary active:bg-secondary"
                                    onClick={() => setOpen(false)}
                                >
                                    {i.label}
                                </Link>
                            ))}
                        </nav>
                        <div className="mt-auto pb-10">
                            <Link
                                href="/about"
                                className="flex h-14 w-full items-center justify-center rounded-2xl bg-accent text-lg font-bold text-accent-foreground shadow-lg active:scale-[0.98]"
                                onClick={() => setOpen(false)}
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
}
