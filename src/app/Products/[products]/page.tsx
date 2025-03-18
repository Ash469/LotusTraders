"use client"
import React from 'react';
import NavBar from '@/components/nav_bar';
import Footer from '@/components/footer';

interface ProductPageProps {
    params: {
        products: string
    }
}

export default function ProductDetails({ params }: ProductPageProps) {
    return (
        <div className="min-h-screen bg-gray-50">
            <NavBar />
            <main className="container mx-auto px-4 pt-24">
                <h1 className="text-2xl font-bold text-gray-900">
                    Details About Product {params.products}
                </h1>
            </main>
            <Footer />
        </div>
    );
}