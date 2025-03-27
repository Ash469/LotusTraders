import Link from 'next/link';

const CategoryNotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
            <h1 className="text-4xl font-bold mb-4">Category Not Found</h1>
            <p className="text-gray-600 mb-6">
                Sorry, we couldn&apos;t find the category you&apos;re looking for.
            </p>
            <Link 
                href="/categories"
                className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            >
                View All Categories
            </Link>
        </div>
    );
};

export default CategoryNotFound;