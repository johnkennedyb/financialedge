import Image from "next/image";
import Link from "next/link";

function FacebookIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className ?? "h-5 w-5"}>
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
    );
}

function XIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className ?? "h-5 w-5"}>
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
    );
}

function YouTubeIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className ?? "h-5 w-5"}>
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
    );
}

function TikTokIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className ?? "h-5 w-5"}>
            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.48 3.99-2.05 6.11-1.54.03.01.05.02.08.03v4.26c-.67-.22-1.39-.28-2.08-.14-1.29.26-2.37 1.21-2.76 2.48-.16.52-.19 1.08-.11 1.62.18 1.26 1.1 2.38 2.33 2.79.9.31 1.9.25 2.77-.17.86-.42 1.51-1.18 1.81-2.07.12-.35.18-.72.18-1.1V.02z" />
        </svg>
    );
}

export default function SiteFooter() {
    const socialLinks = [
        { name: "Facebook", href: "https://facebook.com/financialedge", icon: FacebookIcon },
        { name: "X", href: "https://x.com/financialedge", icon: XIcon },
        { name: "YouTube", href: "https://youtube.com/financialedge", icon: YouTubeIcon },
        { name: "TikTok", href: "https://tiktok.com/@financialedge", icon: TikTokIcon },
    ];

    return (
        <footer className="mt-20 border-t border-border bg-secondary/30 py-16">
            <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
                    <div className="md:col-span-5 flex flex-col gap-6">
                        <div className="flex items-center gap-2.5">
                            <span className="relative h-12 w-[240px] overflow-hidden sm:h-14 sm:w-[280px]">
                                <Image
                                    src="/logo.png"
                                    alt="Financial EDGE"
                                    fill
                                    className="object-contain object-left"
                                />
                            </span>
                        </div>
                        <p className="max-w-sm text-lg leading-relaxed text-muted">
                            Nigeria's definitive market intelligence platform. Bridging the gap between raw data and savvy investment decisions.
                        </p>
                        <div className="flex gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    aria-label={social.name}
                                    className="h-10 w-10 flex items-center justify-center rounded-full border border-border bg-background hover:bg-accent hover:text-white hover:border-accent transition-all"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <social.icon className="h-4 w-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="md:col-span-7 grid grid-cols-2 gap-8 sm:grid-cols-3">
                        <div className="space-y-4">
                            <h4 className="text-sm font-bold uppercase tracking-widest text-foreground">Sectors</h4>
                            <nav className="flex flex-col gap-2 text-sm text-muted">
                                <a href="/category/capital-market" className="hover:text-accent transition-colors">Capital Market</a>
                                <a href="/category/money-market" className="hover:text-accent transition-colors">Money Market</a>
                                <a href="/category/energy" className="hover:text-accent transition-colors">Energy</a>
                                <a href="/category/news" className="hover:text-accent transition-colors">News</a>
                                <a href="/category/industry" className="hover:text-accent transition-colors">Industry</a>
                            </nav>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-sm font-bold uppercase tracking-widest text-foreground">Intelligence</h4>
                            <nav className="flex flex-col gap-2 text-sm text-muted">
                                <a href="/about" className="hover:text-accent transition-colors">Our Methodology</a>
                                <a href="/contact-terminal" className="hover:text-accent transition-colors">Contact Terminal</a>
                                <a href="/join-the-team" className="hover:text-accent transition-colors">Join the Team</a>
                            </nav>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-sm font-bold uppercase tracking-widest text-foreground">Legal</h4>
                            <nav className="flex flex-col gap-2 text-sm text-muted">
                                <a href="/privacy-policy" className="hover:text-accent transition-colors">Privacy Policy</a>
                                <a href="/terms-of-service" className="hover:text-accent transition-colors">Terms of Service</a>
                                <a href="/legal" className="hover:text-accent transition-colors">Legal Disclaimer</a>
                            </nav>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-6 border-t border-border pt-8 text-sm text-muted md:flex-row md:items-center md:justify-between">
                    <p>© {new Date().getFullYear()} FinancialEDGE. Global Summit Edition.</p>
                    <div className="flex items-center gap-6">
                        <p className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                            Terminal Status: Operational
                        </p>
                        <a href="https://financialedge.com.ng" className="font-medium text-foreground hover:text-accent transition-colors">
                            Legacy Site ↗
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
