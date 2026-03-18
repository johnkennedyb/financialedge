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
        <div className={`prose prose-lg max-w-none isolate overflow-x-hidden${className ? ` ${className}` : ""}`}>
            {children}
        </div>
    );
}
