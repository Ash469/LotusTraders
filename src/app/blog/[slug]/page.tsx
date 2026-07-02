import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import mongoose from 'mongoose';
import Blog from '@/models/Blog';
import NavBar from '@/components/nav_bar';
import Footer from '@/components/footer';

async function getBlog(slug: string) {
  const MONGODB_URI = process.env.MONGODB_URI!;
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(MONGODB_URI, { bufferCommands: false });
  }
  
  const blog = await Blog.findOne({ slug }).lean();
  return blog;
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-theme-bg transition-colors duration-300">
      <NavBar />
      
      <main className="pt-20">
        {/* Cinematic Header */}
        <div className="relative w-full h-[50vh] md:h-[70vh] bg-slate-900 overflow-hidden">
          <Image 
            src={blog.coverImage} 
            alt={blog.title} 
            fill 
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-theme-bg via-transparent to-transparent" />
          
          <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 max-w-5xl mx-auto z-10">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-accent font-bold tracking-widest uppercase mb-4 drop-shadow-md">
                {new Date(blog.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white font-heading leading-tight drop-shadow-lg mb-6">
                {blog.title}
              </h1>
              <p className="text-gray-200 text-lg md:text-xl max-w-2xl mx-auto drop-shadow-md">
                By {blog.author}
              </p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
          <div 
            className="prose prose-lg dark:prose-invert prose-headings:font-heading prose-a:text-accent hover:prose-a:text-amber-600 prose-img:rounded-xl max-w-none text-theme-text"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
          
          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="mt-16 pt-8 border-t border-theme-border flex flex-wrap gap-2">
              <span className="text-theme-text-muted font-bold mr-2 my-auto">Tags:</span>
              {blog.tags.map((tag: string, index: number) => (
                <span key={index} className="px-4 py-2 bg-theme-surface text-theme-text rounded-full text-sm font-semibold border border-theme-border">
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          <div className="mt-16 text-center">
            <Link 
              href="/"
              className="inline-block px-8 py-3 bg-theme-surface border border-theme-border text-theme-text font-bold rounded-full hover:bg-theme-bg transition-all shadow-sm hover:shadow-md"
            >
              &larr; Back to Home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
