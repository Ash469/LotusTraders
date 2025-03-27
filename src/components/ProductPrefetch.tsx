'use client';

import { useEffect } from 'react';
import { mutate } from 'swr';

export function ProductPrefetch({ productIds }: { productIds: number[] }) {
    useEffect(() => {
        productIds.forEach(id => {
            // Prefetch product data
            mutate(
                `/api/products/${id}`,
                fetch(`/api/products/${id}`).then(res => res.json())
            );
        });
    }, [productIds]);

    return null;
}