import Link from 'next/link';

const ProductNotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
            <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-6">
                Sorry, we couldn&apos;t find the Product you&apos;re looking for.
            </p>
            <Link 
                href="/"
                className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            >
                Go to Home Page
            </Link>
        </div>
    );
};

export default ProductNotFound;