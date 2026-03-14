"use client";

import { useState, useEffect } from "react";

type Props = {
    src: string;
    fallbackSrc?: string;
    alt?: string;
    fill?: boolean;
    className?: string;
    sizes?: string;
    priority?: boolean;
};

const defaultFallback = "https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=1600";

export default function SafeImage({ src, fallbackSrc, alt = "", fill, className = "", sizes, priority }: Props) {
    const [currentSrc, setCurrentSrc] = useState<string>(src && src.trim() !== '' ? src : (fallbackSrc || defaultFallback));
    const [hasError, setHasError] = useState(false);

    const resolvedFallback = fallbackSrc || defaultFallback;

    useEffect(() => {
        if (src && src.trim() !== '') {
            setCurrentSrc(src);
            setHasError(false);
        } else {
            setCurrentSrc(resolvedFallback);
        }
    }, [src, resolvedFallback]);

    const handleError = () => {
        if (!hasError && currentSrc !== resolvedFallback) {
            setCurrentSrc(resolvedFallback);
            setHasError(true);
        }
    };

    const style: React.CSSProperties = fill
        ? { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain' }
        : {};

    return (
        <img
            src={currentSrc}
            alt={alt}
            className={className}
            style={style}
            sizes={sizes}
            onError={handleError}
            loading={priority ? "eager" : "lazy"}
        />
    );
}
