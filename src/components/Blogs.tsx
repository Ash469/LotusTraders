'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  publishedAt: string;
}

const Blogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await fetch('/api/blogs');
        if (response.ok) {
          const data = await response.json();
          setBlogs(data);
        }
      } catch (error) {
        console.error('Failed to load blogs', error);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  return (
    <section className="py-24 overflow-hidden transition-colors duration-300 border-b border-theme-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-heading text-theme-text transition-colors duration-300">Latest Insights</h2>
          <p className="text-lg text-theme-text-muted max-w-2xl mx-auto transition-colors duration-300">
            Industry trends, guides, and engineering breakthroughs from Lotus Traders Machinery.
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {loading ? (
          <div className="text-center text-theme-text-muted">Loading articles...</div>
        ) : blogs.length === 0 ? (
          <div className="text-center text-theme-text-muted">Stay tuned! Exciting articles are on the way.</div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {blogs.map((blog, index) => {
              // Alternate aspect ratios to keep the masonry look dynamic
              const aspect = index % 2 === 0 ? 'aspect-[4/3]' : 'aspect-[3/4]';
              
              return (
                <motion.div
                  key={blog._id}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: (index % 3) * 0.15 }}
                  className={`relative w-full rounded-[16px] overflow-hidden group ${aspect} break-inside-avoid shadow-sm hover:shadow-2xl dark:hover:shadow-black/50 transition-all duration-500 bg-theme-surface border border-theme-border`}
                >
                  <Link href={`/blog/${blog.slug}`} className="absolute inset-0 z-20">
                    <span className="sr-only">Read {blog.title}</span>
                  </Link>

                  <Image 
                    src={blog.coverImage}
                    alt={blog.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Dark gradient overlay so text is readable */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/90 transition-colors duration-500" />
                  
                  {/* Blog Meta Data */}
                  <div className="absolute bottom-0 left-0 w-full p-6 text-white transform transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
                    <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-2">
                      {new Date(blog.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                    <h3 className="text-xl md:text-2xl font-bold mb-2 font-heading leading-tight drop-shadow-md">
                      {blog.title}
                    </h3>
                    <p className="text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-2">
                      {blog.excerpt}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Blogs;
