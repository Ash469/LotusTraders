'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new'), { 
  ssr: false,
  loading: () => <div className="h-64 flex items-center justify-center bg-theme-bg border border-theme-border rounded-md text-theme-text-muted">Loading Editor...</div>
});

interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  status: string;
  publishedAt: string;
}

export default function BlogsManager() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  // Form State
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blogs');
      if (!response.ok) throw new Error('Failed to fetch blogs');
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setUploading(true);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      const data = await res.json();
      if (res.ok && data.secure_url) {
        setCoverImage(data.secure_url);
      } else {
        alert('Failed to upload image: ' + (data.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug || !content || !coverImage) {
      alert('Please fill all required fields');
      return;
    }

    try {
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          slug,
          excerpt,
          content,
          coverImage
        })
      });

      if (res.ok) {
        alert('Blog created successfully!');
        setIsCreating(false);
        fetchBlogs();
        // Reset form
        setTitle(''); setSlug(''); setExcerpt(''); setContent(''); setCoverImage('');
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to create blog');
      }
    } catch (error) {
      console.error('Error submitting blog:', error);
      alert('An error occurred');
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;
    
    try {
      const res = await fetch(`/api/blogs/${slug}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        fetchBlogs();
      } else {
        alert('Failed to delete blog');
      }
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  if (isCreating) {
    return (
      <div className="space-y-6 max-w-4xl">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-theme-text">Create New Blog</h2>
          <button 
            onClick={() => setIsCreating(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 bg-theme-surface p-6 rounded-lg border border-theme-border">
          <div>
            <label className="block text-sm font-medium text-theme-text mb-1">Title *</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
              }}
              className="w-full p-2 border border-theme-border bg-theme-bg text-theme-text rounded-md focus:border-accent focus:outline-none"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-theme-text mb-1">Slug * (URL friendly)</label>
            <input 
              type="text" 
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full p-2 border border-theme-border bg-theme-bg text-theme-text rounded-md focus:border-accent focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-theme-text mb-1">Excerpt</label>
            <textarea 
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="w-full p-2 border border-theme-border bg-theme-bg text-theme-text rounded-md h-20 focus:border-accent focus:outline-none"
              placeholder="Short description for the blog card..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-theme-text mb-1">Content * (Rich Text)</label>
            <div className="bg-theme-bg border border-theme-border rounded-md mb-8">
              <ReactQuill 
                theme="snow" 
                value={content} 
                onChange={setContent} 
                className="h-64"
                modules={{
                  toolbar: [
                    [{ 'header': [1, 2, 3, false] }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                    ['link'],
                    ['clean']
                  ],
                }}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-theme-text mb-1">Cover Image *</label>
            {coverImage && (
              <div className="mb-2 relative w-48 h-32">
                <Image src={coverImage} alt="Cover Preview" fill className="object-cover rounded-md" />
              </div>
            )}
            <input 
              type="file" 
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full p-2 border border-theme-border bg-theme-bg text-theme-text rounded-md"
              disabled={uploading}
            />
            {uploading && <p className="text-sm text-accent mt-1">Uploading to Cloudinary...</p>}
          </div>

          <button 
            type="submit"
            className="w-full bg-accent text-white px-4 py-2 rounded-lg hover:bg-amber-600 font-semibold transition-colors"
            disabled={uploading}
          >
            Publish Blog
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-theme-text">Blogs Management</h2>
        <button 
          onClick={() => setIsCreating(true)}
          className="bg-accent text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition-colors"
        >
          Add New Blog
        </button>
      </div>

      {loading ? (
        <p className="text-theme-text-muted">Loading blogs...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-theme-border">
            <thead className="bg-theme-bg">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-theme-text-muted uppercase tracking-wider">Image</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-theme-text-muted uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-theme-text-muted uppercase tracking-wider">Published</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-theme-text-muted uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-theme-surface divide-y divide-theme-border text-theme-text">
              {blogs.map((blog) => (
                <tr key={blog._id} className="hover:bg-theme-bg">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="relative w-16 h-12 rounded overflow-hidden">
                      <Image src={blog.coverImage} alt={blog.title} fill className="object-cover" />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{blog.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{new Date(blog.publishedAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <a href={`/blog/${blog.slug}`} target="_blank" className="text-accent hover:text-amber-600 mr-4">View</a>
                    <button onClick={() => handleDelete(blog.slug)} className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              ))}
              {blogs.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-theme-text-muted">No blogs found. Create one!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
