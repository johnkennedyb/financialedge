"use client";

import type { ReactNode } from "react";

export default function Prose({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <div className={`prose prose-lg max-w-none${className ? ` ${className}` : ""}`}>
            {children}
        </div>
    );
}
